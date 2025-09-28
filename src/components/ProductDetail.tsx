import { use } from "react"
import type Product from "../types/product"
import styles from "./ProductDetail.module.css"

/**
 * @version 1
 * @description Panel de detalles de un producto
 * @warning El componente debe usarse dentro de un contexto de Suspense con promesa
 * @param productPromise Promise<Product>
 */
const ProductDetail = ({ productPromise }: { productPromise: Promise<Product> }) => {
  const product = use(productPromise)

  const waterText = product.wateringsPerWeek === 1 ? 'vez' : 'veces'

  return (
    <article className={styles.detail}>
      <img className={styles.img} src={product.imgUrl} alt={product.name} />
      <div className={styles.content}>
        <header>
          <h1 className="heading-1">{product.name}</h1>
          <p className="body-1">{product.binomialName}</p>
        </header>
        <h4 className="heading-4">{`€${product.price}`}</h4>
        <ul className={styles.requirements}>
          <li>{`Regar ${product.wateringsPerWeek} ${waterText} por semana`}</li>
          <li>{`Fertilizar con ${product.fertilizerType}`}</li>
        </ul>
        <button className={styles.button}>
          <span className="body-2">Añadir al carrito</span>
        </button>
      </div>
    </article>
  )
}

export default ProductDetail
