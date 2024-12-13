import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export enum Theme {
  System = 'System',
  Light = 'Light',
  Dark = 'Dark'
}

export const ThemeIcon = ({ theme }: { theme: Theme }) => {
  if (theme === Theme.Dark) {
    return <MoonIcon className="h-6 stroke-zinc-900 dark:stroke-zinc-50" data-testid="moon-icon" />;
  } else if (theme === Theme.Light) {
    return <SunIcon className="h-6 stroke-zinc-900 dark:stroke-zinc-50" data-testid="sun-icon" />;
  } else {
    return <ComputerDesktopIcon className="h-6 stroke-zinc-900 dark:stroke-zinc-50" data-testid="computer-desktop-icon" />;
  }
};