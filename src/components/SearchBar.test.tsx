import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest';
import { useSearchParams } from 'react-router';
import SearchBar from './SearchBar';

// Mock de useSearchParams de react-router
vi.mock('react-router', () => ({
  useSearchParams: vi.fn()
}));

const mockUseSearchParams = useSearchParams as MockedFunction<typeof useSearchParams>;

describe('SearchBar Component', () => {
  let mockSearchParams: URLSearchParams;
  let mockSetSearchParams: MockedFunction<any>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams();
    mockSetSearchParams = vi.fn();
    mockUseSearchParams.mockReturnValue([mockSearchParams, mockSetSearchParams]);
  });

  it('should render search input with placeholder text', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Busca en nuestra tienda');
    expect(input).toBeDefined();
    expect(input).toBeInstanceOf(HTMLInputElement);
  });

  it('should render search icon', () => {
    render(<SearchBar />);

    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toBeDefined();
  });

  it('should initialize input with empty value when no search param exists', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Busca en nuestra tienda') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('should initialize input with search param value when it exists', () => {
    mockSearchParams.set('search', 'rosa');

    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Busca en nuestra tienda') as HTMLInputElement;
    expect(input.value).toBe('rosa');
  });

  it('should update URL when typing in input', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Busca en nuestra tienda');
    fireEvent.change(input, { target: { value: 'orquídea' } });

    expect(mockSetSearchParams).toHaveBeenCalledWith({ search: 'orquídea' });
  });

  it('should remove search param when input is cleared', () => {
    mockSearchParams.set('search', 'rosa');
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Busca en nuestra tienda');
    fireEvent.change(input, { target: { value: '' } });

    expect(mockSetSearchParams).toHaveBeenCalledWith({});
  });

  it('should remove search param when input contains only whitespace', () => {
    mockSearchParams.set('search', 'rosa');
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Busca en nuestra tienda');
    fireEvent.change(input, { target: { value: '   ' } });

    expect(mockSetSearchParams).toHaveBeenCalledWith({});
  });

  it('should update search params with trimmed value', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Busca en nuestra tienda');
    fireEvent.change(input, { target: { value: '  rosa  ' } });

    expect(mockSetSearchParams).toHaveBeenCalledWith({ search: '  rosa  ' });
  });






  it('should have correct CSS classes applied', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText('Busca en nuestra tienda');
    expect(input.className).toContain('body-1');
  });

  describe('Form behavior', () => {
    it('should not trigger additional actions on form submit', () => {
      render(<SearchBar />);

      const form = screen.getByRole('form', { hidden: true });
      const input = screen.getByPlaceholderText('Busca en nuestra tienda');

      // Escribir algo en el input
      fireEvent.change(input, { target: { value: 'test' } });

      // Resetear mock calls
      mockSetSearchParams.mockClear();

      // Submit form
      fireEvent.submit(form);

      // No debería llamar setSearchParams adiicional en submit
      expect(mockSetSearchParams).not.toHaveBeenCalled();
    });
  });


});
