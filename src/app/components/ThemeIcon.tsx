import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export enum Theme {
  System = 'System',
  Light = 'Light',
  Dark = 'Dark'
}

export const ThemeIcon = ({ theme }: { theme: Theme }) => {
  if (theme === Theme.Dark) {
    return <MoonIcon className="stroke-zinc-900 dark:stroke-zinc-50 h-6" />;
  } else if (theme === Theme.Light) {
    return <SunIcon className="stroke-zinc-900 dark:stroke-zinc-50 h-6" />;
  } else {
    return <ComputerDesktopIcon className="stroke-zinc-900 dark:stroke-zinc-50 h-6" />;
  }
};