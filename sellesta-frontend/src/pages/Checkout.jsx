import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowRight,
  ShoppingBag,
  User,
  Phone,
  MapPin,
  Home,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import api from "../api/axios";

function Checkout() {
  const { cart } = useCart();

  const navigate = useNavigate();

  const [forms, setForms] = useState({
    full_name: "",
    phone: "",
    address: "",
    postal_code: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      const res = await api.post("orders/create/", forms);

      navigate(`/orders/${res.data.id}`);
    } catch (err) {
      setError("ثبت سفارش با خطا مواجه شد.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <main
        dir="rtl"
        className="mx-auto flex min-h-[75vh] max-w-3xl items-center justify-center px-5"
      >
        <div className="w-full rounded-[32px] border border-zinc-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100">
            <ShoppingBag size={42} className="text-zinc-700" />
          </div>

          <h1 className="mt-8 text-3xl font-black text-zinc-900">
            سبد خرید شما خالی است
          </h1>

          <p className="mx-auto mt-4 max-w-md leading-8 text-zinc-500">
            ابتدا محصولات موردنظر خود را به سبد خرید اضافه کنید.
          </p>

          <Link
            to="/"
            className="
              mt-8
              inline-flex
              items-center
              gap-2

              rounded-2xl

              bg-zinc-900

              px-7
              py-3.5

              font-semibold

              text-white

              transition-all

              hover:bg-red-600
            "
          >
            <ArrowRight size={18} />
            بازگشت به فروشگاه
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main dir="rtl" className="mx-auto max-w-7xl px-5 py-10">
      {/* Header */}

      <div className="mb-10">
        <Link
          to="/cart"
          className="
            inline-flex
            items-center
            gap-2

            text-sm

            text-zinc-500

            transition

            hover:text-red-600
          "
        >
          <ArrowRight size={16} />
          بازگشت به سبد خرید
        </Link>

        <h1 className="mt-5 text-4xl font-black text-zinc-900">تکمیل سفارش</h1>

        <p className="mt-3 text-zinc-500">
          اطلاعات گیرنده را وارد کنید تا سفارش شما ثبت شود.
        </p>
      </div>

      {/* Layout */}

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Form */}

        <section
          className="
            rounded-[30px]

            border
            border-zinc-200

            bg-white

            p-8

            shadow-sm
          "
        >
          <h2 className="text-2xl font-black text-zinc-900">اطلاعات گیرنده</h2>

          <p className="mt-2 text-sm text-zinc-500">
            لطفاً اطلاعات را با دقت وارد کنید.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Full Name */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-800">
                نام و نام خانوادگی
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                  type="text"
                  name="full_name"
                  value={forms.full_name}
                  onChange={handleChange}
                  placeholder="نام گیرنده"
                  required
                  className="
                    w-full

                    rounded-2xl

                    border
                    border-zinc-200

                    bg-white

                    py-4
                    pr-12
                    pl-4

                    outline-none

                    transition-all
                    duration-300

                    placeholder:text-zinc-400

                    focus:border-red-500
                    focus:ring-4
                    focus:ring-red-100
                  "
                />
              </div>
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-800">
                شماره موبایل
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                  type="text"
                  name="phone"
                  value={forms.phone}
                  onChange={handleChange}
                  placeholder="09xxxxxxxxx"
                  required
                  className="
                    w-full

                    rounded-2xl

                    border
                    border-zinc-200

                    py-4
                    pr-12
                    pl-4

                    outline-none

                    transition-all

                    placeholder:text-zinc-400

                    focus:border-red-500
                    focus:ring-4
                    focus:ring-red-100
                  "
                />
              </div>
            </div>

            {/* Postal Code */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-800">
                کد پستی
              </label>

              <div className="relative">
                <Home
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                  type="text"
                  name="postal_code"
                  value={forms.postal_code}
                  onChange={handleChange}
                  placeholder="اختیاری"
                  className="
                    w-full

                    rounded-2xl

                    border
                    border-zinc-200

                    py-4
                    pr-12
                    pl-4

                    outline-none

                    transition-all

                    placeholder:text-zinc-400

                    focus:border-red-500
                    focus:ring-4
                    focus:ring-red-100
                  "
                />
              </div>
            </div>

            {/* Address */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-800">
                آدرس کامل
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute right-4 top-5 text-zinc-400"
                />

                <textarea
                  rows={5}
                  required
                  name="address"
                  value={forms.address}
                  onChange={handleChange}
                  placeholder="استان، شهر، خیابان، پلاک..."
                  className="
                    w-full

                    resize-none

                    rounded-2xl

                    border
                    border-zinc-200

                    py-4
                    pr-12
                    pl-4

                    outline-none

                    transition-all

                    placeholder:text-zinc-400

                    focus:border-red-500
                    focus:ring-4
                    focus:ring-red-100
                  "
                />
              </div>
            </div>

            {/* Error */}

            {error && (
              <div
                className="
                  rounded-2xl

                  border
                  border-red-200

                  bg-red-50

                  px-5
                  py-4

                  text-sm

                  text-red-600
                "
              >
                {error}
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={submitting}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2

                rounded-2xl

                bg-zinc-900

                py-4

                font-bold

                text-white

                transition-all
                duration-300

                hover:bg-red-600
                hover:shadow-xl
                hover:shadow-red-200

                active:scale-[0.98]

                disabled:cursor-not-allowed
                disabled:bg-zinc-300
              "
            >
              <ShoppingBag size={20} />

              {submitting ? "در حال ثبت سفارش..." : "ثبت سفارش و ادامه پرداخت"}
            </button>
          </form>
        </section>
        {/* Summary */}

        <aside
          className="
            h-fit

            rounded-[30px]

            border
            border-zinc-200

            bg-white

            p-7

            shadow-sm

            lg:sticky
            lg:top-28
          "
        >
          <h2 className="text-2xl font-black text-zinc-900">خلاصه سفارش</h2>

          <div className="mt-7 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-zinc-900">
                    {item.product.name}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    {item.quantity} ×{" "}
                    {Number(item.product.price).toLocaleString("fa-IR")} تومان
                  </p>
                </div>

                <span className="font-bold text-zinc-900 whitespace-nowrap">
                  {Number(item.subtotal).toLocaleString("fa-IR")} تومان
                </span>
              </div>
            ))}
          </div>

          <div className="my-7 h-px bg-zinc-200" />

          {/* Totals */}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">هزینه ارسال</span>

              <span className="font-semibold text-emerald-600">رایگان</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500">تعداد کالا</span>

              <span className="font-bold text-zinc-900">
                {cart.items.length}
              </span>
            </div>
          </div>

          <div className="my-7 h-px bg-zinc-200" />

          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-zinc-900">
              مبلغ قابل پرداخت
            </span>

            <div className="text-left">
              <h3 className="text-3xl font-black text-zinc-900">
                {Number(cart.total_price).toLocaleString("fa-IR")}
              </h3>

              <span className="text-sm text-zinc-500">تومان</span>
            </div>
          </div>

          {/* Benefits */}

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-red-50 p-3">
                <Truck size={20} className="text-red-600" />
              </div>

              <div>
                <h4 className="font-bold text-zinc-900">ارسال سریع</h4>

                <p className="mt-1 text-sm leading-6 text-zinc-500">
                  ارسال سفارش بین ۲ تا ۵ روز کاری.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-red-50 p-3">
                <ShieldCheck size={20} className="text-red-600" />
              </div>

              <div>
                <h4 className="font-bold text-zinc-900">ضمانت اصالت کالا</h4>

                <p className="mt-1 text-sm leading-6 text-zinc-500">
                  تمامی محصولات رونین با ضمانت اصالت ارائه می‌شوند.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;
