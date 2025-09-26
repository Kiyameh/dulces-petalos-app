import axios from "axios";
import { getAllProducts, getProductById, API_BASE_URL } from "./productService";
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type Product from "../types/product";

vi.mock('axios');

const ORQUIDEA: Product = {
  id: "ZmGrkLRPXOTpxsU4jjAcv",
  name: "Orquídea",
  binomialName: "Ophrys tenthredinifera",
  price: 4.95,
  imgUrl: "https://dulces-petalos.jakala.es/images/ophrysTenthredinifera.jpeg",
  wateringsPerWeek: 1,
  fertilizerType: "phosphorus",
  heightInCm: 30
}
const ROSA: Product = {
  id: "pMZMhe_ZaAPZoaCCtlDrg",
  name: "Rosa china",
  binomialName: "Rosa chinensis",
  price: 11.45,
  imgUrl: "https://dulces-petalos.jakala.es/images/rosaChinensis.jpeg",
  wateringsPerWeek: 3,
  fertilizerType: "nitrogen",
  heightInCm: 195
}

describe('getAllProducts', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* Respuesta exitosa */
  it('should return all products', async () => {

    vi.mocked(axios.get).mockResolvedValue({
      data: [ORQUIDEA, ROSA]
    })
    const products = await getAllProducts();
    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/product`);
    expect(products).toEqual([ORQUIDEA, ROSA]);

  })

  /* Error de fetch */
  it('should throw an error', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Error'));
    await expect(getAllProducts()).rejects.toThrow('Error');
  })
})

describe('getProductById', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* Respuesta exitosa */
  it('should return a product', async () => {

    vi.mocked(axios.get).mockResolvedValue({
      data: ORQUIDEA
    })
    const product = await getProductById("ZmGrkLRPXOTpxsU4jjAcv");
    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/product/ZmGrkLRPXOTpxsU4jjAcv`);
    expect(product).toEqual(ORQUIDEA);

  })

  /* Error de fetch */
  it('should throw an error', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Error'));
    await expect(getProductById("ZmGrkLRPXOTpxsU4jjAcv")).rejects.toThrow('Error');
  })
})