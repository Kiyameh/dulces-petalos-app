import styles from "./ProductDetail.module.css"

/**
 * @version 1
 * @description Skeleton para ProductDetail
 * @warning El componente debe usarse dentro de un contexto de Suspense con promesa
 */
const ProductDetailSkeleton = () => {
  return (
    <article className={styles.detail} role="article" aria-label="Cargando detalle del producto" aria-busy="true" data-testid="product-detail-skeleton">
      <div className={styles.imageSkeleton} role="presentation" aria-label="Cargando imagen del producto" data-testid="skeleton-image"></div>
      <div className={styles.content} data-testid="skeleton-content">
        <header data-testid="skeleton-header">
          <div className={styles.titleSkeleton} role="presentation" aria-label="Cargando nombre del producto" data-testid="skeleton-title"></div>
          <div className={styles.subtitleSkeleton} role="presentation" aria-label="Cargando nombre científico" data-testid="skeleton-subtitle"></div>
        </header>
        <div className={styles.priceSkeleton} role="presentation" aria-label="Cargando precio" data-testid="skeleton-price"></div>
        <ul className={styles.requirements} data-testid="skeleton-requirements">
          <li className={styles.requirementSkeleton} role="presentation" aria-label="Cargando información de riego" data-testid="skeleton-requirement-1"></li>
          <li className={styles.requirementSkeleton} role="presentation" aria-label="Cargando información de fertilizante" data-testid="skeleton-requirement-2"></li>
        </ul>
        <div className={styles.buttonSkeleton} role="presentation" aria-label="Cargando botón" data-testid="skeleton-button"></div>
      </div>
    </article>
  )
}

export default ProductDetailSkeleton