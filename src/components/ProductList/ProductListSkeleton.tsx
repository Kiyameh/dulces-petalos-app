import ProductCardSkeleton from '../ProductCard/ProductCardSkeleton'

/**
 * @version 1
 * @description Skeleton para ProductList
 * @warning El componente debe usarse dentro de un contexto de Suspense con promesa
 */
const ProductListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  )
}

export default ProductListSkeleton
