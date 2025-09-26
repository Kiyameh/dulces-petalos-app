import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ProductCardSkeleton from './ProductCardSkeleton';

describe('ProductCardSkeleton Component', () => {
  beforeEach(() => {
    render(<ProductCardSkeleton />);
  });

  it('should render the skeleton article with loading state', () => {
    const skeletonElement = screen.getByTestId('product-card-skeleton');
    expect(skeletonElement).toBeDefined();
    expect(skeletonElement.getAttribute('aria-label')).toBe('Cargando producto');
    expect(skeletonElement.getAttribute('aria-busy')).toBe('true');
  });

  it('should render all skeleton elements with proper structure', () => {
    const header = screen.getByTestId('skeleton-header');
    const title = screen.getByTestId('skeleton-title');
    const subtitle = screen.getByTestId('skeleton-subtitle');
    const imageContainer = screen.getByTestId('skeleton-image-container');
    const image = screen.getByTestId('skeleton-image');
    const price = screen.getByTestId('skeleton-price');
    const link = screen.getByTestId('skeleton-link');

    expect(header).toBeDefined();
    expect(title).toBeDefined();
    expect(subtitle).toBeDefined();
    expect(imageContainer).toBeDefined();
    expect(image).toBeDefined();
    expect(price).toBeDefined();
    expect(link).toBeDefined();
  });

  it('should have proper accessibility attributes', () => {
    const presentationElements = screen.getAllByRole('presentation');
    expect(presentationElements).toHaveLength(5);

    const titleSkeleton = screen.getByTestId('skeleton-title');
    const imageSkeleton = screen.getByTestId('skeleton-image');
    const priceSkeleton = screen.getByTestId('skeleton-price');

    expect(titleSkeleton.getAttribute('aria-label')).toBe('Cargando nombre del producto');
    expect(imageSkeleton.getAttribute('aria-label')).toBe('Cargando imagen del producto');
    expect(priceSkeleton.getAttribute('aria-label')).toBe('Cargando precio');
  });

  it('should have correct container hierarchy', () => {
    const skeletonElement = screen.getByTestId('product-card-skeleton');
    const header = screen.getByTestId('skeleton-header');
    const imageContainer = screen.getByTestId('skeleton-image-container');

    expect(skeletonElement.contains(header)).toBe(true);
    expect(skeletonElement.contains(imageContainer)).toBe(true);
  });
});
