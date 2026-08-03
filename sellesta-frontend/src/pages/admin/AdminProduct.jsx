import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import api from "../../api/axios";
import { set } from "animejs";

function AdminProducts() {
  const [products, setProdcts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api
      .get("products/")
      .then((res) => setProdcts(res.data.results || res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("مطمئنی این محصول رو میخوای حذف کنی ؟")) return;

    try {
      await api.delete(`products/${slug}/`);
      setProdcts((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      console.error(err);
      alert("خطا در حذف محصول");
    }
  };

  if (loading) return <div>درحال بارگزاری...</div>;

  return (
    <div dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">محصولات</h1>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={16} />
          محصول جدید
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-right text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="p-4">عکس</th>
              <th className="p-4">نام</th>
              <th className="p-4">قیمت</th>
              <th className="p-4">موجودی</th>
              <th className="p-4">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const imageSrc = product.image?.startsWith("http")
                ? product.image
                : `http://127.0.0.1:8000/${product.image}`;

              return (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="p-4">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">
                    {Number(product.price).toLocaleString("fa-IR")} تومان
                  </td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        product.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.available ? "موجود" : "ناموجود"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/products/${product.slug}/edit`}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.slug)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;
