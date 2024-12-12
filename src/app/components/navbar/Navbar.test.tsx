import { fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import { Simulate } from 'react-dom/test-utils';
import { act } from 'react';

describe('Navbar Component', () => {
  let mockOnChangeTheme: ReturnType<typeof vi.fn>;

  let localStorageMock: Storage;

  const dropdownButton = () => screen.queryByTestId('dropdown-button');
  const darkThemeButton = () => screen.queryByTestId('dark-theme-button');
  const lightThemeButton = () => screen.queryByTestId('light-theme-button');
  const systemThemeButton = () => screen.queryByTestId('system-theme-button');

  beforeEach(() => {
    mockOnChangeTheme = vi.fn();
    localStorageMock = globalThis.localStorage;

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
    Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });
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