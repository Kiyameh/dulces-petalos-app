import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router';
import ProductListPage from './ProductListPage';
import * as productService from '../services/productService';
import { PRODUCTS } from '../utils/testUtils';

// Mock the productService
vi.mock('../services/productService');

// Wrapper de react-router
const ProductListPageWithRouter = () => (
  <BrowserRouter>
    <ProductListPage />
  </BrowserRouter>
);

describe('ProductListPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render main page structure', () => {
      vi.mocked(productService.getAllProducts).mockResolvedValue(PRODUCTS);
      render(<ProductListPageWithRouter />);

      expect(screen.getByRole('navigation')).toBeDefined();
      expect(screen.getByRole('search')).toBeDefined();
      expect(screen.getByRole('product-grid')).toBeDefined();
    });

    it('should render product grid when products are loaded', async () => {
      vi.mocked(productService.getAllProducts).mockResolvedValue(PRODUCTS);
      const { container } = render(<ProductListPageWithRouter />);

      await waitFor(() => {
        const productGrid = container.querySelector('.productGrid');
        expect(productGrid).toBeDefined();
      });
    });

    it('should have proper page structure with CSS classes', () => {
      vi.mocked(productService.getAllProducts).mockResolvedValue(PRODUCTS);
      const { container } = render(<ProductListPageWithRouter />);

      const mainElement = container.querySelector('main');
      const bgDiv = container.querySelector('.bg');
      const contentDiv = container.querySelector('.content');

      expect(mainElement).toBeDefined();
      expect(bgDiv).toBeDefined();
      expect(contentDiv).toBeDefined();
    });
  })

  describe('Functionality', () => {
    it('should call getAllProducts on component mount', () => {
      vi.mocked(productService.getAllProducts).mockResolvedValue(PRODUCTS);
      render(<ProductListPageWithRouter />);

      expect(productService.getAllProducts).toHaveBeenCalledTimes(1);
    });

    it('should display error message when fetch fails', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
      vi.mocked(productService.getAllProducts).mockRejectedValue(new Error('API Error'));

      render(<ProductListPageWithRouter />);

      await waitFor(() => {
        expect(screen.getByText('Error al cargar los productos')).toBeDefined();
      });

      consoleErrorSpy.mockRestore();
    });
  })
});
