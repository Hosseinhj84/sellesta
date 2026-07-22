import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await api.post("register/", form);

      await login(form.username, form.password);

      navigate("/");
    } catch (err) {
      setError("این نام کاربری یا ایمیل قبلاً ثبت شده است.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-10"
    >
      <div className="w-full max-w-lg">
        {/* Header */}

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-gray-900">Ronin</h1>

          <p className="mt-2 text-gray-500">ایجاد حساب کاربری</p>
        </div>

        {/* Card */}

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl shadow-gray-200/40">
          <h2 className="text-2xl font-bold text-gray-900">خوش اومدی 👋</h2>

          <p className="mt-2 text-sm text-gray-500">
            اطلاعات زیر را برای ایجاد حساب وارد کنید.
          </p>

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
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="نام کاربری"
                  required
                  className="w-full rounded-2xl border border-gray-300 py-3 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                ایمیل
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full rounded-2xl border border-gray-300 py-3 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="رمز عبور"
                  required
                  className="w-full rounded-2xl border border-gray-300 py-3 pr-12 pl-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-blue-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Name */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* First Name */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  نام
                </label>

                <div className="relative">
                  <User
                    size={20}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="نام"
                    className="w-full rounded-2xl border border-gray-300 py-3 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Last Name */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  نام خانوادگی
                </label>

                <div className="relative">
                  <User
                    size={20}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="نام خانوادگی"
                    className="w-full rounded-2xl border border-gray-300 py-3 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                شماره موبایل
              </label>

              <div className="relative">
                <Phone
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="09xxxxxxxxx"
                  className="w-full rounded-2xl border border-gray-300 py-3 pr-12 pl-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Submit */}

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
              <UserPlus size={20} />

              {loading ? "در حال ایجاد حساب..." : "ایجاد حساب کاربری"}
            </button>
          </form>

          {/* Divider */}

          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-gray-200"></div>

            <span className="px-4 text-sm text-gray-400">یا</span>

            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Login */}

          <div className="text-center">
            <p className="text-sm text-gray-600">
              قبلاً حساب کاربری ساخته‌اید؟
            </p>

            <Link
              to="/login"
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
              ورود به حساب
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

export default Register;
