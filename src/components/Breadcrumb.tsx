import { use } from "react"
import type Product from "../types/product"
import styles from "./Breadcrumb.module.css"
import { Link } from "react-router"

/**
 * @version 1
 * @description Componente que muestra el breadcrumb de navegación
 * @param productPromise Promise<Product>
 */
const Breadcrumb = ({ productPromise }: { productPromise: Promise<Product> }) => {
  const product = use(productPromise)

  if (!product) {
    return null
  }

  return (
    <nav className={styles.breadcrumb}>
      <Link to="/" className="body-1">Inicio</Link>
      <span className="icon">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L1 13" stroke="#606060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="body-1">{product.name}</p>
    </nav>
  )
}

export default Breadcrumb
