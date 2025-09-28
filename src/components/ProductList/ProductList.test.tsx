import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { use } from 'react';
import ProductList from './ProductList';
import { PRODUCTS } from '../../utils/testUtils';
import ProductListSkeleton from './ProductListSkeleton';


// Mock de la función use de react para poder hacer los test ()
// [https://react.dev/reference/react/use] use()
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    use: vi.fn()
  };
});

describe('ProductList Component', () => {
  describe("Rendering", () => {

    it('should render all products when use() hook returns products', () => {
      vi.mocked(use).mockReturnValue(PRODUCTS);
      render(<ProductList productsPromise={Promise.resolve(PRODUCTS)} searchTerm="" />);

      const cardElements = screen.getAllByRole("card")
      expect(cardElements).toHaveLength(2)
    });

    it('should render product details correctly', () => {
      vi.mocked(use).mockReturnValue(PRODUCTS);
      render(<ProductList productsPromise={Promise.resolve(PRODUCTS)} searchTerm="" />);

      expect(screen.getByText('Orquídea')).toBeDefined();
      expect(screen.getByText('Rosa china')).toBeDefined();
      expect(screen.getByText('Ophrys tenthredinifera')).toBeDefined();
      expect(screen.getByText('Rosa chinensis')).toBeDefined();
      expect(screen.getByText('€4.95')).toBeDefined();
      expect(screen.getByText('€11.45')).toBeDefined();
    });

    it('should handle empty products array', () => {
      vi.mocked(use).mockReturnValue([]);
      render(<ProductList productsPromise={Promise.resolve([])} searchTerm="" />);

      const productCards = screen.queryAllByRole("card");
      expect(productCards).toHaveLength(0);
    });
  })

  describe("Functionalities", () => {
    it('should call use() hook with the provided promise', () => {
      const mockPromise = Promise.resolve(PRODUCTS);
      vi.mocked(use).mockReturnValue(PRODUCTS);

      render(<ProductList productsPromise={mockPromise} searchTerm="" />);
      expect(use).toHaveBeenCalledWith(mockPromise);
    });


    describe('Filtering products', () => {
      it('should filter products by name (case insensitive)', () => {
        vi.mocked(use).mockReturnValue(PRODUCTS);
        render(<ProductList productsPromise={Promise.resolve(PRODUCTS)} searchTerm="orquídea" />);

        expect(screen.queryByText('Orquídea')).toBeDefined();
        expect(screen.queryByText('Rosa')).toBeNull();
      });

      it('should filter products by binomial name (case insensitive)', () => {
        vi.mocked(use).mockReturnValue(PRODUCTS);
        render(<ProductList productsPromise={Promise.resolve(PRODUCTS)} searchTerm="rosa chinensis" />);

        expect(screen.queryByText('Rosa')).toBeDefined();
        expect(screen.queryByText('Orquídea')).toBeNull();
      });

      it('should show no products when search term does not match', () => {
        vi.mocked(use).mockReturnValue(PRODUCTS);
        render(<ProductList productsPromise={Promise.resolve(PRODUCTS)} searchTerm="tulipán" />);

        expect(screen.queryByText('Orquídea')).toBeNull();
        expect(screen.queryByText('Rosa')).toBeNull();
      });

      it('should show all products when search term is empty or whitespace', () => {
        vi.mocked(use).mockReturnValue(PRODUCTS);
        render(<ProductList productsPromise={Promise.resolve(PRODUCTS)} searchTerm="   " />);

        expect(screen.queryByText('Orquídea')).toBeDefined();
        expect(screen.queryByText('Rosa')).toBeDefined();
      });
    });

  })
});



describe('ProductListSkeleton Component', () => {
  it('should render exactl 6 ProductCardSkeleton components', () => {
    render(<ProductListSkeleton />);

    const skeletonCards = screen.getAllByRole('card');
    expect(skeletonCards).toHaveLength(6);
  });

  it('should render as a React fragment without wrapper element', () => {
    const { container } = render(<ProductListSkeleton />);

    const directChildren = Array.from(container.children);
    expect(directChildren).toHaveLength(6);
  });
});

