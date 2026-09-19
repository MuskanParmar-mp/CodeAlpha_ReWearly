import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

function Checkout() {
  const navigate = useNavigate()

  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [pincode, setPincode] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || []

    const savedUser =
      JSON.parse(localStorage.getItem("user"))

    setCart(savedCart)
    setUser(savedUser)

    if (savedUser?.username) {
      setName(savedUser.username)
    }
  }, [])

  const totalPrice = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  )

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const placeOrder = async (e) => {
    e.preventDefault()
    setError("")

    if (!user) {
      navigate("/login")
      return
    }

    if (cart.length === 0) {
      setError("Your cart is empty.")
      return
    }

    if (
      !name.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !pincode.trim()
    ) {
      setError("Please fill all delivery details.")
      return
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.")
      return
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode.")
      return
    }

    setLoading(true)

    const items = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }))

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/orders/create/",
        {
          user_id: user.user_id,
          items: items,
        }
      )

      localStorage.removeItem("cart")

      window.dispatchEvent(
        new Event("cartUpdated")
      )

      alert(
        `Order placed successfully! Order #${response.data.order_id}`
      )

      navigate("/my-orders")
    } catch (error) {
      console.log(error)

      if (error.response?.data?.error) {
        setError(error.response.data.error)
      } else {
        setError(
          "Order place nahi ho pa raha hai. Please try again."
        )
      }
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <section className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
          <div className="text-6xl">🛒</div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-gray-600">
            Add some products before proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-full bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
            ReWearly Checkout
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Complete Your Order
          </h1>

          <p className="mt-3 text-gray-600">
            Enter your delivery details and review your order.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={placeOrder}>
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Delivery Details */}
            <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2 sm:p-8">

              <h2 className="text-xl font-bold text-gray-900">
                Delivery Details
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="10-digit phone number"
                    maxLength="10"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>

                  <textarea
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    placeholder="House no., street, area..."
                    rows="4"
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    City
                  </label>

                  <input
                    type="text"
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    placeholder="Enter city"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Pincode
                  </label>

                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) =>
                      setPincode(e.target.value)
                    }
                    placeholder="6-digit pincode"
                    maxLength="6"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

              </div>
            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-2xl bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                  >
                    <img
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : `http://127.0.0.1:8000${item.image}`
                      }
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        ₹
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-5">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="mt-4 flex justify-between">
                  <span className="text-lg font-semibold">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-orange-600">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-7 w-full rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {loading
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

              <Link
                to="/cart"
                className="mt-4 block text-center text-sm font-medium text-gray-600 transition hover:text-orange-600"
              >
                ← Back to Cart
              </Link>

            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Checkout