import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, it, expect, beforeEach } from 'vitest';
import Header from './Header';

// Wrapper para proporcionar el contexto de React Router
const HeaderWithRouter = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

describe('Header Component', () => {
  beforeEach(() => {
    render(<HeaderWithRouter />);
  });


  it('should render the header element', () => {
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeDefined();
  });

  it('should render the navigation element', () => {
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeDefined();
  });

  it('should render the logo link', () => {
    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeDefined();
    expect(logoLink.getAttribute('href')).toBe('/');
  });

  it('should render the logo image with correct attributes', () => {
    const logoImage = screen.getByRole('img');
    expect(logoImage).toBeDefined();
    expect(logoImage.getAttribute('src')).toBe('/logo.svg');
    expect(logoImage.getAttribute('alt')).toBe('Logo de Dulces Pétalos');
  });

  it('should contain a clickable logo that navigates to home', () => {
    const logoLink = screen.getByRole('link');
    const logoImage = screen.getByRole('img');

    expect(logoLink.contains(logoImage)).toBe(true);
    expect(logoLink.getAttribute('href')).toBe('/');
  });

  it('should have proper semantic structure', () => {
    const headerElement = screen.getByRole('banner');
    const navElement = screen.getByRole('navigation');
    const linkElement = screen.getByRole('link');
    const imageElement = screen.getByRole('img');

    expect(headerElement.contains(navElement)).toBe(true);
    expect(navElement.contains(linkElement)).toBe(true);
    expect(linkElement.contains(imageElement)).toBe(true);
  });
});
