import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router';
import { useState, useEffect } from 'react';
import ProductListPage from './ProductListPage';
import * as productService from '../services/productService';
import type Product from '../types/product';

// Mock de los componentes: 
vi.mock('../components/Header', () => ({
  default: () => <header data-testid="header">Header</header>
}));

vi.mock('../components/SearchBar', () => ({
  default: () => <div data-testid="search-bar">SearchBar</div>
}));

vi.mock('../components/ProductListSkeleton', () => ({
  default: () => <div data-testid="product-list-skeleton">Loading products...</div>
}));

vi.mock('../components/ProductList', () => {
  const MockProductList = ({ productsPromise }: { productsPromise: Promise<Product[]> }) => {
    // simulación de use hook: 
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      setTimeout(() => {
        productsPromise.then(setProducts);
      }, 200);
    }, [productsPromise]);

    return (
      <div data-testid="product-list">
        {products.map(product => (
          <div key={product.id} data-testid={`product-${product.id}`}>
            {product.name}
          </div>
        ))}
      </div>
    );
  };

  return { default: MockProductList };
});

// Mock the productService
vi.mock('../services/productService');

const mockProducts: Product[] = [
  {
    id: "ZmGrkLRPXOTpxsU4jjAcv",
    name: "Orquídea",
    binomialName: "Ophrys tenthredinifera",
    price: 4.95,
    imgUrl: "https://dulces-petalos.jakala.es/images/ophrysTenthredinifera.jpeg",
    wateringsPerWeek: 1,
    fertilizerType: "phosphorus",
    heightInCm: 30
  },
  {
    id: "pMZMhe_ZaAPZoaCCtlDrg",
    name: "Rosa china",
    binomialName: "Rosa chinensis",
    price: 11.45,
    imgUrl: "https://dulces-petalos.jakala.es/images/rosaChinensis.jpeg",
    wateringsPerWeek: 3,
    fertilizerType: "nitrogen",
    heightInCm: 195
  }
];

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

  it('should render main page structure', () => {
    vi.mocked(productService.getAllProducts).mockResolvedValue(mockProducts);
    render(<ProductListPageWithRouter />);

    expect(screen.getByTestId('header')).toBeDefined();
    expect(screen.getByTestId('search-bar')).toBeDefined();
  });

  it('should render products after successful fetch', async () => {
    vi.mocked(productService.getAllProducts).mockResolvedValue(mockProducts);
    render(<ProductListPageWithRouter />);

    // Comprobación tras la espera: 
    await waitFor(() => {
      expect(screen.getByTestId('product-list')).toBeDefined();
    });
  });

  it('should display error message when fetch fails', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    vi.mocked(productService.getAllProducts).mockRejectedValue(new Error('API Error'));

    render(<ProductListPageWithRouter />);

    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.getByText('Error al cargar los productos')).toBeDefined();
    });

    // Should not show skeleton or product list when there's an error
    expect(screen.queryByTestId('product-list-skeleton')).toBeNull();
    expect(screen.queryByTestId('product-list')).toBeNull();

    consoleErrorSpy.mockRestore();
  });

  it('should call getAllProducts on component mount', () => {
    vi.mocked(productService.getAllProducts).mockResolvedValue(mockProducts);
    render(<ProductListPageWithRouter />);

    expect(productService.getAllProducts).toHaveBeenCalledTimes(1);
  });

  it('should have proper page structure with CSS classes', () => {
    vi.mocked(productService.getAllProducts).mockResolvedValue(mockProducts);
    const { container } = render(<ProductListPageWithRouter />);

    const mainElement = container.querySelector('main');
    const bgDiv = container.querySelector('.bg');
    const contentDiv = container.querySelector('.content');

    expect(mainElement).toBeDefined();
    expect(bgDiv).toBeDefined();
    expect(contentDiv).toBeDefined();
  });

  it('should render product grid when products are loaded', async () => {
    vi.mocked(productService.getAllProducts).mockResolvedValue(mockProducts);
    const { container } = render(<ProductListPageWithRouter />);

    await waitFor(() => {
      const productGrid = container.querySelector('.productGrid');
      expect(productGrid).toBeDefined();
    });
  });
});
