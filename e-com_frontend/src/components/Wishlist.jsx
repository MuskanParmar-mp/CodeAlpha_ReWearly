import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Wishlist() {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || []
  })

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    )

    setWishlist(updatedWishlist)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

    window.dispatchEvent(new Event("wishlistUpdated"))
  }

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || []

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    )

    let updatedCart

    if (existingProduct) {
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
          ...product,
          stock: product.stock || 10,
          quantity: 1,
        },
      ]
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))

    alert(`${product.name} added to cart!`)
  }

  useEffect(() => {
    const updateWishlist = () => {
      const savedWishlist =
        JSON.parse(localStorage.getItem("wishlist")) || []

      setWishlist(savedWishlist)
    }

    window.addEventListener(
      "wishlistUpdated",
      updateWishlist
    )

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        updateWishlist
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f8f6f2] px-4 py-12 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-orange-600">
            YOUR FAVORITES
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            My Wishlist ❤️
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Save your favorite styles and shop them whenever you want.
          </p>
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-3xl bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-5xl">
              🤍
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="mt-3 text-gray-600">
              Looks like you haven't added anything to your wishlist yet.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-block rounded-full bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">
                {wishlist.length}{" "}
                {wishlist.length === 1
                  ? "item"
                  : "items"}{" "}
                in your wishlist
              </p>

              <button
                onClick={() => {
                  localStorage.removeItem("wishlist")
                  setWishlist([])
                  window.dispatchEvent(
                    new Event("wishlistUpdated")
                  )
                }}
                className="text-sm font-semibold text-red-500 transition hover:text-red-700"
              >
                Clear Wishlist
              </button>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {wishlist.map((product) => {

                const imageUrl = product.image?.startsWith("http")
                  ? product.image
                  : `http://127.0.0.1:8000${product.image}`

                return (
                  <div
                    key={product.id}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >

                    {/* Image */}
                    <div className="relative h-72 overflow-hidden bg-gray-100">

                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
                      />

                      {/* Remove */}
                      <button
                        onClick={() =>
                          removeFromWishlist(product.id)
                        }
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-md transition hover:scale-110"
                        aria-label="Remove from wishlist"
                      >
                        ❤️
                      </button>

                    </div>

                    {/* Details */}
                    <div className="p-5">

                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                        {product.category || "Fashion"}
                      </p>

                      <Link
                        to={`/products/${product.id}`}
                        className="mt-2 block"
                      >
                        <h2 className="line-clamp-2 text-lg font-bold text-gray-900 transition hover:text-orange-600">
                          {product.name}
                        </h2>
                      </Link>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-yellow-500">
                          ★★★★★
                        </span>

                        <span className="text-xs text-gray-500">
                          4.8
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">

                        <p className="text-xl font-bold text-gray-900">
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </p>

                        {product.section && (
                          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                            {product.section}
                          </span>
                        )}

                      </div>

                      {/* Buttons */}
                      <div className="mt-5 flex gap-3">

                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                        >
                          🛒 Add to Cart
                        </button>

                        <Link
                          to={`/products/${product.id}`}
                          className="flex items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-orange-500 hover:text-orange-600"
                        >
                          View
                        </Link>

                      </div>

                    </div>
                  </div>
                )
              })}

            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Wishlist