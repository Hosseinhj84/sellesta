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

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await api.post("register/", form);

      await login(form.username, form.password);

      navigate("/");
    } catch {
      setError("این نام کاربری یا ایمیل قبلاً ثبت شده است.");
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
      <div className="w-full max-w-2xl">
        {/* Header */}

        <div className="mb-5 text-center">
          <h1 className="text-3xl font-black tracking-wider text-zinc-900">
            RONIN
          </h1>

          <p className="mt-1 text-sm text-zinc-500">ایجاد حساب کاربری</p>
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
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-zinc-900">عضویت در رونین</h2>

            <p className="mt-1 text-sm text-zinc-500">
              اطلاعات خود را وارد کنید تا حساب کاربری شما ساخته شود.
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
            {/* Row 1 */}

            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  نام
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
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="حسین"
                    className="
                    h-12
                    w-full
                    rounded-2xl
                    border
                    border-zinc-300
                    pr-11
                    pl-4
                    text-sm
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

              {/* Last Name */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  نام خانوادگی
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
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="حاجیان"
                    className="
                    h-12
                    w-full
                    rounded-2xl
                    border
                    border-zinc-300
                    pr-11
                    pl-4
                    text-sm
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
            </div>

            {/* Row 2 */}

            <div className="grid grid-cols-2 gap-4">
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
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="username"
                    required
                    className="
                    h-12
                    w-full
                    rounded-2xl
                    border
                    border-zinc-300
                    pr-11
                    pl-4
                    text-sm
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

              {/* Phone */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  شماره موبایل
                </label>

                <div className="group relative">
                  <Phone
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
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="09xxxxxxxxx"
                    className="
                    h-12
                    w-full
                    rounded-2xl
                    border
                    border-zinc-300
                    pr-11
                    pl-4
                    text-sm
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
            </div>
            {/* Row 3 */}

            <div className="grid grid-cols-2 gap-4">
              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  ایمیل
                </label>

                <div className="group relative">
                  <Mail
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
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="
                    h-12
                    w-full
                    rounded-2xl
                    border
                    border-zinc-300
                    pr-11
                    pl-4
                    text-sm
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
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="رمز عبور"
                    required
                    className="
                    h-12
                    w-full
                    rounded-2xl
                    border
                    border-zinc-300
                    pr-11
                    pl-11
                    text-sm
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
                    transition
                    hover:bg-zinc-100
                    hover:text-red-600
                    "
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}

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
                  : "bg-zinc-900 text-white hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-lg hover:shadow-red-200/40 active:scale-[0.98]"
              }
              `}
            >
              <UserPlus size={18} />

              {loading ? "در حال ایجاد حساب..." : "ایجاد حساب کاربری"}
            </button>
          </form>

          {/* Footer Card */}

          <div className="mt-5 border-t border-zinc-200 pt-5">
            <p className="text-center text-sm text-zinc-600">
              قبلاً ثبت‌نام کرده‌اید؟
            </p>

            <Link
              to="/login"
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
              ورود به حساب
            </Link>
          </div>
        </div>

        {/* Footer */}

        <p className="mt-4 text-center text-xs text-zinc-400">
          © 2026 Ronin Store
        </p>
      </div>
    </main>
  );
}

export default Register;
