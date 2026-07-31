import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await login(username, password);
      navigate("/");
    } catch {
      setError("نام کاربری یا رمز عبور اشتباه است.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      dir="rtl"
      className="
      flex
      h-screen
      items-center
      justify-center
      overflow-hidden
      bg-zinc-50
      px-4
      "
    >
      <div className="w-full max-w-md">
        {/* Logo */}

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-black tracking-wider text-zinc-900">
            RONIN
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            تجهیزات رزمی برای جنگجویان مدرن
          </p>
        </div>

        {/* Card */}

        <div
          className="
          rounded-3xl
          border
          border-zinc-200
          bg-white
          p-7
          shadow-sm
          "
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-zinc-900">ورود به حساب</h2>

            <p className="mt-1 text-sm text-zinc-500">
              برای ادامه خرید وارد حساب کاربری خود شوید.
            </p>
          </div>

          {error && (
            <div
              className="
              mb-5
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              "
            >
              <AlertCircle size={18} className="text-red-500" />

              <span className="text-sm font-medium text-red-600">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                نام کاربری
              </label>

              <div className="group relative">
                <User
                  size={18}
                  className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-zinc-400
                  transition-colors
                  duration-300
                  group-focus-within:text-red-600
                  "
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="نام کاربری"
                  autoComplete="username"
                  required
                  className="
                  h-12
                  w-full
                  rounded-2xl
                  border
                  border-zinc-300
                  bg-white
                  pr-11
                  pl-4
                  text-sm
                  text-zinc-800
                  placeholder:text-zinc-400
                  outline-none
                  transition-all
                  duration-300
                  hover:border-zinc-400
                  focus:border-red-500
                  focus:ring-4
                  focus:ring-red-100
                  "
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                رمز عبور
              </label>

              <div className="group relative">
                <Lock
                  size={18}
                  className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-zinc-400
                  transition-colors
                  duration-300
                  group-focus-within:text-red-600
                  "
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="رمز عبور"
                  autoComplete="current-password"
                  required
                  className="
                  h-12
                  w-full
                  rounded-2xl
                  border
                  border-zinc-300
                  bg-white
                  pr-11
                  pl-11
                  text-sm
                  text-zinc-800
                  placeholder:text-zinc-400
                  outline-none
                  transition-all
                  duration-300
                  hover:border-zinc-400
                  focus:border-red-500
                  focus:ring-4
                  focus:ring-red-100
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  rounded-lg
                  p-1
                  text-zinc-400
                  transition-all
                  duration-300
                  hover:bg-zinc-100
                  hover:text-red-600
                  "
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login */}

            <button
              type="submit"
              disabled={loading}
              className={`
                mt-2
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                font-semibold
                transition-all
                duration-300
                ${
                  loading
                    ? "cursor-not-allowed bg-zinc-400 text-white"
                    : "bg-zinc-900 text-white hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-lg hover:shadow-red-200/50 active:scale-[0.98]"
                }
              `}
            >
              <LogIn size={18} />

              {loading ? "در حال ورود..." : "ورود به حساب"}
            </button>

            <div className="pt-1 text-left">
              <button
                type="button"
                className="
                text-sm
                text-zinc-500
                transition-colors
                hover:text-red-600
                "
              >
                رمز عبور را فراموش کرده‌اید؟
              </button>
            </div>
          </form>
          {/* Register */}

          <div className="mt-6 border-t border-zinc-200 pt-5">
            <p className="text-center text-sm text-zinc-600">
              هنوز حساب کاربری ندارید؟
            </p>

            <Link
              to="/register"
              className="
              mt-3
              flex
              h-11
              items-center
              justify-center
              rounded-2xl
              border
              border-zinc-300
              font-medium
              text-zinc-700
              transition-all
              duration-300
              hover:border-red-500
              hover:bg-red-50
              hover:text-red-600
              "
            >
              ایجاد حساب کاربری
            </Link>
          </div>
        </div>

        {/* Features */}

        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          <div
            className="
            rounded-2xl
            border
            border-zinc-200
            bg-white
            px-3
            py-3
            shadow-sm
            "
          >
            <p className="text-lg">🥋</p>

            <p className="mt-1 text-xs font-medium text-zinc-700">
              تجهیزات اصل
            </p>
          </div>

          <div
            className="
            rounded-2xl
            border
            border-zinc-200
            bg-white
            px-3
            py-3
            shadow-sm
            "
          >
            <p className="text-lg">🚚</p>

            <p className="mt-1 text-xs font-medium text-zinc-700">ارسال سریع</p>
          </div>

          <div
            className="
            rounded-2xl
            border
            border-zinc-200
            bg-white
            px-3
            py-3
            shadow-sm
            "
          >
            <p className="text-lg">🛡️</p>

            <p className="mt-1 text-xs font-medium text-zinc-700">
              ضمانت اصالت
            </p>
          </div>
        </div>

        {/* Footer */}

        <p className="mt-5 text-center text-xs text-zinc-400">
          © 2026 Ronin Store. All rights reserved.
        </p>
      </div>
    </main>
  );
}

export default Login;
