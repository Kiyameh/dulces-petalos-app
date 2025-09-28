import { use } from "react"
import { Link } from "react-router"
import styles from "./Breadcrumb.module.css"
import type Product from "../../types/product"

/**
 * @version 1
 * @description Componente que muestra el breadcrumb de navegación
 * @param productPromise Promise<Product>
 */
const Breadcrumb = ({ productPromise }: { productPromise: Promise<Product | null> }) => {
  const product = use(productPromise)

  if (!product) {
    return null
  }

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb" role="breadcrumb">
      <Link to="/" className="body-1" aria-label="Inicio">Inicio</Link>
      <span className="icon">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="hidden">
          <path d="M1 1L7 7L1 13" stroke="#606060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="body-1" aria-label={product.name}>{product.name}</p>
    </nav>
  )
}

export default Breadcrumb
