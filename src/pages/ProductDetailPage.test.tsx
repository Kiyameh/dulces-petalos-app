import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest';
import { MemoryRouter } from 'react-router';
import { use } from 'react';
import ProductDetailPage from './ProductDetailPage';
import * as productService from '../services/productService';
import { ORQUIDEA } from '../utils/testUtils';

// Mock de la función use de react para poder hacer los test
// [https://react.dev/reference/react/use] use()
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    use: vi.fn()
  };
});

// Mock de productService
vi.mock('../services/productService');

const mockUse = use as MockedFunction<typeof use>;

// Wrapper de react-router con id específico
const ProductDetailPageWithRouter = ({ productId = 'ZmGrkLRPXOTpxsU4jjAcv' }: { productId?: string }) => (
  <MemoryRouter initialEntries={[`/product/${productId}`]}>
    <ProductDetailPage />
  </MemoryRouter>
);

describe('ProductDetailPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUse.mockReturnValue(ORQUIDEA);
  });

  describe('Rendering', () => {
    it('should render main page structure', () => {
      vi.mocked(productService.getProductById).mockResolvedValue(ORQUIDEA);
      render(<ProductDetailPageWithRouter />);

      const mainElement = screen.getByRole('main');
      expect(mainElement).toBeDefined();
    });

    it('should render breadcrumb navigation', async () => {
      vi.mocked(productService.getProductById).mockResolvedValue(ORQUIDEA);
      render(<ProductDetailPageWithRouter />);

      await waitFor(() => {
        const navigation = screen.getByRole('breadcrumb');
        expect(navigation).toBeDefined();
        expect(navigation.getAttribute('aria-label')).toBe('Breadcrumb');
      });
    });

    it('should render product detail when product is loaded', async () => {
      vi.mocked(productService.getProductById).mockResolvedValue(ORQUIDEA);
      const { container } = render(<ProductDetailPageWithRouter />);

      await waitFor(() => {
        const productDetail = container.querySelector('.productDetail');
        expect(productDetail).toBeDefined();
      });
    });

    it('should have proper page structure with CSS classes', () => {
      vi.mocked(productService.getProductById).mockResolvedValue(ORQUIDEA);
      const { container } = render(<ProductDetailPageWithRouter />);

      const bgDiv = container.querySelector('.bg');
      const contentDiv = container.querySelector('.content');

      expect(bgDiv).toBeDefined();
      expect(contentDiv).toBeDefined();
    });

    it('should render skeleton components while loading', () => {
      vi.mocked(productService.getProductById).mockResolvedValue(ORQUIDEA);
      // Simulación de Suspense
      mockUse.mockImplementation(() => {
        throw new Promise(() => { }); // Promesa infinita
      });

      const { container } = render(<ProductDetailPageWithRouter />);

      const breadcrumbSkeleton = container.querySelector('.breadcrumbSkeleton');
      expect(breadcrumbSkeleton).toBeDefined();

      const productDetailSkeleton = container.querySelector('.productDetailSkeleton');
      expect(productDetailSkeleton).toBeDefined();
    });
  });

  describe('Functionality', () => {
    it('should display error message when fetch fails', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
      vi.mocked(productService.getProductById).mockRejectedValue(new Error('API Error'));

      render(<ProductDetailPageWithRouter />);

      await waitFor(() => {
        expect(screen.getByText('Error al cargar el producto')).toBeDefined();
      });

      consoleErrorSpy.mockRestore();
    });

    it('should not render product detail when there is an error', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
      vi.mocked(productService.getProductById).mockRejectedValue(new Error('Network Error'));

      const { container } = render(<ProductDetailPageWithRouter />);

      await waitFor(() => {
        const productDetail = container.querySelector('.productDetail');
        expect(productDetail).toBeNull();
        expect(screen.getByText('Error al cargar el producto')).toBeDefined();
      });

      consoleErrorSpy.mockRestore();
    });
  });
});