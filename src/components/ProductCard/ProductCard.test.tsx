import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ProductCard from './ProductCard';
import { ORQUIDEA } from '../../utils/testUtils';
import ProductCardSkeleton from './ProductCardSkeleton';

describe('ProductCard Component', () => {
  beforeEach(() => {
    render(<ProductCard product={ORQUIDEA} />);
  });

  describe('Rendering', () => {
    it('should render the product card', () => {
      const cardElement = screen.getByRole('card', { name: /Orquídea/i });
      expect(cardElement).toBeDefined();
    });

    it('should render the product name as heading', () => {
      const productName = screen.getByRole('heading', { level: 4 });
      expect(productName).toBeDefined();
      expect(productName.textContent).toBe('Orquídea');
    });

    it('should render the binomial name', () => {
      const binomialName = screen.getByText('Ophrys tenthredinifera');
      expect(binomialName).toBeDefined();
    });

    it('should render the product image with correct attributes', () => {
      const productImage = screen.getByRole('img');
      expect(productImage).toBeDefined();
      expect(productImage.getAttribute('src')).toBe('https://dulces-petalos.jakala.es/images/ophrysTenthredinifera.jpeg');
      expect(productImage.getAttribute('alt')).toBe('Foto de Orquídea');
    });

    it('should render the price with correct format', () => {
      const priceElement = screen.getByRole('text', { name: /precio 4\.95 euros/i });
      expect(priceElement).toBeDefined();
      expect(priceElement.textContent).toBe('€4.95');
    });

    it('should render the link to product detail page', () => {
      const productLink = screen.getByRole('link', { name: /ver detalles de orquídea/i });
      expect(productLink).toBeDefined();
      expect(productLink.getAttribute('href')).toBe('/product/ZmGrkLRPXOTpxsU4jjAcv');
    });

    it('should render the new badge with proper accessibility', () => {
      const newBadge = screen.getByRole('status', { name: /producto nuevo/i });
      expect(newBadge).toBeDefined();
      expect(newBadge.textContent).toBe('NUEVO');
    });
  })

  describe('Structure', () => {
    it('should have proper semantic structure', () => {
      const articleElement = screen.getByRole('card');
      const headerElement = articleElement.querySelector('header');
      const image = articleElement.querySelector('img');

      expect(headerElement).toBeDefined();
      expect(image).toBeDefined();
      expect(articleElement.contains(headerElement!)).toBe(true);
      expect(articleElement.contains(image!)).toBe(true);
    });
  })

  describe('Accessibility', () => {
    it('should have proper aria-label for the main card', () => {
      const articleElement = screen.getByRole('card');
      expect(articleElement.getAttribute('aria-label')).toBe('Producto Orquídea');
    });

    it('should have accessible price information', () => {
      const priceElement = screen.getByRole('text', { name: /precio 4\.95 euros/i });
      expect(priceElement.getAttribute('aria-label')).toBe('Precio 4.95 euros');
    });

    it('should have accessible link description', () => {
      const productLink = screen.getByRole('link');
      expect(productLink.getAttribute('aria-label')).toBe('Ver detalles de Orquídea');
    });

    it('should have accessible new badge description', () => {
      const newBadge = screen.getByRole('status');
      expect(newBadge.getAttribute('aria-label')).toBe('Producto nuevo');
    });

    it('should have accessible image description', () => {
      const image = screen.getByRole('img');
      expect(image.getAttribute('alt')).toBe('Foto de Orquídea');
    });
  });
});


describe('ProductCardSkeleton Component', () => {
  beforeEach(() => {
    render(<ProductCardSkeleton />);
  });

  describe("Rendering", () => {
    it('should render the skeleton', () => {
      const skeletonElement = screen.getByRole('card', { name: /Cargando producto/i });
      expect(skeletonElement).toBeDefined();
    });
  })

  describe("Structure", () => {
    it('should render all skeleton elements with proper structure', () => {
      const header = screen.getByTestId('skeleton-header');
      const title = header.querySelector(':first-child');
      const subtitle = header.querySelector(':last-child');
      const imageContainer = screen.getByTestId('skeleton-image-container');
      const image = imageContainer.querySelector(':nth-child(1)');
      const price = imageContainer.querySelector(':nth-child(2)');
      const link = imageContainer.querySelector(':nth-child(3)');

      expect(header).toBeDefined();
      expect(title).toBeDefined();
      expect(subtitle).toBeDefined();
      expect(imageContainer).toBeDefined();
      expect(image).toBeDefined();
      expect(price).toBeDefined();
      expect(link).toBeDefined();
    });
  })

  describe("Accessibility", () => {
    it('should card have proper aria atributes', () => {
      const skeletonElement = screen.getByRole('card', { name: /Cargando producto/i });
      expect(skeletonElement.getAttribute('aria-label')).toBe('Cargando producto');
      expect(skeletonElement.getAttribute('aria-busy')).toBe('true');
    });

    it('should decorative elements have hidden role', () => {
      const skeletonElement = screen.getByRole('card', { name: /Cargando producto/i });
      const decorativeElements = skeletonElement.querySelectorAll('[aria-hidden="true"]');
      expect(decorativeElements).toHaveLength(5);
    });
  })
});