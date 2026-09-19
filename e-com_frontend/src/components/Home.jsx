import { Link } from "react-router-dom"

function Home() {
  const categories = [
  {
    name: "Men",
    icon: "👨",
    text: "Explore stylish clothing for men",
    link: "/products?section=Men",
  },
  {
    name: "Women",
    icon: "👩",
    text: "Discover the latest women's styles",
    link: "/products?section=Women",
  },
  {
    name: "Kids",
    icon: "🧒",
    text: "Fun and comfortable styles for kids",
    link: "/products?section=Kids",
  },
  {
    name: "T-Shirts",
    icon: "👕",
    text: "Trendy styles for everyday wear",
    link: "/products",
  },
  {
    name: "Dresses",
    icon: "👗",
    text: "Elegant styles for every occasion",
    link: "/products",
  },
  {
    name: "Jeans",
    icon: "👖",
    text: "Classic denim for every look",
    link: "/products",
  },
]

  const features = [
    {
      icon: "✨",
      title: "Latest Styles",
      text: "Discover fresh and trendy styles for every season.",
    },
    {
      icon: "🛍️",
      title: "Easy Shopping",
      text: "Browse your favorite products and shop with ease.",
    },
    {
      icon: "🚚",
      title: "Quick Delivery",
      text: "Get your favorite fashion delivered to your doorstep.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#eadfce]">
        <div className="mx-auto grid min-h-[520px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          
          <div className="text-center md:text-left">
            <p className="mb-4 text-sm font-semibold tracking-[0.25em] text-orange-700">
              NEW COLLECTION
            </p>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Style That
              <br />
              <span className="text-orange-600">
                Speaks For You.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-gray-700 sm:text-lg md:mx-0">
              Discover stylish clothing, timeless essentials,
              and the latest trends for your everyday wardrobe.
            </p>

            <a
              href="#products"
              className="mt-8 inline-block rounded-full bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Shop Now
            </a>
          </div>

          <div className="flex justify-center">
            <div className="flex h-64 w-64 items-center justify-center rounded-full bg-orange-200 shadow-lg sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <div className="text-center">
                <p className="text-6xl">👕</p>

                <p className="mt-4 text-xl font-bold text-gray-800">
                  New Arrivals
                </p>

                <p className="text-sm text-gray-600">
                  Find your perfect style
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-orange-600">
              SHOP BY CATEGORY
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Explore Our Collection
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Find the perfect styles for every mood, occasion,
              and everyday look.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
  key={category.name}
  to={category.link}
  className="group rounded-2xl border border-gray-100 bg-[#f8f6f2] p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg"
>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl transition group-hover:scale-110">
                  {category.icon}
                </div>

                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {category.text}
                </p>

                <span className="mt-4 inline-block text-sm font-semibold text-orange-600">
                  Shop Now →
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Why ReWearly */}
      <section className="bg-[#f8f6f2] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-orange-600">
              WHY SHOP WITH US
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Fashion Made Easy
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Everything you need for a simple and enjoyable
              online shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-gray-900 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">

          <p className="text-sm font-semibold tracking-[0.25em] text-orange-400">
            YOUR STYLE. YOUR CHOICE.
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Upgrade Your Wardrobe Today.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-300">
            From everyday essentials to statement pieces,
            discover clothing that matches your personal style.
          </p>

          <a
            href="#products"
            className="mt-8 inline-block rounded-full bg-orange-600 px-7 py-3 font-semibold text-white transition hover:bg-orange-500"
          >
            Explore Collection
          </a>

        </div>
      </section>
    </>
  )
}

export default Home