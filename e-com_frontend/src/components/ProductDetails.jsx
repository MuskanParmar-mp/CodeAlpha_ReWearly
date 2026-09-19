import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"

import axios from "axios"


function ProductDetails() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

 const addToCart = () => {
  const existingCart =
    JSON.parse(localStorage.getItem("cart")) || []

  const existingItem = existingCart.find(
    (item) => item.id === product.id
  )

  let updatedCart

  if (existingItem) {
    if (existingItem.quantity >= product.stock) {
      alert(
        `Only ${product.stock} items available for ${product.name}.`
      )
      return
    }

    updatedCart = existingCart.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )
  } else {
    updatedCart = [
      ...existingCart,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        stock: product.stock,
        quantity: 1,
      },
    ]
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  )

  window.dispatchEvent(new Event("cartUpdated"))

  navigate("/cart")
}



  useEffect(() => {

    axios
      .get(`http://127.0.0.1:8000/products/${id}/`)
      .then((response) => {
        setProduct(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setError("Product load nahi ho pa raha hai.")
        setLoading(false)
      })

  }, [id])


  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading product...
        </p>
      </div>
    )
  }


  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    )
  }


  return (

    <section className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto grid max-w-6xl gap-10 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">

        {/* Product Image */}

        <div className="overflow-hidden rounded-xl bg-gray-100">

          <img
  src={
    product.image.startsWith("http")
      ? product.image
      : `http://127.0.0.1:8000${product.image}`
  }
  alt={product.name}
  className="h-[400px] w-full object-contain bg-gray-100 sm:h-[500px]"
/>

        </div>


        {/* Product Information */}

        <div className="flex flex-col justify-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-600">
            {product.category}
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-5 text-3xl font-bold text-gray-900">
            ₹{product.price}
          </p>

          <p className="mt-6 leading-7 text-gray-600">
            {product.description}
          </p>

          <div className="mt-6">

            {product.stock > 0 ? (

              <p className="font-medium text-green-600">
                ✓ {product.stock} items available
              </p>

            ) : (

              <p className="font-medium text-red-600">
                Out of Stock
              </p>

            )}

          </div>


         <button
  onClick={addToCart}
  disabled={product.stock === 0}
  className="mt-8 w-full rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
>
  🛒 Add to Cart
</button>


          <Link
            to="/products"
            className="mt-4 text-center text-sm font-medium text-gray-600 hover:text-orange-600 sm:text-left"
          >
            ← Back to Products
          </Link>

        </div>

      </div>

    </section>

  )
}

export default ProductDetails