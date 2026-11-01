import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowDown,
  Sparkles,
  Trophy,
  Download,
  Calendar,
  Undo2,
  Wand2,
} from 'lucide-react';
import {
  COLS,
  ROWS,
  TOTAL_CELLS,
  SHAPES,
  type PieceType,
  type ShapeMatrix,
  useTetrisEngine,
} from './useTetrisEngine';
import { TetrisBoard } from './TetrisBoard';
import { TetrisControls } from './TetrisControls';

export { COLS, ROWS, TOTAL_CELLS, SHAPES, type PieceType, type ShapeMatrix };

export const PosterTetris: React.FC = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const {
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
  } = useTetrisEngine(canvasRef);

  return (
    <div className="relative flex flex-col items-center p-1 sm:p-3">
      {/* Canvas for full-screen confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      <div className="w-full max-w-4xl mx-auto">
        {/* Top Header Card */}
        <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 bg-white/90 backdrop-blur-md p-2.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-warm border border-amber-200/60 mb-2 sm:mb-4">
          <div className="text-left">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Badge variant="default" className="bg-deep-red text-white text-[10px] sm:text-[11px] py-0 px-1.5 sm:px-2">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                {ml ? 'ഈസി മോഡ് • പോസ്റ്റർ പസിൽ' : 'EASY MODE • POSTER REVEAL'}
              </Badge>
              <Badge variant="outline" className="border-amber-400 text-amber-800 bg-amber-50 text-[10px] sm:text-[11px] py-0 px-1.5 sm:px-2">
                8×10 {ml ? 'ഗ്രിഡ്' : 'Grid'}
              </Badge>
            </div>
            <h1 className={`text-sm sm:text-xl font-black text-dark-brown leading-tight ${ml ? 'font-malayalam' : ''}`}>
              {ml
                ? 'ടെട്രിസ് കളിച്ച് ജില്ലാ സമ്മേളന പോസ്റ്റർ തുറക്കൂ!'
                : 'Tetris Poster Reveal Challenge'}
            </h1>
            <p className="hidden sm:block text-xs text-dark-brown/70 mt-0.5">
              {ml
                ? 'ബ്ലോക്കുകൾ സ്ഥിരമായി നിലനിൽക്കും. എല്ലാ ബ്ലോക്കുകളും നിറച്ച് പൂർണ്ണ പോസ്റ്റർ കാണൂ!'
                : 'Blocks stay permanent when they land! Fill all 80 cells to reveal the official conference poster.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSound}
              className="rounded-full w-7 h-7 sm:w-8 sm:h-8 p-0 border-amber-200 hover:bg-amber-100"
              title={soundMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {soundMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-dark-brown/60" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-deep-red" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="rounded-full px-2 sm:px-3 py-1 h-7 sm:h-8 text-[11px] sm:text-xs border-amber-200 hover:bg-amber-100"
            >
              {isPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-0.5 sm:mr-1" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-0.5 sm:mr-1" />}
              {isPlaying ? (ml ? 'പോസ്' : 'Pause') : (ml ? 'തുടങ്ങൂ' : 'Resume')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={restartGame}
              className="rounded-full px-2 sm:px-3 py-1 h-7 sm:h-8 text-[11px] sm:text-xs border-amber-200 hover:bg-amber-100"
              title="Restart Game"
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-0.5 sm:mr-1" />
              <span className="hidden sm:inline">{ml ? 'റീസ്റ്റാർട്ട്' : 'Restart'}</span>
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
            {/* Mobile Top HUD */}
            <div className="w-full max-w-[340px] sm:max-w-[380px] mb-2 lg:hidden flex items-center justify-between gap-2 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-amber-200/60 shadow-xs">
              <button
                type="button"
                onClick={handleHold}
                disabled={!canHold}
                className={`flex items-center gap-1.5 text-left transition-transform ${canHold ? 'active:scale-95' : 'opacity-70 cursor-not-allowed'}`}
                title={ml ? 'ഹോൾഡ് (Hold)' : 'Hold Piece'}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900/5 border border-amber-200/80 flex items-center justify-center p-0.5 shrink-0">
                  {holdPiece ? (
                    <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${holdPiece.shape[0].length}, minmax(0, 1fr))` }}>
                      {holdPiece.shape.map((row, rIdx) =>
                        row.map((cell, cIdx) => (
                          <div
                            key={`m-hold-${rIdx}-${cIdx}`}
                            className={`w-1.5 h-1.5 rounded-xs ${cell ? holdPiece.color : 'bg-transparent'}`}
                          />
                        ))
                      )}
                    </div>
                  ) : (
                    <span className="text-[9px] text-dark-brown/40 font-mono font-bold">H</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold text-dark-brown/60 leading-none">Hold</span>
                  <span className="text-[10px] font-bold text-deep-red leading-tight">{canHold ? (ml ? 'ഹോൾഡ്' : 'Tap') : '—'}</span>
                </div>
              </button>

              <div className="flex-1 px-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-dark-brown mb-0.5">
                  <span className="flex items-center gap-1 text-[10px]">
                    <Sparkles className="w-2.5 h-2.5 text-deep-red" />
                    {filledCount}/{TOTAL_CELLS}
                  </span>
                  <span className="font-mono text-deep-red text-xs font-black">
                    {percentComplete}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-amber-300 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-sun-primary via-warm-orange to-deep-red rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${percentComplete}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-[9px] uppercase font-bold text-dark-brown/60 leading-none">Next</span>
                  <span className="text-[10px] font-bold text-dark-brown leading-tight">{ml ? 'അടുത്തത്' : 'Next'}</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-900/5 border border-amber-200/80 flex items-center justify-center p-0.5 shrink-0">
                  <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, minmax(0, 1fr))` }}>
                    {nextPiece.shape.map((row, rIdx) =>
                      row.map((cell, cIdx) => (
                        <div
                          key={`m-next-${rIdx}-${cIdx}`}
                          className={`w-1.5 h-1.5 rounded-xs ${cell ? nextPiece.color : 'bg-transparent'}`}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Progress Bar */}
            <div className="hidden lg:block w-full max-w-[340px] sm:max-w-[380px] mb-3">
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
            <div className="relative p-2 sm:p-3 rounded-2xl sm:rounded-3xl bg-dark-brown shadow-warm-xl border-4 border-amber-400 w-fit mx-auto flex flex-col items-center">
              <TetrisBoard
                grid={grid}
                currentPiece={currentPiece}
                currentX={currentX}
                currentY={currentY}
                ghostY={ghostY}
                celebrationRow={celebrationRow}
                isWon={isWon}
                ml={ml}
              />

              <TetrisControls
                ml={ml}
                canUndo={history.length > 0}
                onMoveLeft={() => moveHorizontally(-1)}
                onMoveRight={() => moveHorizontally(1)}
                onRotate={rotatePiece}
                onSoftDrop={dropStep}
                onHardDrop={hardDrop}
                onMagicStar={useMagicStar}
                onSettle={settleGravity}
                onUndo={handleUndo}
              />
            </div>
          </div>

          {/* Right Panel: Next Piece & Stats */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Next Piece Card (Desktop Only) */}
            <div className="hidden lg:block bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-amber-200/70 shadow-sm text-center">
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

        {/* Victory Celebration Modal */}
        {isWon && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl border-4 border-amber-400 relative overflow-hidden animate-in zoom-in-95 duration-400">
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

              <div className="max-w-[220px] mx-auto rounded-xl overflow-hidden shadow-warm-lg border-2 border-amber-300 mb-6">
                <img
                  src="/images/tetris-poster.jpg"
                  alt="Balasangham Kannur District Conference 2026 Official Poster"
                  className="w-full h-auto object-cover"
                />
              </div>

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
