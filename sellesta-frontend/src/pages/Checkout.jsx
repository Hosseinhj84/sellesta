import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api/axios";

function Checkout() {
  const { cart, refreshCart } = useCart();
  const navigate = useNavigate();

  const [forms, setFroms] = useState({
    full_name: "",
    phone: "",
    address: "",
    postal_code: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFroms({ ...forms, [e.target.name]: e.target.value });
  };

  const handleSuubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await api.post("orders/create/", forms);
      navigate(`/orders/${res.data.id}`);
    } catch (err) {
      setError("ثبت سفارش شما با خطا مواجع شد.اطلاعات را بررسی کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center" dir="rtl">
        <p className="text-gray-500">سبد خرید شما خالی است</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12" dir="rtl">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">ثبت سفارش</h1>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <form onSubmit={handleSuubmit} className="space-y-4">
          <input
            type="text"
            name="full_name"
            placeholder="نام و نام خانوادگی"
            value={forms.full_name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focue:ring-4 focus:ring-blue-100"
          />

          <textarea
            name="address"
            placeholder="آدرس کامل"
            value={forms.address}
            onChange={handleChange}
            required
            rows={4}
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
          <input
            type="text"
            name="postal_code"
            placeholder="کد پستی (اختیاری"
            value={forms.postal_code}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
          <input
            type="text"
            name="phone"
            placeholder="شماره تلفن"
            value={forms.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:bg-gray-300"
          >
            {submitting ? "درحال ثبت سفارش..." : "پرداخت و ثبت سفارش"}
          </button>
        </form>

        <div className="rounded-2xl border border-gray-200 p-6">
          <h2 className="mb-4 font-semibold text-gray-900">خلاصه سفارش</h2>

          <div className="space-y-3">
            {cart.items.map((item) => {
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.product.name} x {item.quantity}
                </span>
                <span className="font-medium text-gray-900">
                  {Number(item.subtotal).toLocaleString("fa-IR")}تومان
                </span>
              </div>;
            })}
          </div>

          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 font-bold">
            <span>جمع کل</span>
            <span className="text-blue-600">
              {Number(cart.total_price).toLocaleString("fa-IR")}تومان
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
