import React from 'react';
import { Button } from '../ui/button';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  RotateCw,
  Zap,
  Wand2,
  Undo2,
} from 'lucide-react';

interface TetrisControlsProps {
  ml: boolean;
  canUndo: boolean;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onRotate: () => void;
  onSoftDrop: () => void;
  onHardDrop: () => void;
  onMagicStar: () => void;
  onSettle: () => void;
  onUndo: () => void;
}

export const TetrisControls: React.FC<TetrisControlsProps> = ({
  ml,
  canUndo,
  onMoveLeft,
  onMoveRight,
  onRotate,
  onSoftDrop,
  onHardDrop,
  onMagicStar,
  onSettle,
  onUndo,
}) => {
  return (
    <>
      {/* Desktop Compact Control Bar */}
      <div className="hidden lg:flex items-center justify-center gap-1.5 mt-2.5 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-200/70 shadow-xs w-full max-w-[336px]">
        <Button
          size="sm"
          variant="ghost"
          onClick={onMoveLeft}
          className="h-8 w-9 p-0 rounded-full text-dark-brown hover:bg-amber-100"
          title="Move Left (← / A)"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onRotate}
          className="h-8 px-2.5 rounded-full text-xs text-dark-brown hover:bg-amber-100 font-semibold flex items-center gap-1"
          title="Rotate (↑ / W)"
        >
          <RotateCw className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-[11px]">{ml ? 'തിരിക്കുക' : 'Rotate'}</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onMoveRight}
          className="h-8 w-9 p-0 rounded-full text-dark-brown hover:bg-amber-100"
          title="Move Right (→ / D)"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
        <div className="w-px h-4 bg-amber-200 mx-1" />
        <Button
          size="sm"
          variant="ghost"
          onClick={onSoftDrop}
          className="h-8 w-9 p-0 rounded-full text-dark-brown hover:bg-amber-100"
          title="Soft Drop (↓ / S)"
        >
          <ArrowDown className="w-4 h-4 text-deep-red" />
        </Button>
        <Button
          size="sm"
          variant="default"
          onClick={onHardDrop}
          className="h-8 px-2.5 rounded-full text-xs bg-deep-red hover:bg-deep-red/90 text-white font-bold shadow-xs active:scale-95 flex items-center gap-1"
          title="Hard Drop (Space)"
        >
          <Zap className="w-3.5 h-3.5" />
          <span className="text-[11px]">{ml ? 'സ്ലാം' : 'Drop'}</span>
        </Button>
      </div>

      {/* Mobile Touch Controls */}
      <div className="w-full max-w-[340px] sm:max-w-[380px] mt-2.5 flex flex-col gap-1.5 lg:hidden">
        {/* Row 1: Left, Rotate, Right */}
        <div className="grid grid-cols-3 gap-1.5">
          <Button
            size="lg"
            variant="outline"
            onClick={onMoveLeft}
            className="h-11 sm:h-12 rounded-xl bg-white border-2 border-amber-300 shadow-xs active:scale-95 text-dark-brown hover:bg-amber-50"
            aria-label="Move Left"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            size="lg"
            onClick={onRotate}
            className="h-11 sm:h-12 rounded-xl bg-amber-400 hover:bg-amber-500 text-dark-brown font-bold border-2 border-amber-500 shadow-xs active:scale-95 flex items-center justify-center gap-1"
            aria-label="Rotate Piece"
          >
            <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs">{ml ? 'തിരിക്കുക' : 'Rotate'}</span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onMoveRight}
            className="h-11 sm:h-12 rounded-xl bg-white border-2 border-amber-300 shadow-xs active:scale-95 text-dark-brown hover:bg-amber-50"
            aria-label="Move Right"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Row 2: Soft Drop & Hard Drop */}
        <div className="grid grid-cols-2 gap-1.5">
          <Button
            size="lg"
            variant="outline"
            onClick={onSoftDrop}
            className="h-11 sm:h-12 rounded-xl bg-white border-2 border-amber-300 shadow-xs active:scale-95 text-dark-brown hover:bg-amber-50 flex items-center justify-center gap-1 font-bold text-xs"
            aria-label="Soft Drop"
          >
            <ArrowDown className="w-4 h-4 text-deep-red" />
            <span>{ml ? 'താഴേക്ക്' : 'Down'}</span>
          </Button>
          <Button
            size="lg"
            variant="default"
            onClick={onHardDrop}
            className="h-11 sm:h-12 rounded-xl bg-deep-red hover:bg-deep-red/90 text-white font-black shadow-festive active:scale-95 flex items-center justify-center gap-1.5 text-xs"
            aria-label="Hard Drop"
          >
            <Zap className="w-4 h-4" />
            <span>{ml ? 'സ്ലാം ഡ്രോപ്പ്' : 'Hard Drop'}</span>
          </Button>
        </div>

        {/* Row 3: Super Helpers for mobile */}
        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
          <Button
            size="sm"
            variant="outline"
            onClick={onMagicStar}
            className="h-9 px-1 rounded-lg text-[10px] sm:text-xs border-amber-300 bg-amber-50 hover:bg-amber-100 text-dark-brown font-bold flex items-center justify-center gap-1"
            aria-label="Star Helper"
          >
            <Wand2 className="w-3 h-3 text-amber-600 shrink-0" />
            <span>{ml ? 'സ്റ്റാർ (1×1)' : 'Star (1×1)'}</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onSettle}
            className="h-9 px-1 rounded-lg text-[10px] sm:text-xs border-amber-300 bg-amber-50 hover:bg-amber-100 text-dark-brown font-bold flex items-center justify-center gap-1"
            aria-label="Settle Gaps"
          >
            <ArrowDown className="w-3 h-3 text-deep-red shrink-0" />
            <span>{ml ? 'ഗ്യാപ്പുകൾ' : 'Settle'}</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onUndo}
            disabled={!canUndo}
            className="h-9 px-1 rounded-lg text-[10px] sm:text-xs border-amber-300 bg-amber-50 hover:bg-amber-100 text-dark-brown font-bold flex items-center justify-center gap-1 disabled:opacity-40"
            aria-label="Undo Drop"
          >
            <Undo2 className="w-3 h-3 text-dark-brown/70 shrink-0" />
            <span>{ml ? 'Undo' : 'Undo'}</span>
          </Button>
        </div>
      </div>
    </>
  );
};
