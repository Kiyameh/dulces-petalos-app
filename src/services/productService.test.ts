import axios from "axios";
import { getAllProducts, getProductById, API_BASE_URL } from "./productService";
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ORQUIDEA, PRODUCTS } from "../utils/testUtils";

vi.mock('axios');

describe('getAllProducts', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* Respuesta exitosa */
  it('should return all products', async () => {

    vi.mocked(axios.get).mockResolvedValue({
      data: PRODUCTS
    })
    const response = await getAllProducts();
    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/product`);
    expect(response).toEqual(PRODUCTS);

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
    const response = await getProductById("ZmGrkLRPXOTpxsU4jjAcv");
    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/product/ZmGrkLRPXOTpxsU4jjAcv`);
    expect(response).toEqual(ORQUIDEA);

  })

  /* Error de fetch */
  it('should throw an error', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Error'));
    await expect(getProductById("ZmGrkLRPXOTpxsU4jjAcv")).rejects.toThrow('Error');
  })
})