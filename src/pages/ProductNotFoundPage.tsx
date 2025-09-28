import Header from "../components/Header";
import styles from "./Pages.module.css";

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
