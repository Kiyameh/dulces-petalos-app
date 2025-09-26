import { useParams } from 'react-router'
import Header from '../components/Header'

/**
 * TODO
 */

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>()

    return (
        <div>
            <Header />
            <main>
                <h1>Página de Detalles del Producto</h1>
                <p>ID del producto: {id}</p>
            </main>
        </div>
    )
}

export default ProductDetailPage
