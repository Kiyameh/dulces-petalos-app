import ProductCardSkeleton from './ProductCardSkeleton'

/**
 * @version 1
 * @description Skeleton para ProductList
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
