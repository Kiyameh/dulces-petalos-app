import { useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'
import styles from "./SearchBar.module.css"


/**
 * @version 2
 * @description Input de búsqueda que actualiza la URL con el término de búsqueda
 */
const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  useEffect(() => {
    const currentSearch = searchParams.get('search') || ''
    setSearchTerm(currentSearch)
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    // Actualizar la URL con el nuevo término de búsqueda
    if (value.trim()) {
      setSearchParams({ search: value })
    } else {
      // Quitar el parámetro search cundo input está vacío
      setSearchParams({})
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    // Submit no necesario
    e.preventDefault()
  }

  return (
    <div className={styles.inputLayout}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 21L15 15" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <form role="form" onSubmit={handleSubmit}>
        <input
          className="body-1"
          type="text"
          placeholder="Busca en nuestra tienda"
          value={searchTerm}
          onChange={handleInputChange}
          role="search"
        />
      </form>
    </div>
  )
}

export default SearchBar
