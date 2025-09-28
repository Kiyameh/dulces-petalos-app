import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'react-router'
import { getAllProducts } from '../services/productService'
import type Product from '../types/product'

import ProductListSkeleton from '../components/ProductList/ProductListSkeleton'
import ProductList from '../components/ProductList/ProductList'
import Header from '../components/Header/Header'
import SearchBar from '../components/SearchBar/SearchBar'

import styles from './pages.module.css'

/**
 * @version 1
 * @description Componente que obtiene los datos de la API y renderiza la página de listado de productos 
 */

const ProductListPage = () => {
    const [searchParams] = useSearchParams()
    const [productsPromise, setProductsPromise] = useState<Promise<Product[]> | null>(null)
    const [error, setError] = useState<string | null>(null)

    const searchTerm = searchParams.get('search') || ''

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setError(null)
                return await getAllProducts()
            } catch (error) {
                console.error('Error fetching products:', error)
                setError('Error al cargar los productos')
                throw error
            }
        }
        setProductsPromise(fetchProducts())
    }, [])


    return (
        <div>
            <Header />
            <div className={styles.bg}>
                <main className={styles.content}>
                    <SearchBar />
                    {error ? (
                        <p>{error}</p>
                    ) : productsPromise ? (
                        <div className={styles.productGrid} role="product-grid" aria-label="product-grid">
                            <Suspense fallback={<ProductListSkeleton />}>
                                <ProductList productsPromise={productsPromise} searchTerm={searchTerm} />
                            </Suspense>
                        </div>
                    ) : null}
                </main>
            </div>
        </div>
    )
}

export default ProductListPage
