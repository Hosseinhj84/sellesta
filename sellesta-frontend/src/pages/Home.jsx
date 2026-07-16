import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, use } from "react";
import axios from "axios";
import api from "../api/axios";
import ProductsCard from "../components/ProductsCard";

function Home() {
  const [categories, setcategories] = useState([]);
  const [products, setproducts] = useState([]);

  useEffect(() => {
    api
      .get("products/")
      .then((res) => setproducts(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .get("categories/")
      .then((res) => setcategories(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  const sliderRef = useRef(null);
  const ProductSliderRef = useRef(null);

  const scrollProducts = (direction) => {
    if (!ProductSliderRef.current) return;

    ProductSliderRef.current.scrollBy({
      left: direction == "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}

      <div className="mb-7 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            دسته‌بندی محصولات
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            دسته‌بندی مورد نظر خود را انتخاب کنید
          </p>
        </div>

        <div className="hidden gap-2 md:flex">
          <button
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>

      {/* Slider */}

      <div
        ref={sliderRef}
        className="
        flex
        gap-4
        overflow-x-auto
        scroll-smooth
        snap-x
        snap-mandatory
        pb-4
        no-scrollbar
        "
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="
            group
            snap-start
            shrink-0

            w-36
            md:w-40

            rounded-3xl
            border
            border-gray-200
            bg-white

            p-4
            mt-6

            transition-all
            duration-300

            hover:-translate-y-1
            hover:border-blue-500
            hover:shadow-lg
            "
          >
            {/* Image */}

            <div
              className="
              mx-auto

              flex
              h-20
              w-20
              items-center
              justify-center

              rounded-2xl
              bg-gray-100

              transition-all
              duration-300

              group-hover:bg-blue-50
              "
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="
                h-14
                w-14
                object-contain

                transition-transform
                duration-300

                group-hover:scale-110
                "
              />
            </div>

            {/* Title */}

            <h3
              className="
              mt-4
              text-center
              text-sm
              font-semibold
              text-gray-700

              transition-colors

              group-hover:text-blue-600
              "
            >
              {cat.name}
            </h3>
          </button>
        ))}
      </div>
      {/* product */}
      <div className="mt-14">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">محصولات</h2>
            <p className="mt-1 text-sm text-gray-500">
              محصولات جدید ما را ببینید
            </p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scrollProducts("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() => scrollProducts("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>
        <div
          ref={ProductSliderRef}
          className="flex gap-16 overflow-x-auto scrooll-smoth snap-x snap-mandatory pb-4 no-scrollbar"
        >
          {products.map((product) => (
            <div key={product.id} className="w-56 shrink-0 snap-start md:w-64">
              <ProductsCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
