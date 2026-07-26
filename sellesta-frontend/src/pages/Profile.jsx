import { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {
  const [forms, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("profile/")
      .then((res) => setForm(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...forms, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await api.patch("profile/", forms);
      setForm(res.data);
      setMessage("اطلاعات با موفقیت ذخیره شد.");
    } catch (err) {
      console.error(err);
      setMessage("خطا در ذخیره اطلاعات");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">درحال بارگزاری...</div>;
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16" dir="rtl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">پروفایل من</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block-sm text-gray-500">نام کاربری</label>
          <input
            type="text"
            value={forms.username}
            disabled
            className="w-full rounded-xl border border-gray-200 bg-gray-100 p-3 text-gray-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-500">ایمیل</label>
          <input
            type="email"
            name="email"
            value={forms.email || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <label className="mb-1 block text-sm text-gray-500">نام</label>
            <input
              type="text"
              name="first_name"
              value={forms.first_name || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <div className="w-full">
            <label className="mb-1 block text-sm text-gray-500">
              نام خانوادگی
            </label>
            <input
              type="text"
              name="last_name"
              value={forms.last_name || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 blcok text-sm text-gray-500">شماره تلفن</label>
          <input
            type="text"
            name="phone"
            value={forms.phone || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
        {message && (
          <p
            className={`text-sm ${message.includes("خطا") ? "text-red-500" : "text-green-600 "}`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:bg-gray-300"
        >
          {saving ? "در حال ذخیره..." : "ذخیره‌ی تغییرات"}
        </button>
      </form>
    </div>
  );
}

export default Profile;