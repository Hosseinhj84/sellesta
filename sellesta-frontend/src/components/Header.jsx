import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  LogOut,
  ChevronDown,
  ReceiptCent,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import api from "../api/axios";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerLinks, setHeaderLinks] = useState([]);
  const [search, setSearch] = useState("");

  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("header-links/")
      .then((res) => setHeaderLinks(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      dir="rtl"
      className="
      sticky
      top-0
      z-50
      border-b
      border-zinc-200
      bg-white/90
      backdrop-blur-xl
      shadow-sm
    "
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            alt="Ronin"
            className="
            h-14
            w-14
            object-contain
            transition
            duration-300
            group-hover:rotate-6
            group-hover:scale-105
          "
          />

          <div>
            <h1 className="text-2xl font-black tracking-wide text-zinc-900">
              RONIN
            </h1>

            <p className="text-xs text-zinc-500">Martial Equipment</p>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden lg:flex items-center gap-8">
          {headerLinks.map((item) => (
            <Link
              key={item.id}
              to={item.url}
              className="
              relative
              text-[15px]
              font-semibold
              text-zinc-700
              transition-all
              duration-300
              hover:text-red-600

              after:absolute
              after:left-0
              after:-bottom-2
              after:h-[2px]
              after:w-0
              after:bg-red-600
              after:transition-all
              after:duration-300

              hover:after:w-full
            "
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Search */}

        <div className="hidden xl:flex flex-1 justify-center px-8">
          <div className="relative w-full max-w-xl group">
            <Search
              size={18}
              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-zinc-400
              group-focus-within:text-red-600
            "
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی لباس، دستکش، کمربند، برند..."
              className="
              w-full
              rounded-2xl
              border
              border-zinc-300
              bg-zinc-50
              py-3
              pr-11
              pl-5
              text-sm

              outline-none

              transition-all
              duration-300

              placeholder:text-zinc-400

              hover:border-red-300

              focus:border-red-500
              focus:bg-white
              focus:ring-4
              focus:ring-red-100
            "
            />
          </div>
        </div>

        {/* Right Actions */}

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/cart"
            className="
            relative
            flex
            items-center
            gap-2

            rounded-2xl

            bg-zinc-900

            px-5
            py-3

            text-sm
            font-semibold
            text-white

            transition-all
            duration-300

            hover:-translate-y-1
            hover:bg-red-600
            hover:shadow-xl
            hover:shadow-red-200
          "
          >
            <ShoppingCart size={18} />
            سبد خرید
            {itemCount > 0 && (
              <span
                className="
                absolute
                -top-2
                -left-2

                flex
                h-6
                w-6
                items-center
                justify-center

                rounded-full

                bg-red-600

                text-xs
                font-bold
                text-white
              "
              >
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="
                flex
                items-center
                gap-2

                rounded-2xl

                border
                border-zinc-300

                px-4
                py-3

                text-sm
                font-medium

                transition-all

                hover:border-red-500
                hover:text-red-600
                hover:bg-red-50
              "
              >
                <User size={18} />
                پروفایل
              </Link>

              <Link
                to="/my-orders"
                className="
                flex
                items-center
                gap-2

                rounded-2xl

                border
                border-zinc-300

                px-4
                py-3

                text-sm
                font-medium

                transition-all

                hover:border-red-500
                hover:text-red-600
                hover:bg-red-50
              "
              >
                <ReceiptCent size={18} />
                سفارش های من
              </Link>

              <button
                onClick={handleLogout}
                className="
                flex
                items-center
                gap-2

                rounded-2xl

                border
                border-zinc-300

                px-4
                py-3

                text-sm
                font-medium

                transition-all

                hover:bg-zinc-900
                hover:text-white
              "
              >
                <LogOut size={18} />
                خروج
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="
              rounded-2xl

              border
              border-zinc-900

              px-5
              py-3

              text-sm
              font-semibold

              transition-all
              duration-300

              hover:bg-zinc-900
              hover:text-white
            "
            >
              ورود | ثبت نام
            </button>
          )}
          {/* Mobile Menu Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-zinc-300
            transition-all
            duration-300
            hover:border-red-500
            hover:bg-red-50
            lg:hidden
          "
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}

      <div className="border-t border-zinc-200 bg-white px-5 py-4 xl:hidden">
        <div className="relative">
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="text"
            placeholder="جستجوی محصولات..."
            className="
              w-full
              rounded-2xl
              border
              border-zinc-300
              bg-zinc-50
              py-3
              pr-11
              pl-4
              outline-none
              transition-all
              duration-300
              focus:border-red-500
              focus:bg-white
              focus:ring-4
              focus:ring-red-100
            "
          />
        </div>
      </div>

      {/* Mobile Menu */}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-500
          lg:hidden

          ${menuOpen ? "max-h-[700px] border-t border-zinc-200" : "max-h-0"}
        `}
      >
        <div className="space-y-2 bg-white px-5 py-5">
          {headerLinks.map((item) => (
            <Link
              key={item.id}
              to={item.url}
              onClick={() => setMenuOpen(false)}
              className="
                flex
                items-center
                justify-between

                rounded-2xl

                px-4
                py-4

                font-medium
                text-zinc-700

                transition-all
                duration-300

                hover:bg-red-50
                hover:text-red-600
              "
            >
              {item.title}

              <ChevronDown size={18} className="-rotate-90" />
            </Link>
          ))}

          <div className="my-4 h-px bg-zinc-200"></div>

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  items-center
                  gap-3

                  rounded-2xl

                  border
                  border-zinc-300

                  px-4
                  py-4

                  transition-all

                  hover:border-red-500
                  hover:bg-red-50
                "
              >
                <User size={20} />
                پروفایل
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-3

                  rounded-2xl

                  border
                  border-zinc-300

                  px-4
                  py-4

                  transition-all

                  hover:bg-zinc-900
                  hover:text-white
                "
              >
                <LogOut size={20} />
                خروج از حساب
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="
                w-full

                rounded-2xl

                bg-zinc-900

                py-4

                font-semibold
                text-white

                transition-all
                duration-300

                hover:bg-red-600
              "
            >
              ورود | ثبت نام
            </button>
          )}

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="
              mt-3

              flex
              items-center
              justify-center
              gap-2

              rounded-2xl

              bg-red-600

              py-4

              font-semibold
              text-white

              transition-all
              duration-300

              hover:bg-zinc-900
            "
          >
            <ShoppingCart size={20} />
            سبد خرید
            {itemCount > 0 && (
              <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-red-600">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
