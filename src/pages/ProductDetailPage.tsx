import { Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getProductById } from '../services/productService'
import type Product from '../types/product'

import Header from '../components/Header'
import ProductDetail from '../components/ProductDetail'
import ProductDetailSkeleton from '../components/ProductDetailSkeleton'

import styles from './Pages.module.css'
import Breadcrumb from '../components/Breadcrumb'
import BreadcrumbSkeleton from '../components/BreadcrumbSkeleton'

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>()

    const [productPromise, setProductPromise] = useState<Promise<Product> | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setError(null)
                return await getProductById(id!)
            } catch (error) {
                console.error('Error fetching product:', error)
                setError(`Error al cargar el producto`)
                return null
            }
        }

        setProductPromise(fetchProduct() as Promise<Product> | null)

    }, [id])

    return (
        <div>
            <Header />
            <div className={styles.bg}>

                <main className={styles.content}>
                    <Suspense fallback={<BreadcrumbSkeleton />}>
                        {productPromise && <Breadcrumb productPromise={productPromise} />}
                    </Suspense>
                    {error ? (
                        <p>{error}</p>
                    ) : productPromise ? (
                        <Suspense fallback={<ProductDetailSkeleton />}>
                            <ProductDetail productPromise={productPromise} />
                        </Suspense>
                    ) : null}
                </main>
            </div>
        </div>
    )
}

export default ProductDetailPage
