import styles from "./Breadcrumb.module.css"

/**
 * @version 1
 * @description Skeleton para el breadcrumb
 */
const BreadcrumbSkeleton = () => {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb cargando" aria-busy="true">
      <span className={`${styles.skeletonBar} ${styles.skeletonBarShort}`} aria-hidden="true" />
      <span className="icon" aria-hidden="true">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L1 13" stroke="#606060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={`${styles.skeletonBar} ${styles.skeletonBarLong}`} aria-hidden="true" />
    </nav>
  )
}

export default BreadcrumbSkeleton