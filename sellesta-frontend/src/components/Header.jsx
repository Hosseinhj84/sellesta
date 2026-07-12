import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import api from "../api/axios";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerLinks , setheaderLinks ] = useState([]);

  useEffect(() => {
    api
      .get("header-links/")
      .then((res) => setheaderLinks(res.data.results))
      .catch((err) => console.error(err));
  }, []);
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4">
        {/* ردیف اصلی */}
        <div className="flex h-20 items-center justify-between gap-5">
          {/* لوگو */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="w-32 cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1"
            />
          </div>

          {/* سرچ */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="relative w-full max-w-2xl group">
              {/* آیکون سرچ */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-all duration-300 group-focus-within:text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.3-4.3m1.3-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                type="text"
                placeholder="جستجوی محصول، برند و..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  py-3
                  pr-5
                  pl-14
                  text-sm
                  outline-none
                  transition-all
                  duration-300
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-100
                  focus:shadow-xl
                "
              />
            </div>
          </div>

          {/* منوی دسکتاپ */}
          <nav className="hidden xl:flex items-center gap-8">
            {headerLinks.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className="
                  relative
                  text-gray-700
                  font-medium
                  transition-all
                  duration-300
                  hover:text-blue-600

                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:h-[2px]
                  after:w-0
                  after:bg-blue-600
                  after:transition-all
                  after:duration-300

                  hover:after:w-full
                "
              >
                {item.title}
              </a>
            ))}
          </nav>

          {/* دکمه ها */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="
                rounded-xl
                border
                border-gray-300
                px-5
                py-2.5
                text-sm
                font-medium
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-blue-500
                hover:bg-blue-50
                hover:text-blue-600
                active:scale-95
              "
            >
              ورود / ثبت نام
            </button>

            <button
              className="
                relative
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                shadow-lg
                shadow-blue-500/20
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                hover:shadow-blue-500/30
                active:scale-95
              "
            >
              سبد خرید
              {/* Badge تستی */}
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                3
              </span>
            </button>
          </div>

          {/* دکمه موبایل */}
          <button
            className="lg:hidden rounded-lg p-2 hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* سرچ موبایل */}
        <div className="pb-4 lg:hidden">
          <input
            type="text"
            placeholder="جستجوی محصول..."
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              p-3
              outline-none
              transition-all
              duration-300
              focus:border-blue-500
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        {/* منوی موبایل */}
        <div
          className={`
            overflow-hidden
            transition-all
            duration-500
            lg:hidden
            ${menuOpen ? "max-h-96 pb-5" : "max-h-0"}
          `}
        >
          <nav className="flex flex-col gap-2">
            {headerLinks.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className="
                  rounded-xl
                  px-4
                  py-3
                  transition-all
                  duration-300
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >
                {item.title}
              </a>
            ))}

            <hr className="my-2" />

            <button className="rounded-xl border border-gray-300 py-3 hover:bg-gray-100 transition">
              ورود / ثبت نام
            </button>

            <button className="rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700 transition">
              سبد خرید
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
