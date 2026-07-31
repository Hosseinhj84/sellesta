import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShoppingBag, Package , Truck , ShieldCheck } from "lucide-react";

import api from "../api/axios";
import { useCart } from "../context/CartContext";

function OrderDetail() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { refreshCart } = useCart();

  useEffect(() => {
    api
      .get("orders/")
      .then((res) => {
        const found = res.data.find((o) => o.id === Number(id));

        setOrder(found || null);

        refreshCart();
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, refreshCart]);

  /* ---------------- Loading ---------------- */

  if (loading) {
    return (
      <main dir="rtl" className="mx-auto max-w-6xl animate-pulse px-5 py-10">
        <div className="rounded-[32px] bg-zinc-200 h-60" />

        <div className="mt-8 rounded-[30px] bg-zinc-200 h-80" />
      </main>
    );
  }

  /* ---------------- Empty ---------------- */

  if (!order) {
    return (
      <main
        dir="rtl"
        className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-5"
      >
        <div className="rounded-[32px] border border-zinc-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100">
            <Package size={42} className="text-zinc-700" />
          </div>

          <h1 className="mt-8 text-3xl font-black text-zinc-900">
            سفارش پیدا نشد
          </h1>

          <p className="mt-4 leading-8 text-zinc-500">
            ممکن است این سفارش حذف شده باشد یا شناسه وارد شده صحیح نباشد.
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
    <main dir="rtl" className="mx-auto max-w-6xl px-5 py-10">
      {/* Success Hero */}

      <section
        className="
          overflow-hidden

          rounded-[34px]

          border
          border-emerald-200

          bg-gradient-to-br
          from-emerald-50
          via-white
          to-emerald-100

          p-8

          shadow-sm
        "
      >
        <div className="flex flex-col items-center text-center">
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center

              rounded-full

              bg-emerald-100
            "
          >
            <CheckCircle2 size={54} className="text-emerald-600" />
          </div>

          <h1 className="mt-6 text-4xl font-black text-zinc-900">
            سفارش شما با موفقیت ثبت شد
          </h1>

          <p className="mt-4 max-w-xl leading-8 text-zinc-600">
            از خرید شما از فروشگاه رونین سپاسگزاریم. سفارش شما ثبت شده و پس از
            بررسی برای ارسال آماده خواهد شد.
          </p>

          <div
            className="
              mt-7

              rounded-full

              bg-white

              px-6
              py-3

              text-lg
              font-black

              text-zinc-900

              shadow
            "
          >
            شماره سفارش
            <span className="mr-2 text-red-600">#{order.id}</span>
          </div>
        </div>
      </section>

      {/* Content */}

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Order Items */}

        <section className="space-y-5">
          {/* Order Information */}

          <article
            className="
            rounded-[30px]

            border
            border-zinc-200

            bg-white

            p-7

            shadow-sm
          "
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-zinc-900">
                  جزئیات سفارش
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  شماره سفارش #{order.id}
                </p>
              </div>

              <span
                className="
                rounded-full

                bg-amber-100

                px-4
                py-2

                text-sm
                font-bold

                text-amber-700
              "
              >
                در انتظار بررسی
              </span>
            </div>
          </article>

          {/* Products */}

          {order.items.map((item) => (
            <article
              key={item.id}
              className="
              group

              rounded-[28px]

              border
              border-zinc-200

              bg-white

              p-6

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-red-500
              hover:shadow-lg
              hover:shadow-red-100
            "
            >
              <div className="flex items-center justify-between gap-5">
                {/* Left */}

                <div className="min-w-0 flex-1">
                  <h3
                    className="
                    truncate

                    text-xl
                    font-bold

                    text-zinc-900

                    transition

                    group-hover:text-red-600
                  "
                  >
                    {item.product_name}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <span
                      className="
                      rounded-full

                      bg-zinc-100

                      px-3
                      py-1.5

                      text-sm

                      text-zinc-600
                    "
                    >
                      تعداد:
                      <span className="mr-1 font-bold">{item.quantity}</span>
                    </span>
                  </div>
                </div>

                {/* Right */}

                <div className="text-left">
                  <p className="text-xs text-zinc-500">مبلغ</p>

                  <h3 className="mt-1 text-2xl font-black text-zinc-900">
                    {Number(item.subtotal).toLocaleString("fa-IR")}
                  </h3>

                  <span className="text-sm text-zinc-500">تومان</span>
                </div>
              </div>
            </article>
          ))}
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

          <div className="mt-8 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">شماره سفارش</span>

              <span className="font-bold text-zinc-900">#{order.id}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500">وضعیت</span>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700">
                در انتظار بررسی
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500">تعداد کالا</span>

              <span className="font-bold text-zinc-900">
                {order.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
          </div>

          <div className="my-7 h-px bg-zinc-200" />

          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-zinc-900">
              مبلغ پرداختی
            </span>

            <div className="text-left">
              <h3 className="text-3xl font-black text-zinc-900">
                {Number(order.total_price).toLocaleString("fa-IR")}
              </h3>

              <span className="text-sm text-zinc-500">تومان</span>
            </div>
          </div>

          {/* Services */}

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-red-50 p-3">
                <Truck size={20} className="text-red-600" />
              </div>

              <div>
                <h4 className="font-bold text-zinc-900">ارسال سریع</h4>

                <p className="mt-1 text-sm leading-6 text-zinc-500">
                  سفارش شما پس از تأیید، در اولین فرصت ارسال خواهد شد.
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
                  تمامی محصولات فروشگاه رونین با ضمانت اصالت ارائه می‌شوند.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-8 space-y-3">
            <Link
              to="/"
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
              "
            >
              <ArrowRight size={20} />
              بازگشت به فروشگاه
            </Link>

            <Link
              to="/my-orders"
              className="
                flex
                w-full
                items-center
                justify-center

                rounded-2xl

                border
                border-zinc-200

                py-4

                font-semibold

                text-zinc-700

                transition-all

                hover:border-red-500
                hover:text-red-600
              "
            >
              مشاهده سفارش‌های من
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default OrderDetail;
