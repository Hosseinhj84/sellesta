import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("نام کاربری یا رمز عبور اشتباه است.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">
        {/* Logo */}

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tight text-gray-900">
            Ronin
          </h1>

          <p className="mt-2 text-gray-500">ورود به حساب کاربری</p>
        </div>

        {/* Card */}

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl shadow-gray-200/40">
          <h2 className="text-2xl font-bold text-gray-900">خوش اومدی 👋</h2>

          <p className="mt-2 text-sm text-gray-500">
            برای ادامه وارد حساب کاربری خود شوید.
          </p>

          {/* Error */}

          {error && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Username */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                نام کاربری
              </label>

              <div className="relative">
                <User
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="نام کاربری خود را وارد کنید"
                  className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-300
                  py-3
                  pr-12
                  pl-4
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  "
                  required
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                رمز عبور
              </label>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="رمز عبور"
                  className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-300
                  py-3
                  pr-12
                  pl-12
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  transition
                  hover:text-blue-600
                  "
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className={`
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                py-3.5
                font-semibold
                transition-all
                duration-300
                ${
                  loading
                    ? "cursor-not-allowed bg-blue-400 text-white"
                    : "bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98]"
                }
              `}
            >
              <LogIn size={20} />

              {loading ? "در حال ورود..." : "ورود به حساب"}
            </button>
          </form>

          {/* Divider */}

          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-gray-200"></div>

            <span className="px-4 text-sm text-gray-400">یا</span>

            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Register */}

          <div className="text-center">
            <p className="text-sm text-gray-600">هنوز حساب کاربری ندارید؟</p>

            <Link
              to="/register"
              className="
              mt-3
              inline-flex
              rounded-xl
              border
              border-blue-200
              px-5
              py-2.5
              font-medium
              text-blue-600
              transition
              hover:border-blue-600
              hover:bg-blue-50
              "
            >
              ایجاد حساب کاربری
            </Link>
          </div>
        </div>

        {/* Footer */}

        <p className="mt-8 text-center text-sm text-gray-500">
          © 2026 Ronin Store
        </p>
      </div>
    </div>
  );
}

export default Login;
