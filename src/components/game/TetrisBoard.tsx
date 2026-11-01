import React from 'react';
import { Badge } from '../ui/badge';
import { COLS, ROWS, PieceType } from './useTetrisEngine';

interface TetrisBoardProps {
  grid: boolean[][];
  currentPiece: PieceType;
  currentX: number;
  currentY: number;
  ghostY: number;
  celebrationRow: number | null;
  isWon: boolean;
  ml: boolean;
}

export const TetrisBoard: React.FC<TetrisBoardProps> = ({
  grid,
  currentPiece,
  currentX,
  currentY,
  ghostY,
  celebrationRow,
  isWon,
  ml,
}) => {
  return (
    <div
      className="relative w-[280px] h-[350px] sm:w-[336px] sm:h-[420px] rounded-xl overflow-hidden bg-slate-950 select-none shadow-2xl"
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
                    ? `${isCelebrating ? 'ring-2 ring-amber-300 ring-inset' : ''}`
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
                    <div className={`absolute inset-0 pointer-events-none ${isWon ? 'border-transparent' : 'border border-white/15'}`} />
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
  );
};
