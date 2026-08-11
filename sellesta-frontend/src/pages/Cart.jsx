import { ShoppingCart, ArrowRight, ShieldCheck, Truck } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { BASE_URL } from "../api/axios";

function Cart() {
  const { cart, updateCartItem, removeCartItem, loading } = useCart();

  const navigate = useNavigate();

  if (!cart || cart.items.length === 0) {
    return (
      <main
        dir="rtl"
        className="mx-auto flex min-h-[75vh] max-w-3xl items-center justify-center px-5"
      >
        <div className="w-full rounded-[32px] border border-zinc-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100">
            <ShoppingCart size={42} className="text-zinc-700" />
          </div>

          <h1 className="mt-8 text-3xl font-black text-zinc-900">
            سبد خرید شما خالی است
          </h1>

          <p className="mx-auto mt-4 max-w-md leading-8 text-zinc-500">
            هنوز محصولی به سبد خرید اضافه نکرده‌اید. از فروشگاه رونین دیدن کنید
            و تجهیزات مورد نیازتان را انتخاب کنید.
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
              duration-300

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

      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-zinc-900">سبد خرید</h1>

          <p className="mt-2 text-zinc-500">
            {cart.items.length} محصول در سبد خرید شما
          </p>
        </div>

        <Link
          to="/"
          className="
            rounded-2xl

            border
            border-zinc-200

            px-5
            py-3

            font-medium

            transition-all

            hover:border-red-500
            hover:text-red-600
          "
        >
          ادامه خرید
        </Link>
      </div>

      {/* Layout */}

      <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
        {/* Products */}

        <section className="space-y-5">
          {cart.items.map((item) => {
            const imageSrc = item.product.image?.startsWith("http")
              ? item.product.image
              : `${BASE_URL}${item.product.image}`;

            return (
              <article
                key={item.id}
                className="
                group
                overflow-hidden

                rounded-[28px]

                border
                border-zinc-200

                bg-white

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-red-500
                hover:shadow-xl
                hover:shadow-red-100
              "
              >
                <div className="flex flex-col gap-6 p-5 sm:flex-row">
                  {/* Product Image */}

                  <Link
                    to={`/products/${item.product.slug}`}
                    className="shrink-0"
                  >
                    <div className="overflow-hidden rounded-2xl bg-zinc-100">
                      <img
                        src={imageSrc}
                        alt={item.product.name}
                        className="
                        h-32
                        w-32

                        object-cover

                        transition-all
                        duration-500

                        group-hover:scale-105
                      "
                      />
                    </div>
                  </Link>

                  {/* Product Info */}

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link to={`/products/${item.product.slug}`}>
                        <h2
                          className="
                          text-xl
                          font-bold

                          text-zinc-900

                          transition

                          group-hover:text-red-600
                        "
                        >
                          {item.product.name}
                        </h2>
                      </Link>

                      <p className="mt-3 text-sm leading-7 text-zinc-500">
                        قیمت واحد:
                        <span className="mr-2 font-semibold text-zinc-900">
                          {Number(item.product.price).toLocaleString("fa-IR")}{" "}
                          تومان
                        </span>
                      </p>
                    </div>

                    {/* Bottom */}

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
                      {/* Quantity */}

                      <div
                        className="
                        flex
                        items-center

                        overflow-hidden

                        rounded-2xl

                        border
                        border-zinc-200
                      "
                      >
                        <button
                          onClick={() =>
                            updateCartItem(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="
                          p-3

                          transition

                          hover:bg-zinc-100
                        "
                        >
                          -
                        </button>

                        <span
                          className="
                          min-w-[55px]

                          text-center

                          font-bold
                        "
                        >
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateCartItem(item.id, item.quantity + 1)
                          }
                          className="
                          p-3

                          transition

                          hover:bg-zinc-100
                        "
                        >
                          +
                        </button>
                      </div>

                      {/* Total */}

                      <div className="text-left">
                        <p className="text-xs text-zinc-500">مجموع</p>

                        <h3
                          className="
                          mt-1

                          text-2xl

                          font-black

                          text-zinc-900
                        "
                        >
                          {Number(item.subtotal).toLocaleString("fa-IR")}
                        </h3>

                        <span className="text-sm text-zinc-500">تومان</span>
                      </div>

                      {/* Remove */}

                      <button
                        onClick={() => removeCartItem(item.id)}
                        className="
                        rounded-xl

                        border
                        border-red-200

                        px-5
                        py-3

                        text-sm
                        font-semibold

                        text-red-600

                        transition-all

                        hover:bg-red-600
                        hover:text-white
                      "
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
        {/* Summary */}

        <aside
          className="
          h-fit

          rounded-[30px]

          border
          border-zinc-200

          bg-white

          p-6

          shadow-sm

          xl:sticky
          xl:top-28
        "
        >
          <h2 className="text-2xl font-black text-zinc-900">خلاصه سفارش</h2>

          <div className="mt-8 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">تعداد کالا</span>

              <span className="font-bold text-zinc-900">
                {cart.items.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500">هزینه ارسال</span>

              <span className="font-semibold text-emerald-600">رایگان</span>
            </div>

            <div className="h-px bg-zinc-200"></div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-zinc-900">
                مبلغ نهایی
              </span>

              <div className="text-left">
                <h3 className="text-3xl font-black text-zinc-900">
                  {Number(cart.total_price).toLocaleString("fa-IR")}
                </h3>

                <span className="text-sm text-zinc-500">تومان</span>
              </div>
            </div>
          </div>

          {/* Checkout */}

          <button
            disabled={loading}
            onClick={() => navigate("/checkout")}
            className="
              mt-8

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
            <ShoppingCart size={20} />
            ادامه فرآیند خرید
          </button>

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
                <h4 className="font-bold text-zinc-900">ضمانت اصالت</h4>

                <p className="mt-1 text-sm leading-6 text-zinc-500">
                  تمامی محصولات با ضمانت اصالت ارائه می‌شوند.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
