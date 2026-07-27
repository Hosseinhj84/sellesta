import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  } , [id]);

  if (loading) return <div className="p-10 text-center">در حال بارگزاری ....</div>;
  if (!order) return <div className="p-10 text-center">سفارش پیدا نشد.</div>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12" dir="rtl">
        <div className="mb-6 rounded-2xl bg-green-50 p-6 text-center">
            <p className="text-lg font-bold text-green-700">سفارش شما با موفقیت ثبت شد.</p>
            <p className="mt-1 text-sm text-green-600">شماره سفارش : #{order.id}</p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-6">
            <h2 className="mb-4 font-semibold text-gray-900">جزئیات سفارش</h2>

            {order.items.map((item) => (
                <div key={item.id} className="flex justify-between border-b border-gray-100 p-3 text-sm">
                    <span>{item.product_name} x {item.quantity}</span>
                    <span className="font-medium">
                        {Number(item.subtotal).toLocaleString("fa-IR")}تومان
                    </span>
                </div>
            ))}

            <div className="mt-4 flex justify-between font-bold">
                <span>جمع کل</span>
                <span className="text-blue-600">
                    {Number(order.total_price).toLocaleString("fa-IR")}تومان
                </span>
            </div>
        </div>

        <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
        بازگشت به فروشگاه
        </Link>
    </div>
  )
}

export default OrderDetail;