import { useEffect, useState } from "react";
import api from "../../api/axios";
import { all } from "axios";

const STATUS_OPTIONS = [
  { value: "pending", lable: "در انتظار پرداخت" },
  { value: "paid", lable: "پرداخت شده" },
  { value: "shipped", lable: "ارسال شده" },
  { value: "deliverd", lable: "تحویل شده" },
  { value: "cancelled", lable: "لفو شده" },
];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    api
      .get("admin/orders/")
      .then((res) => setOrders(res.data.result || res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`admin/orders/${orderId}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );
    } catch (err) {
      console.error(err);
      alert("خطا در تغییر وضعیت سفارش.");
    }
  };

  if (loading) return <div>در حال بارگزاری...</div>;

  return (
    <div dir="rtl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">سفارش‌ها</h1>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-right text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="p-4">شماره</th>
              <th className="p-4">کاربر</th>
              <th className="p-4">مبلغ</th>
              <th className="p-4">تاریخ</th>
              <th className="p-4">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="p-4 font-medium">#{order.id}</td>
                <td className="p-4">{order.username}</td>
                <td className="p-4">
                  {Number(order.total_price).toLocaleString("fa-IR")} تومان
                </td>
                <td className="p-4 text-gray-500">
                  {new Date(order.created).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-blue-500"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;
