// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Pencil, Trash2, Plus, ImageMinus } from "lucide-react";
// import api from "../../api/axios";

// function AdminCategories() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = () => {
//     api
//       .get("categories/")
//       .then((res) => setCategories(res.data.results || res.data))
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   };

//   const handleDelete = async (slug) => {
//     if (!window.confirm("مطمئنی میخوای این دسته بندی را حذف کنی ؟")) return;

//     try {
//       await api.delete(`categories/${slug}/`);
//       setCategories((prev) => prev.filter((c) => c.slug !== slug));
//     } catch (err) {
//       console.error(err);
//       alert("خطا در حذف دسته بندی محصول");
//     }
//   };

//   if (loading) return <div>در حال بارگزاری ...</div>;

//   return (
//     <div dir="rtl">
//       <div className="mb-6 flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">دسته‌بندی‌ها</h1>
//         <Link
//           to="/admin/categories/new"
//           className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
//         >
//           <Plus size={16} />
//           دسته‌بندی جدید
//         </Link>
//       </div>

//       <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//         {categories.map((cat) => {
//           const imageSrc = cat.image?.startsWith("http")
//             ? cat.image
//             : `http://127.0.0.1:8000/${cat.image}`;

//           return (
//             <div
//               key={cat.id}
//               className="rounded-2xl border border-gray-200 bg-white p-4 text-center"
//             >
//               <img
//                 src={imageSrc}
//                 alt={cat.name}
//                 className="mx-auto mb-3 h-20 w-20 rounded-xl object-cover"
//               />
//               <p className="mb-3 font-medium text-gray-900">{cat.name}</p>

//               <div className="flex justify-center gap-2">
//                 <Link
//                   to={`/admin/categories/${cat.slug}/edit`}
//                   className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
//                 >
//                   <Pencil size={16} />
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(cat.slug)}
//                   className="rounded-lg p-2 text-red-600 hover:bg-red-50"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default AdminCategories;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Plus,
  FolderOpen,
  ImageOff,
  Package,
} from "lucide-react";
import api from "../../api/axios";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    api
      .get("categories/")
      .then((res) => {
        setCategories(res.data.results || res.data);
        console.log(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("از حذف این دسته‌بندی مطمئن هستید؟")) return;

    try {
      await api.delete(`categories/${slug}/`);

      setCategories((prev) => prev.filter((c) => c.slug !== slug));
    } catch (err) {
      console.error(err);
      alert("خطا در حذف دسته‌بندی");
    }
  };

  if (loading) {
    return (
      <div
        dir="rtl"
        className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-3xl border border-gray-200 bg-white p-5"
          >
            <div className="mx-auto h-24 w-24 rounded-2xl bg-gray-200" />

            <div className="mx-auto mt-5 h-4 w-24 rounded bg-gray-200" />

            <div className="mx-auto mt-3 h-3 w-20 rounded bg-gray-100" />

            <div className="mt-6 flex justify-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gray-200" />
              <div className="h-10 w-10 rounded-xl bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div
        dir="rtl"
        className="flex h-[70vh] flex-col items-center justify-center"
      >
        <FolderOpen
          className="mb-6 text-gray-300"
          size={70}
          strokeWidth={1.3}
        />

        <h2 className="text-2xl font-bold text-gray-900">
          هنوز دسته‌بندی وجود ندارد
        </h2>

        <p className="mt-2 text-gray-500">
          اولین دسته‌بندی فروشگاه را ایجاد کنید.
        </p>

        <Link
          to="/admin/categories/new"
          className="mt-8 rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          ایجاد دسته‌بندی
        </Link>
      </div>
    );
  }
  return (
    <div dir="rtl">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            دسته‌بندی‌ها
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            مدیریت دسته‌بندی‌های فروشگاه رونین
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
            <div className="text-xs text-gray-500">تعداد دسته‌بندی‌ها</div>

            <div className="mt-1 flex items-center gap-2">
              <FolderOpen size={18} className="text-blue-600" />

              <span className="text-xl font-bold text-gray-900">
                {categories.length}
              </span>
            </div>
          </div>

          <Link
            to="/admin/categories/new"
            className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-blue-600
            px-5
            py-3
            font-medium
            text-white
            shadow-lg
            shadow-blue-200/50
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-blue-700
          "
          >
            <Plus size={18} />
            دسته‌بندی جدید
          </Link>
        </div>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {categories.map((cat) => {
          const imageSrc = cat.image?.startsWith("http")
            ? cat.image
            : `http://127.0.0.1:8000/${cat.image}`;

          return (
            <div
              key={cat.id}
              className="
              group
              overflow-hidden
              rounded-3xl
              border
              border-gray-200
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-200
              hover:shadow-xl
            "
            >
              {/* Image */}

              <div className="relative overflow-hidden">
                {cat.image ? (
                  <img
                    src={imageSrc}
                    alt={cat.name}
                    className="
                    h-52
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                  />
                ) : (
                  <div
                    className="
                    flex
                    h-52
                    items-center
                    justify-center
                    bg-gradient-to-br
                    from-gray-100
                    to-gray-200
                  "
                  >
                    <ImageOff size={42} className="text-gray-400" />
                  </div>
                )}

                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/45
                  via-black/10
                  to-transparent
                "
                />

                <div className="absolute bottom-4 right-4 left-4">
                  <span
                    className="
                    inline-flex
                    rounded-full
                    bg-white/90
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-gray-700
                    backdrop-blur
                  "
                  >
                    #{cat.id}
                  </span>
                </div>
              </div>

              <div className="space-y-5 p-5">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {cat.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">{cat.slug}</p>
                </div>

                <div
                  className="
                  rounded-2xl
                  bg-gray-50
                  p-4
                "
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">تعداد محصولات</span>

                    <span className="font-bold text-gray-900">
                      {cat.product_count ?? 0}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/admin/categories/${cat.slug}/edit`}
                    className="
                    flex-1
                    rounded-2xl
                    border
                    border-blue-200
                    bg-blue-50
                    py-3
                    text-center
                    font-medium
                    text-blue-600
                    transition
                    hover:bg-blue-600
                    hover:text-white
                  "
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Pencil size={18} />
                      ویرایش
                    </span>
                  </Link>

                  <button
                    onClick={() => handleDelete(cat.slug)}
                    className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-red-200
                    text-red-600
                    transition
                    hover:bg-red-500
                    hover:text-white
                  "
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default AdminCategories;
