import type Product from "../types/product";


export const ORQUIDEA: Product = {
  id: "ZmGrkLRPXOTpxsU4jjAcv",
  name: "Orquídea",
  binomialName: "Ophrys tenthredinifera",
  price: 4.95,
  imgUrl: "https://dulces-petalos.jakala.es/images/ophrysTenthredinifera.jpeg",
  wateringsPerWeek: 1,
  fertilizerType: "phosphorus",
  heightInCm: 30
};

export const ROSA: Product = {
  id: "pMZMhe_ZaAPZoaCCtlDrg",
  name: "Rosa china",
  binomialName: "Rosa chinensis",
  price: 11.45,
  imgUrl: "https://dulces-petalos.jakala.es/images/rosaChinensis.jpeg",
  wateringsPerWeek: 3,
  fertilizerType: "nitrogen",
  heightInCm: 195
}

export const PRODUCTS: Product[] = [ORQUIDEA, ROSA];