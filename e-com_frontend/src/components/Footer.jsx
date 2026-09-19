import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold tracking-wide"
            >
              Re<span className="text-orange-500">Wearly</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Discover stylish clothing and trendy fashion
              for every occasion. Find your perfect style with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">

              <Link
                to="/"
                className="transition hover:text-orange-500"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="transition hover:text-orange-500"
              >
                Shop
              </Link>

              <Link
                to="/products?section=Men"
                className="transition hover:text-orange-500"
              >
                Men
              </Link>

              <Link
                to="/products?section=Women"
                className="transition hover:text-orange-500"
              >
                Women
              </Link>

              <Link
                to="/products?section=Kids"
                className="transition hover:text-orange-500"
              >
                Kids
              </Link>

            </div>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-lg font-semibold">
              Customer
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">

              <Link
                to="/login"
                className="transition hover:text-orange-500"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="transition hover:text-orange-500"
              >
                Create Account
              </Link>

              <Link
                to="/cart"
                className="transition hover:text-orange-500"
              >
                Shopping Cart
              </Link>

              <Link
                to="/my-orders"
                className="transition hover:text-orange-500"
              >
                My Orders
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">
              Contact Us
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-400">
              <p>📧 support@rewearly.com</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 Bhopal, Madhya Pradesh</p>
              <p>🛍️ Fashion for Every Style</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center">

          <p className="text-sm text-gray-500">
            © 2026 ReWearly. All rights reserved.
          </p>

          <p className="mt-2 text-xs text-gray-600">
            Style. Comfort. Confidence.
          </p>

        </div>

      </div>
    </footer>
  )
}

export default Footer