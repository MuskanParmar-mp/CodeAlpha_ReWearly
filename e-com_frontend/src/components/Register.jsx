import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    setMessage("")
    setError("")

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register/",
        {
          username,
          email,
          password,
        }
      )

      setMessage(response.data.message)

      setUsername("")
      setEmail("")
      setPassword("")

      setTimeout(() => {
        navigate("/login")
      }, 1000)
    } catch (error) {
      console.log(error)

      if (error.response?.data) {
        const errors = error.response.data

        if (errors.username) {
          setError(errors.username[0])
        } else if (errors.email) {
          setError(errors.email[0])
        } else if (errors.password) {
          setError(errors.password[0])
        } else {
          setError("Registration failed.")
        }
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
            Create Account
          </h1>

          <p className="mt-2 text-gray-600">
            Join ReWearly and shop sustainably.
          </p>
        </div>

        {message && (
          <div className="mb-5 rounded-lg bg-green-50 p-3 text-center text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">

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

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
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

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Create Account
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            Login
          </Link>
        </p>

      </div>

    </section>
  )
}

export default Register