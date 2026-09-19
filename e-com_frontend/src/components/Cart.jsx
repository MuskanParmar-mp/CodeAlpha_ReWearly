import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Cart() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []
    setCart(savedCart)
  }, [])

 const updateCart = (id, change) => {
  const updatedCart = cart
    .map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + change

        if (change > 0 && newQuantity > item.stock) {
          alert(
            `Only ${item.stock} items available for ${item.name}.`
          )
          return item
        }

        return {
          ...item,
          quantity: newQuantity,
        }
      }

      return item
    })
    .filter((item) => item.quantity > 0)

  setCart(updatedCart)
  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  )

  window.dispatchEvent(new Event("cartUpdated"))
}

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id)

    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  )

  return (
    <section className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Heading */}

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
            Your Shopping Bag
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
        </div>


        {cart.length === 0 ? (

          /* Empty Cart */

          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">

            <div className="text-6xl">
              🛒
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-3 text-gray-600">
              Looks like you haven't added anything yet.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-block rounded-full bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-3">

            {/* Cart Items */}

            <div className="space-y-5 lg:col-span-2">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-2xl bg-white p-4 shadow-sm sm:flex-row"
                >

                  {/* Image */}

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full rounded-xl object-cover sm:h-32 sm:w-32"
                  />

                  {/* Details */}

                  <div className="flex flex-1 flex-col justify-between">

                    <div>
                      <p className="text-sm uppercase tracking-wide text-orange-600">
                        {item.category}
                      </p>

                      <h2 className="mt-1 text-xl font-semibold text-gray-900">
                        {item.name}
                      </h2>

                      <p className="mt-2 font-semibold">
                        ₹{item.price}
                      </p>
                    </div>


                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">

                      {/* Quantity */}

                      <div className="flex items-center overflow-hidden rounded-full border border-gray-300">

                        <button
                          onClick={() => updateCart(item.id, -1)}
                          className="px-4 py-2 text-lg hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="px-4 font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateCart(item.id, 1)}
                          className="px-4 py-2 text-lg hover:bg-gray-100"
                        >
                          +
                        </button>

                      </div>


                      {/* Remove */}

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-medium text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>


            {/* Summary */}

            <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 flex justify-between border-b pb-4">
                <span className="text-gray-600">
                  Items
                </span>

                <span className="font-medium">
                  {cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="mt-4 flex justify-between">

                <span className="text-lg font-semibold">
                  Total
                </span>

                <span className="text-2xl font-bold text-orange-600">
                  ₹{totalPrice.toFixed(2)}
                </span>

              </div>
                      <Link
  to="/checkout"
  className="mt-7 block w-full rounded-full bg-gray-900 px-6 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
>
  Proceed to Checkout
</Link>
            </div>

          </div>

        )}

      </div>

    </section>
  )
}

export default Cart