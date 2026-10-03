import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import { LeadershipPage } from './LeadershipPage';
import { LanguageToggle } from '../components/common/LanguageToggle';
import { kannurLeadership } from '../data/organizationData';

import { beforeEach } from 'vitest';

function TestWrapper() {
  return (
    <LanguageProvider>
      <MemoryRouter>
        <div>
          <LanguageToggle />
          <LeadershipPage />
        </div>
      </MemoryRouter>
    </LanguageProvider>
  );
}

describe('LeadershipPage Implementation & Requirements', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('renders section heading as exactly "Kannur District Committee" in English with no "2024–2026"', () => {
    render(<TestWrapper />);

    // Exact heading check
    const sectionHeading = screen.getByRole('heading', { level: 1, name: /^Kannur District Committee$/i });
    expect(sectionHeading).toBeInTheDocument();

    // Verify 2024-2026 does not appear in any heading or visible leadership section
    expect(screen.queryByText(/2024–2026/)).not.toBeInTheDocument();
    expect(screen.queryByText(/2024-2026/)).not.toBeInTheDocument();
  });

  it('renders section heading as "കണ്ണൂർ ജില്ലാ കമ്മിറ്റി" in Malayalam with no "2024–2026"', () => {
    render(<TestWrapper />);

    const mlButton = screen.getByRole('button', { name: 'മലയാളം' });
    fireEvent.click(mlButton);

    const sectionHeading = screen.getByRole('heading', { level: 1, name: /^കണ്ണൂർ ജില്ലാ കമ്മിറ്റി$/ });
    expect(sectionHeading).toBeInTheDocument();

    // Verify 2024-2026 is gone
    expect(screen.queryByText(/2024–2026/)).not.toBeInTheDocument();
    expect(screen.queryByText(/2024-2026/)).not.toBeInTheDocument();
  });

  it('references Cloudinary images for all supplied leadership photographs', () => {
    render(<TestWrapper />);

    const leadersWithPhotos = kannurLeadership.filter(l => l.photo);
    expect(leadersWithPhotos.length).toBe(8);

    leadersWithPhotos.forEach(leader => {
      expect(leader.photo?.secureUrl).toContain('res.cloudinary.com');
      expect(leader.photo?.publicId).toContain('balasangham/leadership/');
      expect(leader.photo?.format).toBeDefined();

      const img = screen.getByAltText(new RegExp(`${leader.name}`, 'i'));
      expect(img).toHaveAttribute('src', leader.photo?.secureUrl);
    });
  });

  it('preserves underlying committee member names and designations', () => {
    render(<TestWrapper />);

    expect(screen.getByRole('heading', { level: 3, name: /K\. Surya/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /M\.P\. Gokul/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /P\. Sumeshan Master/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Anuvind Ayithara/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Darshana Sanoj/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Amal Prem/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /K\.V\. Aadith/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Devika S\. Dev/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /T\. Satheesh Kumar/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /P\.K\. Sheela/i })).toBeInTheDocument();
  });
});
