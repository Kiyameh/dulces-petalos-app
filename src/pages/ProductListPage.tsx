import { useEffect, useState, Suspense } from 'react'
import { getAllProducts } from '../services/productService'
import type Product from '../types/product'

import ProductListSkeleton from '../components/ProductListSkeleton'
import ProductList from '../components/ProductList'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'

import styles from './ProductListPage.module.css'

/**
 * @version 1
 * @description Componente que obtiene los datos de la API y renderiza la página de listado de productos 
 */

const ProductListPage = () => {
    const [productsPromise, setProductsPromise] = useState<Promise<Product[]> | null>(null)
    const [error, setError] = useState<string | null>(null)

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
                        <div className={styles.productGrid}>
                            <Suspense fallback={<ProductListSkeleton />}>
                                <ProductList productsPromise={productsPromise} />
                            </Suspense>
                        </div>
                    ) : null}
                </main>
            </div>
        </div>
    )
}

export default ProductListPage
