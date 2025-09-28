import { Routes, Route } from "react-router";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductNotFoundPage from "./pages/ProductNotFoundPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/product" element={<ProductNotFoundPage />} />
    </Routes>
  )
}

export default App
