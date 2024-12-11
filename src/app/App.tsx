import { Outlet } from 'react-router';
import { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';

function App() {
  const [useDarkTheme, setUseDarkTheme] = useState(false);

  function handleOnThemeChange(useDarkTheme: boolean): void {
    setUseDarkTheme(useDarkTheme);
  }

  return (
    <>
      <div className={`flex min-h-screen w-full ${useDarkTheme ? 'dark' : ''}`}>
        <div className="flex min-h-screen w-full bg-zinc-100 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
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