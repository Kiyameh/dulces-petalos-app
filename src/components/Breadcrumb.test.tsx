import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, it, expect, beforeEach, vi, type MockedFunction } from 'vitest';
import { use } from 'react';
import Breadcrumb from './Breadcrumb';
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

const mockUse = use as MockedFunction<typeof use>;

const ORQUIDEA: Product = {
  id: "ZmGrkLRPXOTpxsU4jjAcv",
  name: "Orquídea",
  binomialName: "Ophrys tenthredinifera",
  price: 4.95,
  imgUrl: "https://dulces-petalos.jakala.es/images/ophrysTenthredinifera.jpeg",
  wateringsPerWeek: 1,
  fertilizerType: "phosphorus",
  heightInCm: 30
};

// Wrapper para proporcionar el contexto de React Router
const BreadcrumbWithRouter = ({ productPromise }: { productPromise: Promise<Product> }) => (
  <BrowserRouter>
    <Breadcrumb productPromise={productPromise} />
  </BrowserRouter>
);

describe('Breadcrumb Component', () => {
  describe('With valid product', () => {
    beforeEach(() => {
      mockUse.mockReturnValue(ORQUIDEA);
      const productPromise = Promise.resolve(ORQUIDEA);
      render(<BreadcrumbWithRouter productPromise={productPromise} />);
    });

    it('should render the breadcrumb navigation', () => {
      const navElement = screen.getByRole('navigation');
      expect(navElement).toBeDefined();
    });

    it('should render the home link', () => {
      const homeLink = screen.getByRole('link', { name: /inicio/i });
      expect(homeLink).toBeDefined();
      expect(homeLink.getAttribute('href')).toBe('/');
      expect(homeLink.textContent).toBe('Inicio');
    });

    it('should render the product name', () => {
      const productName = screen.getByText('Orquídea');
      expect(productName).toBeDefined();
    });

    it('should render the separator icon', () => {
      const navElement = screen.getByRole('navigation');
      const svgIcon = navElement.querySelector('svg');
      expect(svgIcon).toBeDefined();
    });

    it('should have proper semantic structure', () => {
      const navElement = screen.getByRole('navigation');
      const homeLink = screen.getByRole('link');
      const productText = screen.getByText('Orquídea');

      expect(navElement.contains(homeLink)).toBe(true);
      expect(navElement.contains(productText)).toBe(true);
    });

    it('should have icon container with proper class', () => {
      const navElement = screen.getByRole('navigation');
      const iconSpan = navElement.querySelector('span.icon');
      expect(iconSpan).toBeDefined();
      expect(iconSpan?.querySelector('svg')).toBeDefined();
    });
  });

  describe('With null product', () => {
    it('should return null when product is null', () => {
      mockUse.mockReturnValue(null);
      const productPromise = Promise.resolve(null as any);
      const { container } = render(<BreadcrumbWithRouter productPromise={productPromise} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Navigation structure', () => {
    beforeEach(() => {
      mockUse.mockReturnValue(ORQUIDEA);
      const productPromise = Promise.resolve(ORQUIDEA);
      render(<BreadcrumbWithRouter productPromise={productPromise} />);
    });

    it('should have breadcrumb elements in correct order', () => {
      const navElement = screen.getByRole('navigation');
      const children = Array.from(navElement.children);

      expect(children).toHaveLength(3);
      expect(children[0].tagName).toBe('A'); // Home link
      expect(children[1].tagName).toBe('SPAN'); // Icon separator
      expect(children[2].tagName).toBe('P'); // Product name
    });

    it('should apply correct CSS classes', () => {
      const homeLink = screen.getByRole('link');
      const productText = screen.getByText('Orquídea');

      expect(homeLink.className).toBe('body-1');
      expect(productText.className).toBe('body-1');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      mockUse.mockReturnValue(ORQUIDEA);
      const productPromise = Promise.resolve(ORQUIDEA);
      render(<BreadcrumbWithRouter productPromise={productPromise} />);
    });

    it('should have navigation landmark', () => {
      const navElement = screen.getByRole('navigation');
      expect(navElement.tagName).toBe('NAV');
    });

    it('should have clickable home link', () => {
      const homeLink = screen.getByRole('link');
      expect(homeLink.getAttribute('href')).toBe('/');
    });
  });
});
