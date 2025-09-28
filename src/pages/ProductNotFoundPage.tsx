import Header from "../components/Header/Header";

import styles from "./Pages.module.css";

/**
 * @version 1
 * @description Componente que renderiza la página de error al no definir un producto en la url
 */
const ProductNotFoundPage = () => {
  return (
    <div>
      <Header />
      <div className={styles.bg}>
        <main className={styles.content}>
          <p>Ingrese un id válido</p>
        </main>
      </div>
    </div>
  )
}

export default ProductNotFoundPage
