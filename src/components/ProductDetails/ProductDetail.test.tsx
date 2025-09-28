import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, type MockedFunction } from 'vitest';
import { use } from 'react';
import ProductDetail from './ProductDetail';
import { ORQUIDEA, ROSA } from '../../utils/testUtils';
import ProductDetailSkeleton from './ProductDetailSkeleton';


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

describe('ProductDetail Component', () => {
  beforeEach(() => {
    mockUse.mockReturnValue(ORQUIDEA);
    const productPromise = Promise.resolve(ORQUIDEA);
    render(<ProductDetail productPromise={productPromise} />);
  });

  describe('Rendering', () => {

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
      expect(productImage.getAttribute('alt')).toBe('Imagen de Orquídea');
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
  })

  describe('Structure', () => {
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

  describe('Rendering with multiple waterings per week', () => {
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

  describe('Accessibility', () => {
    it('should have proper aria labels for heading', () => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeDefined();
      expect(heading.getAttribute('aria-label')).toBe('Nombre del producto: Orquídea');
    });
    it('should have proper aria labels for list items', () => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
      expect(listItems[0].getAttribute('aria-label')).toBe('Regar 1 vez por semana');
      expect(listItems[1].getAttribute('aria-label')).toBe('Fertilizar con phosphorus');
    });
    it('should have proper aria labels for button', () => {
      const button = screen.getByRole('button');
      expect(button).toBeDefined();
      expect(button.getAttribute('aria-label')).toBe('Añadir al carrito');
    });
    it('should have proper aria labels for binomial name', () => {
      const binomialName = screen.getByText('Ophrys tenthredinifera');
      expect(binomialName).toBeDefined();
      expect(binomialName.getAttribute('aria-label')).toBe('Nombre científico del producto: Ophrys tenthredinifera');
    });
    it('should have proper aria labels for price', () => {
      const price = screen.getByText('€4.95');
      expect(price).toBeDefined();
      expect(price.getAttribute('aria-label')).toBe('Precio del producto: €4.95');
    });
  })
});


describe('ProductDetailSkeleton Component', () => {
  beforeEach(() => {
    render(<ProductDetailSkeleton />);
  });

  describe("Rendering", () => {
    it('should render the skeleton article with loading state', () => {
      const skeletonElement = screen.getByRole('article');
      expect(skeletonElement).toBeDefined();
    });
  })

  describe("Structure", () => {
    it('should render all skeleton elements with proper structure', () => {
      const image = screen.getByTestId('skeleton-image');
      const content = screen.getByTestId('skeleton-content');

      const header = content.querySelector('header');

      const title = header?.querySelector(':nth-child(1)');
      const subtitle = header?.querySelector(':nth-child(2)');

      const price = content.querySelector(':nth-child(2)');
      const requirements = content.querySelector(':nth-child(3)');
      const button = content.querySelector(':nth-child(4)');

      expect(image).toBeDefined();
      expect(content).toBeDefined();
      expect(header).toBeDefined();
      expect(title).toBeDefined();
      expect(subtitle).toBeDefined();
      expect(price).toBeDefined();
      expect(requirements).toBeDefined();
      expect(button).toBeDefined();
    });
  })

  describe("Accessibility", () => {
    it('should article have proper aria attributes', () => {
      const skeletonElement = screen.getByRole('article');
      expect(skeletonElement.getAttribute('aria-label')).toBe('Cargando detalle del producto');
      expect(skeletonElement.getAttribute('aria-busy')).toBe('true');
    })

    it('shoul decorative elements have aria-hidden attribute', () => {
      const skeletonElement = screen.getByRole('article');
      const allDecorativeElements = skeletonElement.querySelectorAll('[aria-hidden="true"]');
      expect(allDecorativeElements.length).toBe(9);
    })
  })
});