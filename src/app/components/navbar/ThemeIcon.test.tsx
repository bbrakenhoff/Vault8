import { Theme, ThemeIcon } from './ThemeIcon.tsx';
import { render, screen } from '@testing-library/react';

describe('ThemeIcon', () => {
  test('renders MoonIcon for Dark theme', async () => {
    render(<ThemeIcon theme={Theme.Dark} />);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
  });

  test('renders SunIcon for Light theme', async () => {
    render(<ThemeIcon theme={Theme.Light} />);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
  });

  test('renders ComputerDesktopIcon for System theme', async () => {
    render(<ThemeIcon theme={Theme.System} />);
    expect(screen.getByTestId('computer-desktop-icon')).toBeInTheDocument()
  });

  test('renders ComputerDesktopIcon for invalid theme', async () => {
    // @ts-ignore
    render(<ThemeIcon theme={'Invalid'} />);
    expect(screen.getByTestId('computer-desktop-icon')).toBeInTheDocument()
  });
});