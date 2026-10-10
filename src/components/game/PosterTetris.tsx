import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { soundFX } from '../../lib/gameAudio';
import { launchConfetti } from '../../lib/confetti';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  ArrowRight, 
  ArrowDown, 
  RotateCw, 
  Zap, 
  Sparkles, 
  Trophy, 
  Download, 
  Calendar,
  Undo2,
  Wand2
} from 'lucide-react';

// Grid size tailored for 4:5 poster aspect ratio (781x1024)
export const COLS = 8;
export const ROWS = 10;
export const TOTAL_CELLS = COLS * ROWS; // 80 cells

// Tetromino Definitions
export type ShapeMatrix = number[][];

export interface PieceType {
  name: string;
  shape: ShapeMatrix;
  color: string;
  borderColor: string;
}

const SHAPES: PieceType[] = [
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
  // Easy Helper Shapes for smooth filling
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
function rotateMatrix(matrix: ShapeMatrix): ShapeMatrix {
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
function checkCollision(
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

export const PosterTetris: React.FC = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

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

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
    // 25% chance of helper piece on Easy mode to avoid deadlock
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

  // Lock current piece into grid
  const lockPiece = useCallback((lockedPiece: PieceType, posX: number, posY: number) => {
    soundFX.playLock();

    setGrid((prevGrid) => {
      // Save for Undo
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

      // Check if any row became completely full
      for (let r = 0; r < ROWS; r++) {
        if (newGrid[r].every(Boolean) && !prevGrid[r].every(Boolean)) {
          setCelebrationRow(r);
          soundFX.playRowFull();
          setTimeout(() => setCelebrationRow(null), 800);
        }
      }

      // Check for full puzzle win
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

    // Spawn next piece
    const next = nextPiece;
    const upcoming = getRandomPiece();
    setNextPiece(upcoming);
    setCurrentPiece(next);
    setCurrentX(Math.floor((COLS - next.shape[0].length) / 2));
    setCurrentY(0);

    // If top spawn is immediately colliding (stack reached top)
    if (checkCollision(grid, next.shape, Math.floor((COLS - next.shape[0].length) / 2), 0)) {
      // Automatic Easy Settle: shake down floating blocks so player never gets stuck!
      settleGravity();
    }
  }, [nextPiece, grid, getRandomPiece]);

  // Settle / Gravity shake: drops blocks down into empty holes
  const settleGravity = useCallback(() => {
    soundFX.playHelper();
    setGrid((prevGrid) => {
      setHistory((prevHist) => [...prevHist.slice(-5), prevGrid.map(row => [...row])]);
      const newGrid = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
      
      // For each column, count how many blocks are filled and stack them from the bottom
      for (let c = 0; c < COLS; c++) {
        let count = 0;
        for (let r = 0; r < ROWS; r++) {
          if (prevGrid[r][c]) count++;
        }
        for (let r = ROWS - 1; r >= ROWS - count; r--) {
          newGrid[r][c] = true;
        }
      }

      // Check win condition
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
  }, []);

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
    // Wall kick attempt (in-place, left, right)
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
      // Landed
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

  // Main game tick timer (Gentle Easy Speed: 950ms)
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
        // Test shortcut: instantly trigger completed poster victory
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

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center p-3 sm:p-6 bg-gradient-to-b from-warm-cream via-soft-cream to-amber-50/50">
      {/* Canvas for full-screen confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      <div className="w-full max-w-4xl mx-auto">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-warm border border-amber-200/60 mb-4 sm:mb-6">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <Badge variant="default" className="bg-deep-red text-white">
                <Sparkles className="w-3 h-3 mr-1" />
                {ml ? 'ഈസി മോഡ് • പോസ്റ്റർ പസിൽ' : 'EASY MODE • POSTER REVEAL'}
              </Badge>
              <Badge variant="outline" className="border-amber-400 text-amber-800 bg-amber-50">
                8×10 {ml ? 'ഗ്രിഡ്' : 'Grid'}
              </Badge>
            </div>
            <h1 className={`text-xl sm:text-2xl font-black text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
              {ml
                ? 'ടെട്രിസ് കളിച്ച് ജില്ലാ സമ്മേളന പോസ്റ്റർ തുറക്കൂ!'
                : 'Tetris Poster Reveal Challenge'}
            </h1>
            <p className="text-xs sm:text-sm text-dark-brown/70 mt-0.5">
              {ml
                ? 'ബ്ലോക്കുകൾ സ്ഥിരമായി നിലനിൽക്കും. എല്ലാ ബ്ലോക്കുകളും നിറച്ച് പൂർണ്ണ പോസ്റ്റർ കാണൂ!'
                : 'Blocks stay permanent when they land! Fill all 80 cells to reveal the official conference poster.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSound}
              className="rounded-full w-9 h-9 p-0 border-amber-200 hover:bg-amber-100"
              title={soundMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {soundMuted ? <VolumeX className="w-4 h-4 text-dark-brown/60" /> : <Volume2 className="w-4 h-4 text-deep-red" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="rounded-full px-3 py-1 text-xs border-amber-200 hover:bg-amber-100"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 mr-1" /> : <Play className="w-3.5 h-3.5 mr-1" />}
              {isPlaying ? (ml ? 'പോസ്' : 'Pause') : (ml ? 'തുടങ്ങൂ' : 'Resume')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={restartGame}
              className="rounded-full px-3 py-1 text-xs border-amber-200 hover:bg-amber-100"
              title="Restart Game"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              {ml ? 'റീസ്റ്റാർട്ട്' : 'Restart'}
            </Button>
          </div>
        </div>

        {/* Main Game Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Panel: Hold & Helper Tools */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
            {/* Hold Card */}
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-amber-200/70 shadow-sm text-center">
              <span className="text-xs font-bold text-dark-brown/70 uppercase tracking-wider block mb-2">
                {ml ? 'ഹോൾഡ് (C)' : 'HOLD PIECE (C)'}
              </span>
              <div className="w-24 h-24 mx-auto bg-slate-900/5 rounded-xl border border-amber-200/50 flex items-center justify-center p-2">
                {holdPiece ? (
                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${holdPiece.shape[0].length}, minmax(0, 1fr))` }}>
                    {holdPiece.shape.map((row, rIdx) =>
                      row.map((cell, cIdx) => (
                        <div
                          key={`hold-${rIdx}-${cIdx}`}
                          className={`w-4 h-4 rounded-xs ${cell ? holdPiece.color : 'bg-transparent'}`}
                        />
                      ))
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-dark-brown/40 font-mono italic">
                    {ml ? 'ശൂന്യം' : 'Empty'}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHold}
                disabled={!canHold}
                className="mt-2 text-xs w-full text-deep-red hover:bg-deep-red/10"
              >
                {ml ? 'ഹോൾഡ് ചെയ്യുക' : 'Hold Current'}
              </Button>
            </div>

            {/* Easy Mode Super Helpers */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase">
                <Sparkles className="w-4 h-4 text-warm-orange" />
                {ml ? 'ഈസി സഹായങ്ങൾ' : 'Easy Helpers'}
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={useMagicStar}
                className="w-full text-xs justify-start border-amber-300 bg-white/80 hover:bg-amber-100 text-dark-brown"
              >
                <Wand2 className="w-3.5 h-3.5 mr-2 text-amber-600" />
                {ml ? '⭐ സിംഗിൾ സ്റ്റാർ (1x1)' : '⭐ Single Star (1x1)'}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={settleGravity}
                className="w-full text-xs justify-start border-amber-300 bg-white/80 hover:bg-amber-100 text-dark-brown"
              >
                <ArrowDown className="w-3.5 h-3.5 mr-2 text-deep-red" />
                {ml ? '⬇️ ഗ്യാപ്പുകൾ നികത്തുക' : '⬇️ Settle & Fill Gaps'}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={handleUndo}
                disabled={history.length === 0}
                className="w-full text-xs justify-start border-amber-300 bg-white/80 hover:bg-amber-100 text-dark-brown"
              >
                <Undo2 className="w-3.5 h-3.5 mr-2 text-dark-brown/70" />
                {ml ? '↩️ തിരികെ എടുക്കുക (Undo)' : '↩️ Undo Drop (Z)'}
              </Button>
            </div>

            {/* Keyboard Guide */}
            <div className="bg-white/80 p-3.5 rounded-2xl border border-amber-200/50 text-[11px] text-dark-brown/70 space-y-1.5">
              <span className="font-bold text-dark-brown block mb-1">
                {ml ? 'കീബോർഡ് കൺട്രോളുകൾ:' : 'Keyboard Controls:'}
              </span>
              <div className="flex justify-between"><span>← / → :</span><span>{ml ? 'നീക്കുക' : 'Move'}</span></div>
              <div className="flex justify-between"><span>↑ / W :</span><span>{ml ? 'തിരിക്കുക' : 'Rotate'}</span></div>
              <div className="flex justify-between"><span>↓ / S :</span><span>{ml ? 'താഴേക്ക്' : 'Soft Drop'}</span></div>
              <div className="flex justify-between"><span>Space :</span><span>{ml ? 'പെട്ടെന്ന് താഴെയിടുക' : 'Hard Drop'}</span></div>
              <div className="flex justify-between"><span>C / Shift :</span><span>{ml ? 'ഹോൾഡ്' : 'Hold Piece'}</span></div>
            </div>
          </div>

          {/* Center: The Tetris Poster Board */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Live Progress Bar */}
            <div className="w-full max-w-[340px] sm:max-w-[380px] mb-3">
              <div className="flex items-center justify-between text-xs font-bold text-dark-brown mb-1 px-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-deep-red" />
                  {ml ? 'തുറന്ന ഭാഗം:' : 'Revealed:'} {filledCount} / {TOTAL_CELLS}
                </span>
                <span className="font-mono text-deep-red text-sm font-black">
                  {percentComplete}%
                </span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-amber-300 shadow-inner p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-sun-primary via-warm-orange to-deep-red rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>

            {/* The Game Board Matrix */}
            <div className="relative p-2 sm:p-3 rounded-2xl sm:rounded-3xl bg-dark-brown shadow-warm-xl border-4 border-amber-400">
              
              {/* Board Container with 4:5 aspect ratio */}
              <div
                className="relative w-[288px] h-[360px] sm:w-[336px] sm:h-[420px] rounded-xl overflow-hidden bg-slate-950 select-none shadow-2xl"
              >
                {/* Grid Overlay */}
                <div
                  className="absolute inset-0 grid"
                  style={{
                    gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: ROWS }).map((_, r) =>
                    Array.from({ length: COLS }).map((_, c) => {
                      const isCellFilled = grid[r][c];

                      // Is falling piece occupying this cell?
                      const pieceR = r - currentY;
                      const pieceC = c - currentX;
                      const isCurrentPieceCell =
                        !isCellFilled &&
                        pieceR >= 0 &&
                        pieceR < currentPiece.shape.length &&
                        pieceC >= 0 &&
                        pieceC < currentPiece.shape[pieceR].length &&
                        currentPiece.shape[pieceR][pieceC] === 1;

                      // Is ghost piece occupying this cell?
                      const ghostPieceR = r - ghostY;
                      const isGhostCell =
                        !isCellFilled &&
                        !isCurrentPieceCell &&
                        ghostPieceR >= 0 &&
                        ghostPieceR < currentPiece.shape.length &&
                        pieceC >= 0 &&
                        pieceC < currentPiece.shape[ghostPieceR].length &&
                        currentPiece.shape[ghostPieceR][pieceC] === 1;

                      // Full row celebration flash
                      const isCelebrating = celebrationRow === r;

                      return (
                        <div
                          key={`cell-${r}-${c}`}
                          data-testid={`cell-${r}-${c}`}
                          data-locked={isCellFilled ? 'true' : 'false'}
                          data-falling={isCurrentPieceCell ? 'true' : 'false'}
                          data-ghost={isGhostCell ? 'true' : 'false'}
                          className={`relative overflow-hidden transition-colors duration-150 ${
                            isWon
                              ? 'border border-transparent'
                              : isCellFilled
                              ? `border border-white/20 ${isCelebrating ? 'ring-2 ring-amber-300 ring-inset' : ''}`
                              : isCurrentPieceCell
                              ? `${currentPiece.color} ${currentPiece.borderColor} border-2 shadow-sm ring-1 ring-white/60`
                              : isGhostCell
                              ? 'border-2 border-dashed border-amber-300/80 bg-slate-900'
                              : 'bg-slate-950 border border-slate-900 flex items-center justify-center'
                          }`}
                        >
                          {/* Poster slice: RENDERED EXCLUSIVELY WHEN PERMANENTLY LOCKED */}
                          {isCellFilled && (
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                              <img
                                src="/images/tetris-poster.jpg"
                                alt=""
                                className="absolute max-w-none select-none pointer-events-none"
                                style={{
                                  width: `${COLS * 100}%`,
                                  height: `${ROWS * 100}%`,
                                  left: `${-c * 100}%`,
                                  top: `${-r * 100}%`,
                                  objectFit: 'fill',
                                }}
                                draggable={false}
                              />
                              {/* Grid border above image */}
                              <div className={`absolute inset-0 pointer-events-none ${isWon ? 'border-transparent' : 'border border-white/20'}`} />
                            </div>
                          )}

                          {/* Unfilled subtle puzzle dot for empty cells */}
                          {!isCellFilled && !isCurrentPieceCell && !isGhostCell && !isWon && (
                            <div className="w-1 h-1 rounded-full bg-slate-800 pointer-events-none" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Victory Full-Cover Overlay when 100% complete */}
                {isWon && (
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/90 via-transparent to-transparent flex flex-col justify-end p-4 text-center animate-in fade-in zoom-in-95 duration-700">
                    <Badge className="bg-amber-400 text-dark-brown self-center mb-1 text-xs font-black shadow-lg">
                      🎉 100% COMPLETED!
                    </Badge>
                    <h3 className="text-lg font-black text-white drop-shadow-md">
                      {ml ? 'പോസ്റ്റർ പൂർണ്ണമായി തുറന്നു!' : 'Poster Unlocked!'}
                    </h3>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Touch Controls */}
            <div className="w-full max-w-[340px] sm:max-w-[380px] mt-4 flex flex-col gap-2">
              {/* Row 1: Left, Rotate, Right */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => moveHorizontally(-1)}
                  className="h-14 rounded-2xl bg-white border-2 border-amber-300 shadow-sm active:scale-95 text-dark-brown hover:bg-amber-50"
                  aria-label="Move Left"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <Button
                  size="lg"
                  onClick={rotatePiece}
                  className="h-14 rounded-2xl bg-amber-400 hover:bg-amber-500 text-dark-brown font-bold border-2 border-amber-500 shadow-sm active:scale-95"
                  aria-label="Rotate Piece"
                >
                  <RotateCw className="w-6 h-6 mr-1" />
                  <span className="text-xs">{ml ? 'തിരിക്കുക' : 'Rotate'}</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => moveHorizontally(1)}
                  className="h-14 rounded-2xl bg-white border-2 border-amber-300 shadow-sm active:scale-95 text-dark-brown hover:bg-amber-50"
                  aria-label="Move Right"
                >
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </div>

              {/* Row 2: Soft Drop, Hard Drop, Hold/Magic */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={dropStep}
                  className="h-14 rounded-2xl bg-white border-2 border-amber-300 shadow-sm active:scale-95 text-dark-brown hover:bg-amber-50"
                  aria-label="Soft Drop"
                >
                  <ArrowDown className="w-6 h-6 mr-1 text-deep-red" />
                  <span className="text-xs">{ml ? 'താഴേക്ക്' : 'Down'}</span>
                </Button>
                <Button
                  size="lg"
                  onClick={hardDrop}
                  className="h-14 rounded-2xl bg-deep-red hover:bg-deep-red/90 text-white font-bold shadow-sm active:scale-95"
                  aria-label="Hard Drop"
                >
                  <Zap className="w-6 h-6 mr-1" />
                  <span className="text-xs">{ml ? 'സ്ലാം' : 'Drop'}</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={useMagicStar}
                  className="h-14 rounded-2xl bg-white border-2 border-amber-300 shadow-sm active:scale-95 text-dark-brown hover:bg-amber-50"
                  aria-label="Star Helper"
                >
                  <Sparkles className="w-5 h-5 mr-1 text-warm-orange" />
                  <span className="text-xs">{ml ? 'സ്റ്റാർ' : 'Star (1x1)'}</span>
                </Button>
              </div>

              {/* Mobile quick actions: Settle & Undo */}
              <div className="grid grid-cols-2 gap-2 mt-1 sm:hidden">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={settleGravity}
                  className="rounded-xl border-amber-300 bg-white/90 text-xs py-2"
                >
                  <ArrowDown className="w-3.5 h-3.5 mr-1 text-deep-red" />
                  {ml ? 'ഗ്യാപ്പ് നികത്തൂ' : 'Settle Gaps'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleUndo}
                  disabled={history.length === 0}
                  className="rounded-xl border-amber-300 bg-white/90 text-xs py-2"
                >
                  <Undo2 className="w-3.5 h-3.5 mr-1" />
                  {ml ? 'Undo' : 'Undo'}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel: Next Piece, Stats & Info */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Next Piece Card */}
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-amber-200/70 shadow-sm text-center">
              <span className="text-xs font-bold text-dark-brown/70 uppercase tracking-wider block mb-2">
                {ml ? 'അടുത്ത ബ്ലോക്ക്' : 'NEXT PIECE'}
              </span>
              <div className="w-24 h-24 mx-auto bg-slate-900/5 rounded-xl border border-amber-200/50 flex items-center justify-center p-2">
                <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, minmax(0, 1fr))` }}>
                  {nextPiece.shape.map((row, rIdx) =>
                    row.map((cell, cIdx) => (
                      <div
                        key={`next-${rIdx}-${cIdx}`}
                        className={`w-4 h-4 rounded-xs ${cell ? nextPiece.color : 'bg-transparent'}`}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Score & Stats Card */}
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-amber-200/70 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-amber-100 pb-2">
                <span className="text-dark-brown/70">{ml ? 'പോയിന്റുകൾ:' : 'Score:'}</span>
                <span className="font-mono font-bold text-dark-brown text-base">{score}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-amber-100 pb-2">
                <span className="text-dark-brown/70">{ml ? 'ബ്ലോക്കുകൾ:' : 'Pieces Dropped:'}</span>
                <span className="font-mono font-bold text-dark-brown">{piecesPlaced}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-dark-brown/70">{ml ? 'ശേഷിക്കുന്നത്:' : 'Remaining Cells:'}</span>
                <span className="font-mono font-bold text-deep-red">{TOTAL_CELLS - filledCount}</span>
              </div>
            </div>

            {/* Event Summary Box */}
            <div className="bg-gradient-to-br from-warm-cream to-white p-4 rounded-2xl border border-amber-300 shadow-sm space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-deep-red">
                <Calendar className="w-4 h-4" />
                <span>{ml ? 'സമ്മേളന വിവരം' : 'Conference Details'}</span>
              </div>
              <p className="font-bold text-dark-brown">
                {ml ? 'ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം' : 'Balasangham Kannur District Conference'}
              </p>
              <p className="text-dark-brown/75">
                {ml ? '2026 ഒക്ടോബർ 10, 11 • കല്ല്യാശ്ശേരി PCR ബാങ്ക് ഓഡിറ്റോറിയം' : 'October 10, 11, 2026 • PCR Bank Auditorium, Kalliasseri'}
              </p>
              <Link
                to="/events/kannur-conference-2026"
                className="inline-block text-deep-red font-semibold hover:underline pt-1"
              >
                {ml ? 'കൂടുതൽ വിവരങ്ങൾ വായിക്കൂ →' : 'Read Event Details →'}
              </Link>
            </div>
          </div>
        </div>

        {/* Victory Celebration Modal / Banner */}
        {isWon && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl border-4 border-amber-400 relative overflow-hidden animate-in zoom-in-95 duration-400">
              {/* Confetti badge */}
              <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400 text-deep-red flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Trophy className="w-8 h-8 text-warm-orange animate-bounce" />
              </div>

              <Badge className="bg-deep-red text-white mb-2">
                {ml ? '🎉 വിജയം!' : '🎉 PUZZLE COMPLETED!'}
              </Badge>

              <h2 className={`text-2xl sm:text-3xl font-black text-dark-brown mb-2 ${ml ? 'font-malayalam' : ''}`}>
                {ml
                  ? 'അഭിനന്ദനങ്ങൾ! സമ്മേളന പോസ്റ്റർ അൺലോക്ക് ചെയ്തു!'
                  : 'Congratulations! Official Poster Revealed!'}
              </h2>

              <p className="text-sm text-dark-brown/70 mb-5">
                {ml
                  ? 'ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം 2026 ഒക്ടോബർ 10, 11 തീയതികളിൽ കല്ല്യാശ്ശേരിയിൽ നടക്കും.'
                  : 'All blocks successfully placed! You have unlocked the historic Balasangham Kannur District Conference 2026 poster.'}
              </p>

              {/* Poster Preview thumbnail */}
              <div className="max-w-[220px] mx-auto rounded-xl overflow-hidden shadow-warm-lg border-2 border-amber-300 mb-6">
                <img
                  src="/images/tetris-poster.jpg"
                  alt="Balasangham Kannur District Conference 2026 Official Poster"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="bg-deep-red hover:bg-deep-red/90 text-white rounded-full">
                  <a href="/images/tetris-poster.jpg" download="balasangham-conference-poster-2026.jpg">
                    <Download className="w-4 h-4 mr-2" />
                    {ml ? 'പോസ്റ്റർ ഡൗൺലോഡ്' : 'Download Poster'}
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={restartGame}
                  className="rounded-full border-amber-300 hover:bg-amber-100"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {ml ? 'വീണ്ടും കളിക്കുക' : 'Play Again'}
                </Button>

                <Button asChild variant="ghost" size="lg" className="rounded-full">
                  <Link to="/">
                    {ml ? 'ഹോം പേജിലേക്ക്' : 'Home'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
