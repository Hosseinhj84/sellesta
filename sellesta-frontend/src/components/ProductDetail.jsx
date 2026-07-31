import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { slug } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(() => {
    api
      .get(`products/${slug}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    addToCart(product.id, count);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse px-5 py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-square rounded-[30px] bg-zinc-200"></div>

          <div className="space-y-5">
            <div className="h-8 w-2/3 rounded-xl bg-zinc-200"></div>

            <div className="h-4 w-full rounded-xl bg-zinc-200"></div>

            <div className="h-4 w-5/6 rounded-xl bg-zinc-200"></div>

            <div className="h-40 rounded-3xl bg-zinc-200"></div>

            <div className="h-14 rounded-2xl bg-zinc-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <h2 className="text-4xl font-black text-zinc-900">محصول پیدا نشد</h2>

        <p className="mt-3 text-zinc-500">
          ممکن است این محصول حذف شده باشد یا آدرس آن اشتباه باشد.
        </p>

        <Link
          to="/"
          className="
            mt-8
            rounded-2xl
            bg-zinc-900
            px-8
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-red-600
          "
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  const imageSrc = product.image?.startsWith("http")
    ? product.image
    : `http://127.0.0.1:8000${product.image}`;

  const isSpecial = product.categories?.some((cat) => cat.slug === "special");

  return (
    <main dir="rtl" className="mx-auto max-w-7xl px-5 py-8 lg:py-12">
      {/* Breadcrumb */}

      <div className="mb-10 flex flex-wrap items-center gap-2 text-sm">
        <Link
          to="/"
          className="
            text-zinc-500
            transition
            hover:text-red-600
          "
        >
          فروشگاه
        </Link>

        <ArrowRight size={15} className="text-zinc-400" />

        <span className="font-medium text-zinc-800">{product.name}</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* LEFT SIDE */}

        <section>
          <div
            className="
              group
              relative
              overflow-hidden

              rounded-[32px]

              border
              border-zinc-200

              bg-gradient-to-br
              from-zinc-50
              to-white

              shadow-sm

              transition-all
              duration-500

              hover:shadow-2xl
              hover:shadow-red-100
            "
          >
            <img
              src={imageSrc}
              alt={product.name}
              className="
                aspect-square
                w-full
                object-cover

                transition-all
                duration-700

                group-hover:scale-110
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

            {isSpecial && (
              <div
                className="
                  absolute
                  left-5
                  top-5

                  rounded-full

                  bg-red-600

                  px-4
                  py-2

                  text-xs
                  font-bold

                  text-white

                  shadow-xl
                "
              >
                🔥 پیشنهاد رونین
              </div>
            )}
          </div>

          {/* اینجا در آینده Thumbnail Gallery اضافه می‌کنیم */}
        </section>

        {/* RIGHT SIDE */}

        <section className="space-y-7">
          {/* Status */}

          <div className="flex flex-wrap items-center gap-3">
            {product.available ? (
              <span
                className="
                inline-flex
                items-center
                gap-2

                rounded-full

                bg-emerald-50

                px-4
                py-2

                text-sm
                font-semibold

                text-emerald-700
              "
              >
                <Check size={16} />
                موجود در انبار
              </span>
            ) : (
              <span
                className="
                inline-flex
                items-center
                gap-2

                rounded-full

                bg-red-50

                px-4
                py-2

                text-sm
                font-semibold

                text-red-600
              "
              >
                موجود نیست
              </span>
            )}

            {isSpecial && (
              <span
                className="
                rounded-full

                bg-red-600

                px-4
                py-2

                text-sm
                font-bold

                text-white
              "
              >
                پیشنهاد رونین
              </span>
            )}
          </div>

          {/* Product Name */}

          <h1
            className="
            text-3xl

            font-black

            leading-relaxed

            text-zinc-900

            lg:text-4xl
          "
          >
            {product.name}
          </h1>

          {/* Categories */}

          <div className="flex flex-wrap gap-2">
            {product.categories?.map((cat) => (
              <span
                key={cat.id}
                className="
                rounded-full

                border
                border-zinc-200

                bg-zinc-50

                px-4
                py-2

                text-sm

                text-zinc-700

                transition-all

                duration-300

                hover:border-red-500
                hover:bg-red-50
                hover:text-red-600
              "
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Description */}

          <div>
            <h2 className="mb-4 text-xl font-bold text-zinc-900">
              توضیحات محصول
            </h2>

            <p
              className="
              leading-9

              text-zinc-600
            "
            >
              {product.description?.trim()
                ? product.description
                : "برای این محصول هنوز توضیحاتی ثبت نشده است."}
            </p>
          </div>

          {/* Price Card */}

          <div
            className="
            rounded-[30px]

            border
            border-zinc-200

            bg-zinc-50

            p-7
          "
          >
            <span className="text-sm text-zinc-500">قیمت نهایی</span>

            <div className="mt-3 flex items-end gap-2">
              <h2
                className="
                text-5xl

                font-black

                tracking-tight

                text-zinc-900
              "
              >
                {Number(product.price).toLocaleString("fa-IR")}
              </h2>

              <span className="pb-2 text-zinc-500">تومان</span>
            </div>

            {/* Quantity */}

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <div
                className="
                flex
                items-center

                overflow-hidden

                rounded-2xl

                border
                border-zinc-200

                bg-white
              "
              >
                <button
                  onClick={() => setCount((prev) => Math.max(1, prev - 1))}
                  className="
                  p-4

                  transition

                  hover:bg-zinc-100
                "
                >
                  <Minus size={18} />
                </button>

                <span
                  className="
                  min-w-[60px]

                  text-center

                  text-lg

                  font-bold
                "
                >
                  {count}
                </span>

                <button
                  onClick={() => setCount((prev) => prev + 1)}
                  className="
                  p-4

                  transition

                  hover:bg-zinc-100
                "
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.available}
                className={`
                flex-1

                rounded-2xl

                py-4

                font-bold

                transition-all

                duration-300

                ${
                  product.available
                    ? `
                      bg-zinc-900
                      text-white

                      hover:bg-red-600
                      hover:shadow-xl
                      hover:shadow-red-200

                      active:scale-95
                    `
                    : `
                      cursor-not-allowed
                      bg-zinc-200
                      text-zinc-500
                    `
                }
                `}
              >
                <span className="flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  افزودن به سبد خرید
                </span>
              </button>
            </div>

            {/* Action Buttons */}

            <div className="mt-6 flex gap-3">
              <button
                className="
                flex

                h-12
                w-12

                items-center
                justify-center

                rounded-2xl

                border
                border-zinc-200

                bg-white

                transition-all

                hover:border-red-500
                hover:bg-red-50
                hover:text-red-600
              "
              >
                <Heart size={20} />
              </button>

              <button
                className="
                flex

                h-12
                w-12

                items-center
                justify-center

                rounded-2xl

                border
                border-zinc-200

                bg-white

                transition-all

                hover:border-zinc-900
                hover:bg-zinc-900
                hover:text-white
              "
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Service Cards */}

          <div className="grid gap-4 sm:grid-cols-3">
            <div
              className="
              rounded-3xl
              border
              border-zinc-200
              bg-white
              p-5

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-red-500
              hover:shadow-lg
            "
            >
              <Truck size={24} className="text-red-600" />

              <h3 className="mt-4 font-bold text-zinc-900">ارسال سریع</h3>

              <p className="mt-2 text-sm leading-7 text-zinc-500">
                ارسال سفارش بین ۲ تا ۵ روز کاری به سراسر کشور.
              </p>
            </div>

            <div
              className="
              rounded-3xl
              border
              border-zinc-200
              bg-white
              p-5

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-red-500
              hover:shadow-lg
            "
            >
              <ShieldCheck size={24} className="text-red-600" />

              <h3 className="mt-4 font-bold text-zinc-900">ضمانت اصالت</h3>

              <p className="mt-2 text-sm leading-7 text-zinc-500">
                تمامی محصولات رونین با ضمانت اصالت کالا عرضه می‌شوند.
              </p>
            </div>

            <div
              className="
              rounded-3xl
              border
              border-zinc-200
              bg-white
              p-5

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-red-500
              hover:shadow-lg
            "
            >
              <RotateCcw size={24} className="text-red-600" />

              <h3 className="mt-4 font-bold text-zinc-900">بازگشت کالا</h3>

              <p className="mt-2 text-sm leading-7 text-zinc-500">
                در صورت وجود مشکل، امکان بازگشت کالا طبق قوانین فروشگاه فراهم
                است.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetail;
