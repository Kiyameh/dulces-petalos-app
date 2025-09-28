import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, type MockedFunction } from 'vitest';
import { use } from 'react';
import ProductDetail from './ProductDetail';
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

const ROSA: Product = {
  id: "abc123",
  name: "Rosa",
  binomialName: "Rosa gallica",
  price: 12.50,
  imgUrl: "https://example.com/rosa.jpg",
  wateringsPerWeek: 3,
  fertilizerType: "nitrogen",
  heightInCm: 50
};


describe('ProductDetail Component', () => {
  describe('Product detail ', () => {
    beforeEach(() => {
      mockUse.mockReturnValue(ORQUIDEA);
      const productPromise = Promise.resolve(ORQUIDEA);
      render(<ProductDetail productPromise={productPromise} />);
    });

    it('should render the product detail article', () => {
      const articleElement = screen.getByRole('article');
      expect(articleElement).toBeDefined();
    });

    it('should render the product name as main heading', () => {
      const productName = screen.getByRole('heading', { level: 1 });
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
      expect(productImage.getAttribute('alt')).toBe('Orquídea');
    });

    it('should render the price with correct format', () => {
      const priceElement = screen.getByRole('heading', { level: 4 });
      expect(priceElement).toBeDefined();
      expect(priceElement.textContent).toBe('€4.95');
    });

    it('should render watering requirements with singular form', () => {
      const wateringRequirement = screen.getByText('Regar 1 vez por semana');
      expect(wateringRequirement).toBeDefined();
    });

    it('should render fertilizer requirements', () => {
      const fertilizerRequirement = screen.getByText('Fertilizar con phosphorus');
      expect(fertilizerRequirement).toBeDefined();
    });

    it('should render add to cart button', () => {
      const addButton = screen.getByRole('button');
      expect(addButton).toBeDefined();
      expect(addButton.textContent).toBe('Añadir al carrito');
    });

    it('should have proper semantic structure', () => {
      const articleElement = screen.getByRole('article');
      const headerElement = articleElement.querySelector('header');
      const image = articleElement.querySelector('img');
      const requirementsList = articleElement.querySelector('ul');

      expect(headerElement).toBeDefined();
      expect(image).toBeDefined();
      expect(requirementsList).toBeDefined();
      expect(articleElement.contains(headerElement!)).toBe(true);
      expect(articleElement.contains(image!)).toBe(true);
      expect(articleElement.contains(requirementsList!)).toBe(true);
    });
    it('should render requirements as list items', () => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);

      expect(listItems[0].textContent).toBe('Regar 1 vez por semana');
      expect(listItems[1].textContent).toBe('Fertilizar con phosphorus');
    });

    it('should have requirements list with proper structure', () => {
      const requirementsList = screen.getByRole('list');
      const listItems = screen.getAllByRole('listitem');

      expect(requirementsList).toBeDefined();
      listItems.forEach(item => {
        expect(requirementsList.contains(item)).toBe(true);
      });
    });
  });

  describe('Products with multiple waterings per week', () => {
    beforeEach(() => {
      mockUse.mockReturnValue(ROSA);
      const productPromise = Promise.resolve(ROSA);
      render(<ProductDetail productPromise={productPromise} />);
    });

    it('should render watering requirements with plural form', () => {
      const wateringRequirement = screen.getByText('Regar 3 veces por semana');
      expect(wateringRequirement).toBeDefined();
    });
  });
});
