import { Routes, Route, Link } from "react-router-dom";
import CheckoutPage from "../pages/CheckoutPage";
import ProductsPage from "../pages/ProductsPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
