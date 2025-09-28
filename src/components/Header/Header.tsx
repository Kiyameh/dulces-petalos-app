import { Link } from 'react-router'
import styles from './Header.module.css'

/**
 * @version 1
 * @description Componente que renderiza el header de la aplicación con el logo y navegación a la página principal
 */

const Header = () => {
    return (
        <header className={styles.header} role="banner">
            <nav role="navigation">
                <Link to="/" aria-label="Inicio">
                    <img src="/logo.svg" alt="Logo de Dulces Pétalos" />
                </Link>
            </nav>
        </header>
    )
}

export default Header