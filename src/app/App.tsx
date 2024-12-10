import { Outlet } from 'react-router';
import { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';

function App() {
  const [useDarkTheme, setUseDarkTheme] = useState(false);

  function handleOnThemeChange(themeName: string): void {
    setUseDarkTheme(themeName === 'Dark');
  }

  return (
    <>
      <div className={`flex min-h-screen w-full ${useDarkTheme ? 'dark' : ''}`}>
        <div className="flex min-h-screen w-full bg-neutral-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
          <Navbar onChangeTheme={handleOnThemeChange} />
          <main className="flex-1 overflow-hidden p-8 pt-20">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;