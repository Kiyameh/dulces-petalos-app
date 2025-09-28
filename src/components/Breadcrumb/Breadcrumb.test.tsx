import { describe, it, expect, beforeEach, vi, type MockedFunction } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { use } from 'react';

import Breadcrumb from './Breadcrumb';
import BreadcrumbSkeleton from './BreadcrumbSkeleton';
import type Product from '../../types/product';
import { ORQUIDEA } from '../../utils/testUtils';

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

// Wrapper para proporcionar el contexto de React Router
const BreadcrumbWithRouter = ({ productPromise }: { productPromise: Promise<Product | null> }) => (
  <BrowserRouter>
    <Breadcrumb productPromise={productPromise} />
  </BrowserRouter>
);

describe('Breadcrumb Component', () => {
  beforeEach(() => {
    mockUse.mockReturnValue(ORQUIDEA);
    const productPromise = Promise.resolve(ORQUIDEA);
    render(<BreadcrumbWithRouter productPromise={productPromise} />);
  });

  describe('Rendering', () => {
    it('should render the breadcrumb navigation', () => {
      const navElement = screen.getByRole('breadcrumb');
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
      const navElement = screen.getByRole('breadcrumb');
      const svgIcon = navElement.querySelector('svg');
      expect(svgIcon).toBeDefined();
    });

    it('should return null when product is null', () => {
      mockUse.mockReturnValue(null);
      const productPromise = Promise.resolve(null);
      const { container } = render(<BreadcrumbWithRouter productPromise={productPromise} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Structure', () => {
    it('should have proper semantic structure', () => {
      const navElement = screen.getByRole('breadcrumb');
      const homeLink = screen.getByRole('link');
      const productText = screen.getByText('Orquídea');

      expect(navElement.contains(homeLink)).toBe(true);
      expect(navElement.contains(productText)).toBe(true);
    });

    it('should have icon container with proper class', () => {
      const navElement = screen.getByRole('breadcrumb');
      const iconSpan = navElement.querySelector('span.icon');
      expect(iconSpan).toBeDefined();
      expect(iconSpan?.querySelector('svg')).toBeDefined();
    });

    it('should have breadcrumb elements in correct order', () => {
      const navElement = screen.getByRole('breadcrumb');
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

    it('should have navigation landmark', () => {
      const navElement = screen.getByRole('breadcrumb');
      expect(navElement.tagName).toBe('NAV');
    });

    it('should have clickable home link', () => {
      const homeLink = screen.getByRole('link');
      expect(homeLink.getAttribute('href')).toBe('/');
    });

    it('should have aria-label in all elements', () => {
      const navElement = screen.getByRole('breadcrumb');
      const homeLink = screen.getByRole('link');
      const productText = screen.getByText('Orquídea');
      const iconSpan = navElement.querySelector('span.icon');

      expect(homeLink.getAttribute('aria-label')).toBe('Inicio');
      expect(productText.getAttribute('aria-label')).toBe('Orquídea');
      expect(iconSpan?.querySelector('svg')?.getAttribute('aria-label')).toBe('hidden');
    });
  });
});


describe('BreadcrumbSkeleton Component', () => {
  beforeEach(() => {
    render(<BreadcrumbSkeleton />);
  });

  describe('Rendering', () => {
    it('should render the skeleton navigation', () => {
      const navElement = screen.getByRole('navigation');
      expect(navElement).toBeDefined();
    });

    it('should render all skeleton elements', () => {
      const navElement = screen.getByRole('navigation');
      const children = Array.from(navElement.children);

      expect(children).toHaveLength(3);
      expect(children[0].tagName).toBe('SPAN'); // Short skeleton bar
      expect(children[1].tagName).toBe('SPAN'); // Icon skeleton
      expect(children[2].tagName).toBe('SPAN'); // Long skeleton bar
    });
  });

  describe('Structure', () => {
    it('should maintain proper element order for breadcrumb structure', () => {
      const navElement = screen.getByRole('navigation');
      const children = Array.from(navElement.children);

      expect(children[0].className).toContain('skeletonBarShort');
      expect(children[1].className).toBe('icon');
      expect(children[2].className).toContain('skeletonBarLong');
    });

    it('should render short skeleton bar with correct classes', () => {
      const navElement = screen.getByRole('navigation');
      const shortBar = navElement.children[0] as HTMLElement;

      expect(shortBar.className).toContain('skeletonBar');
      expect(shortBar.className).toContain('skeletonBarShort');
    });

    it('should render long skeleton bar with correct classes', () => {
      const navElement = screen.getByRole('navigation');
      const longBar = navElement.children[2] as HTMLElement;

      expect(longBar.className).toContain('skeletonBar');
      expect(longBar.className).toContain('skeletonBarLong');
    });

    it('should apply breadcrumb CSS class to navigation', () => {
      const navElement = screen.getByRole('navigation');
      expect(navElement.className).toContain('breadcrumb');
    });
  });

  describe('Accessibility', () => {
    it('should have proper accessibility attributes', () => {
      const navElement = screen.getByRole('navigation');

      expect(navElement.getAttribute('aria-label')).toBe('Breadcrumb cargando');
      expect(navElement.getAttribute('aria-busy')).toBe('true');
    });

    it('should have navigation landmark role', () => {
      const navElement = screen.getByRole('navigation');
      expect(navElement.tagName).toBe('NAV');
    });
  });
});
