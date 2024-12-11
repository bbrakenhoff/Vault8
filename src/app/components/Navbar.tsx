import { useEffect, useState } from 'react';
import { Theme, ThemeIcon } from './ThemeIcon.tsx';

interface NavbarProps {
  onChangeTheme: (useDarkTheme: boolean) => void;
}

export const Navbar = ({ onChangeTheme }: NavbarProps) => {
  const [currentTheme, setCurrentTheme] = useState(Theme.System);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const systemThemeMedia = window.matchMedia('(prefers-color-scheme: dark)');

  useEffect(() => {
    changeTheme(getThemeFromLocalstorage());

    const handleSystemThemeChange = () => {
      if (currentTheme === Theme.System) {
        changeTheme(Theme.System);
      }
    };

    systemThemeMedia.addEventListener('change', handleSystemThemeChange);

    return () => {
      systemThemeMedia.removeEventListener('change', handleSystemThemeChange);
    };
  }, [currentTheme]);

  const getThemeFromLocalstorage = () => {
    return (localStorage.getItem('theme') as Theme) ?? Theme.System;
  };

  const setThemeToLocalStorage = (theme: Theme) => {
    localStorage.setItem('theme', theme);
  };

  const toggleIsDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    setIsDropdownOpen(false);
    setThemeToLocalStorage(theme);

    if (theme === Theme.System) {
      onChangeTheme(systemThemeMedia.matches);
    } else {
      onChangeTheme(theme === Theme.Dark);
    }
  };

  const renderThemeDropdown = () => {
    if (isDropdownOpen) {
      return (
        <div className="absolute right-0 top-full mt-2 mr-2 w-48 rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          <div className="p-1">{renderDropdownItems()}</div>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderDropdownItems = () => {
    return Object.values(Theme).map((theme) => {
      return (
        <button
          key={theme}
          onClick={() => changeTheme(theme)}
          className="flex w-full items-center gap-3 rounded p-2 text-zinc-950 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800">
          <ThemeIcon theme={theme} />
          <span className="capitalize">{theme}</span>
        </button>
      );
    });
  };

  return (
    <nav className="absolute flex h-16 w-full justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-900 dark:bg-zinc-900">
      <div className="flex items-center gap-4">
        <img src="/vault8.png" alt="Logo" className="h-12 dark:fill-zinc-100" />
        <h1 className="m-0 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Vault8</h1>
      </div>

      {/* Theme dropdown */}
      <div className="relative flex items-center">
        <button className="flex items-center p-3 cursor-pointer" onClick={toggleIsDropdownOpen}>
          <span className="mr-2">
            <ThemeIcon theme={currentTheme} />
          </span>
          <span className="flex items-center capitalize">{currentTheme}</span>
        </button>
      </div>
      {renderThemeDropdown()}
    </nav>
  );
};