import { useEffect, useState } from "react";
import api from "./api/axios";
import { set } from "animejs";

function App() {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    api
      .get("categories/")
      .then((res) => setcategories(res.data.result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>دسته بندی ها</h1>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
