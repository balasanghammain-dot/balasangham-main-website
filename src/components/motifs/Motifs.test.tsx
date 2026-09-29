import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RedStarIcon } from './RedStarIcon';
import { BalasanghamFlag } from './BalasanghamFlag';
import { PeaceDove } from './PeaceDove';
import { BackdropSunburst } from './BackdropSunburst';

describe('Brand Motifs', () => {
  it('renders RedStarIcon with proper fill color and accessibility title', () => {
    const { container } = render(<RedStarIcon className="w-8 h-8" title="Balasangham Red Star" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-label', 'Balasangham Red Star');
  });

  it('renders BalasanghamFlag with white rectangular body and central red star', () => {
    const { container } = render(<BalasanghamFlag className="w-12 h-8" />);
    const rect = container.querySelector('rect');
    const star = container.querySelector('polygon');
    expect(rect).toBeInTheDocument();
    expect(star).toBeInTheDocument();
  });

  it('renders PeaceDove and BackdropSunburst SVGs cleanly', () => {
    const { container: doveContainer } = render(<PeaceDove className="w-6 h-6" />);
    expect(doveContainer.querySelector('svg')).toBeInTheDocument();

    const { container: sunburstContainer } = render(<BackdropSunburst />);
    expect(sunburstContainer.querySelector('svg')).toBeInTheDocument();
  });
});
