import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)

  const navigate = useNavigate()

  const updateCartCount = () => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || []

    const count = savedCart.reduce(
      (total, item) => total + item.quantity,
      0
    )

    setCartCount(count)
  }

  useEffect(() => {
    const updateUser = () => {
      const savedUser =
        JSON.parse(localStorage.getItem("user"))

      setUser(savedUser)
    }

    const handleCartUpdate = () => {
      updateCartCount()
    }

    updateUser()
    updateCartCount()

    window.addEventListener(
      "userUpdated",
      updateUser
    )

    window.addEventListener(
      "cartUpdated",
      handleCartUpdate
    )

    return () => {
      window.removeEventListener(
        "userUpdated",
        updateUser
      )

      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate
      )
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setMenuOpen(false)
    navigate("/login")
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-gray-900"
        >
          Re<span className="text-orange-600">Wearly</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">

          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-orange-600"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-sm font-medium text-gray-700 transition hover:text-orange-600"
          >
            Shop
          </Link>

          <Link
            to="/products?section=Men"
            className="text-sm font-medium text-gray-700 transition hover:text-orange-600"
          >
            Men
          </Link>

          <Link
            to="/products?section=Women"
            className="text-sm font-medium text-gray-700 transition hover:text-orange-600"
          >
            Women
          </Link>

          <Link
            to="/products?section=Kids"
            className="text-sm font-medium text-gray-700 transition hover:text-orange-600"
          >
            Kids
          </Link>


          <Link
  to="/wishlist"
  className="text-sm font-medium text-gray-700 transition hover:text-orange-600"
>
  ❤️ Wishlist
</Link>

          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                Hi, {user.username}
              </span>

              <Link
                to="/my-orders"
                className="text-sm font-medium text-gray-700 transition hover:text-orange-600"
              >
                My Orders
              </Link>

              <button
                onClick={logout}
                className="text-sm font-medium text-red-500 transition hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 transition hover:text-orange-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-sm font-medium text-gray-700 transition hover:text-orange-600"
              >
                Register
              </Link>
            </>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            🛒 Cart

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-md p-2 text-2xl text-gray-800 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-5 md:hidden">
          <div className="flex flex-col gap-4">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700 hover:text-orange-600"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700 hover:text-orange-600"
            >
              Shop
            </Link>

            <Link
              to="/products?section=Men"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700 hover:text-orange-600"
            >
              Men
            </Link>

            <Link
              to="/products?section=Women"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700 hover:text-orange-600"
            >
              Women
            </Link>

            <Link
              to="/products?section=Kids"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700 hover:text-orange-600"
            >
              Kids
            </Link>

          <Link
  to="/wishlist"
  onClick={() => setMenuOpen(false)}
  className="font-medium text-gray-700 hover:text-orange-600"
>
  ❤️ Wishlist
</Link>
    

            {user ? (
              <>
                <p className="font-medium text-gray-800">
                  Hi, {user.username}
                </p>

                <Link
                  to="/my-orders"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-gray-700 hover:text-orange-600"
                >
                  My Orders
                </Link>

                <button
                  onClick={logout}
                  className="w-fit font-medium text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-gray-700 hover:text-orange-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-gray-700 hover:text-orange-600"
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile Cart */}
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="relative w-fit rounded-full bg-gray-900 px-5 py-3 font-medium text-white"
            >
              🛒 Cart

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar