import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { FindMyPhotos } from './FindMyPhotos';

describe('FindMyPhotos', () => {
  it('renders privacy notice and native camera trigger', () => {
    render(
      <LanguageProvider>
        <FindMyPhotos />
      </LanguageProvider>
    );

    expect(screen.getByText(/Find My Event Photos|എന്റെ ഫോട്ടോകൾ കണ്ടെത്തുക/i)).toBeInTheDocument();
    expect(screen.getByText(/100% On-Device Facial Comparison|ഡിവൈസിൽ മാത്രമുള്ള/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Take Selfie|സെൽഫിയെടുക്കുക|USE SAMPLE REFERENCE/i })).toBeInTheDocument();
  });

  it('progresses to results step when reference photo is selected', async () => {
    render(
      <LanguageProvider>
        <FindMyPhotos />
      </LanguageProvider>
    );

    const demoBtn = screen.getByRole('button', { name: /USE SAMPLE REFERENCE|സാമ്പിൾ റെഫറൻസ്/i });
    fireEvent.click(demoBtn);

    expect(screen.getByRole('button', { name: /START LOCAL RECOGNITION SEARCH|തിരച്ചിൽ ആരംഭിക്കുക/i })).toBeInTheDocument();
  });
});
