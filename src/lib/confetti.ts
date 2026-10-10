// Lightweight Canvas Confetti Generator for Celebrations
export function launchConfetti(canvas: HTMLCanvasElement, durationMs: number = 3500) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const colors = ['#FFC928', '#D71920', '#FF9800', '#22C55E', '#3B82F6', '#EC4899', '#A855F7'];
  const particleCount = 120;
  
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    vRot: number;
    shape: 'rect' | 'circle' | 'star';
  }

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width * 0.5 + (Math.random() - 0.5) * 200,
      y: height * 0.4 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 18,
      vy: -Math.random() * 15 - 5,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      shape: Math.random() > 0.4 ? 'rect' : Math.random() > 0.5 ? 'circle' : 'star',
    });
  }

  const startTime = Date.now();
  let animId: number;

  function render() {
    const elapsed = Date.now() - startTime;
    if (elapsed > durationMs) {
      ctx?.clearRect(0, 0, width, height);
      return;
    }

    ctx?.clearRect(0, 0, width, height);
    const gravity = 0.35;
    const drag = 0.985;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += gravity;
      p.vx *= drag;
      p.vy *= drag;
      p.rotation += p.vRot;

      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'star') {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(
            Math.cos(((18 + i * 72) * Math.PI) / 180) * p.size,
            -Math.sin(((18 + i * 72) * Math.PI) / 180) * p.size
          );
          ctx.lineTo(
            Math.cos(((54 + i * 72) * Math.PI) / 180) * (p.size / 2),
            -Math.sin(((54 + i * 72) * Math.PI) / 180) * (p.size / 2)
          );
        }
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      }

      ctx.restore();
    });

    animId = requestAnimationFrame(render);
  }

  animId = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(animId);
    ctx?.clearRect(0, 0, width, height);
  };
}
