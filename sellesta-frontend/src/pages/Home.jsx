import { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/axios";

function Home() {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    api
      .get("categories/")
      .then((res) => setcategories(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "24px", direction: "rtl" }}>
      <h2>دسته‌بندی‌ها</h2>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "12px 20px",
            }}
          >
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;