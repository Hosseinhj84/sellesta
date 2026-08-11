import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  FolderOpen,
  ImagePlus,
  Save,
  AlertCircle,
} from "lucide-react";
import api , {BASE_URL} from "../../api/axios";

function AdminCategoryForm() {
  const { slug } = useParams();
  const isEditMode = Boolean(slug);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) return;

    api
      .get(`categories/${slug}/`)
      .then((res) => {
        setName(res.data.name);
        setCurrentImage(res.data.image);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    const formData = new FormData();

    formData.append("name", name);

    if (imageFile) {
      formData.append("uploaded_image", imageFile);
    }

    try {
      if (isEditMode) {
        await api.patch(`categories/${slug}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("categories/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      navigate("/admin/categories");
    } catch (err) {
      console.error(err);
      setError("ذخیره دسته‌بندی انجام نشد.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div dir="rtl" className="animate-pulse space-y-6">
        <div className="h-10 w-64 rounded-xl bg-gray-200"></div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="h-14 rounded-2xl bg-gray-200"></div>

          <div className="mt-8 h-72 rounded-3xl bg-gray-200"></div>

          <div className="mt-8 h-14 rounded-2xl bg-gray-200"></div>
        </div>
      </div>
    );
  }

  const imageSrc = imageFile
    ? URL.createObjectURL(imageFile)
    : currentImage
      ? currentImage.startsWith("http")
        ? currentImage
        : `${BASE_URL}/${currentImage}`
      : null;
  return (
    <div dir="rtl" className="mx-auto max-w-6xl">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-3 flex items-center gap-2 text-sm text-gray-500 transition hover:text-blue-600"
          >
            <ArrowRight size={16} />
            بازگشت
          </button>

          <h1 className="text-3xl font-extrabold text-gray-900">
            {isEditMode ? "ویرایش دسته‌بندی" : "ایجاد دسته‌بندی"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            اطلاعات دسته‌بندی را وارد کنید.
          </p>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          {/* Name */}

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              نام دسته‌بندی
            </label>

            <div className="relative">
              <FolderOpen
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلاً تجهیزات بوکس"
                required
                className="
                w-full
                rounded-2xl
                border
                border-gray-300
                py-4
                pr-12
                pl-4
                text-sm
                outline-none
                transition-all
                duration-300
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
              />
            </div>
          </div>

          {/* Error */}

          {error && (
            <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
              <AlertCircle size={18} />

              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Save */}

          <button
            disabled={saving}
            type="submit"
            className={`
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            py-4
            font-semibold
            transition-all
            duration-300
            ${
              saving
                ? "cursor-not-allowed bg-blue-300 text-white"
                : "bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 active:scale-[0.98]"
            }
          `}
          >
            <Save size={20} />

            {saving
              ? "در حال ذخیره..."
              : isEditMode
                ? "ذخیره تغییرات"
                : "ایجاد دسته‌بندی"}
          </button>
        </form>

        {/* Sidebar */}

        <div className="space-y-6">
          {/* Image Card */}

          <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h3 className="font-bold text-gray-900">تصویر دسته‌بندی</h3>

              <p className="mt-1 text-sm text-gray-500">تصویر شاخص این دسته</p>
            </div>

            <div className="p-6">
              <label
                className="
      group
      flex
      cursor-pointer
      flex-col
      items-center
      justify-center
      overflow-hidden
      rounded-3xl
      border-2
      border-dashed
      border-gray-300
      bg-gray-50
      transition-all
      duration-300
      hover:border-blue-500
      hover:bg-blue-50
      "
              >
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Preview"
                    className="
          h-72
          w-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
          "
                  />
                ) : (
                  <div className="flex h-72 flex-col items-center justify-center text-gray-400">
                    <ImagePlus size={46} strokeWidth={1.5} />

                    <p className="mt-4 text-sm font-medium">انتخاب تصویر</p>

                    <span className="mt-2 text-xs text-gray-500">
                      PNG / JPG / WEBP
                    </span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          {/* Summary */}

          <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-6">
              <h3 className="font-bold text-gray-900">خلاصه</h3>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <p className="text-xs text-gray-500">نام دسته‌بندی</p>

                <p className="mt-2 font-bold text-gray-900">
                  {name || "ثبت نشده"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">وضعیت تصویر</p>

                <div className="mt-2">
                  {imageSrc ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      تصویر انتخاب شده
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                      بدون تصویر
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500">حالت</p>

                <div className="mt-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {isEditMode ? "ویرایش" : "ایجاد"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCategoryForm;
