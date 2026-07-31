// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/axios";
// import { set } from "animejs";

// const STATUS_LABLE = {
//   pending: "در انتظار پرداخت",
//   paid: "پرداخت شده",
//   shipped: "ارسال شده",
//   delivered: "تحویل داده شده",
//   cancelled: "لغو شده",
// };

// const STATUS_COLORS = {
//   pending: "bg-yellow-100 text-yellow-700",
//   paid: "bg-green-100 text-green-700",
//   shipped: "bg-blue-100 text-blue-700",
//   delivered: "bg-gray-100 text-gray-700",
//   cancelled: "bg-red-100 text-red-700",
// };

// function MyOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get("orders/")
//       .then((res) => setOrders(res.data))
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <div className="p-10 text-center">در حال بارگزاری...</div>;
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="mx-auto max-w-2xl px-4 py-20 text-center" dir="rtl">
//         <p className="text-gray-500">هنوز سفارشی ثبت نکردید</p>
//         <Link
//           to="/"
//           className="mt-4 inline-block text-blue-600 hover:underline"
//         >
//           بازگشت به فروشگاه
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-3xl px-4 py-12" dir="rtl">
//       <h1 className="mb-8 text-2xl font-bold text-gray-900">سفارش های من</h1>

//       <div className="spacr-y-4">
//         {orders.map((order) => (
//           <Link
//             key={order.id}
//             to={`/orders/${order.id}`}
//             className="block rounded-2xl border border-gray-200 p-5 transition hover:border-blue-300 hover:shadow-md"
//           >
//             <div className="flex items-center justify-between">
//               <span className="font-semibold text-gray-900">
//                 سفارش #{order.id}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[order.status]}`}
//               >
//                 {STATUS_LABLE[order.status]}
//               </span>
//             </div>

//             <p className="mt-2 text-sm text-gray-500">
//               {order.items.length} قلم کالا
//             </p>

//             <div className="mt-3 flex items-center justify-between">
//               <span className="text-xs text-gray-400">
//                 {new Date(order.created).toLocaleDateString("fa-IR")}
//               </span>
//               <span className="font-bold text-blue-600">
//                 {Number(order.total_price).toLocaleString("fa-IR")} تومان
//               </span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MyOrders;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Package, Clock3 } from "lucide-react";

import api from "../api/axios";

const STATUS_LABEL = {
  pending: "در انتظار پرداخت",
  paid: "پرداخت شده",
  shipped: "ارسال شده",
  delivered: "تحویل داده شده",
  cancelled: "لغو شده",
};

const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-emerald-100 text-emerald-700",
  shipped: "bg-sky-100 text-sky-700",
  delivered: "bg-zinc-100 text-zinc-700",
  cancelled: "bg-red-100 text-red-700",
};

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("orders/")
      .then((res) => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- Loading ---------------- */

  if (loading) {
    return (
      <main dir="rtl" className="mx-auto max-w-6xl animate-pulse px-5 py-10">
        <div className="h-40 rounded-[30px] bg-zinc-200" />

        <div className="mt-8 space-y-5">
          <div className="h-32 rounded-[26px] bg-zinc-200" />
          <div className="h-32 rounded-[26px] bg-zinc-200" />
          <div className="h-32 rounded-[26px] bg-zinc-200" />
        </div>
      </main>
    );
  }

  /* ---------------- Empty ---------------- */

  if (!orders.length) {
    return (
      <main
        dir="rtl"
        className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-5"
      >
        <div className="rounded-[34px] border border-zinc-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
            <ShoppingBag size={44} className="text-red-600" />
          </div>

          <h1 className="mt-8 text-3xl font-black text-zinc-900">
            هنوز سفارشی ثبت نکرده‌اید
          </h1>

          <p className="mt-4 leading-8 text-zinc-500">
            اولین خریدتان از فروشگاه رونین را انجام دهید و تجهیزات رزمی مورد
            نیازتان را تهیه کنید.
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
      {/* Hero */}

      <section
        className="
          rounded-[34px]

          border
          border-red-100

          bg-gradient-to-br
          from-red-50
          via-white
          to-red-100

          p-8

          shadow-sm
        "
      >
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <h1 className="text-4xl font-black text-zinc-900">سفارش‌های من</h1>

            <p className="mt-3 max-w-xl leading-8 text-zinc-600">
              وضعیت تمام سفارش‌های ثبت شده خود را در این صفحه مشاهده و پیگیری
              کنید.
            </p>
          </div>

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow">
            <Package size={42} className="text-red-600" />
          </div>
        </div>
      </section>

      {/* Orders */}

      <section className="mt-10 space-y-5">
        {orders.map((order) => {
          const itemCount = order.items.reduce(
            (sum, item) => sum + item.quantity,
            0,
          );

          return (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="
                group
                block

                rounded-[28px]

                border
                border-zinc-200

                bg-white

                p-6

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-red-500
                hover:shadow-xl
                hover:shadow-red-100
              "
            >
              {/* Header */}

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2
                    className="
                      text-2xl
                      font-black
                      text-zinc-900

                      transition

                      group-hover:text-red-600
                    "
                  >
                    سفارش #{order.id}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
                    <Clock3 size={15} />

                    {new Date(order.created).toLocaleDateString("fa-IR")}
                  </div>
                </div>

                <span
                  className={`
                    rounded-full

                    px-4
                    py-2

                    text-sm
                    font-bold

                    ${STATUS_COLORS[order.status]}
                  `}
                >
                  {STATUS_LABEL[order.status]}
                </span>
              </div>

              {/* Divider */}

              <div className="my-6 h-px bg-zinc-100" />

              {/* Info */}

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <p className="text-sm text-zinc-500">تعداد کالا</p>

                  <h3 className="mt-2 text-xl font-bold text-zinc-900">
                    {itemCount}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-zinc-500">مبلغ سفارش</p>

                  <h3 className="mt-2 text-xl font-black text-zinc-900">
                    {Number(order.total_price).toLocaleString("fa-IR")}
                  </h3>

                  <span className="text-sm text-zinc-500">تومان</span>
                </div>

                <div>
                  <p className="text-sm text-zinc-500">تعداد آیتم‌ها</p>

                  <h3 className="mt-2 text-xl font-bold text-zinc-900">
                    {order.items.length}
                  </h3>
                </div>
              </div>

              {/* Products Preview */}

              <div className="mt-6 flex flex-wrap gap-2">
                {order.items.slice(0, 3).map((item) => (
                  <span
                    key={item.id}
                    className="
                      rounded-full

                      bg-zinc-100

                      px-3
                      py-1.5

                      text-sm

                      text-zinc-600

                      transition

                      group-hover:bg-red-50
                      group-hover:text-red-600
                    "
                  >
                    {item.product_name}
                  </span>
                ))}

                {order.items.length > 3 && (
                  <span
                    className="
                      rounded-full

                      bg-red-50

                      px-3
                      py-1.5

                      text-sm
                      font-semibold

                      text-red-600
                    "
                  >
                    +{order.items.length - 3} مورد دیگر
                  </span>
                )}
              </div>

              {/* Footer */}

              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm text-zinc-500">
                  برای مشاهده جزئیات کلیک کنید
                </span>

                <div
                  className="
                    flex
                    items-center
                    gap-2

                    font-bold

                    text-red-600

                    transition-transform

                    group-hover:-translate-x-1
                  "
                >
                  مشاهده سفارش
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Summary */}

      <section className="mt-12">
        <div className="rounded-[30px] border border-zinc-200 bg-white p-7 shadow-sm">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Total Orders */}

            <div className="rounded-2xl bg-zinc-50 p-5">
              <p className="text-sm text-zinc-500">تعداد سفارش‌ها</p>

              <h3 className="mt-2 text-3xl font-black text-zinc-900">
                {orders.length}
              </h3>
            </div>

            {/* Paid Amount */}

            <div className="rounded-2xl bg-zinc-50 p-5">
              <p className="text-sm text-zinc-500">مجموع خرید</p>

              <h3 className="mt-2 text-3xl font-black text-red-600">
                {orders
                  .reduce((sum, order) => sum + Number(order.total_price), 0)
                  .toLocaleString("fa-IR")}
              </h3>

              <span className="text-sm text-zinc-500">تومان</span>
            </div>

            {/* Delivered */}

            <div className="rounded-2xl bg-zinc-50 p-5">
              <p className="text-sm text-zinc-500">سفارش‌های تحویل شده</p>

              <h3 className="mt-2 text-3xl font-black text-emerald-600">
                {orders.filter((o) => o.status === "delivered").length}
              </h3>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/"
              className="
                flex-1

                rounded-2xl

                bg-zinc-900

                py-4

                text-center
                font-bold

                text-white

                transition-all

                hover:bg-red-600
                hover:shadow-xl
                hover:shadow-red-200
              "
            >
              بازگشت به فروشگاه
            </Link>

            <Link
              to="/profile"
              className="
                flex-1

                rounded-2xl

                border
                border-zinc-200

                py-4

                text-center
                font-semibold

                text-zinc-700

                transition-all

                hover:border-red-500
                hover:text-red-600
              "
            >
              بازگشت به حساب کاربری
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MyOrders;
