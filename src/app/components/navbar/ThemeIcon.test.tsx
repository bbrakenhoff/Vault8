import { Theme, ThemeIcon } from './ThemeIcon.tsx';
import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

describe('ThemeIcon', () => {
  test('renders MoonIcon for Dark theme', async () => {
    const { getByTestId } = render(<ThemeIcon theme={Theme.Dark} />);
    await expect(getByTestId('moon-icon')).toBeTruthy()
  });

  test('renders SunIcon for Light theme', async () => {
    const { getByTestId } = render(<ThemeIcon theme={Theme.Light} />);
    await expect(getByTestId('sun-icon')).toBeTruthy()
  });

  test('renders ComputerDesktopIcon for System theme', async () => {
    const { getByTestId } = render(<ThemeIcon theme={Theme.System} />);
    await expect(getByTestId('computer-desktop-icon')).toBeTruthy();
  });

  test('renders ComputerDesktopIcon for invalid theme', async () => {
    const { getByTestId } = render(<ThemeIcon theme={'Invalid'} />);
    await expect(getByTestId('computer-desktop-icon')).toBeTruthy();
  });
});