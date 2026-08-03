import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import api from "../../api/axios";

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

  useEffect(() => {
    api
      .get("categories/")
      .then((res) => setCategories(res.data.results || res.data));

    if (isEditMode) {
      api.get(`products/${slug}/`).then((res) => {
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
      });
    }
  }, [slug]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const toggleCategory = (categoryId) => {
    setForm((prev) => {
      const alreadySelected = prev.category_ids.includes(categoryId);
      return {
        ...prev,
        category_ids: alreadySelected
          ? prev.category_ids.filter((id) => id !== categoryId)
          : [...prev.category_ids, categoryId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.prevenDefault();
    SetSaving(true);
    SetError(true);
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
      setError("خطا در ذخیره‌ی محصول. اطلاعات را بررسی کنید.");
    } finally {
      setSaving(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !productSlug) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post(`products/${productSlug}/images/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setGallery((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
      alert("خطا در آپلود عکس گالری.");
    }
  };

  const handleGalleryDelete = async (imageId) => {
    try {
      await api.delete(`products/images/${imageId}/`);
      setGallery((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      console.error(err);
      alert("خطا در حذف عکس.");
    }
  };

  if (loading) return <div>در حال بارگذاری...</div>;

  return (
    <div dir="rtl" className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {isEditMode ? "ویرایش محصول" : "محصول جدید"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="نام محصول"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <textarea
          name="description"
          placeholder="توضیحات"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <input
          name="price"
          type="number"
          placeholder="قیمت (تومان)"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          موجود است
        </label>

        {/* انتخاب دسته‌بندی‌ها */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">دسته‌بندی‌ها</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  form.category_ids.includes(cat.id)
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* عکس اصلی */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">عکس اصلی</p>
          {currentImage && (
            <img
              src={
                currentImage.startsWith("http")
                  ? currentImage
                  : `http://127.0.0.1:8000/${currentImage}`
              }
              alt="عکس فعلی"
              className="mb-2 h-24 w-24 rounded-xl object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:bg-gray-300"
        >
          {saving ? "در حال ذخیره..." : "ذخیره‌ی محصول"}
        </button>
      </form>

      {/* گالری - فقط بعد از ساخت محصول قابل استفاده‌ست */}
      {productSlug ? (
        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="mb-3 text-sm font-medium text-gray-700">گالری تصاویر</p>

          <div className="flex flex-wrap gap-3">
            {gallery.map((img) => (
              <div key={img.id} className="group relative h-20 w-20">
                <img
                  src={
                    img.image.startsWith("http")
                      ? img.image
                      : `http://127.0.0.1:8000/${img.image}`
                  }
                  alt="گالری"
                  className="h-full w-full rounded-xl object-cover"
                />
                <button
                  onClick={() => handleGalleryDelete(img.id)}
                  className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleGalleryUpload}
            className="mt-3"
          />
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-400">
          برای افزودن گالری، اول محصول رو ذخیره کن.
        </p>
      )}
    </div>
  );
}

export default AdminProductForms;