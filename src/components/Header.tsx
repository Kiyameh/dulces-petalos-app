import { Link } from 'react-router'
import styles from './Header.module.css'

const Header = () => {
    return (
        <header className={styles.header} role="banner">
            <nav role="navigation">
                <Link to="/">
                    <img src="/logo.svg" alt="Logo de Dulces Pétalos" />
                </Link>
            </nav>
        </header>
    )
}
    
export default Header