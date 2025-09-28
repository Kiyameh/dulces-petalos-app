import { use } from 'react'
import type Product from '../../types/product'
import ProductCard from '../ProductCard/ProductCard'

/**
 * @version 2
 * @description Componente que renderiza la lista de productos de forma asíncrona con funcionalidad de filtrado
 * @warning El componente debe usarse dentro de un contexto de Suspense con promesa
 * @prop productsPromise - Promesa que devuelve un array de productos
 * @prop searchTerm - Término de búsqueda para filtrar productos por nombre o nombre científico
 */
const ProductList = ({
  productsPromise,
  searchTerm
}: {
  productsPromise: Promise<Product[]>
  searchTerm: string
}) => {
  const products = use(productsPromise)

  // Filtrar productos basado en el término de búsqueda
  const filteredProducts = products.filter((product) => {
    if (!searchTerm.trim()) return true

    const searchLower = searchTerm.toLowerCase()
    const nameMatch = product.name.toLowerCase().includes(searchLower)
    const binomialMatch = product.binomialName.toLowerCase().includes(searchLower)

    return nameMatch || binomialMatch
  })

  return (
    <>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  )
}

export default ProductList
