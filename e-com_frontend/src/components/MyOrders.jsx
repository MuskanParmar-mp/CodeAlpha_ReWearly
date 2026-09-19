import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("user")
    )

    if (!savedUser) {
      setError("Please login to view your orders.")
      setLoading(false)
      return
    }

    axios
      .get(
        `http://127.0.0.1:8000/orders/${savedUser.user_id}/`
      )
      .then((response) => {
        setOrders(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setError("Orders load nahi ho pa rahe hain.")
        setLoading(false)
      })
  }, [])

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading your orders...
        </p>
      </div>
    )
  }

  // Error
  if (error) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl">📦</div>

          <p className="mt-4 text-red-600">
            {error}
          </p>

          <Link
            to="/login"
            className="mt-6 inline-block rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Login
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
            ReWearly
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            My Orders
          </h1>

          <p className="mt-2 text-gray-600">
            View your previous orders and order details.
          </p>
        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="text-6xl">
              📦
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No Orders Yet
            </h2>

            <p className="mt-3 text-gray-600">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-block rounded-full bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Start Shopping
            </Link>
          </div>
        ) : (

          /* Orders */
          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="rounded-2xl bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
              >

                {/* Order Header */}
                <div className="flex flex-col gap-5 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">

                  {/* Order ID */}
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-gray-900">
                      #{order.id}
                    </h2>
                  </div>

                  {/* Order Date */}
                  <div>
                    <p className="text-sm text-gray-500">
                      Order Date
                    </p>

                    <p className="mt-1 font-medium text-gray-800">
                      {new Date(
                        order.created_at
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-sm text-gray-500">
                      Status
                    </p>

                    <span
                      className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                </div>

                {/* Order Items */}
                <div className="mt-5 space-y-4">

                  {order.items.map((item) => (

                    <div
                      key={item.id}
                      className="flex flex-col gap-3 rounded-xl bg-gray-50 p-4 transition hover:bg-orange-50 sm:flex-row sm:items-center sm:justify-between"
                    >

                      {/* Product Information */}
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.product_name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-600">
                          ₹{Number(item.price).toFixed(2)} ×{" "}
                          {item.quantity}
                        </p>
                      </div>

                      {/* Item Total */}
                      <p className="font-semibold text-gray-900">
                        ₹
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toFixed(2)}
                      </p>

                    </div>

                  ))}

                </div>

                {/* Order Total */}
                <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">

                  <span className="text-lg font-semibold text-gray-900">
                    Order Total
                  </span>

                  <span className="text-xl font-bold text-orange-600">
                    ₹
                    {Number(
                      order.total_amount
                    ).toFixed(2)}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </section>
  )
}

export default MyOrders