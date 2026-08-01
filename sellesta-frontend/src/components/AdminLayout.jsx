import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tag,
  ListOrdered,
  FileText,
  Link2,
  icons,
} from "lucide-react";

const NAV_ITEMS = [
  { lable: "سفارش ها", path: "/admin/orders", icon: ListOrdered },
  { lable: "محصولات", path: "/admin/products", icon: Package },
  { lable: "دسته بندی ها", path: "/admin/categories", icon: Tag },
  { lable: "لینک های هدر", path: "/admin/header-links", icon: Link2 },
  { lable: "صفحات", path: "/admin/pages", icon: FileText },
];

function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      {/* سایدبار */}
      <aside className="w-64 shrink-0 border-l border-gray-200 bg-white">
        <div className="flex items-center gap-2 border-b border-gray-200 p-5">
          <LayoutDashboard className="text-blue-600" size={22} />
          <span className="font-bold text-gray-900">داشبورد مدیریت</span>
        </div>

        <nav className="p-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50"
          >
            ← بازگشت به فروشگاه
          </Link>
        </div>
      </aside>

      {/* محتوای اصلی */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;