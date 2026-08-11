import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tag,
  ListOrdered,
  FileText,
  Link2,
  ChevronLeft,
  Store,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "سفارش‌ها",
    path: "/admin/orders",
    icon: ListOrdered,
  },
  {
    label: "محصولات",
    path: "/admin/products",
    icon: Package,
  },
  {
    label: "دسته‌بندی‌ها",
    path: "/admin/categories",
    icon: Tag,
  },
  {
    label: "لینک‌های هدر",
    path: "/admin/header-links",
    icon: Link2,
  },
  {
    label: "صفحات",
    path: "/admin/pages",
    icon: FileText,
  },
];

function AdminLayout() {
  const location = useLocation();

  const current =
    NAV_ITEMS.find((item) => item.path === location.pathname)?.label ||
    "داشبورد";

  return (
    <div dir="rtl" className="flex min-h-screen bg-zinc-100">
      {/* Sidebar */}

      <aside
        className="
        w-72
        shrink-0
        bg-zinc-900
        text-white
        flex
        flex-col
        "
      >
        {/* Logo */}

        <div className="border-b border-zinc-800 p-7">
          <h1 className="text-3xl font-black tracking-widest">RONIN</h1>

          <p className="mt-1 text-sm text-zinc-400">پنل مدیریت</p>
        </div>

        {/* Navigation */}

        <nav className="flex-1 p-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                mb-2
                flex
                items-center
                justify-between
                rounded-2xl
                px-4
                py-3
                transition-all
                duration-200
                ${
                  active
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />

                  <span>{item.label}</span>
                </div>

                <ChevronLeft size={18} />
              </Link>
            );
          })}
        </nav>

        {/* Footer */}

        <div className="border-t border-zinc-800 p-4">
          <Link
            to="/"
            className="
            flex
            items-center
            gap-3
            rounded-2xl
            px-4
            py-3
            text-zinc-300
            transition
            hover:bg-zinc-800
            hover:text-white
            "
          >
            <Store size={20} />
            بازگشت به فروشگاه
          </Link>
        </div>
      </aside>

      {/* Content */}

      <section className="flex flex-1 flex-col">
        {/* Topbar */}

        <header
          className="
          border-b
          border-zinc-200
          bg-white
          px-8
          py-6
          "
        >
          <h2 className="text-2xl font-bold text-zinc-900">{current}</h2>
        </header>

        {/* Page */}

        <main className="flex-1 p-8">
          <div
            className="
            min-h-full
            rounded-3xl
            bg-white
            p-8
            shadow-sm
            "
          >
            <Outlet />
          </div>
        </main>
      </section>
    </div>
  );
}

export default AdminLayout;
