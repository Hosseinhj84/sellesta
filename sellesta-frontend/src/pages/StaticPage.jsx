import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { Dice1 } from "lucide-react";

function StaticPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, SetNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    SetNotFound(false);

    api
      .get(`pages/${slug}/`)
      .then((res) => setPage(res.data))
      .catch(() => SetNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="p-10 text-center">درحال بارگزاری</div>;
  }

  if (notFound || !page) {
    return (
      <div className="p-10 text-center text-gray-500">این صفحه پیدا نشد.</div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16" dir="rtl">
        <h1 className="mb-6 text-3xl font-bold text-grray-900">{page.title}</h1>
        <div className="whitespace-pre-line leading-relaxed text-gray-700">{page.content}</div>
    </div>
  )
}

export default StaticPage;