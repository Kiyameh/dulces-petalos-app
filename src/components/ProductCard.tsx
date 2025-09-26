import type Product from "../types/product"
import styles from "./ProductCard.module.css"


/**
 * @version 1
 * @description Card de producto con nombre, nombre científico, foto, precio y enlace a la página de producto.   
 */
const ProductCard = ({ product }: { product: Product }) => {
  const { name, binomialName, price, imgUrl } = product

  return (
    <article className={styles.card} role="article" aria-label={`Producto ${name}`}>
      <header className={styles.header}>
        <h4 className="heading-4">{name}</h4>
        <p className="body-1">{binomialName}</p>
      </header>
      <div className={styles.imgContainer}>
        <p className={`${styles.newBadge} body-2`} role="status" aria-label="Producto nuevo">NUEVO</p>
        <img className={styles.image} src={imgUrl} alt={`Foto de ${name}`} />
        <p className={`${styles.priceBadge} heading-6`} role="text" aria-label={`Precio ${price.toFixed(2)} euros`}>{`€${price.toFixed(2)}`}</p>
        <a href={`/product/${product.id}`} className={styles.goToLink} aria-label={`Ver detalles de ${name}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M17 7L7 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 7H17V16" stroke=" black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  )
}

export default ProductCard
