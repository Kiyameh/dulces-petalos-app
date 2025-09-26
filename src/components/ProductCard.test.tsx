import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ProductCard from './ProductCard';
import type Product from '../types/product';

const ORQUIDEA: Product = {
  id: "ZmGrkLRPXOTpxsU4jjAcv",
  name: "Orquídea",
  binomialName: "Ophrys tenthredinifera",
  price: 4.95,
  imgUrl: "https://dulces-petalos.jakala.es/images/ophrysTenthredinifera.jpeg",
  wateringsPerWeek: 1,
  fertilizerType: "phosphorus",
  heightInCm: 30
}

describe('ProductCard Component', () => {
  beforeEach(() => {
    render(<ProductCard product={ORQUIDEA} />);
  });

  it('should render the product card article', () => {
    const articleElement = screen.getByRole('article', { name: /Orquídea/i });
    expect(articleElement).toBeDefined();
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

  it('should have proper semantic structure', () => {
    const articleElement = screen.getByRole('article');
    const headerElement = articleElement.querySelector('header');
    const image = articleElement.querySelector('img');

    expect(headerElement).toBeDefined();
    expect(image).toBeDefined();
    expect(articleElement.contains(headerElement!)).toBe(true);
    expect(articleElement.contains(image!)).toBe(true);
  });

  it('should render SVG icon with aria-hidden attribute', () => {
    const svgIcon = screen.getByRole('link', { name: /ver detalles/i }).querySelector('svg');
    expect(svgIcon).toBeDefined();
    expect(svgIcon?.getAttribute('aria-hidden')).toBe('true');
  });

  describe('Accessibility', () => {
    it('should have proper aria-label for the main article', () => {
      const articleElement = screen.getByRole('article');
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

  });


});