import styles from "./ProductCard.module.css"

/**
 * @version 1
 * @description Skeleton para ProductCard  
 */
const ProductCardSkeleton = () => {
  return (
    <article className={styles.card} role="article" aria-label="Cargando producto" aria-busy="true" data-testid="product-card-skeleton">
      <header className={styles.header} data-testid="skeleton-header">
        <div className={styles.titleSkeleton} role="presentation" aria-label="Cargando nombre del producto" data-testid="skeleton-title"></div>
        <div className={styles.subtitleSkeleton} role="presentation" aria-label="Cargando nombre científico" data-testid="skeleton-subtitle"></div>
      </header>
      <div className={styles.imgContainer} data-testid="skeleton-image-container">
        <div className={styles.imageSkeleton} role="presentation" aria-label="Cargando imagen del producto" data-testid="skeleton-image"></div>
        <div className={styles.priceBadgeSkeleton} role="presentation" aria-label="Cargando precio" data-testid="skeleton-price"></div>
        <div className={styles.goToLinkSkeleton} role="presentation" aria-label="Cargando enlace" data-testid="skeleton-link"></div>
      </div>
    </article>
  )
}

export default ProductCardSkeleton