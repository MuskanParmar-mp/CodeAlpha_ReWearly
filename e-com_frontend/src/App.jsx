import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./components/Home"
import ProductList from "./components/ProductList"
import ProductDetails from "./components/ProductDetails"
import Cart from "./components/Cart"

import Login from "./components/Login"
import Register from "./components/Register"
import Checkout from "./components/Checkout"
import MyOrders from "./components/MyOrders"
import Footer from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Home />
              <ProductList />
            </>
          }
        />

        <Route
          path="/products"
          element={<ProductList />}
        />

        <Route
          path="/products/:id"
           element={<ProductDetails />}
         />

          {/* Cart Page */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Checkout */}
        <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>

    
    <Route
  path="/my-orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>

      </Routes>

       <Footer />

    </BrowserRouter>
  )
}

export default App