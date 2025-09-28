import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import BreadcrumbSkeleton from './BreadcrumbSkeleton';

describe('BreadcrumbSkeleton Component', () => {
  beforeEach(() => {
    render(<BreadcrumbSkeleton />);
  });

  it('should render the skeleton navigation with loading state', () => {
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeDefined();
    expect(navElement.getAttribute('aria-label')).toBe('Breadcrumb cargando');
    expect(navElement.getAttribute('aria-busy')).toBe('true');
  });

  it('should render all skeleton elements with proper structure', () => {
    const navElement = screen.getByRole('navigation');
    const children = Array.from(navElement.children);

    expect(children).toHaveLength(3);
    expect(children[0].tagName).toBe('SPAN'); // Short skeleton bar
    expect(children[1].tagName).toBe('SPAN'); // Icon skeleton
    expect(children[2].tagName).toBe('SPAN'); // Long skeleton bar
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

  it('should render icon skeleton with SVG', () => {
    const navElement = screen.getByRole('navigation');
    const iconSpan = navElement.children[1] as HTMLElement;
    const svgIcon = iconSpan.querySelector('svg');

    expect(iconSpan.className).toBe('icon');
    expect(svgIcon).toBeDefined();
    expect(svgIcon?.getAttribute('width')).toBe('8');
    expect(svgIcon?.getAttribute('height')).toBe('14');
  });

  it('should have proper accessibility attributes', () => {
    const navElement = screen.getByRole('navigation');

    expect(navElement.getAttribute('aria-label')).toBe('Breadcrumb cargando');
    expect(navElement.getAttribute('aria-busy')).toBe('true');
  });

  it('should have navigation landmark role', () => {
    const navElement = screen.getByRole('navigation');
    expect(navElement.tagName).toBe('NAV');
  });

  it('should apply breadcrumb CSS class to navigation', () => {
    const navElement = screen.getByRole('navigation');
    expect(navElement.className).toContain('breadcrumb');
  });


  it('should maintain proper element order for breadcrumb structure', () => {
    const navElement = screen.getByRole('navigation');
    const children = Array.from(navElement.children);

    expect(children[0].className).toContain('skeletonBarShort');
    expect(children[1].className).toBe('icon');
    expect(children[1].querySelector('svg')).toBeDefined();
    expect(children[2].className).toContain('skeletonBarLong');
  });
});
