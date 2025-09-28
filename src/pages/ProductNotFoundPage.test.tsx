import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router';
import ProductNotFoundPage from './ProductNotFoundPage';

// Wrapper de react-router
const ProductNotFoundPageWithRouter = () => (
  <BrowserRouter>
    <ProductNotFoundPage />
  </BrowserRouter>
);

describe('ProductNotFoundPage Component', () => {

  describe('Rendering', () => {
    it('should render main page structure', () => {
      render(<ProductNotFoundPageWithRouter />);

      expect(screen.getByRole('banner')).toBeDefined();
      const mainElement = screen.getByRole('main');
      expect(mainElement).toBeDefined();
    });

    it('should render error message', () => {
      render(<ProductNotFoundPageWithRouter />);

      expect(screen.getByText('Ingrese un id válido')).toBeDefined();
    });

    it('should have proper page structure with CSS classes', () => {
      const { container } = render(<ProductNotFoundPageWithRouter />);

      const bgDiv = container.querySelector('.bg');
      const contentDiv = container.querySelector('.content');

      expect(bgDiv).toBeDefined();
      expect(contentDiv).toBeDefined();
    });

    it('should render header component', () => {
      render(<ProductNotFoundPageWithRouter />);

      const header = screen.getByRole('banner');
      expect(header).toBeDefined();
    });
  });
});