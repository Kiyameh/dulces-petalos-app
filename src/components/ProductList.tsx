import { use } from 'react'
import type Product from '../types/product'
import ProductCard from './ProductCard'

/**
 * @version 1
 * @description Componente que renderiza la lista de productos de forma asíncrona
 * @warning El componente debe usarse dentro de un contexto de Suspense con promesa
 * @prop productsPromise - Promesa que devuelve un array de productos
 */
const ProductList = ({ productsPromise }: { productsPromise: Promise<Product[]> }) => {
  const products = use(productsPromise)

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  )
}

export default ProductList
