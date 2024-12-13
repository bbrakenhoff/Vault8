import { fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import { Simulate } from 'react-dom/test-utils';
import { act } from 'react';
import { vi } from 'vitest';

describe('Navbar Component', () => {
  let mockOnChangeTheme: ReturnType<typeof vi.fn>;

  let localStorageOriginal: Storage;

  const dropdownButton = () => screen.queryByTestId('dropdown-button');
  const darkThemeButton = () => screen.queryByTestId('dark-theme-button');
  const lightThemeButton = () => screen.queryByTestId('light-theme-button');
  const systemThemeButton = () => screen.queryByTestId('system-theme-button');

  beforeEach(() => {
    mockOnChangeTheme = vi.fn();
    localStorageOriginal = globalThis.localStorage;

    // Mock localStorage
    const storage = new Map<string, string>();
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => storage.get(key) || null),
        setItem: vi.fn((key: string, value: string) => storage.set(key, value)),
        clear: vi.fn(() => storage.clear())
      },
      writable: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(globalThis, 'localStorage', { value: localStorageOriginal });
  });

  test('renders without crashing', () => {
    render(<Navbar onChangeTheme={mockOnChangeTheme} />);
    expect(screen.getByText('Vault8')).toBeInTheDocument();
  });

  test('toggles the theme dropdown on button click', () => {
    render(<Navbar onChangeTheme={mockOnChangeTheme} />);
    fireEvent.click(dropdownButton());
    expect(darkThemeButton()).toBeInTheDocument();

    fireEvent.click(dropdownButton());
    expect(darkThemeButton()).not.toBeInTheDocument();
  });

  test('calls onChangeTheme and updates localStorage when changing theme', () => {
    render(<Navbar onChangeTheme={mockOnChangeTheme} />);
    fireEvent.click(dropdownButton());
    fireEvent.click(darkThemeButton());

    expect(mockOnChangeTheme).toHaveBeenCalledWith(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'Dark');
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  test('reacts to system theme changes when set to system theme', () => {
    const originalMatchMedia = globalThis.matchMedia;
    Object.defineProperty(globalThis, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    });

    render(<Navbar onChangeTheme={mockOnChangeTheme} />);

    expect(screen.getByText('System')).toBeInTheDocument();
    const event = new MediaQueryListEvent('change', { matches: true });
    globalThis.matchMedia('(prefers-color-scheme: dark)').dispatchEvent(event);

    expect(mockOnChangeTheme).not.toHaveBeenCalledWith(true);

    Object.defineProperty(globalThis, 'matchMedia', { value: originalMatchMedia });
  });

  test('renders the correct initial theme from localStorage', () => {
    localStorage.setItem('theme', 'Dark');
    render(<Navbar onChangeTheme={mockOnChangeTheme} />);
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  test('closes dropdown after selecting a theme', () => {
    render(<Navbar onChangeTheme={mockOnChangeTheme} />);
    fireEvent.click(dropdownButton());
    fireEvent.click(darkThemeButton());

    expect(screen.queryByText('Light')).not.toBeInTheDocument();
  });
});