import { useEffect, useState } from "react";
import {
  Save,
  FileText,
  Check,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import api from "../../api/axios";

function AdminPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("pages/");

      setPages(res.data.results || res.data || []);
    } catch (err) {
      console.error(err);
      setError("دریافت صفحات با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (slug, content) => {
    setPages((prev) =>
      prev.map((page) =>
        page.slug === slug
          ? {
              ...page,
              content,
            }
          : page,
      ),
    );

    setSavedId(null);
  };

  const handleSave = async (page) => {
    if (savingId === page.slug) return;

    setSavingId(page.slug);
    setSavedId(null);
    setError("");

    try {
      await api.patch(`pages/${page.slug}/`, {
        content: page.content,
      });

      setSavedId(page.slug);

      setTimeout(() => {
        setSavedId((current) => (current === page.slug ? null : current));
      }, 2500);
    } catch (err) {
      console.error(err);
      setError("خطا در ذخیره‌سازی صفحه.");
    } finally {
      setSavingId(null);
    }
  };

  /* =========================
     Loading
  ========================= */

  if (loading) {
    return (
      <div dir="rtl" className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FileText size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              صفحات
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              مدیریت محتوای صفحات سایت
            </p>
          </div>
        </div>

        <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Loader2 size={23} className="animate-spin" />
            </div>

            <div className="text-center">
              <p className="font-bold text-gray-800">در حال دریافت صفحات</p>

              <p className="mt-1 text-xs text-gray-400">
                لطفاً چند لحظه صبر کنید...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-7">
      {/* =========================
          Header
      ========================= */}

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <FileText size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-gray-900">
                صفحات سایت
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                محتوای صفحات عمومی سایت را مدیریت کنید
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-2xl bg-gray-50 px-4 py-2.5 sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-blue-500" />

            <span className="text-sm font-bold text-gray-700">
              {pages.length}
            </span>

            <span className="text-sm text-gray-500">صفحه</span>
          </div>
        </div>
      </div>

      {/* =========================
          Error
      ========================= */}

      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-red-500">
            <AlertCircle size={18} />
          </div>

          <span>{error}</span>

          <button
            type="button"
            onClick={fetchPages}
            className="mr-auto rounded-lg px-3 py-1.5 font-bold transition hover:bg-red-100"
          >
            تلاش مجدد
          </button>
        </div>
      )}

      {/* =========================
          Empty
      ========================= */}

      {pages.length === 0 && !error && (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FileText size={28} />
          </div>

          <h2 className="mt-5 text-lg font-black text-gray-900">
            صفحه‌ای پیدا نشد
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-gray-500">
            در حال حاضر هیچ صفحه‌ای برای مدیریت در سیستم وجود ندارد.
          </p>
        </div>
      )}

      {/* =========================
          Pages
      ========================= */}

      <div className="grid gap-6">
        {pages.map((page) => (
          <article
            key={page.id}
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
              hover:border-gray-300
              hover:shadow-md
            "
          >
            {/* =====================
                Card Header
            ===================== */}

            <div className="relative border-b border-gray-100 px-6 py-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-gray-500 transition-colors duration-300 group-hover:bg-blue-50 group-hover:text-blue-600">
                    <FileText size={20} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate text-base font-black text-gray-900">
                        {page.title}
                      </h2>

                      {savedId === page.slug && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-600">
                          <Check size={12} />
                          ذخیره شد
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-gray-400">آدرس صفحه:</span>

                      <span
                        dir="ltr"
                        className="truncate text-xs text-gray-500"
                      >
                        /pages/{page.slug}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={`/pages/${page.slug}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-2
                    text-xs
                    font-bold
                    text-gray-600
                    transition-all
                    duration-200
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600
                  "
                >
                  مشاهده صفحه
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* =====================
                Editor
            ===================== */}

            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-800">محتوای صفحه</p>

                  <p className="mt-1 text-xs text-gray-400">
                    متن صفحه را از قسمت زیر ویرایش کنید.
                  </p>
                </div>

                <span className="hidden rounded-lg bg-gray-50 px-3 py-1.5 text-[11px] text-gray-400 sm:block">
                  ویرایش محتوا
                </span>
              </div>

              <div className="relative">
                <textarea
                  value={page.content || ""}
                  onChange={(e) =>
                    handleContentChange(page.slug, e.target.value)
                  }
                  rows={9}
                  placeholder="محتوای صفحه را وارد کنید..."
                  className="
                    block
                    min-h-[220px]
                    w-full
                    resize-y
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    p-5
                    text-sm
                    leading-8
                    text-gray-800
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-gray-400
                    hover:border-gray-300
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-50
                  "
                />
              </div>

              {/* =====================
                  Footer
              ===================== */}

              <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                  تغییرات پس از ذخیره روی سایت اعمال می‌شوند.
                </div>

                <button
                  type="button"
                  onClick={() => handleSave(page)}
                  disabled={savingId === page.slug}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-2.5
                    text-sm
                    font-bold
                    text-white
                    shadow-sm
                    shadow-blue-600/20
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-blue-700
                    hover:shadow-md
                    disabled:cursor-not-allowed
                    disabled:bg-gray-300
                    disabled:shadow-none
                  "
                >
                  {savingId === page.slug ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      در حال ذخیره...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      ذخیره تغییرات
                    </>
                  )}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
