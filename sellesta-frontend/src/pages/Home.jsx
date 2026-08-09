// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useState, useEffect, useRef, use } from "react";
// import axios from "axios";
// import api from "../api/axios";
// import ProductsCard from "../components/ProductsCard";
// import ScrollHero from "../components/ScrollHero";

// function Home() {
//   const [categories, setcategories] = useState([]);
//   const [products, setproducts] = useState([]);

//   useEffect(() => {
//     api
//       .get("products/")
//       .then((res) => setproducts(res.data.results))
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     api
//       .get("categories/")
//       .then((res) => setcategories(res.data.results))
//       .catch((err) => console.error(err));
//   }, []);

//   const sliderRef = useRef(null);
//   const ProductSliderRef = useRef(null);

//   const scrollProducts = (direction) => {
//     if (!ProductSliderRef.current) return;

//     ProductSliderRef.current.scrollBy({
//       left: direction == "left" ? -320 : 320,
//       behavior: "smooth",
//     });
//   };

//   const scroll = (direction) => {
//     if (!sliderRef.current) return;

//     sliderRef.current.scrollBy({
//       left: direction === "left" ? -320 : 320,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="mx-auto max-w-7xl px-4 py-12">
//       <ScrollHero />
//       {/* Header */}

//       <div className="mb-7 flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">
//             دسته‌بندی محصولات
//           </h2>

//           <p className="mt-1 text-sm text-gray-500">
//             دسته‌بندی مورد نظر خود را انتخاب کنید
//           </p>
//         </div>

//         <div className="hidden gap-2 md:flex">
//           <button
//             onClick={() => scroll("left")}
//             className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:border-blue-500 hover:bg-blue-50"
//           >
//             <ChevronRight size={18} />
//           </button>

//           <button
//             onClick={() => scroll("right")}
//             className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:border-blue-500 hover:bg-blue-50"
//           >
//             <ChevronLeft size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Slider */}

//       <div
//         ref={sliderRef}
//         className="
//         flex
//         gap-4
//         overflow-x-auto
//         scroll-smooth
//         snap-x
//         snap-mandatory
//         pb-4
//         no-scrollbar
//         "
//       >
//         {categories.map((cat) => (
//           <button
//             key={cat.id}
//             className="
//             group
//             snap-start
//             shrink-0

//             w-36
//             md:w-40

//             rounded-3xl
//             border
//             border-gray-200
//             bg-white

//             p-4
//             mt-6

//             transition-all
//             duration-300

//             hover:-translate-y-1
//             hover:border-blue-500
//             hover:shadow-lg
//             "
//           >
//             {/* Image */}

//             <div
//               className="
//               mx-auto

//               flex
//               h-20
//               w-20
//               items-center
//               justify-center

//               rounded-2xl
//               bg-gray-100

//               transition-all
//               duration-300

//               group-hover:bg-blue-50
//               "
//             >
//               <img
//                 src={cat.image}
//                 alt={cat.name}
//                 className="
//                 h-14
//                 w-14
//                 object-contain

//                 transition-transform
//                 duration-300

//                 group-hover:scale-110
//                 "
//               />
//             </div>

//             {/* Title */}

//             <h3
//               className="
//               mt-4
//               text-center
//               text-sm
//               font-semibold
//               text-gray-700

//               transition-colors

//               group-hover:text-blue-600
//               "
//             >
//               {cat.name}
//             </h3>
//           </button>
//         ))}
//       </div>
//       {/* product */}
//       <div className="mt-14">
//         <div className="mb-7 flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">محصولات</h2>
//             <p className="mt-1 text-sm text-gray-500">
//               محصولات جدید ما را ببینید
//             </p>
//           </div>
//           <div className="hidden gap-2 md:flex">
//             <button
//               onClick={() => scrollProducts("left")}
//               className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:border-blue-500 hover:bg-blue-50"
//             >
//               <ChevronRight size={18} />
//             </button>
//             <button
//               onClick={() => scrollProducts("right")}
//               className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:border-blue-500 hover:bg-blue-50"
//             >
//               <ChevronLeft size={18} />
//             </button>
//           </div>
//         </div>
//         <div
//           ref={ProductSliderRef}
//           className="flex gap-16 overflow-x-auto scrooll-smoth snap-x snap-mandatory pb-4 no-scrollbar"
//         >
//           {products.map((product) => (
//             <div key={product.id} className="w-56 shrink-0 snap-start md:w-64">
//               <ProductsCard product={product} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Home;

// import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/axios";

// import ProductsCard from "../components/ProductsCard";
// import ScrollHero from "../components/ScrollHero";

// function Home() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const categorySliderRef = useRef(null);
//   const productSliderRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productsRes, categoriesRes] = await Promise.all([
//           api.get("products/"),
//           api.get("categories/"),
//         ]);

//         setProducts(productsRes.data.results || []);
//         setCategories(categoriesRes.data.results || []);
//       } catch (err) {
//         console.error(err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const scrollSlider = (ref, direction) => {
//     if (!ref.current) return;

//     ref.current.scrollBy({
//       left: direction === "left" ? -360 : 360,
//       behavior: "smooth",
//     });
//   };

//   if (error) {
//     return (
//       <div
//         dir="rtl"
//         className="flex min-h-[70vh] flex-col items-center justify-center text-center"
//       >
//         <h2 className="text-2xl font-bold text-gray-900">
//           خطا در دریافت اطلاعات
//         </h2>

//         <p className="mt-3 text-gray-500">
//           لطفاً اتصال اینترنت خود را بررسی کرده و دوباره تلاش کنید.
//         </p>

//         <button
//           onClick={() => window.location.reload()}
//           className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
//         >
//           تلاش مجدد
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Hero */}

//       <ScrollHero />

//       <section dir="rtl" className="relative mx-auto max-w-7xl px-4 pb-24">
//         {/* گرادیانت اتصال Hero به صفحه */}

//         <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent"></div>

//         {/* ===================== */}
//         {/* Category Section */}
//         {/* ===================== */}

//         <div className="pt-12">
//           <div className="mb-8 flex items-end justify-between">
//             <div>
//               <span className="text-sm font-medium text-blue-600">
//                 فروشگاه Ronin
//               </span>

//               <h2 className="mt-2 text-3xl font-black text-gray-900">
//                 دسته‌بندی محصولات
//               </h2>

//               <p className="mt-2 max-w-xl text-gray-500">
//                 تجهیزات موردنیاز خود را از میان دسته‌بندی‌های مختلف انتخاب کنید
//                 و سریع‌تر به محصول دلخواهتان برسید.
//               </p>
//             </div>

//             <div className="hidden items-center gap-3 md:flex">
//               <button
//                 onClick={() => scrollSlider(categorySliderRef, "left")}
//                 className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:border-blue-600 hover:bg-blue-50"
//               >
//                 <ChevronRight size={18} />
//               </button>

//               <button
//                 onClick={() => scrollSlider(categorySliderRef, "right")}
//                 className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:border-blue-600 hover:bg-blue-50"
//               >
//                 <ChevronLeft size={18} />
//               </button>
//             </div>
//           </div>

//           {/* ===================== */}
//           {/* Categories Slider */}
//           {/* ===================== */}

//           {loading ? (
//             <div
//               ref={categorySliderRef}
//               className="flex gap-5 overflow-hidden pb-4"
//             >
//               {[...Array(6)].map((_, index) => (
//                 <div
//                   key={index}
//                   className="h-52 w-44 shrink-0 animate-pulse rounded-3xl border border-gray-200 bg-white p-5"
//                 >
//                   <div className="mx-auto h-20 w-20 rounded-2xl bg-gray-200" />

//                   <div className="mt-6 h-4 rounded bg-gray-200" />

//                   <div className="mx-auto mt-3 h-3 w-16 rounded bg-gray-100" />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="relative">
//               {/* Fade Right */}

//               <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-20 bg-gradient-to-l from-white to-transparent md:block" />

//               {/* Fade Left */}

//               <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-20 bg-gradient-to-r from-white to-transparent md:block" />

//               <div
//                 ref={categorySliderRef}
//                 className="
//                   flex
//                   gap-6
//                   overflow-x-auto
//                   scroll-smooth
//                   snap-x
//                   snap-mandatory
//                   pb-5
//                   no-scrollbar
//                 "
//               >
//                 {categories.map((cat) => (
//                   <button
//                     key={cat.id}
//                     className="
//                       group
//                       relative
//                       w-44
//                       shrink-0
//                       snap-start
//                       overflow-hidden
//                       rounded-3xl
//                       border
//                       border-gray-200
//                       bg-white
//                       p-5
//                       text-right
//                       transition-all
//                       duration-300

//                       hover:-translate-y-2
//                       hover:border-blue-500
//                       hover:shadow-2xl
//                       hover:shadow-blue-100
//                     "
//                   >
//                     {/* Background Glow */}

//                     <div
//                       className="
//                         absolute
//                         inset-0
//                         bg-gradient-to-br
//                         from-blue-50/0
//                         to-blue-100/0

//                         opacity-0
//                         transition
//                         duration-300

//                         group-hover:opacity-100
//                       "
//                     />

//                     {/* Image */}

//                     <div
//                       className="
//                         relative
//                         z-10
//                         mx-auto

//                         flex
//                         h-24
//                         w-24
//                         items-center
//                         justify-center

//                         rounded-3xl
//                         bg-gray-100

//                         transition-all
//                         duration-300

//                         group-hover:bg-white
//                       "
//                     >
//                       <img
//                         src={cat.image}
//                         alt={cat.name}
//                         className="
//                           h-16
//                           w-16
//                           object-contain

//                           transition-all
//                           duration-300

//                           group-hover:scale-110
//                           group-hover:rotate-3
//                         "
//                       />
//                     </div>

//                     {/* Name */}

//                     <h3
//                       className="
//                         relative
//                         z-10

//                         mt-6

//                         text-center
//                         text-base
//                         font-bold
//                         text-gray-900

//                         transition

//                         group-hover:text-blue-600
//                       "
//                     >
//                       {cat.name}
//                     </h3>

//                     {/* Product Count */}

//                     <p
//                       className="
//                         relative
//                         z-10

//                         mt-2

//                         text-center
//                         text-sm
//                         text-gray-500
//                       "
//                     >
//                       {cat.products_count || 0} محصول
//                     </p>

//                     {/* Hover CTA */}

//                     <div
//                       className="
//                         relative
//                         z-10

//                         mt-5

//                         flex
//                         items-center
//                         justify-center
//                         gap-2

//                         text-sm
//                         font-medium
//                         text-blue-600

//                         opacity-0
//                         transition-all
//                         duration-300

//                         group-hover:opacity-100
//                       "
//                     >
//                       مشاهده محصولات
//                       <ArrowLeft
//                         size={16}
//                         className="transition group-hover:-translate-x-1"
//                       />
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ===================== */}
//           {/* Products Section */}
//           {/* ===================== */}

//           <div className="mt-24">
//             <div className="mb-8 flex items-end justify-between">
//               <div>
//                 <span className="text-sm font-medium text-blue-600">
//                   جدیدترین محصولات
//                 </span>

//                 <h2 className="mt-2 text-3xl font-black text-gray-900">
//                   محصولات منتخب
//                 </h2>

//                 <p className="mt-2 text-gray-500">
//                   جدیدترین تجهیزات فروشگاه Ronin را مشاهده کنید.
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <Link
//                   to="/products"
//                   className="
//                   hidden
//                   items-center
//                   gap-2
//                   rounded-2xl
//                   border
//                   border-gray-200
//                   bg-white
//                   px-5
//                   py-3
//                   text-sm
//                   font-medium
//                   text-gray-700
//                   transition-all
//                   duration-300

//                   hover:border-blue-600
//                   hover:text-blue-600
//                   md:flex
//                 "
//                 >
//                   مشاهده همه
//                   <ArrowLeft size={16} />
//                 </Link>

//                 <div className="hidden gap-3 md:flex">
//                   <button
//                     onClick={() => scrollSlider(productSliderRef, "left")}
//                     className="
//                     flex
//                     h-11
//                     w-11
//                     items-center
//                     justify-center
//                     rounded-full
//                     border
//                     border-gray-200
//                     bg-white
//                     transition

//                     hover:border-blue-600
//                     hover:bg-blue-50
//                   "
//                   >
//                     <ChevronRight size={18} />
//                   </button>

//                   <button
//                     onClick={() => scrollSlider(productSliderRef, "right")}
//                     className="
//                     flex
//                     h-11
//                     w-11
//                     items-center
//                     justify-center
//                     rounded-full
//                     border
//                     border-gray-200
//                     bg-white
//                     transition

//                     hover:border-blue-600
//                     hover:bg-blue-50
//                   "
//                   >
//                     <ChevronLeft size={18} />
//                   </button>
//                 </div>
//               </div>

//               {loading ? (
//                 <div className="flex gap-6 overflow-hidden">
//                   {[...Array(4)].map((_, index) => (
//                     <div
//                       key={index}
//                       className="
//                       h-[420px]
//                       w-72
//                       shrink-0
//                       animate-pulse
//                       rounded-3xl
//                       bg-gray-200
//                     "
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="relative">
//                   <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-24 bg-gradient-to-l from-white to-transparent md:block" />

//                   <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-24 bg-gradient-to-r from-white to-transparent md:block" />

//                   <div
//                     ref={productSliderRef}
//                     className="
//                     flex
//                     gap-8
//                     overflow-x-auto
//                     scroll-smooth
//                     snap-x
//                     snap-mandatory
//                     pb-5
//                     no-scrollbar
//                   "
//                   >
//                     {products.map((product) => (
//                       <div
//                         key={product.id}
//                         className="
//                         w-72
//                         shrink-0
//                         snap-start

//                         transition-transform
//                         duration-300

//                         hover:-translate-y-2
//                       "
//                       >
//                         <ProductsCard product={product} />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* CTA */}

//             <div
//               className="
//               mt-28
//               overflow-hidden
//               rounded-[40px]
//               bg-gradient-to-br
//               from-gray-900
//               via-slate-900
//               to-black
//               px-10
//               py-16
//               text-center
//               text-white
//             "
//             >
//               <span className="text-blue-400">Ronin Collection</span>

//               <h2 className="mt-4 text-4xl font-black">
//                 مسیر یک جنگجو از انتخاب تجهیزاتش آغاز می‌شود.
//               </h2>

//               <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-300">
//                 مجموعه‌ای از تجهیزات رزمی، سامورایی و مبارزه را با بهترین کیفیت
//                 آماده کرده‌ایم تا تجربه‌ای متفاوت از خرید داشته باشید.
//               </p>

//               <Link
//                 to="/products"
//                 className="
//                 mt-8
//                 inline-flex
//                 items-center
//                 gap-3
//                 rounded-2xl
//                 bg-white
//                 px-8
//                 py-4
//                 font-semibold
//                 text-gray-900
//                 transition-all
//                 duration-300

//                 hover:-translate-y-1
//                 hover:shadow-xl
//               "
//               >
//                 مشاهده محصولات
//                 <ArrowLeft size={18} />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Home;

import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import ProductsCard from "../components/ProductsCard";
import ScrollHero from "../components/ScrollHero";

/* =========================================================
   Scroll Reveal Hook
========================================================= */

function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
        ...options,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
}

/* =========================================================
   Image Helper
========================================================= */

const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  return `http://127.0.0.1:8000/${image}`;
};

/* =========================================================
   Skeleton Components
========================================================= */

function CategorySkeleton() {
  return (
    <div className="flex gap-5 overflow-hidden pb-3">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="
            h-[235px]
            w-44
            shrink-0
            animate-pulse
            rounded-[28px]
            border
            border-gray-100
            bg-white
            p-5
            shadow-sm
          "
        >
          <div className="mx-auto h-24 w-24 rounded-[24px] bg-gray-200" />

          <div className="mx-auto mt-6 h-4 w-24 rounded-full bg-gray-200" />

          <div className="mx-auto mt-3 h-3 w-16 rounded-full bg-gray-100" />

          <div className="mx-auto mt-5 h-3 w-20 rounded-full bg-gray-100" />
        </div>
      ))}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="flex gap-7 overflow-hidden pb-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="
            h-[420px]
            w-72
            shrink-0
            animate-pulse
            rounded-[30px]
            border
            border-gray-100
            bg-white
            p-4
            shadow-sm
          "
        >
          <div className="h-64 rounded-[24px] bg-gray-200" />

          <div className="mt-5 h-4 w-40 rounded-full bg-gray-200" />

          <div className="mt-3 h-3 w-28 rounded-full bg-gray-100" />

          <div className="mt-8 h-5 w-24 rounded-full bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   Home
========================================================= */

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const categorySliderRef = useRef(null);
  const productSliderRef = useRef(null);

  const [categorySectionRef, categorySectionVisible] = useScrollReveal();
  const [productSectionRef, productSectionVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  /* =======================================================
     Fetch Home Data
  ======================================================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("products/"),
          api.get("categories/"),
        ]);

        setProducts(productsRes.data.results || productsRes.data || []);
        setCategories(categoriesRes.data.results || categoriesRes.data || []);
      } catch (err) {
        console.error("Home data error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =======================================================
     Slider
  ======================================================= */

  const scrollSlider = (ref, direction, amount = 360) => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  /* =======================================================
     Error State
  ======================================================= */

  if (error) {
    return (
      <main
        dir="rtl"
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
          px-4
        "
      >
        <div className="max-w-md text-center">
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-red-50
              text-red-500
            "
          >
            !
          </div>

          <h2 className="mt-6 text-2xl font-black text-gray-900">
            خطا در دریافت اطلاعات
          </h2>

          <p className="mt-3 leading-7 text-gray-500">
            متأسفانه اطلاعات فروشگاه دریافت نشد. اتصال اینترنت یا سرور را بررسی
            کنید و دوباره تلاش کنید.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="
              mt-7
              rounded-2xl
              bg-gray-900
              px-7
              py-3.5
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-blue-600
              hover:shadow-xl
              hover:shadow-blue-100
            "
          >
            تلاش مجدد
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* ===================================================
          HERO
      =================================================== */}

      <ScrollHero />

      {/* ===================================================
          Main Content
      =================================================== */}

      <main
        dir="rtl"
        className="
          relative
          overflow-hidden
          bg-white
        "
      >
        {/* Soft Hero Transition */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-10
            h-32
            bg-gradient-to-b
            from-white/95
            via-white/60
            to-transparent
          "
        />

        {/* =================================================
            Categories
        ================================================= */}

        <section
          ref={categorySectionRef}
          className={`
            relative w-full pb-24
            pt-20
            transition-all
            duration-1000
            ease-out
            md:px-6
            lg:px-2

            ${
              categorySectionVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
          `}
        >
          <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10">
            {/* Section Header */}

            <div className="mb-9 flex items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-50
                    text-blue-600
                  "
                  >
                    <Sparkles size={14} />
                  </span>

                  <span className="text-sm font-bold text-blue-600">
                    Ronin Store
                  </span>
                </div>

                <h2
                  className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-gray-950
                  md:text-4xl
                "
                >
                  تجهیزاتت را
                  <span className="text-blue-600"> انتخاب کن.</span>
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
                  از تجهیزات رزمی و تمرینی تا لوازم موردنیاز برای مسیر مبارزه،
                  دسته‌بندی مناسب خودت را پیدا کن.
                </p>
              </div>

              {/* Slider Controls */}

              <div className="hidden shrink-0 items-center gap-2 md:flex">
                <button
                  type="button"
                  aria-label="دسته‌بندی قبلی"
                  onClick={() => scrollSlider(categorySliderRef, "left", 380)}
                  className="
                  group
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  text-gray-700
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-blue-600
                  hover:bg-blue-600
                  hover:text-white
                  hover:shadow-lg
                  hover:shadow-blue-100
                "
                >
                  <ChevronRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </button>

                <button
                  type="button"
                  aria-label="دسته‌بندی بعدی"
                  onClick={() => scrollSlider(categorySliderRef, "right", 380)}
                  className="
                  group
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  text-gray-700
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-blue-600
                  hover:bg-blue-600
                  hover:text-white
                  hover:shadow-lg
                  hover:shadow-blue-100
                "
                >
                  <ChevronLeft
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                </button>
              </div>
            </div>

            {/* Categories */}

            {loading ? (
              <CategorySkeleton />
            ) : categories.length === 0 ? (
              <div
                className="
                rounded-3xl
                border
                border-dashed
                border-gray-200
                bg-gray-50
                px-6
                py-12
                text-center
              "
              >
                <p className="text-gray-500">
                  هنوز دسته‌بندی‌ای برای نمایش وجود ندارد.
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* Right Fade */}

                <div
                  className="
                  pointer-events-none
                  absolute
                  right-0
                  top-0
                  z-10
                  hidden
                  h-full
                  w-20
                  bg-gradient-to-l
                  from-white
                  to-transparent
                  md:block
                "
                />

                {/* Left Fade */}

                <div
                  className="
                  pointer-events-none
                  absolute
                  left-0
                  top-0
                  z-10
                  hidden
                  h-full
                  w-20
                  bg-gradient-to-r
                  from-white
                  to-transparent
                  md:block
                "
                />

                <div
                  ref={categorySliderRef}
                  className="
                  flex
                  gap-5
                  overflow-x-auto
                  scroll-smooth
                  snap-x
                  snap-mandatory
                  pb-5
                  no-scrollbar
                "
                >
                  {categories.map((cat, index) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`
                      group
                      relative
                      w-44
                      shrink-0
                      snap-start
                      overflow-hidden
                      rounded-[28px]
                      border
                      border-gray-200
                      bg-white
                      p-5
                      text-right
                      shadow-sm
                      transition-all
                      duration-500
                      ease-out

                      hover:-translate-y-2
                      hover:border-blue-200
                      hover:shadow-2xl
                      hover:shadow-blue-100/70

                      ${
                        categorySectionVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }
                    `}
                      style={{
                        transitionDelay: `${index * 70}ms`,
                      }}
                    >
                      {/* Hover Background */}

                      <div
                        className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-blue-50
                        via-white
                        to-transparent
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                      />

                      {/* Image */}

                      <div
                        className="
                        relative
                        z-10
                        mx-auto
                        flex
                        h-24
                        w-24
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-[24px]
                        bg-gray-50
                        ring-1
                        ring-gray-100
                        transition-all
                        duration-500
                        group-hover:scale-105
                        group-hover:bg-white
                        group-hover:ring-blue-100
                      "
                      >
                        {cat.image ? (
                          <img
                            src={getImageUrl(cat.image)}
                            alt={cat.name}
                            loading="lazy"
                            className="
                            h-16
                            w-16
                            object-contain
                            transition-transform
                            duration-500
                            ease-out
                            group-hover:scale-110
                            group-hover:-rotate-3
                          "
                          />
                        ) : (
                          <span className="text-2xl font-black text-gray-300">
                            R
                          </span>
                        )}
                      </div>

                      {/* Content */}

                      <div className="relative z-10 mt-5 text-center">
                        <h3
                          className="
                          text-base
                          font-bold
                          text-gray-900
                          transition-colors
                          duration-300
                          group-hover:text-blue-600
                        "
                        >
                          {cat.name}
                        </h3>

                        <p className="mt-2 text-xs text-gray-400">
                          {cat.products_count || 0} محصول
                        </p>

                        <div
                          className="
                          mt-4
                          flex
                          items-center
                          justify-center
                          gap-1.5
                          text-xs
                          font-bold
                          text-blue-600
                          opacity-0
                          transition-all
                          duration-300
                          group-hover:translate-y-0
                          group-hover:opacity-100
                          translate-y-1
                        "
                        >
                          مشاهده
                          <ArrowLeft
                            size={13}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =================================================
            Products
        ================================================= */}

        <section
          ref={productSectionRef}
          className={`
            relative w-full pb-24
            pt-20
            transition-all
            duration-1000
            ease-out
            md:px-6
            lg:px-2

            ${
              productSectionVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
          `}
        >
          <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10">
          {/* Header */}

          <div className="mb-9 flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                <span className="text-sm font-bold text-blue-600">
                  انتخاب Ronin
                </span>
              </div>

              <h2
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-gray-950
                  md:text-4xl
                "
              >
                محصولات منتخب
              </h2>

              <p className="mt-3 text-sm text-gray-500 md:text-base">
                جدیدترین تجهیزات آماده‌اند تا وارد تمرینت شوند.
              </p>
            </div>

            {/* Desktop Actions */}

            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/products"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-gray-700
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-blue-200
                  hover:text-blue-600
                  hover:shadow-md
                "
              >
                مشاهده همه
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="محصولات قبلی"
                  onClick={() => scrollSlider(productSliderRef, "left", 390)}
                  className="
                    group
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-200
                    bg-white
                    text-gray-700
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-blue-600
                    hover:bg-blue-600
                    hover:text-white
                    hover:shadow-lg
                    hover:shadow-blue-100
                  "
                >
                  <ChevronRight size={18} />
                </button>

                <button
                  type="button"
                  aria-label="محصولات بعدی"
                  onClick={() => scrollSlider(productSliderRef, "right", 390)}
                  className="
                    group
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-200
                    bg-white
                    text-gray-700
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-blue-600
                    hover:bg-blue-600
                    hover:text-white
                    hover:shadow-lg
                    hover:shadow-blue-100
                  "
                >
                  <ChevronLeft size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Product List */}

          {loading ? (
            <ProductSkeleton />
          ) : products.length === 0 ? (
            <div
              className="
                rounded-3xl
                border
                border-dashed
                border-gray-200
                bg-gray-50
                px-6
                py-14
                text-center
              "
            >
              <p className="font-medium text-gray-600">
                هنوز محصولی برای نمایش وجود ندارد.
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Right Fade */}

              <div
                className="
                  pointer-events-none
                  absolute
                  right-0
                  top-0
                  z-10
                  hidden
                  h-full
                  w-24
                  bg-gradient-to-l
                  from-white
                  to-transparent
                  md:block
                "
              />

              {/* Left Fade */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-0
                  z-10
                  hidden
                  h-full
                  w-24
                  bg-gradient-to-r
                  from-white
                  to-transparent
                  md:block
                "
              />

              <div
                ref={productSliderRef}
                className="
                  flex
                  gap-7
                  overflow-x-auto
                  scroll-smooth
                  snap-x
                  snap-mandatory
                  pb-6
                  no-scrollbar
                "
              >
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`
                      w-[270px]
                      shrink-0
                      snap-start
                      transition-all
                      duration-700
                      ease-out
                      md:w-72

                      hover:-translate-y-2

                      ${
                        productSectionVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-10 opacity-0"
                      }
                    `}
                    style={{
                      transitionDelay: `${index * 90}ms`,
                    }}
                  >
                    <ProductsCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile See All */}

          {!loading && products.length > 0 && (
            <div className="mt-5 flex justify-center md:hidden">
              <Link
                to="/products"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-gray-700
                  shadow-sm
                  transition-all
                  hover:border-blue-200
                  hover:text-blue-600
                "
              >
                مشاهده همه محصولات
                <ArrowLeft size={16} />
              </Link>
            </div>
          )}
          </div>
        </section>

        {/* =================================================
            Brand / CTA
        ================================================= */}

        <section
          ref={ctaRef}
          className={`
            relative w-full pb-24
            pt-24
            transition-all
            duration-1000
            ease-out
            md:px-6
            lg:px-2

            ${
              ctaVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }
          `}
        >
          <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10">
          <div
            className="
              relative
              overflow-hidden
              rounded-[36px]
              bg-gray-950
              px-6
              py-16
              text-center
              text-white
              shadow-2xl
              shadow-gray-200
              md:px-12
              md:py-20
            "
          >
            {/* Decorative Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-72
                w-72
                rounded-full
                bg-blue-600/20
                blur-3xl
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-32
                -left-20
                h-72
                w-72
                rounded-full
                bg-indigo-500/10
                blur-3xl
              "
            />

            {/* Content */}

            <div className="relative z-10 mx-auto max-w-3xl">
              <div
                className="
                  mx-auto
                  flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-blue-300
                  backdrop-blur
                "
              >
                <ShieldCheck size={14} />
                Ronin Collection
              </div>

              <h2
                className="
                  mt-6
                  text-3xl
                  font-black
                  leading-tight
                  tracking-tight
                  md:text-5xl
                "
              >
                مسیر یک جنگجو
                <br />
                از انتخاب تجهیزاتش آغاز می‌شود.
              </h2>

              <p
                className="
                  mx-auto
                  mt-6
                  max-w-2xl
                  text-sm
                  leading-8
                  text-gray-400
                  md:text-base
                "
              >
                مجموعه‌ای از تجهیزات رزمی، سامورایی و تمرینی را با دقت انتخاب
                کرده‌ایم تا هر چیزی که برای ادامه مسیرت نیاز داری، یک قدم
                نزدیک‌تر باشد.
              </p>

              <Link
                to="/products"
                className="
                  group
                  mt-9
                  inline-flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-white
                  px-7
                  py-4
                  font-bold
                  text-gray-950
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-blue-600
                  hover:text-white
                  hover:shadow-2xl
                  hover:shadow-blue-900/30
                "
              >
                مشاهده محصولات
                <ArrowLeft
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
              </Link>
            </div>
          </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
