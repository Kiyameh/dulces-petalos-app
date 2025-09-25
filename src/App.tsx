import { useEffect} from "react";
import { getAllProducts, getProductById } from "./services/productService";

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
    <>
      <h1>Dulces pétalos</h1>
    </>
  )
}

export default App
