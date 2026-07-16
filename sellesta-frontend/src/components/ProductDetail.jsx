// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import api from "../api/axios";

// function ProductDetail() {
//   const { slug } = useParams();
//   const [product, setproduct] = useState(null);
//   const [loading, setloading] = useState(true);

//   useEffect(() => {
//     api
//       .get(`products/${slug}/`)
//       .then((res) => setproduct(res.data))
//       .catch((err) => console.error(err))
//       .finally(() => setloading(false));
//   }, [slug]);

//   if (loading) {
//     return <div className="p-10 text-center">در حال بارگذاری ....</div>;
//   }

//   if (!product) {
//     return <div className="p-10 text-center">محصول پیدا نشد</div>;
//   }

//   const imageSrc = product.image?.startsWith("http")
//     ? product.image
//     : `http://127.0.0.1:8000/${product.image}`;

//   return (
//     <div className="mx-auto max-w-5xl px-4 py-10" dir="rtl">
//       <Link
//         to="/"
//         className="mb-6 inline-block text-sm text-blue-600 hover:underline"
//       >
//         بازگشت به فروشگاه
//       </Link>
//       <div className="grid grid-cols gap-10 md:grid-cols-2">
//         <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
//           <img
//             src={imageSrc}
//             alt={product.name}
//             className="h-full w-full object-cover"
//           />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

//           <p className="mt-4 text-gray-600 leading-relaxed">
//             {product.description}
//           </p>

//           <div className="mt-6 text-3xl font-bold text-gray-900">
//             {Number(product.price).toLocaleString("fa-IR")}تومان
//           </div>

//           <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 md:w-auto md:px-10">
//             افزودن به سبد خرید
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import api from "../api/axios";

function ProductDetail() {
  const { slug } = useParams();

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

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="aspect-square rounded-3xl bg-gray-200"></div>

          <div className="space-y-5">
            <div className="h-8 w-2/3 rounded bg-gray-200"></div>
            <div className="h-4 w-full rounded bg-gray-200"></div>
            <div className="h-4 w-5/6 rounded bg-gray-200"></div>
            <div className="h-10 w-40 rounded bg-gray-200"></div>
            <div className="h-14 w-full rounded-2xl bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold text-gray-800">محصول پیدا نشد</h2>

        <Link
          to="/"
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
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
    <main className="mx-auto max-w-7xl px-5 py-10" dir="rtl">
      {/* Breadcrumb */}

      <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="transition hover:text-blue-600">
          فروشگاه
        </Link>

        <ArrowRight size={15} />

        <span className="text-gray-700">{product.name}</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* IMAGE */}

        <div>
          <div
            className="
            group
            overflow-hidden
            rounded-[30px]
            border
            border-gray-200
            bg-gradient-to-br
            from-gray-50
            to-white
            shadow-sm
            "
          >
            <img
              src={imageSrc}
              alt={product.name}
              className="
              aspect-square
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
              "
            />
          </div>
        </div>

        {/* INFO */}

        <div>
          <div className="flex flex-wrap items-center gap-3">
            {product.available && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">
                <Check size={15} />
                موجود
              </span>
            )}

            {isSpecial && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                ویژه
              </span>
            )}
          </div>

          <h1 className="mt-5 text-3xl font-extrabold leading-relaxed text-gray-900">
            {product.name}
          </h1>

          {/* Categories */}

          <div className="mt-5 flex flex-wrap gap-2">
            {product.categories?.map((cat) => (
              <span
                key={cat.id}
                className="
                rounded-full
                border
                border-gray-200
                bg-gray-50
                px-4
                py-1.5
                text-sm
                text-gray-600
                transition
                hover:border-blue-400
                hover:bg-blue-50
                hover:text-blue-600
                "
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Description */}

          <div className="mt-8">
            <h3 className="mb-3 text-lg font-bold text-gray-900">توضیحات</h3>

            <p className="leading-8 text-gray-600">
              {product.description?.trim()
                ? product.description
                : "توضیحاتی برای این محصول ثبت نشده است."}
            </p>
          </div>

          {/* Price */}

          <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <span className="text-sm text-gray-500">قیمت محصول</span>

            <div className="mt-2 flex items-end gap-2">
              <h2 className="text-4xl font-extrabold text-gray-900">
                {Number(product.price).toLocaleString("fa-IR")}
              </h2>

              <span className="pb-1 text-gray-500">تومان</span>
            </div>
            {/* Quantity */}

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <div className="flex items-center overflow-hidden rounded-2xl border border-gray-200">
                <button
                  onClick={() => setCount((prev) => Math.max(1, prev - 1))}
                  className="p-4 transition hover:bg-gray-100"
                >
                  <Minus size={18} />
                </button>

                <span className="min-w-14 text-center text-lg font-bold">
                  {count}
                </span>

                <button
                  onClick={() => setCount((prev) => prev + 1)}
                  className="p-4 transition hover:bg-gray-100"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                disabled={!product.available}
                className={`
                  flex-1
                  rounded-2xl
                  py-4
                  font-semibold
                  transition-all
                  duration-300
                  ${
                    product.available
                      ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
                      : "cursor-not-allowed bg-gray-200 text-gray-500"
                  }
                `}
              >
                <span className="flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  افزودن به سبد خرید
                </span>
              </button>
            </div>

            {/* Actions */}

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
                border-gray-200
                transition
                hover:border-red-400
                hover:bg-red-50
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
                border-gray-200
                transition
                hover:border-blue-400
                hover:bg-blue-50
                "
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Shipping Card */}

            <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-gray-800">اطلاعات ارسال</h3>

              <div className="mt-5 space-y-4 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>ارسال</span>
                  <span className="font-medium text-gray-900">
                    ۲ تا ۵ روز کاری
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>ضمانت</span>
                  <span className="font-medium text-gray-900">
                    ضمانت اصالت کالا
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>پشتیبانی</span>
                  <span className="font-medium text-gray-900">۲۴ ساعته</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
