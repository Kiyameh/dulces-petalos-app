import { useEffect} from "react";
import { Routes, Route } from "react-router";
import { getAllProducts, getProductById } from "./services/productService";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {

  useEffect(() => {
    getAllProducts().then((products) => {
     console.log("getAllProducts")
     console.log(products)
    });

    getProductById("ZmGrkLRPXOTpxsU4jjAcv").then((product) => {
      console.log("getProductById(Orquídea)")
      console.log(product)
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  )
}

export default App
