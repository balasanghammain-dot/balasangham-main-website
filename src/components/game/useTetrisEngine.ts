import { useState, useEffect, useCallback, useRef } from 'react';
import { soundFX } from '../../lib/gameAudio';
import { launchConfetti } from '../../lib/confetti';

// Grid size tailored for 4:5 poster aspect ratio (781x1024)
export const COLS = 8;
export const ROWS = 10;
export const TOTAL_CELLS = COLS * ROWS; // 80 cells

export type ShapeMatrix = number[][];

export interface PieceType {
  name: string;
  shape: ShapeMatrix;
  color: string;
  borderColor: string;
}

export const SHAPES: PieceType[] = [
  {
    name: 'I',
    shape: [
      [1, 1, 1, 1]
    ],
    color: 'bg-cyan-500',
    borderColor: 'border-cyan-300'
  },
  {
    name: 'O',
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'bg-amber-400',
    borderColor: 'border-amber-200'
  },
  {
    name: 'T',
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 'bg-purple-500',
    borderColor: 'border-purple-300'
  },
  {
    name: 'L',
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: 'bg-orange-500',
    borderColor: 'border-orange-300'
  },
  {
    name: 'J',
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 'bg-blue-500',
    borderColor: 'border-blue-300'
  },
  {
    name: 'S',
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 'bg-emerald-500',
    borderColor: 'border-emerald-300'
  },
  {
    name: 'Z',
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'bg-rose-500',
    borderColor: 'border-rose-300'
  },
  {
    name: 'DOMINO',
    shape: [
      [1, 1]
    ],
    color: 'bg-pink-500',
    borderColor: 'border-pink-300'
  },
  {
    name: 'DOT',
    shape: [
      [1]
    ],
    color: 'bg-yellow-400',
    borderColor: 'border-yellow-200'
  }
];

// Rotate matrix clockwise 90 deg
export function rotateMatrix(matrix: ShapeMatrix): ShapeMatrix {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result: ShapeMatrix = [];
  for (let c = 0; c < cols; c++) {
    result[c] = [];
    for (let r = rows - 1; r >= 0; r--) {
      result[c].push(matrix[r][c]);
    }
  }
  return result;
}

// Check if shape collides with grid or walls
export function checkCollision(
  grid: boolean[][],
  shape: ShapeMatrix,
  offsetX: number,
  offsetY: number
): boolean {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] !== 0) {
        const x = offsetX + c;
        const y = offsetY + r;
        if (x < 0 || x >= COLS || y >= ROWS) {
          return true; // Wall collision
        }
        if (y >= 0 && grid[y][x]) {
          return true; // Already filled cell
        }
      }
    }
  }
  return false;
}

export function useTetrisEngine(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  // Board grid: ROWS x COLS booleans (true = cell revealed)
  const [grid, setGrid] = useState<boolean[][]>(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(false))
  );

  // History stack for Undo
  const [history, setHistory] = useState<boolean[][][]>([]);

  // Current falling piece state
  const [currentPiece, setCurrentPiece] = useState<PieceType>(() => SHAPES[Math.floor(Math.random() * 7)]);
  const [currentX, setCurrentX] = useState<number>(3);
  const [currentY, setCurrentY] = useState<number>(0);
  const [nextPiece, setNextPiece] = useState<PieceType>(() => SHAPES[Math.floor(Math.random() * 7)]);
  const [holdPiece, setHoldPiece] = useState<PieceType | null>(null);
  const [canHold, setCanHold] = useState<boolean>(true);

  // Game state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [soundMuted, setSoundMuted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [piecesPlaced, setPiecesPlaced] = useState<number>(0);
  const [celebrationRow, setCelebrationRow] = useState<number | null>(null);

  const dropIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Count filled cells
  const filledCount = grid.reduce(
    (total, row) => total + row.filter(Boolean).length,
    0
  );
  const percentComplete = Math.min(100, Math.round((filledCount / TOTAL_CELLS) * 100));

  // Toggle Sound
  const toggleSound = () => {
    soundFX.enabled = soundMuted;
    setSoundMuted(!soundMuted);
  };

  // Get random piece (Easy mode has friendly piece distribution)
  const getRandomPiece = useCallback((preferSmall: boolean = false): PieceType => {
    if (preferSmall) {
      return SHAPES[7 + Math.floor(Math.random() * 2)]; // Domino or Dot
    }
    if (Math.random() < 0.25) {
      return SHAPES[Math.floor(Math.random() * SHAPES.length)];
    }
    return SHAPES[Math.floor(Math.random() * 7)];
  }, []);

  // Compute ghost piece position (landing preview)
  const getGhostY = useCallback(() => {
    let ghostY = currentY;
    while (!checkCollision(grid, currentPiece.shape, currentX, ghostY + 1)) {
      ghostY++;
    }
    return ghostY;
  }, [grid, currentPiece.shape, currentX, currentY]);

  // Settle / Gravity shake: drops blocks down into empty holes
  const settleGravity = useCallback(() => {
    soundFX.playHelper();
    setGrid((prevGrid) => {
      setHistory((prevHist) => [...prevHist.slice(-5), prevGrid.map(row => [...row])]);
      const newGrid = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

      for (let c = 0; c < COLS; c++) {
        let count = 0;
        for (let r = 0; r < ROWS; r++) {
          if (prevGrid[r][c]) count++;
        }
        for (let r = ROWS - 1; r >= ROWS - count; r--) {
          newGrid[r][c] = true;
        }
      }

      const total = newGrid.reduce((t, row) => t + row.filter(Boolean).length, 0);
      if (total >= TOTAL_CELLS) {
        setIsWon(true);
        setIsPlaying(false);
        soundFX.playVictory();
        if (canvasRef.current) {
          launchConfetti(canvasRef.current, 5000);
        }
      }
      return newGrid;
    });
  }, [canvasRef]);

  // Lock current piece into grid
  const lockPiece = useCallback((lockedPiece: PieceType, posX: number, posY: number) => {
    soundFX.playLock();

    setGrid((prevGrid) => {
      setHistory((prevHist) => [...prevHist.slice(-5), prevGrid.map(row => [...row])]);

      const newGrid = prevGrid.map((row) => [...row]);
      for (let r = 0; r < lockedPiece.shape.length; r++) {
        for (let c = 0; c < lockedPiece.shape[r].length; c++) {
          if (lockedPiece.shape[r][c] !== 0) {
            const x = posX + c;
            const y = posY + r;
            if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
              newGrid[y][x] = true;
            }
          }
        }
      }

      for (let r = 0; r < ROWS; r++) {
        if (newGrid[r].every(Boolean) && !prevGrid[r].every(Boolean)) {
          setCelebrationRow(r);
          soundFX.playRowFull();
          setTimeout(() => setCelebrationRow(null), 800);
        }
      }

      const newFilled = newGrid.reduce((t, row) => t + row.filter(Boolean).length, 0);
      if (newFilled >= TOTAL_CELLS) {
        setIsWon(true);
        setIsPlaying(false);
        soundFX.playVictory();
        if (canvasRef.current) {
          launchConfetti(canvasRef.current, 5000);
        }
      }

      return newGrid;
    });

    setScore((s) => s + 40);
    setPiecesPlaced((p) => p + 1);
    setCanHold(true);

    const next = nextPiece;
    const upcoming = getRandomPiece();
    setNextPiece(upcoming);
    setCurrentPiece(next);
    setCurrentX(Math.floor((COLS - next.shape[0].length) / 2));
    setCurrentY(0);

    if (checkCollision(grid, next.shape, Math.floor((COLS - next.shape[0].length) / 2), 0)) {
      settleGravity();
    }
  }, [nextPiece, grid, getRandomPiece, canvasRef, settleGravity]);

  // Use Magic Star (1x1 piece)
  const useMagicStar = useCallback(() => {
    soundFX.playHelper();
    const starPiece = SHAPES[8]; // DOT (1x1)
    setCurrentPiece(starPiece);
    setCurrentX(3);
    setCurrentY(0);
  }, []);

  // Move piece horizontally
  const moveHorizontally = useCallback((delta: number) => {
    if (!isPlaying || isWon) return;
    const newX = currentX + delta;
    if (!checkCollision(grid, currentPiece.shape, newX, currentY)) {
      setCurrentX(newX);
      soundFX.playMove();
    }
  }, [isPlaying, isWon, grid, currentPiece.shape, currentX, currentY]);

  // Rotate piece
  const rotatePiece = useCallback(() => {
    if (!isPlaying || isWon) return;
    const rotated = rotateMatrix(currentPiece.shape);
    if (!checkCollision(grid, rotated, currentX, currentY)) {
      setCurrentPiece((p) => ({ ...p, shape: rotated }));
      soundFX.playRotate();
    } else if (!checkCollision(grid, rotated, currentX - 1, currentY)) {
      setCurrentX(currentX - 1);
      setCurrentPiece((p) => ({ ...p, shape: rotated }));
      soundFX.playRotate();
    } else if (!checkCollision(grid, rotated, currentX + 1, currentY)) {
      setCurrentX(currentX + 1);
      setCurrentPiece((p) => ({ ...p, shape: rotated }));
      soundFX.playRotate();
    }
  }, [isPlaying, isWon, grid, currentPiece, currentX, currentY]);

  // Drop step (down 1)
  const dropStep = useCallback(() => {
    if (!isPlaying || isWon) return;
    const newY = currentY + 1;
    if (!checkCollision(grid, currentPiece.shape, currentX, newY)) {
      setCurrentY(newY);
    } else {
      lockPiece(currentPiece, currentX, currentY);
    }
  }, [isPlaying, isWon, grid, currentPiece, currentX, currentY, lockPiece]);

  // Hard Drop (instant slam to lowest spot)
  const hardDrop = useCallback(() => {
    if (!isPlaying || isWon) return;
    const ghostY = getGhostY();
    lockPiece(currentPiece, currentX, ghostY);
  }, [isPlaying, isWon, getGhostY, lockPiece, currentPiece, currentX]);

  // Hold current piece
  const handleHold = useCallback(() => {
    if (!isPlaying || isWon || !canHold) return;
    soundFX.playRotate();
    setCanHold(false);
    if (!holdPiece) {
      setHoldPiece(currentPiece);
      const next = nextPiece;
      setNextPiece(getRandomPiece());
      setCurrentPiece(next);
      setCurrentX(Math.floor((COLS - next.shape[0].length) / 2));
      setCurrentY(0);
    } else {
      const temp = currentPiece;
      setCurrentPiece(holdPiece);
      setHoldPiece(temp);
      setCurrentX(Math.floor((COLS - holdPiece.shape[0].length) / 2));
      setCurrentY(0);
    }
  }, [isPlaying, isWon, canHold, holdPiece, currentPiece, nextPiece, getRandomPiece]);

  // Undo last drop
  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setGrid(previous);
    setHistory((prev) => prev.slice(0, -1));
    soundFX.playMove();
  }, [history]);

  // Restart Game
  const restartGame = useCallback(() => {
    setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(false)));
    setHistory([]);
    setIsWon(false);
    setIsPlaying(true);
    setScore(0);
    setPiecesPlaced(0);
    setHoldPiece(null);
    setCanHold(true);
    const p1 = getRandomPiece();
    const p2 = getRandomPiece();
    setCurrentPiece(p1);
    setNextPiece(p2);
    setCurrentX(Math.floor((COLS - p1.shape[0].length) / 2));
    setCurrentY(0);
    soundFX.playRotate();
  }, [getRandomPiece]);

  // Main game tick timer (950ms)
  useEffect(() => {
    if (!isPlaying || isWon) {
      if (dropIntervalRef.current) clearInterval(dropIntervalRef.current);
      return;
    }

    dropIntervalRef.current = setInterval(() => {
      dropStep();
    }, 950);

    return () => {
      if (dropIntervalRef.current) clearInterval(dropIntervalRef.current);
    };
  }, [isPlaying, isWon, dropStep]);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        moveHorizontally(-1);
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        moveHorizontally(1);
      } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
        dropStep();
      } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
        rotatePiece();
      } else if (e.key === ' ') {
        hardDrop();
      } else if (e.key.toLowerCase() === 'c' || e.key === 'Shift') {
        handleHold();
      } else if (e.key.toLowerCase() === 'p') {
        setIsPlaying((p) => !p);
      } else if (e.key.toLowerCase() === 'r') {
        restartGame();
      } else if (e.key.toLowerCase() === 'z') {
        handleUndo();
      } else if (e.key.toLowerCase() === 'v') {
        setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(true)));
        setIsWon(true);
        setIsPlaying(false);
        soundFX.playVictory();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveHorizontally, dropStep, rotatePiece, hardDrop, handleHold, handleUndo, restartGame]);

  const ghostY = getGhostY();

  return {
    grid,
    history,
    currentPiece,
    currentX,
    currentY,
    nextPiece,
    holdPiece,
    canHold,
    isPlaying,
    isWon,
    soundMuted,
    score,
    piecesPlaced,
    celebrationRow,
    filledCount,
    percentComplete,
    ghostY,
    toggleSound,
    moveHorizontally,
    rotatePiece,
    dropStep,
    hardDrop,
    handleHold,
    handleUndo,
    useMagicStar,
    settleGravity,
    restartGame,
    setIsPlaying,
  };
}
