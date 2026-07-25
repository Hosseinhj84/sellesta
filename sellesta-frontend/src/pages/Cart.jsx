import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, updateCartItem, removeCartItem, loading } = useCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg text-gray-500">سبد خرید شما خالی است</p>
        <Link
          to="/"
          className="mt-4 inline-block text-blue-600 hover:underline0"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-4xl px-4 py-10" dir="rtl">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">سبد خرید</h1>

      <div className="space-y-4">
        {cart.items.map((item) => {
          const imageSrc = item.product.image?.startsWith("http")
            ? item.product.image
            : `127.0.0.1:8000${item.product.image}`;

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4"
            >
              <img
                src={imageSrc}
                alt={item.product.image}
                className="h-20 w-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {item.product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {Number(item.product.price).toLocaleString("fa-IR")}تومان
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCartItem(item.id, item.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateCartItem(item.id, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <div className="w-28 text-left font-semibold text-gray-900">
                {Number(item.subtotal).toLocaleString("fa-IR")}تومان
              </div>
              <button
                onClick={() => removeCartItem(item.id)}
                className="text-sm text-red-500 hover:underline"
              >
                حذف
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-2xl bg-gray-50 p-6">
        <span className="text-lg font-bold text-gray-900">جمع کل</span>
        <span className="text-xl font-bold text-blue-600">
          {Number(cart.total_price).toLocaleString("fa-IR")}تومان
        </span>
      </div>
      <button
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-blue-600 font-medium text-white transition hover:bg-blue-700 disabled:bg-gray-300"
      >
        ادامه فرآیند خرید
      </button>
    </div>
  );
}

export default Cart;