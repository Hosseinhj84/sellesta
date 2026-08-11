import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  GripVertical,
  Link2,
  X,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import api from "../../api/axios";

function AdminHeaderLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState(null);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    url: "",
    order: 0,
    is_active: true,
  });

  // =========================
  // دریافت لینک‌های هدر
  // =========================

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("header-links/");

      const data = res.data.results || res.data || [];

      const sortedLinks = [...data].sort(
        (a, b) => Number(a.order) - Number(b.order),
      );

      setLinks(sortedLinks);
    } catch (err) {
      console.error("Header links error:", err);
      setError("دریافت لینک‌های هدر با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // لینک جدید
  // =========================

  const openNewForm = () => {
    setEditingLink(null);

    setForm({
      title: "",
      url: "",
      order: links.length,
      is_active: true,
    });

    setError("");
    setShowForm(true);
  };

  // =========================
  // ویرایش لینک
  // =========================

  const openEditForm = (link) => {
    setEditingLink(link);

    setForm({
      title: link.title || "",
      url: link.url || "",
      order: link.order ?? 0,
      is_active: link.is_active ?? true,
    });

    setError("");
    setShowForm(true);
  };

  // =========================
  // تغییر فرم
  // =========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // بستن فرم
  // =========================

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingLink(null);
    setError("");
  };

  // =========================
  // ذخیره
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    setSaving(true);
    setError("");

    const payload = {
      title: form.title.trim(),
      url: form.url.trim(),
      order: Number(form.order),
      is_active: form.is_active,
    };

    if (!payload.title || !payload.url) {
      setError("عنوان و آدرس لینک الزامی هستند.");
      setSaving(false);
      return;
    }

    try {
      if (editingLink) {
        await api.patch(`header-links/${editingLink.id}/`, payload);
      } else {
        await api.post("header-links/", payload);
      }

      setShowForm(false);
      setEditingLink(null);

      await fetchLinks();
    } catch (err) {
      console.error("Save header link error:", err);

      const apiMessage =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "خطا در ذخیره لینک. اطلاعات وارد شده را بررسی کنید.";

      setError(apiMessage);
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // حذف
  // =========================

  const handleDelete = async (id) => {
    if (deletingId) return;

    const confirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید این لینک را حذف کنید؟",
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await api.delete(`header-links/${id}/`);

      setLinks((prev) => prev.filter((link) => link.id !== id));
    } catch (err) {
      console.error("Delete header link error:", err);

      alert("خطا در حذف لینک. دوباره تلاش کنید.");
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // فعال / غیرفعال
  // =========================

  const toggleActive = async (link) => {
    try {
      const newStatus = !link.is_active;

      await api.patch(`header-links/${link.id}/`, {
        is_active: newStatus,
      });

      setLinks((prev) =>
        prev.map((item) =>
          item.id === link.id
            ? {
                ...item,
                is_active: newStatus,
              }
            : item,
        ),
      );
    } catch (err) {
      console.error("Toggle header link error:", err);

      alert("خطا در تغییر وضعیت لینک.");
    }
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div dir="rtl" className="flex min-h-[300px] items-center justify-center">
        <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
          در حال بارگزاری لینک‌ها...
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-6">
      {/* ========================= */}
      {/* Page Header */}
      {/* ========================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Link2 size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-gray-900">
                لینک‌های هدر
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                مدیریت لینک‌هایی که در منوی اصلی سایت نمایش داده می‌شوند
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={openNewForm}
          className="
            group
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-blue-600
            px-5
            py-3
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-blue-600/20
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-blue-700
            hover:shadow-xl
            hover:shadow-blue-600/25
            active:translate-y-0
          "
        >
          <Plus
            size={18}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
          لینک جدید
        </button>
      </div>

      {/* ========================= */}
      {/* Stats */}
      {/* ========================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">کل لینک‌ها</p>

              <p className="mt-2 text-2xl font-black text-gray-900">
                {links.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <Link2 size={20} />
            </div>
          </div>
        </div>

        {/* Active */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">لینک‌های فعال</p>

              <p className="mt-2 text-2xl font-black text-green-600">
                {links.filter((link) => link.is_active).length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Check size={20} />
            </div>
          </div>
        </div>

        {/* Inactive */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                لینک‌های غیرفعال
              </p>

              <p className="mt-2 text-2xl font-black text-gray-400">
                {links.filter((link) => !link.is_active).length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
              <AlertCircle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* Error */}
      {/* ========================= */}

      {error && !showForm && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={19} />

          <span>{error}</span>

          <button
            type="button"
            onClick={fetchLinks}
            className="mr-auto font-bold underline underline-offset-4"
          >
            تلاش مجدد
          </button>
        </div>
      )}

      {/* ========================= */}
      {/* Links List */}
      {/* ========================= */}

      {links.length > 0 && (
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          {/* List Header */}

          <div className="hidden border-b border-gray-100 bg-gray-50/70 px-5 py-3 text-xs font-bold text-gray-400 md:grid md:grid-cols-[60px_1fr_220px_140px_130px] md:items-center md:gap-4">
            <span>ترتیب</span>
            <span>لینک</span>
            <span>آدرس</span>
            <span>وضعیت</span>
            <span className="text-left">عملیات</span>
          </div>

          {/* Links */}

          <div>
            {links.map((link, index) => (
              <div
                key={link.id}
                className="
                  group
                  relative
                  border-b
                  border-gray-100
                  p-4
                  transition-colors
                  duration-200
                  last:border-0
                  hover:bg-gray-50/70
                  md:grid
                  md:grid-cols-[60px_1fr_220px_140px_130px]
                  md:items-center
                  md:gap-4
                  md:px-5
                  md:py-4
                "
              >
                {/* Order */}

                <div className="mb-4 flex items-center gap-3 md:mb-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-500">
                    <GripVertical size={17} />
                  </div>

                  <span className="text-xs font-bold text-gray-400 md:hidden">
                    ترتیب
                  </span>

                  <span className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-gray-100 px-2 text-xs font-bold text-gray-600 md:h-8">
                    {link.order ?? index}
                  </span>
                </div>

                {/* Title */}

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        link.is_active ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />

                    <p
                      className={`truncate text-sm font-bold ${
                        link.is_active ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {link.title}
                    </p>
                  </div>

                  <p className="mt-1 truncate text-xs text-gray-400 md:hidden">
                    {link.url}
                  </p>
                </div>

                {/* URL */}

                <div className="mt-3 min-w-0 md:mt-0">
                  <div className="flex items-center gap-2">
                    <p
                      className="truncate text-xs text-gray-500"
                      dir="ltr"
                      title={link.url}
                    >
                      {link.url}
                    </p>

                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600 md:block"
                      title="باز کردن لینک"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Status */}

                <div className="mt-4 md:mt-0">
                  <button
                    type="button"
                    onClick={() => toggleActive(link)}
                    className={`
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      px-3
                      py-1.5
                      text-xs
                      font-bold
                      transition-all
                      duration-200
                      ${
                        link.is_active
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }
                    `}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        link.is_active ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />

                    {link.is_active ? "فعال" : "غیرفعال"}
                  </button>
                </div>

                {/* Actions */}

                <div className="mt-4 flex items-center gap-2 md:mt-0 md:justify-end">
                  <button
                    type="button"
                    onClick={() => openEditForm(link)}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      text-blue-600
                      transition-all
                      duration-200
                      hover:bg-blue-50
                      hover:text-blue-700
                    "
                    title="ویرایش"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(link.id)}
                    disabled={deletingId === link.id}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      text-red-500
                      transition-all
                      duration-200
                      hover:bg-red-50
                      hover:text-red-600
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                    title="حذف"
                  >
                    <Trash2
                      size={16}
                      className={deletingId === link.id ? "animate-pulse" : ""}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* Empty State */}
      {/* ========================= */}

      {links.length === 0 && !error && (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Link2 size={28} />
          </div>

          <h2 className="mt-5 text-lg font-black text-gray-900">
            هنوز لینکی اضافه نشده
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            لینک‌هایی مثل «خانه»، «محصولات»، «درباره ما» و «تماس با ما» را از
            اینجا مدیریت کنید.
          </p>

          <button
            type="button"
            onClick={openNewForm}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
              font-bold
              text-white
              transition
              hover:bg-blue-700
            "
          >
            <Plus size={17} />
            افزودن اولین لینک
          </button>
        </div>
      )}

      {/* ========================= */}
      {/* Modal */}
      {/* ========================= */}

      {showForm && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeForm();
            }
          }}
        >
          <div
            className="
              w-full
              max-w-lg
              overflow-hidden
              rounded-3xl
              bg-white
              shadow-2xl
            "
          >
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Link2 size={19} />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-gray-900">
                      {editingLink ? "ویرایش لینک" : "لینک جدید"}
                    </h2>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {editingLink
                        ? "اطلاعات لینک را ویرایش کنید"
                        : "یک لینک جدید به منوی هدر اضافه کنید"}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  text-gray-400
                  transition
                  hover:bg-gray-100
                  hover:text-gray-700
                  disabled:opacity-40
                "
              >
                <X size={19} />
              </button>
            </div>

            {/* Modal Body */}

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              {/* Form Error */}

              {error && showForm && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />

                  <span>{error}</span>
                </div>
              )}

              {/* Title */}

              <div>
                <label
                  htmlFor="header-link-title"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  عنوان لینک
                </label>

                <input
                  id="header-link-title"
                  name="title"
                  type="text"
                  placeholder="مثلاً درباره ما"
                  value={form.title}
                  onChange={handleChange}
                  required
                  disabled={saving}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    disabled:cursor-not-allowed
                    disabled:bg-gray-50
                  "
                />
              </div>

              {/* URL */}

              <div>
                <label
                  htmlFor="header-link-url"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  آدرس لینک
                </label>

                <input
                  id="header-link-url"
                  name="url"
                  type="text"
                  placeholder="/pages/about-us/"
                  value={form.url}
                  onChange={handleChange}
                  required
                  disabled={saving}
                  dir="ltr"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    disabled:cursor-not-allowed
                    disabled:bg-gray-50
                  "
                />

                <p className="mt-2 text-xs text-gray-400">
                  برای لینک‌های داخلی می‌توانید از مسیرهایی مثل /products/
                  استفاده کنید.
                </p>
              </div>

              {/* Order */}

              <div>
                <label
                  htmlFor="header-link-order"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  ترتیب نمایش
                </label>

                <input
                  id="header-link-order"
                  name="order"
                  type="number"
                  min="0"
                  placeholder="مثلاً 0"
                  value={form.order}
                  onChange={handleChange}
                  disabled={saving}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    disabled:cursor-not-allowed
                    disabled:bg-gray-50
                  "
                />
              </div>

              {/* Active */}

              <label
                className="
                  flex
                  cursor-pointer
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  p-4
                  transition
                  hover:border-blue-200
                  hover:bg-blue-50/50
                "
              >
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    لینک فعال باشد
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    لینک‌های غیرفعال در منوی اصلی نمایش داده نمی‌شوند.
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={form.is_active}
                    onChange={handleChange}
                    disabled={saving}
                    className="peer sr-only"
                  />

                  <div
                    className="
                      h-6
                      w-11
                      rounded-full
                      bg-gray-300
                      transition
                      peer-checked:bg-blue-600
                    "
                  />

                  <div
                    className="
                      absolute
                      left-1
                      top-1
                      h-4
                      w-4
                      rounded-full
                      bg-white
                      shadow-sm
                      transition
                      peer-checked:translate-x-5
                    "
                  />
                </div>
              </label>

              {/* Buttons */}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-blue-600
                    py-3
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-blue-600/20
                    transition-all
                    hover:bg-blue-700
                    hover:shadow-xl
                    disabled:cursor-not-allowed
                    disabled:bg-blue-300
                  "
                >
                  {saving ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      در حال ذخیره...
                    </>
                  ) : (
                    <>
                      <Check size={17} />
                      {editingLink ? "ذخیره تغییرات" : "افزودن لینک"}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="
                    flex-1
                    rounded-2xl
                    border
                    border-gray-200
                    py-3
                    text-sm
                    font-bold
                    text-gray-700
                    transition
                    hover:bg-gray-50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHeaderLinks;
