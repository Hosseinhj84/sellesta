import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  Filter,
  Package,
  CircleCheck,
  CircleX,
  Eye,
} from "lucide-react";
import api from "../../api/axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api
      .get("products/")
      .then((res) => setProducts(res.data.results || res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("آیا از حذف این محصول مطمئن هستید؟")) return;

    try {
      await api.delete(`products/${slug}/`);

      setProducts((prev) => prev.filter((product) => product.slug !== slug));
    } catch (err) {
      console.error(err);
      alert("خطا در حذف محصول");
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.slug.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "available"
            ? product.available
            : !product.available;

      return matchSearch && matchStatus;
    });
  }, [products, search, statusFilter]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              مدیریت محصولات
            </h1>

            <p className="mt-2 text-slate-500">
              ایجاد، ویرایش و مدیریت محصولات فروشگاه رونین
            </p>
          </div>

          <Link
            to="/admin/products/new"
            className="
      inline-flex
      items-center
      gap-2
      rounded-2xl
      bg-indigo-600
      px-6
      py-3
      font-semibold
      text-white
      transition-all
      duration-300
      hover:-translate-y-1
      hover:bg-indigo-700
      hover:shadow-xl
      "
          >
            <Plus size={18} />
            افزودن محصول
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">کل محصولات</p>

              <h2 className="mt-2 text-3xl font-black text-slate-900">
                {products.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-indigo-100 p-4">
              <Package className="text-indigo-600" size={28} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">موجود</p>

              <h2 className="mt-2 text-3xl font-black text-emerald-600">
                {products.filter((p) => p.available).length}
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-100 p-4">
              <CircleCheck className="text-emerald-600" size={28} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">ناموجود</p>

              <h2 className="mt-2 text-3xl font-black text-red-600">
                {products.filter((p) => !p.available).length}
              </h2>
            </div>

            <div className="rounded-2xl bg-red-100 p-4">
              <CircleX className="text-red-600" size={28} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو بر اساس نام یا اسلاگ..."
            className="
      w-full
      rounded-2xl
      border
      border-slate-200
      bg-white
      py-3
      pr-11
      pl-4
      outline-none
      transition-all
      duration-300
      focus:border-indigo-500
      focus:ring-4
      focus:ring-indigo-100
      "
          />
        </div>

        <div className="relative">
          <Filter
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
      rounded-2xl
      border
      border-slate-200
      bg-white
      py-3
      pr-11
      pl-8
      outline-none
      transition-all
      duration-300
      focus:border-indigo-500
      focus:ring-4
      focus:ring-indigo-100
      "
          >
            <option value="all">همه محصولات</option>

            <option value="available">فقط موجود</option>

            <option value="unavailable">فقط ناموجود</option>
          </select>
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="font-bold text-slate-900">لیست محصولات</h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredProducts.length} محصول نمایش داده می‌شود
            </p>
          </div>
        </div>

        {/* Desktop */}

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr className="text-right text-sm text-slate-500">
                <th className="px-6 py-4 font-semibold">محصول</th>

                <th className="px-6 py-4 font-semibold">قیمت</th>

                <th className="px-6 py-4 font-semibold">وضعیت</th>

                <th className="px-6 py-4 font-semibold">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => {
                const imageSrc = product.image?.startsWith("http")
                  ? product.image
                  : `http://127.0.0.1:8000${product.image}`;

                return (
                  <tr
                    key={product.id}
                    className="
              border-t
              border-slate-100
              transition-all
              duration-200
              hover:bg-slate-50
              "
                  >
                    {/* Product */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={imageSrc}
                          alt={product.name}
                          className="
                    h-16
                    w-16
                    rounded-2xl
                    border
                    border-slate-200
                    object-cover
                    "
                        />

                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {product.name}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-bold text-slate-900">
                          {Number(product.price).toLocaleString("fa-IR")}
                        </p>

                        <span className="text-xs text-slate-500">تومان</span>
                      </div>
                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">
                      {product.available ? (
                        <span
                          className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-emerald-200
                    bg-emerald-50
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-emerald-700
                    "
                        >
                          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                          موجود
                        </span>
                      ) : (
                        <span
                          className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-red-200
                    bg-red-50
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-red-700
                    "
                        >
                          <span className="h-2 w-2 rounded-full bg-red-500"></span>
                          ناموجود
                        </span>
                      )}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/products/${product.slug}`}
                          className="
                    rounded-xl
                    border
                    border-slate-200
                    p-2.5
                    text-slate-500
                    transition
                    hover:border-indigo-200
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    "
                        >
                          <Eye size={18} />
                        </Link>

                        <Link
                          to={`/admin/products/${product.slug}/edit`}
                          className="
                    rounded-xl
                    border
                    border-slate-200
                    p-2.5
                    text-slate-500
                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600
                    "
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(product.slug)}
                          className="
                    rounded-xl
                    border
                    border-slate-200
                    p-2.5
                    text-slate-500
                    transition
                    hover:border-red-200
                    hover:bg-red-50
                    hover:text-red-600
                    "
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile */}

        <div className="space-y-4 p-5 lg:hidden">
          {filteredProducts.map((product) => {
            const imageSrc = product.image?.startsWith("http")
              ? product.image
              : `http://127.0.0.1:8000${product.image}`;

            return (
              <div
                key={product.id}
                className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        "
              >
                <div className="flex gap-4">
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="
            h-24
            w-24
            rounded-2xl
            border
            border-slate-200
            object-cover
            "
                  />

                  <div className="flex flex-1 flex-col">
                    <h3 className="font-bold text-slate-900">{product.name}</h3>

                    <span className="mt-1 text-xs text-slate-500">
                      {product.slug}
                    </span>

                    <div className="mt-3">
                      <span className="text-lg font-black text-slate-900">
                        {Number(product.price).toLocaleString("fa-IR")}
                      </span>

                      <span className="mr-1 text-sm text-slate-500">تومان</span>
                    </div>

                    <div className="mt-4">
                      {product.available ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                          موجود
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          <span className="h-2 w-2 rounded-full bg-red-500"></span>
                          ناموجود
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    to={`/products/${product.slug}`}
                    className="
            flex-1
            rounded-2xl
            border
            border-slate-200
            py-3
            text-center
            text-slate-600
            transition
            hover:bg-slate-50
            "
                  >
                    <Eye className="mx-auto" size={18} />
                  </Link>

                  <Link
                    to={`/admin/products/${product.slug}/edit`}
                    className="
            flex-1
            rounded-2xl
            border
            border-blue-200
            py-3
            text-center
            text-blue-600
            transition
            hover:bg-blue-50
            "
                  >
                    <Pencil className="mx-auto" size={18} />
                  </Link>

                  <button
                    onClick={() => handleDelete(product.slug)}
                    className="
            flex-1
            rounded-2xl
            border
            border-red-200
            py-3
            text-center
            text-red-600
            transition
            hover:bg-red-50
            "
                  >
                    <Trash2 className="mx-auto" size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
              <Package size={42} className="text-slate-400" />
            </div>

            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              محصولی پیدا نشد
            </h2>

            <p className="mt-2 text-slate-500">
              جستجو یا فیلتر را تغییر دهید، یا یک محصول جدید ایجاد کنید.
            </p>

            <Link
              to="/admin/products/new"
              className="
mt-8
inline-flex
items-center
gap-2
rounded-2xl
bg-indigo-600
px-6
py-3
font-semibold
text-white
transition
hover:bg-indigo-700
"
            >
              <Plus size={18} />
              افزودن محصول
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
