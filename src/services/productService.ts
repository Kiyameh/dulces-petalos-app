import axios from "axios";
import type Product from "../types/product";

export const API_BASE_URL = 'https://dulces-petalos.jakala.es/api/v1';


/**
 * @description Obtiene todos los productos de la API
 * @return Product[]
 */

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product`);
    const { data }: { data: Product[] } = response;
    return data;

  } catch (error) {
    console.log(error)
    throw error
  }
}


/**
 * @description Obtiene un producto por su id de la API
 * @param id Id del producto
 * @return Product
 */

export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/${id}`);
    const { data }: { data: Product } = response;
    return data;

  } catch (error) {
    console.log(error)
    throw error
  }
}