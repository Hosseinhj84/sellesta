import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SlidersHorizontal,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  PackageSearch,
  ArrowDownUp,
} from "lucide-react";

import api from "../api/axios";
import ProductsCard from "../components/ProductsCard";

const SORT_OPTIONS = [
  { value: "-created", label: "جدیدترین" },
  { value: "price", label: "ارزان‌ترین" },
  { value: "-price", label: "گران‌ترین" },
  { value: "name", label: "بر اساس نام" },
];

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category") || "";
  const activeSort = searchParams.get("ordering") || "-created";

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [filtersOpen, setFiltersOpen] = useState(false);

  /*
   * =========================
   * دریافت دسته‌بندی‌ها
   * =========================
   */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);

        const res = await api.get("categories/");

        setCategories(res.data.results || res.data || []);
      } catch (err) {
        console.error("Categories error:", err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /*
   * =========================
   * دریافت محصولات
   * =========================
   */

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async (url = null) => {
    try {
      setLoading(true);

      const request = url
        ? api.get(url.replace(api.defaults.baseURL, ""))
        : api.get("products/", {
            params: Object.fromEntries(searchParams),
          });

      const res = await request;

      setProducts(res.data.results || res.data || []);
      setCount(res.data.count ?? res.data.length ?? 0);

      setNextPage(res.data.next || null);
      setPrevPage(res.data.previous || null);
    } catch (err) {
      console.error("Products error:", err);

      setProducts([]);
      setCount(0);
      setNextPage(null);
      setPrevPage(null);
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================
   * تغییر پارامترهای URL
   * =========================
   */

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    // با تغییر فیلتر، صفحه‌بندی قبلی را ریست می‌کنیم
    newParams.delete("page");

    setSearchParams(newParams);
  };

  /*
   * =========================
   * جستجو
   * =========================
   */

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    updateParam("search", searchInput.trim());

    setFiltersOpen(false);
  };

  /*
   * =========================
   * پاک کردن فیلترها
   * =========================
   */

  const clearFilters = () => {
    setSearchInput("");
    setSearchParams({});
    setFiltersOpen(false);
  };

  const hasActiveFilters =
    Boolean(activeCategory) || Boolean(searchParams.get("search"));

  /*
   * =========================
   * تعداد فیلترها
   * =========================
   */

  const activeFilterCount = [activeCategory, searchParams.get("search")].filter(
    Boolean,
  ).length;

  return (
    <main dir="rtl" className="min-h-screen bg-white">
      {/* ================================================= */}
      {/* Page Header */}
      {/* ================================================= */}

      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-gray-50/80 to-white">
        {/* Decorative background */}

        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-blue-50/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600">
              Ronin Collection
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              محصولات
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              تجهیزات رزمی، سامورایی و محصولات منتخب Ronin را بررسی کنید و محصول
              مناسب خود را پیدا کنید.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
              <PackageSearch size={17} />

              <span>
                {loading
                  ? "در حال بررسی محصولات..."
                  : `${count.toLocaleString("fa-IR")} محصول یافت شد`}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* Main Content */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Mobile Filter Button */}

        <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="
              relative
              inline-flex
              items-center
              gap-2
              rounded-2xl
              border
              border-gray-200
              bg-white
              px-4
              py-3
              text-sm
              font-bold
              text-gray-700
              shadow-sm
              transition-all
              duration-300
              hover:border-blue-500
              hover:text-blue-600
            "
          >
            <SlidersHorizontal size={17} />
            فیلترها
            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 transition hover:text-red-500"
            >
              <RotateCcw size={14} />
              پاک کردن فیلترها
            </button>
          )}
        </div>

        <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* ================================================= */}
          {/* Sidebar */}
          {/* ================================================= */}

          <aside
            className={`
              fixed
              inset-0
              z-50
              bg-black/40
              backdrop-blur-sm
              transition-opacity
              lg:static
              lg:z-auto
              lg:block
              lg:bg-transparent
              lg:backdrop-blur-none
              ${
                filtersOpen
                  ? "opacity-100"
                  : "pointer-events-none opacity-0 lg:pointer-events-auto lg:opacity-100"
              }
            `}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setFiltersOpen(false);
              }
            }}
          >
            <div
              className={`
                h-full
                w-[min(88%,360px)]
                overflow-y-auto
                bg-white
                p-5
                shadow-2xl
                transition-transform
                duration-300
                lg:sticky
                lg:top-24
                lg:h-auto
                lg:w-auto
                lg:overflow-visible
                lg:rounded-3xl
                lg:border
                lg:border-gray-100
                lg:p-5
                lg:shadow-sm
                ${
                  filtersOpen
                    ? "translate-x-0"
                    : "translate-x-full lg:translate-x-0"
                }
              `}
            >
              {/* Mobile Sidebar Header */}

              <div className="mb-6 flex items-center justify-between lg:hidden">
                <div>
                  <h2 className="text-lg font-black text-gray-900">
                    فیلتر محصولات
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    محصول موردنظر خود را پیدا کنید
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Desktop Sidebar Title */}

              <div className="mb-6 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <SlidersHorizontal size={18} />
                  </div>

                  <div>
                    <h2 className="font-black text-gray-900">فیلتر محصولات</h2>

                    <p className="mt-0.5 text-xs text-gray-400">
                      جستجو و دسته‌بندی
                    </p>
                  </div>
                </div>
              </div>

              {/* Search */}

              <div>
                <label className="mb-2 block text-xs font-bold text-gray-600">
                  جستجوی محصول
                </label>

                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Search
                      size={17}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="مثلاً دستکش، کاتانا..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-gray-200
                        bg-gray-50
                        py-3
                        pl-4
                        pr-10
                        text-sm
                        text-gray-800
                        outline-none
                        transition-all
                        placeholder:text-gray-400
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-50
                      "
                    />
                  </div>
                </form>
              </div>

              {/* Divider */}

              <div className="my-6 h-px bg-gray-100" />

              {/* Categories */}

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs font-black text-gray-900">
                    دسته‌بندی‌ها
                  </h3>

                  {!categoriesLoading && (
                    <span className="text-[11px] text-gray-400">
                      {categories.length} دسته
                    </span>
                  )}
                </div>

                {categoriesLoading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="h-10 animate-pulse rounded-xl bg-gray-100"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        updateParam("category", "");
                        setFiltersOpen(false);
                      }}
                      className={`
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-xl
                        px-3
                        py-2.5
                        text-right
                        text-sm
                        transition-all
                        ${
                          !activeCategory
                            ? "bg-blue-50 font-bold text-blue-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                    >
                      <span>همه محصولات</span>

                      {!activeCategory && <CheckDot />}
                    </button>

                    {categories.map((cat) => {
                      const isActive = activeCategory === cat.slug;

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            updateParam("category", cat.slug);
                            setFiltersOpen(false);
                          }}
                          className={`
                            flex
                            w-full
                            items-center
                            justify-between
                            rounded-xl
                            px-3
                            py-2.5
                            text-right
                            text-sm
                            transition-all
                            ${
                              isActive
                                ? "bg-blue-50 font-bold text-blue-600"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }
                          `}
                        >
                          <span className="truncate">{cat.name}</span>

                          {isActive && <CheckDot />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Active filters */}

              {hasActiveFilters && (
                <>
                  <div className="my-6 h-px bg-gray-100" />

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-red-100
                      bg-red-50
                      px-4
                      py-2.5
                      text-xs
                      font-bold
                      text-red-600
                      transition
                      hover:bg-red-100
                    "
                  >
                    <X size={14} />
                    پاک کردن فیلترها
                  </button>
                </>
              )}

              {/* Mobile Apply */}

              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="mt-5 w-full rounded-xl bg-gray-900 py-3 text-sm font-bold text-white lg:hidden"
              >
                نمایش محصولات
              </button>
            </div>
          </aside>

          {/* ================================================= */}
          {/* Products Content */}
          {/* ================================================= */}

          <div className="min-w-0">
            {/* Toolbar */}

            <div className="mb-7 flex flex-col gap-4 rounded-3xl border border-gray-100 bg-gray-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {loading
                    ? "در حال بارگذاری..."
                    : `${count.toLocaleString("fa-IR")} محصول`}
                </p>

                {activeCategory && (
                  <p className="mt-1 text-xs text-gray-400">
                    فیلتر شده بر اساس دسته‌بندی انتخابی
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <ArrowDownUp size={16} className="text-gray-400" />

                <select
                  value={activeSort}
                  onChange={(e) => updateParam("ordering", e.target.value)}
                  className="
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-2.5
                    text-xs
                    font-medium
                    text-gray-700
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-50
                  "
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ================================================= */}
            {/* Loading */}
            {/* ================================================= */}

            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : products.length === 0 ? (
              /* ================================================= */
              /* Empty State */
              /* ================================================= */

              <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[32px] border border-dashed border-gray-200 bg-gray-50/50 px-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-gray-300 shadow-sm">
                  <PackageSearch size={34} />
                </div>

                <h2 className="mt-6 text-xl font-black text-gray-900">
                  محصولی پیدا نشد
                </h2>

                <p className="mt-2 max-w-md text-sm leading-7 text-gray-500">
                  محصولی با فیلترها یا عبارت جستجوی فعلی پیدا نکردیم. فیلترها را
                  تغییر دهید یا جستجوی دیگری انجام دهید.
                </p>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="
                      mt-6
                      inline-flex
                      items-center
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
                      transition
                      hover:-translate-y-0.5
                      hover:bg-blue-700
                    "
                  >
                    <RotateCcw size={16} />
                    پاک کردن فیلترها
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* ================================================= */}
                {/* Product Grid */}
                {/* ================================================= */}

                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 xl:gap-x-6">
                  {products.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-product-in"
                      style={{
                        animationDelay: `${Math.min(index * 60, 360)}ms`,
                      }}
                    >
                      <ProductsCard product={product} />
                    </div>
                  ))}
                </div>

                {/* ================================================= */}
                {/* Pagination */}
                {/* ================================================= */}

                {(nextPage || prevPage) && (
                  <div className="mt-14 flex items-center justify-center">
                    <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-1.5">
                      <button
                        type="button"
                        onClick={() => fetchProducts(prevPage)}
                        disabled={!prevPage}
                        className="
                          flex
                          h-10
                          items-center
                          gap-2
                          rounded-xl
                          px-4
                          text-xs
                          font-bold
                          text-gray-600
                          transition
                          hover:bg-white
                          hover:text-blue-600
                          disabled:cursor-not-allowed
                          disabled:opacity-30
                        "
                      >
                        <ChevronRight size={17} />
                        قبلی
                      </button>

                      <div className="h-6 w-px bg-gray-200" />

                      <span className="px-3 text-xs font-bold text-gray-400">
                        {count.toLocaleString("fa-IR")} محصول
                      </span>

                      <div className="h-6 w-px bg-gray-200" />

                      <button
                        type="button"
                        onClick={() => fetchProducts(nextPage)}
                        disabled={!nextPage}
                        className="
                          flex
                          h-10
                          items-center
                          gap-2
                          rounded-xl
                          px-4
                          text-xs
                          font-bold
                          text-gray-600
                          transition
                          hover:bg-white
                          hover:text-blue-600
                          disabled:cursor-not-allowed
                          disabled:opacity-30
                        "
                      >
                        بعدی
                        <ChevronLeft size={17} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* Custom Animation */}
      {/* ================================================= */}

      <style>{`
        @keyframes product-in {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-product-in {
          animation: product-in 0.55s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-product-in {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}

/*
 * نقطه فعال دسته‌بندی
 */

function CheckDot() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600">
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
    </span>
  );
}

/*
 * Skeleton کارت محصول
 */

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-white">
      <div className="aspect-[4/5] animate-pulse bg-gray-100" />

      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded-lg bg-gray-100" />

        <div className="h-3 w-1/2 animate-pulse rounded-lg bg-gray-100" />

        <div className="mt-5 h-5 w-2/3 animate-pulse rounded-lg bg-gray-100" />
      </div>
    </div>
  );
}

export default Products;
