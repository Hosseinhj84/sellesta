import { useEffect, useState } from "react";
import api from "../../api/axios";
import { ShoppingBag, Wallet, Clock3, CheckCircle2 } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "pending", label: "در انتظار پرداخت" },
  { value: "paid", label: "پرداخت شده" },
  { value: "shipped", label: "ارسال شده" },
  { value: "delivered", label: "تحویل شده" },
  { value: "cancelled", label: "لغو شده" },
];

const STATUS_STYLE = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
  shipped: "bg-blue-100 text-blue-700 border-blue-200",
  delivered: "bg-slate-100 text-slate-700 border-slate-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    api
      .get("admin/orders/")
      .then((res) => setOrders(res.data.results || res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`admin/orders/${orderId}/`, {
        status: newStatus,
      });

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );
    } catch {
      alert("خطا در تغییر وضعیت سفارش");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  const totalOrders = orders.length;

  const paidOrders = orders.filter((o) => o.status === "paid").length;

  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  const totalIncome = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + Number(o.total_price), 0);
  return (
    <div dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800">
            مدیریت سفارش‌ها
          </h1>

          <p className="mt-2 text-slate-500">مدیریت سفارش‌های فروشگاه Ronin</p>
        </div>
      </div>

      <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">کل سفارش‌ها</p>

              <h3 className="mt-2 text-3xl font-black">{totalOrders}</h3>
            </div>

            <div className="rounded-2xl bg-red-100 p-4">
              <ShoppingBag className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">پرداخت شده</p>

              <h3 className="mt-2 text-3xl font-black">{paidOrders}</h3>
            </div>

            <div className="rounded-2xl bg-green-100 p-4">
              <CheckCircle2 className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">در انتظار</p>

              <h3 className="mt-2 text-3xl font-black">{pendingOrders}</h3>
            </div>

            <div className="rounded-2xl bg-yellow-100 p-4">
              <Clock3 className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">درآمد</p>

              <h3 className="mt-2 text-xl font-black">
                {totalIncome.toLocaleString("fa-IR")}
              </h3>
            </div>

            <div className="rounded-2xl bg-blue-100 p-4">
              <Wallet className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr className="text-sm font-bold text-slate-700">
                <th className="px-6 py-5 text-right">شماره</th>

                <th className="px-6 py-5 text-right">کاربر</th>

                <th className="px-6 py-5 text-right">مبلغ</th>

                <th className="px-6 py-5 text-right">تاریخ</th>

                <th className="px-6 py-5 text-center">وضعیت</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="
                    border-b
                    border-slate-100
                    transition-all
                    duration-200
                    hover:bg-slate-50
                    last:border-b-0
                  "
                >
                  {/* شماره سفارش */}

                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-800">#{order.id}</div>
                  </td>

                  {/* کاربر */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-full
                          bg-gradient-to-br
                          from-red-600
                          to-red-700
                          text-sm
                          font-bold
                          text-white
                          shadow
                        "
                      >
                        {order.username?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {order.username}
                        </p>

                        <p className="text-xs text-slate-400">مشتری فروشگاه</p>
                      </div>
                    </div>
                  </td>

                  {/* مبلغ */}

                  <td className="px-6 py-5">
                    <span className="font-bold text-red-600">
                      {Number(order.total_price).toLocaleString("fa-IR")}
                    </span>

                    <span className="mr-1 text-sm text-slate-500">تومان</span>
                  </td>

                  {/* تاریخ */}

                  <td className="px-6 py-5 text-slate-500">
                    {new Date(order.created).toLocaleDateString("fa-IR")}
                  </td>

                  {/* وضعیت */}

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <span
                        className={`
                          rounded-full
                          border
                          px-3
                          py-1
                          text-xs
                          font-bold
                          ${STATUS_STYLE[order.status]}
                        `}
                      >
                        {
                          STATUS_OPTIONS.find((x) => x.value === order.status)
                            ?.label
                        }
                      </span>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          px-3
                          py-2
                          text-sm
                          outline-none
                          transition
                          focus:border-red-500
                          focus:ring-4
                          focus:ring-red-100
                        "
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
