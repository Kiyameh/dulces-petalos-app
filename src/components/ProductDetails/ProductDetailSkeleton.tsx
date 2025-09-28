import styles from "./ProductDetail.module.css"

/**
 * @version 1
 * @description Skeleton para ProductDetail
 * @warning El componente debe usarse dentro de un contexto de Suspense con promesa
 */
const ProductDetailSkeleton = () => {
  return (
    <article className={styles.detail} role="article" aria-label="Cargando detalle del producto" aria-busy="true">
      <div className={styles.imageSkeleton} role="presentation" aria-hidden="true" data-testid="skeleton-image"></div>
      <div className={styles.content} role="presentation" aria-hidden="true" data-testid="skeleton-content">
        <header >
          <div className={styles.titleSkeleton} role="presentation" aria-hidden="true"></div>
          <div className={styles.subtitleSkeleton} role="presentation" aria-hidden="true"></div>
        </header>
        <div className={styles.priceSkeleton} role="presentation" aria-hidden="true"></div>
        <ul className={styles.requirements} role="presentation" aria-hidden="true">
          <li className={styles.requirementSkeleton} role="presentation" aria-hidden="true"></li>
          <li className={styles.requirementSkeleton} role="presentation" aria-hidden="true"></li>
        </ul>
        <div className={styles.buttonSkeleton} role="presentation" aria-hidden="true"></div>
      </div>
    </article>
  )
}

export default ProductDetailSkeleton