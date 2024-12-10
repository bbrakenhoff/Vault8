import { useEffect, useState } from 'react';
import iconMoon from '../../assets/icon-moon.svg';
import iconSun from '../../assets/icon-sun.svg';
import iconSystem from '../../assets/icon-system.svg';

interface Theme {
  name: string;
  icon: string;
}

const themes = {
  System: { name: 'System', icon: iconSystem } as Theme,
  Light: { name: 'Light', icon: iconSun } as Theme,
  Dark: { name: 'Dark', icon: iconMoon } as Theme
};

interface NavbarProps {
  onChangeTheme: (useDarkTheme: boolean) => void;
}

export const Navbar = ({ onChangeTheme }: NavbarProps) => {
  const [currentTheme, setCurrentTheme] = useState(themes.System);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const systemThemeMedia = window.matchMedia('(prefers-color-scheme: dark)');

  useEffect(() => {
    changeTheme(getThemeFromLocalstorage());

    const handleSystemThemeChange = () => {
      console.log(`🩷Bijoya - Navbar.tsx > 38 handleSystemThemeChange`);
      if (currentTheme === themes.System) {
        changeTheme(themes.System);
      }
    };

    systemThemeMedia.addEventListener('change', handleSystemThemeChange);

    return () => {
      systemThemeMedia.removeEventListener('change', handleSystemThemeChange);
    };
  }, [currentTheme]);

  const getThemeFromLocalstorage = () => {
    const themeName = localStorage.getItem('theme') ?? themes.System.name;
    // @ts-ignore
    return themes[themeName] ?? themes.System;
  };

  const setThemeToLocalStorage = (theme: Theme) => {
    localStorage.setItem('theme', theme.name);
  };

  const toggleIsDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const changeTheme = (theme: { name: string; icon: string }) => {
    setCurrentTheme(theme);
    setIsDropdownOpen(false);
    setThemeToLocalStorage(theme);
    console.log(`🩷Bijoya - Navbar.tsx > 62 changeTheme`, systemThemeMedia.matches, theme);

    if (theme === themes.System) {
      onChangeTheme(systemThemeMedia.matches);
    } else {
      onChangeTheme(theme === themes.Dark);
    }
  };

  const renderThemeDropdown = () => {
    if (isDropdownOpen) {
      return (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
          <div className="p-1">{renderDropdownItems()}</div>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderDropdownItems = () => {
    return Object.values(themes).map((theme) => {
      return (
        <button
          key={theme.name}
          onClick={() => changeTheme(theme)}
          className="flex w-full items-center gap-3 rounded p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700">
          <img className="block h-6 mr-2" src={theme.icon} alt={theme.name} />
          <span className="capitalize">{theme.name}</span>
        </button>
      );
    });
  };

  return (
    <nav className="absolute flex h-16 w-full justify-between border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center gap-4">
        <img src="/vault8.png" alt="Logo" className="h-12" />
        <h1 className="m-0 text-xl font-semibold text-neutral-900 dark:text-neutral-50">Vault8</h1>
      </div>

      {/* Theme dropdown */}
      <div className="relative flex items-center">
        <button className="flex items-center p-3 cursor-pointer" onClick={toggleIsDropdownOpen}>
          <span className="mr-2">
            <img src={currentTheme.icon} alt="Moon icon" className="h-6" />
          </span>
          <span className="flex items-center capitalize">{currentTheme.name}</span>
        </button>
      </div>
      {renderThemeDropdown()}
    </nav>
  );
};