import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import axios from "axios"

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const [searchParams, setSearchParams] = useSearchParams()

  const selectedSection = searchParams.get("section") || "All"

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/products/")
      .then((response) => {
        setProducts(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setError("Products load nahi ho pa rahe hain.")
        setLoading(false)
      })
  }, [])

  const changeSection = (section) => {
    if (section === "All") {
      setSearchParams({})
    } else {
      setSearchParams({ section })
    }

    setCategory("All")
  }

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || []

    const existingItem = existingCart.find(
      (item) => item.id === product.id
    )

    let updatedCart

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        alert("Maximum available stock already added.")
        return
      }

      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              stock: product.stock,
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
          section: product.section,
          stock: product.stock,
          quantity: 1,
        },
      ]
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    )

    window.dispatchEvent(
      new Event("cartUpdated")
    )

    alert("Product added to cart!")
  }

  const categories = [
    "All",
    ...new Set(
      products
        .filter(
          (product) =>
            selectedSection === "All" ||
            product.section === selectedSection
        )
        .map((product) => product.category)
    ),
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSection =
      selectedSection === "All" ||
      product.section === selectedSection

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesCategory =
      category === "All" ||
      product.category === category

    return (
      matchesSection &&
      matchesSearch &&
      matchesCategory
    )
  })

  return (
    <section
      id="products"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Heading */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold tracking-[0.2em] text-orange-600">
          OUR COLLECTION
        </p>

        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Explore Our Products
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-gray-600">
          Find the perfect style for every occasion.
        </p>
      </div>

      {/* Men Women Kids */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {["All", "Men", "Women", "Kids"].map(
          (section) => (
            <button
              key={section}
              onClick={() =>
                changeSection(section)
              }
              className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
                selectedSection === section
                  ? "bg-gray-900 text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              {section}
            </button>
          )
        )}
      </div>

      {/* Search + Category */}
      {!loading && !error && (
        <div className="mb-10 flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="md:w-56">
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-600">
          Products loading...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-600">
          {error}
        </p>
      )}

      {/* No Products */}
      {!loading &&
        !error &&
        filteredProducts.length === 0 && (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="text-5xl">
              🔍
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              No Products Found
            </h2>

            <p className="mt-2 text-gray-600">
              Try another section, search or category.
            </p>
          </div>
        )}

      {/* Products */}
      {!loading &&
        !error &&
        filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(
              (product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                 
                    <div className="h-80 overflow-hidden bg-gray-100">
                    <Link
                      to={`/products/${product.id}`}
                    >
                      <img
                        src={
                          product.image.startsWith(
                            "http"
                          )
                            ? product.image
                            : `http://127.0.0.1:8000${product.image}`
                        }
                        alt={product.name}
                       
                         className="h-full w-full object-contain bg-gray-100 transition duration-300 hover:scale-105"
                      />
                     
                    </Link>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium uppercase tracking-wide text-orange-600">
                        {product.category}
                      </p>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {product.section}
                      </span>
                    </div>

                    <Link
                      to={`/products/${product.id}`}
                    >
                      <h3 className="mt-2 text-xl font-semibold text-gray-900 transition hover:text-orange-600">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {product.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <p className="text-xl font-bold text-gray-900">
                        ₹{product.price}
                      </p>

                      <button
                        onClick={() =>
                          addToCart(product)
                        }
                        disabled={
                          product.stock === 0
                        }
                        className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                      >
                        {product.stock === 0
                          ? "Out of Stock"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
    </section>
  )
}

export default ProductList