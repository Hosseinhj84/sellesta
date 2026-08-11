import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowRight,
  ImagePlus,
  Upload,
  Save,
  Trash2,
  Check,
  X,
  Tag,
  Package,
  DollarSign,
  FileText,
} from "lucide-react";

import api , {BASE_URL} from "../../api/axios";
function AdminProductForms() {
  const { slug } = useParams();

  const isEditMode = Boolean(slug);

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    available: true,
    category_ids: [],
  });

  const [imageFile, setImageFile] = useState(null);

  const [currentImage, setCurrentImage] = useState(null);

  const [gallery, setGallery] = useState([]);

  const [productSlug, setProductSlug] = useState(slug || null);

  const [loading, setLoading] = useState(isEditMode);

  const [saving, SetSaving] = useState(false);

  const [error, SetError] = useState("");
  const previewImage = useMemo(() => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }

    if (currentImage) {
      return currentImage.startsWith("http")
        ? currentImage
        : `${BASE_URL}${currentImage}`;
    }

    return null;
  }, [imageFile, currentImage]);
  useEffect(() => {
    api
      .get("categories/")
      .then((res) => setCategories(res.data.results || res.data));

    if (!isEditMode) return;

    api
      .get(`products/${slug}/`)
      .then((res) => {
        const p = res.data;

        setForm({
          name: p.name,
          description: p.description,
          price: p.price,
          available: p.available,
          category_ids: p.categories.map((c) => c.id),
        });

        setCurrentImage(p.image);

        setGallery(p.gallery || []);

        setLoading(false);
      })
      .catch(console.error);
  }, [slug]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    SetSaving(true);
    SetError("");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("available", form.available);
    form.category_ids.forEach((id) => formData.append("category_ids", id));
    if (imageFile) {
      formData.append("uploaded_image", imageFile);
    }

    try {
      let savedProduct;
      if (isEditMode) {
        const res = await api.patch(`products/${slug}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        savedProduct = res.data;
      } else {
        const res = await api.post("products/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        savedProduct = res.data;
        setProductSlug(savedProduct.slug);
      }
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      SetError("خطا در ذخیره‌ی محصول. اطلاعات را بررسی کنید.");
    } finally {
      SetSaving(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0 || !productSlug) return;

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await api.post(
          `products/${productSlug}/images/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        setGallery((prev) => [...prev, res.data]);
      } catch (err) {
        console.error(err);
        alert(`خطا در آپلود ${file.name}`);
      }
    }
  };

  const toggleCategory = (categoryId) => {
    setForm((prev) => {
      const exists = prev.category_ids.includes(categoryId);

      return {
        ...prev,

        category_ids: exists
          ? prev.category_ids.filter((id) => id !== categoryId)
          : [...prev.category_ids, categoryId],
      };
    });
  };
  if (loading) {
    return (
      <div dir="rtl" className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <h2 className="font-bold text-slate-700">
            در حال دریافت اطلاعات محصول...
          </h2>
        </div>
      </div>
    );
  }
  return (
    <div dir="rtl" className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <button
              onClick={() => navigate(-1)}
              className="transition hover:text-indigo-600"
            >
              بازگشت
            </button>

            <ArrowRight size={16} />

            <span>مدیریت محصولات</span>
          </div>

          <h1 className="text-3xl font-black text-slate-900">
            {isEditMode ? "ویرایش محصول" : "ایجاد محصول جدید"}
          </h1>

          <p className="mt-2 text-slate-500">
            اطلاعات محصول، تصاویر و دسته‌بندی‌ها را مدیریت کنید.
          </p>
        </div>

        <button
          form="product-form"
          type="submit"
          disabled={saving}
          className="
inline-flex
items-center
justify-center
gap-2
rounded-2xl
bg-indigo-600
px-7
py-3
font-semibold
text-white
transition
hover:bg-indigo-700
disabled:opacity-60
"
        >
          <Save size={18} />

          {saving ? "در حال ذخیره..." : "ذخیره محصول"}
        </button>
      </div>
      <div className="grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
        <div className="space-y-6">
          <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-7 py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-indigo-50 p-3">
                    <Package size={22} className="text-indigo-600" />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">اطلاعات محصول</h2>

                    <p className="text-sm text-slate-500">
                      نام، توضیحات و قیمت محصول
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 p-7">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    نام محصول
                  </label>

                  <div className="relative">
                    <Package
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="مثلا ساعت دیواری سامورایی"
                      required
                      className="
w-full
rounded-2xl
border
border-slate-300
bg-white
py-3.5
pr-12
pl-4
transition
outline-none
focus:border-indigo-500
focus:ring-4
focus:ring-indigo-100
"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    توضیحات
                  </label>

                  <div className="relative">
                    <FileText
                      size={18}
                      className="absolute right-4 top-5 text-slate-400"
                    />

                    <textarea
                      name="description"
                      rows={6}
                      value={form.description}
                      onChange={handleChange}
                      placeholder="توضیحات محصول..."
                      className="
w-full
resize-none
rounded-2xl
border
border-slate-300
py-4
pr-12
pl-4
leading-8
outline-none
transition
focus:border-indigo-500
focus:ring-4
focus:ring-indigo-100
"
                    />
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      قیمت
                    </label>

                    <div className="relative">
                      <DollarSign
                        size={18}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="0"
                        required
                        className="
w-full
rounded-2xl
border
border-slate-300
py-3.5
pr-12
pl-4
outline-none
transition
focus:border-indigo-500
focus:ring-4
focus:ring-indigo-100
"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      وضعیت محصول
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          available: !prev.available,
                        }))
                      }
                      className={`
flex
w-full
items-center
justify-between
rounded-2xl
border
px-5
py-3.5
transition-all
${
  form.available
    ? "border-emerald-300 bg-emerald-50"
    : "border-red-300 bg-red-50"
}
`}
                    >
                      <div className="flex items-center gap-3">
                        {form.available ? (
                          <Check size={18} className="text-emerald-600" />
                        ) : (
                          <X size={18} className="text-red-600" />
                        )}

                        <span className="font-medium">
                          {form.available ? "موجود" : "ناموجود"}
                        </span>
                      </div>

                      <div
                        className={`
h-6
w-11
rounded-full
transition
${form.available ? "bg-emerald-500" : "bg-slate-300"}
`}
                      >
                        <div
                          className={`
mt-1
h-4
w-4
rounded-full
bg-white
transition
${form.available ? "mr-6" : "mr-1"}
`}
                        />
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Tag size={18} />
                    دسته‌بندی‌ها
                  </label>

                  <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`
rounded-full
border
px-5
py-2.5
text-sm
font-medium
transition-all
duration-200
${
  form.category_ids.includes(cat.id)
    ? "border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-200"
    : "border-slate-300 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50"
}
`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}
              </div>
            </div>
            {/* Product Image */}

            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-7 py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-blue-50 p-3">
                    <ImagePlus size={22} className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">تصویر اصلی</h2>

                    <p className="text-sm text-slate-500">
                      عکس اصلی محصول را انتخاب کنید.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-7">
                {previewImage ? (
                  <div className="space-y-5">
                    <div
                      className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-slate-50
          "
                    >
                      <img
                        src={previewImage}
                        alt="preview"
                        className="
            h-[360px]
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
            "
                      />

                      <div
                        className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/40
            opacity-0
            transition
            group-hover:opacity-100
            "
                      >
                        <label
                          htmlFor="main-image"
                          className="
              cursor-pointer
              rounded-2xl
              bg-white
              px-6
              py-3
              font-semibold
              text-slate-900
              transition
              hover:scale-105
              "
                        >
                          تغییر تصویر
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="main-image"
                    className="
        flex
        h-[340px]
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-3xl
        border-2
        border-dashed
        border-slate-300
        bg-slate-50
        transition-all
        hover:border-indigo-400
        hover:bg-indigo-50
        "
                  >
                    <div className="rounded-full bg-indigo-100 p-5">
                      <Upload size={34} className="text-indigo-600" />
                    </div>

                    <h3 className="mt-6 text-lg font-bold text-slate-900">
                      انتخاب تصویر
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      کلیک کنید یا تصویر را اینجا رها کنید
                    </p>

                    <span className="mt-3 text-xs text-slate-400">
                      PNG • JPG • WEBP
                    </span>
                  </label>
                )}

                <input
                  id="main-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6">
            <h3 className="font-bold text-slate-900">خلاصه محصول</h3>
          </div>

          <div className="space-y-5 p-6">
            <div>
              <p className="text-xs text-slate-500">نام محصول</p>

              <p className="mt-1 font-bold text-slate-900">
                {form.name || "ثبت نشده"}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">قیمت</p>

              <p className="mt-1 text-lg font-black text-indigo-600">
                {form.price ? Number(form.price).toLocaleString("fa-IR") : "۰"}
                تومان
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">وضعیت</p>

              <div className="mt-2">
                {form.available ? (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    موجود
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    ناموجود
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500">تعداد دسته‌بندی</p>

              <p className="mt-1 font-bold">{form.category_ids.length}</p>
            </div>
          </div>
        </div>
        {productSlug && (
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">گالری تصاویر</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    تصاویر بیشتر محصول
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                  {gallery.length}
                  تصویر
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {gallery.map((img) => (
                  <div
                    key={img.id}
                    className="
group
relative
overflow-hidden
rounded-2xl
border
border-slate-200
"
                  >
                    <img
                      src={
                        img.image.startsWith("http")
                          ? img.image
                          : `${BASE_URL}${img.image}`
                      }
                      className="
aspect-square
w-full
object-cover
transition-transform
duration-500
group-hover:scale-110
"
                    />

                    <button
                      type="button"
                      onClick={() => handleGalleryDelete(img.id)}
                      className="
absolute
left-2
top-2
flex
h-9
w-9
items-center
justify-center
rounded-xl
bg-red-500
text-white
opacity-0
shadow-lg
transition
group-hover:opacity-100
"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <label
                  className="
flex
aspect-square
cursor-pointer
flex-col
items-center
justify-center
rounded-2xl
border-2
border-dashed
border-slate-300
transition
hover:border-indigo-400
hover:bg-indigo-50
"
                >
                  <Upload size={28} className="text-slate-400" />

                  <p className="mt-3 text-xs text-slate-500">افزودن تصویر</p>

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleGalleryUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        )}
        {!productSlug && (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <h3 className="font-bold text-amber-700">گالری تصاویر</h3>

            <p className="mt-2 text-sm leading-7 text-amber-600">
              بعد از اینکه محصول را یک بار ذخیره کنید، امکان افزودن تصاویر گالری
              فعال می‌شود.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProductForms;
