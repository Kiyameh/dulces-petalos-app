import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ProductDetailSkeleton from './ProductDetailSkeleton';

describe('ProductDetailSkeleton Component', () => {
  beforeEach(() => {
    render(<ProductDetailSkeleton />);
  });

  it('should render the skeleton article with loading state', () => {
    const skeletonElement = screen.getByTestId('product-detail-skeleton');
    expect(skeletonElement).toBeDefined();
    expect(skeletonElement.getAttribute('aria-label')).toBe('Cargando detalle del producto');
    expect(skeletonElement.getAttribute('aria-busy')).toBe('true');
  });

  it('should render all skeleton elements with proper structure', () => {
    const image = screen.getByTestId('skeleton-image');
    const content = screen.getByTestId('skeleton-content');
    const header = screen.getByTestId('skeleton-header');
    const title = screen.getByTestId('skeleton-title');
    const subtitle = screen.getByTestId('skeleton-subtitle');
    const price = screen.getByTestId('skeleton-price');
    const requirements = screen.getByTestId('skeleton-requirements');
    const button = screen.getByTestId('skeleton-button');

    expect(image).toBeDefined();
    expect(content).toBeDefined();
    expect(header).toBeDefined();
    expect(title).toBeDefined();
    expect(subtitle).toBeDefined();
    expect(price).toBeDefined();
    expect(requirements).toBeDefined();
    expect(button).toBeDefined();
  });

  it('should have proper accessibility attributes for skeleton elements', () => {
    const presentationElements = screen.getAllByRole('presentation');
    expect(presentationElements.length).toBeGreaterThan(0);

    const imageSkeleton = screen.getByTestId('skeleton-image');
    const titleSkeleton = screen.getByTestId('skeleton-title');
    const subtitleSkeleton = screen.getByTestId('skeleton-subtitle');
    const priceSkeleton = screen.getByTestId('skeleton-price');
    const buttonSkeleton = screen.getByTestId('skeleton-button');

    expect(imageSkeleton.getAttribute('aria-label')).toBe('Cargando imagen del producto');
    expect(titleSkeleton.getAttribute('aria-label')).toBe('Cargando nombre del producto');
    expect(subtitleSkeleton.getAttribute('aria-label')).toBe('Cargando nombre científico');
    expect(priceSkeleton.getAttribute('aria-label')).toBe('Cargando precio');
    expect(buttonSkeleton.getAttribute('aria-label')).toBe('Cargando botón');
  });

  it('should render requirement skeleton items', () => {
    const requirement1 = screen.getByTestId('skeleton-requirement-1');
    const requirement2 = screen.getByTestId('skeleton-requirement-2');

    expect(requirement1).toBeDefined();
    expect(requirement2).toBeDefined();
    expect(requirement1.getAttribute('aria-label')).toBe('Cargando información de riego');
    expect(requirement2.getAttribute('aria-label')).toBe('Cargando información de fertilizante');
  });

  it('should have correct container hierarchy', () => {
    const skeletonElement = screen.getByTestId('product-detail-skeleton');
    const content = screen.getByTestId('skeleton-content');
    const header = screen.getByTestId('skeleton-header');
    const requirements = screen.getByTestId('skeleton-requirements');

    expect(skeletonElement.contains(content)).toBe(true);
    expect(content.contains(header)).toBe(true);
    expect(content.contains(requirements)).toBe(true);
  });

  it('should render as article with proper role', () => {
    const articleElement = screen.getByRole('article');
    expect(articleElement).toBeDefined();
    expect(articleElement.getAttribute('data-testid')).toBe('product-detail-skeleton');
  });

  it('should have requirements list structure', () => {
    const requirementsList = screen.getByTestId('skeleton-requirements');
    const requirement1 = screen.getByTestId('skeleton-requirement-1');
    const requirement2 = screen.getByTestId('skeleton-requirement-2');

    expect(requirementsList.contains(requirement1)).toBe(true);
    expect(requirementsList.contains(requirement2)).toBe(true);
  });
});
