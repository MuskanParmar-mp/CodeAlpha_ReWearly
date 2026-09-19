import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    setError("")

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login/",
        {
          username,
          password,
        }
      )

      localStorage.setItem(
        "user",
        JSON.stringify({
          user_id: response.data.user_id,
          username: response.data.username,
        })
      )



      window.dispatchEvent(new Event("userUpdated"))
      navigate("/")

    } catch (error) {
      console.log(error)

      if (error.response?.data?.error) {
        setError(error.response.data.error)
      } else {
        setError("Server se connection nahi ho pa raha hai.")
      }
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">

        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
            ReWearly
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-600">
            Login to continue shopping.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Username */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Login
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            Create Account
          </Link>
        </p>

      </div>

    </section>
  )
}

export default Login