import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductListSkeleton from './ProductListSkeleton';

vi.mock('./ProductCardSkeleton', () => ({
  default: () => (
    <div data-testid="product-card-skeleton">
      ProductCardSkeleton Mock
    </div>
  )
}));

describe('ProductListSkeleton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render exactl 6 ProductCardSkeleton components', () => {
    render(<ProductListSkeleton />);

    const skeletonCards = screen.getAllByTestId('product-card-skeleton');
    expect(skeletonCards).toHaveLength(6);
  });

  it('should render ProductCardSkeleton components with correct content', () => {
    render(<ProductListSkeleton />);

    const skeletonCards = screen.getAllByTestId('product-card-skeleton');

    skeletonCards.forEach(card => {
      expect(card.textContent).toBe('ProductCardSkeleton Mock');
    });
  });

  it('should render as a React fragment without wrapper element', () => {
    const { container } = render(<ProductListSkeleton />);

    const directChildren = Array.from(container.children);
    expect(directChildren).toHaveLength(6);
  });
});
