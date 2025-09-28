import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { use } from 'react';
import ProductList from './ProductList';
import type Product from '../types/product';

// Mock de la función use de react para poder hacer los test ()
// [https://react.dev/reference/react/use] use()
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    use: vi.fn()
  };
});

vi.mock('./ProductCard', () => ({
  default: ({ product }: { product: Product }) => (
    <div data-testid={product.id}>
      <h4>{product.name}</h4>
      <p>{product.binomialName}</p>
      <p>€{product.price.toFixed(2)}</p>
    </div>
  )
}));

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

describe('ProductList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all products when use() hook returns products', () => {
    vi.mocked(use).mockReturnValue(mockProducts);
    render(<ProductList productsPromise={Promise.resolve(mockProducts)} searchTerm="" />);

    const orquidea = screen.getByTestId('ZmGrkLRPXOTpxsU4jjAcv');
    const rosa = screen.getByTestId('pMZMhe_ZaAPZoaCCtlDrg');

    expect(orquidea).toBeDefined();
    expect(rosa).toBeDefined();
  });

  it('should render product details correctly', () => {
    vi.mocked(use).mockReturnValue(mockProducts);
    render(<ProductList productsPromise={Promise.resolve(mockProducts)} searchTerm="" />);

    expect(screen.getByText('Orquídea')).toBeDefined();
    expect(screen.getByText('Rosa china')).toBeDefined();
    expect(screen.getByText('Ophrys tenthredinifera')).toBeDefined();
    expect(screen.getByText('Rosa chinensis')).toBeDefined();
    expect(screen.getByText('€4.95')).toBeDefined();
    expect(screen.getByText('€11.45')).toBeDefined();
  });

  it('should render correct number of ProductCard components', () => {
    vi.mocked(use).mockReturnValue(mockProducts);

    render(<ProductList productsPromise={Promise.resolve(mockProducts)} searchTerm="" />);
    const productCards = screen.getAllByTestId(/ZmGrkLRPXOTpxsU4jjAcv|pMZMhe_ZaAPZoaCCtlDrg/);
    expect(productCards).toHaveLength(2);
  });

  it('should handle empty products array', () => {
    vi.mocked(use).mockReturnValue([]);

    render(<ProductList productsPromise={Promise.resolve([])} searchTerm="" />);
    const productCards = screen.queryAllByTestId(/ZmGrkLRPXOTpxsU4jjAcv|pMZMhe_ZaAPZoaCCtlDrg/);
    expect(productCards).toHaveLength(0);
  });

  it('should use product id as key for each ProductCard', () => {
    vi.mocked(use).mockReturnValue(mockProducts);

    render(<ProductList productsPromise={Promise.resolve(mockProducts)} searchTerm="" />);
    expect(screen.getByTestId('ZmGrkLRPXOTpxsU4jjAcv')).toBeDefined();
    expect(screen.getByTestId('pMZMhe_ZaAPZoaCCtlDrg')).toBeDefined();
  });

  it('should call use() hook with the provided promise', () => {
    const mockPromise = Promise.resolve(mockProducts);
    vi.mocked(use).mockReturnValue(mockProducts);

    render(<ProductList productsPromise={mockPromise} searchTerm="" />);
    expect(use).toHaveBeenCalledWith(mockPromise);
  });

  describe('Search functionality', () => {
    it('should filter products by name (case insensitive)', () => {
      vi.mocked(use).mockReturnValue(mockProducts);
      render(<ProductList productsPromise={Promise.resolve(mockProducts)} searchTerm="orquídea" />);

      expect(screen.getByTestId('ZmGrkLRPXOTpxsU4jjAcv')).toBeDefined();
      expect(screen.queryByTestId('pMZMhe_ZaAPZoaCCtlDrg')).toBeNull();
    });

    it('should filter products by binomial name (case insensitive)', () => {
      vi.mocked(use).mockReturnValue(mockProducts);
      render(<ProductList productsPromise={Promise.resolve(mockProducts)} searchTerm="rosa chinensis" />);

      expect(screen.queryByTestId('ZmGrkLRPXOTpxsU4jjAcv')).toBeNull();
      expect(screen.getByTestId('pMZMhe_ZaAPZoaCCtlDrg')).toBeDefined();
    });

    it('should filter products with partial matches', () => {
      vi.mocked(use).mockReturnValue(mockProducts);
      render(<ProductList productsPromise={Promise.resolve(mockProducts)} searchTerm="rosa" />);

      expect(screen.queryByTestId('ZmGrkLRPXOTpxsU4jjAcv')).toBeNull();
      expect(screen.getByTestId('pMZMhe_ZaAPZoaCCtlDrg')).toBeDefined();
    });

    it('should show no products when search term does not match', () => {
      vi.mocked(use).mockReturnValue(mockProducts);
      render(<ProductList productsPromise={Promise.resolve(mockProducts)} searchTerm="tulipán" />);

      expect(screen.queryByTestId('ZmGrkLRPXOTpxsU4jjAcv')).toBeNull();
      expect(screen.queryByTestId('pMZMhe_ZaAPZoaCCtlDrg')).toBeNull();
    });

    it('should show all products when search term is empty or whitespace', () => {
      vi.mocked(use).mockReturnValue(mockProducts);
      render(<ProductList productsPromise={Promise.resolve(mockProducts)} searchTerm="   " />);

      expect(screen.getByTestId('ZmGrkLRPXOTpxsU4jjAcv')).toBeDefined();
      expect(screen.getByTestId('pMZMhe_ZaAPZoaCCtlDrg')).toBeDefined();
    });
  });
});
