// import { useEffect, useRef } from "react";

// /*
//   ScrollHero.jsx
//   ----------------------------------------------------------------
//   استفاده:
//     1. پوشه‌ی فریم‌ها (frame_001.webp ... frame_096.webp) رو بذار توی:
//        public/hero-frames/
//     2. این کامپوننت رو جایی که می‌خوای هیرو باشه import و رندر کن:
//        <ScrollHero />
//     3. عنوان‌ها و توضیحات رو توی آرایه‌ی TEXTS پایین عوض کن.
//   ----------------------------------------------------------------
// */

// const FRAME_COUNT = 96;
// const FRAME_BASE = "/frames_seq/frame_"; // آدرس پوشه‌ی فریم‌ها
// const FRAME_EXT = ".webp";
// const FRAME_PAD = 3;
// const SCROLL_LENGTH_VH = 400; // طول مسیر اسکرول (vh) - هرچی بیشتر، افکت آروم‌تر

// const TEXTS = [
//   { title: "عنوان اول اینجا", desc: "توضیح کوتاه اینجا میاد" },
//   { title: "عنوان دوم اینجا", desc: "وقتی شمشیر میفته این متن دیده میشه" },
//   { title: "عنوان سوم / CTA", desc: "وقتی شمشیر فرو میره این متن نشون داده میشه" },
// ];

// function frameUrl(i) {
//   return FRAME_BASE + String(i).padStart(FRAME_PAD, "0") + FRAME_EXT;
// }

// export default function ScrollHero() {
//   const wrapperRef = useRef(null);
//   const canvasRef = useRef(null);
//   const imagesRef = useRef([]);
//   const currentFrameRef = useRef(-1);
//   const activeTextRef = useRef(-1);
//   const textRefs = useRef([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     // پیش‌بارگذاری همه‌ی فریم‌ها
//     // نکته‌ی مهم: onload رو قبل از src ست می‌کنیم، وگرنه برای عکس‌های
//     // کش‌شده (304) ممکنه رویداد load قبل از اتصال handler فایر بشه.
//     const images = [];
//     for (let i = 1; i <= FRAME_COUNT; i++) {
//       const img = new Image();
//       if (i === 1) {
//         img.onload = () => drawFrame(0);
//       }
//       img.src = frameUrl(i);
//       // اگه عکس همین الان (از کش) کامل شده، onload ممکنه دیگه فایر نشه
//       if (i === 1 && img.complete && img.naturalWidth > 0) {
//         drawFrame(0);
//       }
//       images.push(img);
//     }
//     imagesRef.current = images;

//     function resizeCanvas() {
//       canvas.width = canvas.clientWidth * window.devicePixelRatio;
//       canvas.height = canvas.clientHeight * window.devicePixelRatio;
//       currentFrameRef.current = -1; // فورس ری‌درا بعد از resize
//       onScroll();
//     }

//     function drawFrame(index) {
//       const img = imagesRef.current[index];
//       if (!img || !img.complete || img.naturalWidth === 0) return;
//       if (index === currentFrameRef.current) return;
//       currentFrameRef.current = index;

//       const cw = canvas.width;
//       const ch = canvas.height;
//       const iw = img.naturalWidth;
//       const ih = img.naturalHeight;
//       const scale = Math.max(cw / iw, ch / ih);
//       const dw = iw * scale;
//       const dh = ih * scale;
//       const dx = (cw - dw) / 2;
//       const dy = (ch - dh) / 2;

//       ctx.clearRect(0, 0, cw, ch);
//       ctx.drawImage(img, dx, dy, dw, dh);
//     }

//     function updateTexts(progress) {
//       const segment = Math.min(
//         TEXTS.length - 1,
//         Math.floor(progress * TEXTS.length)
//       );
//       if (segment === activeTextRef.current) return;
//       activeTextRef.current = segment;
//       textRefs.current.forEach((el, i) => {
//         if (!el) return;
//         el.style.opacity = i === segment ? "1" : "0";
//       });
//     }

//     function onScroll() {
//       const wrapper = wrapperRef.current;
//       if (!wrapper) return;
//       const rect = wrapper.getBoundingClientRect();
//       const total = wrapper.offsetHeight - window.innerHeight;
//       let progress = total > 0 ? -rect.top / total : 0;
//       progress = Math.min(Math.max(progress, 0), 1);

//       const frameIndex = Math.min(
//         FRAME_COUNT - 1,
//         Math.floor(progress * FRAME_COUNT)
//       );

//       requestAnimationFrame(() => {
//         drawFrame(frameIndex);
//         updateTexts(progress);
//       });
//     }

//     resizeCanvas();
//     onScroll();

//     window.addEventListener("resize", resizeCanvas);
//     window.addEventListener("scroll", onScroll, { passive: true });

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       window.removeEventListener("scroll", onScroll);
//     };
//   }, []);

//   return (
//     <div ref={wrapperRef} style={{ position: "relative", height: `${SCROLL_LENGTH_VH}vh` }}>
//       <div
//         style={{
//           position: "sticky",
//           top: 0,
//           height: "100vh",
//           overflow: "hidden",
//           background: "#000",
//         }}
//       >
//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             inset: 0,
//             width: "100%",
//             height: "100%",
//           }}
//         />

//         {TEXTS.map((t, i) => (
//           <div
//             key={i}
//             ref={(el) => (textRefs.current[i] = el)}
//             style={{
//               position: "absolute",
//               inset: 0,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               textAlign: "center",
//               color: "#fff",
//               opacity: i === 0 ? 1 : 0,
//               transition: "opacity 0.4s ease",
//               pointerEvents: "none",
//               padding: 20,
//             }}
//           >
//             <h1 style={{ fontSize: "clamp(28px, 5vw, 64px)", margin: "0 0 12px", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}>
//               {t.title}
//             </h1>
//             <p style={{ fontSize: "clamp(14px, 2vw, 20px)", opacity: 0.85, maxWidth: 600 }}>
//               {t.desc}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useRef, useState } from "react";
// import { ChevronDown, Sparkles } from "lucide-react";

// const FRAME_COUNT = 96;
// const FRAME_BASE = "/frames_seq/frame_";
// const FRAME_EXT = ".webp";
// const FRAME_PAD = 3;

// // هرچه بیشتر باشد، حرکت شمشیر آهسته‌تر و سینمایی‌تر می‌شود.
// const SCROLL_LENGTH_VH = 450;

// const TEXTS = [
//   {
//     eyebrow: "RONIN",
//     title: "مسیر یک جنگجو از انتخابش آغاز می‌شود.",
//     description:
//       "تجهیزات مناسب، اولین قدم برای ساختن تجربه‌ای متفاوت در مسیر مبارزه است.",
//   },
//   {
//     eyebrow: "PRECISION",
//     title: "قدرت، بدون کنترل معنا ندارد.",
//     description:
//       "ابزار مناسب را انتخاب کن و روی چیزی تمرکز کن که واقعاً اهمیت دارد.",
//   },
//   {
//     eyebrow: "RONIN COLLECTION",
//     title: "برای مسیرت آماده باش.",
//     description:
//       "مجموعه تجهیزات رزمی رونین را ببین و انتخاب خودت را پیدا کن.",
//   },
// ];

// function frameUrl(index) {
//   return (
//     FRAME_BASE +
//     String(index + 1).padStart(FRAME_PAD, "0") +
//     FRAME_EXT
//   );
// }

// function clamp(value, min, max) {
//   return Math.min(Math.max(value, min), max);
// }

// export default function ScrollHero() {
//   const wrapperRef = useRef(null);
//   const canvasRef = useRef(null);

//   const imagesRef = useRef([]);
//   const currentFrameRef = useRef(-1);

//   const animationFrameRef = useRef(null);
//   const scrollTickRef = useRef(false);

//   const [loadedCount, setLoadedCount] = useState(0);
//   const [isReady, setIsReady] = useState(false);
//   const [activeText, setActiveText] = useState(0);

//   /*
//    * --------------------------------------------------
//    * Canvas renderer
//    * --------------------------------------------------
//    */

//   const drawFrame = (index) => {
//     const canvas = canvasRef.current;

//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");

//     if (!ctx) return;

//     const images = imagesRef.current;

//     const image = images[index];

//     if (!image || !image.complete || image.naturalWidth === 0) {
//       return;
//     }

//     /*
//      * اگر همین فریم قبلاً رسم شده،
//      * دوباره GPU/Canvas را درگیر نکن.
//      */
//     if (currentFrameRef.current === index) {
//       return;
//     }

//     const canvasWidth = canvas.width;
//     const canvasHeight = canvas.height;

//     const imageWidth = image.naturalWidth;
//     const imageHeight = image.naturalHeight;

//     /*
//      * object-cover واقعی
//      */

//     const scale = Math.max(
//       canvasWidth / imageWidth,
//       canvasHeight / imageHeight,
//     );

//     const drawWidth = imageWidth * scale;
//     const drawHeight = imageHeight * scale;

//     const offsetX = (canvasWidth - drawWidth) / 2;
//     const offsetY = (canvasHeight - drawHeight) / 2;

//     ctx.clearRect(0, 0, canvasWidth, canvasHeight);

//     ctx.drawImage(
//       image,
//       offsetX,
//       offsetY,
//       drawWidth,
//       drawHeight,
//     );

//     currentFrameRef.current = index;
//   };

//   /*
//    * --------------------------------------------------
//    * Canvas resize
//    * --------------------------------------------------
//    */

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     if (!canvas) return;

//     const resizeCanvas = () => {
//       const dpr = Math.min(window.devicePixelRatio || 1, 2);

//       const width = canvas.clientWidth;
//       const height = canvas.clientHeight;

//       canvas.width = Math.round(width * dpr);
//       canvas.height = Math.round(height * dpr);

//       currentFrameRef.current = -1;

//       drawFrame(
//         Math.max(
//           currentFrameRef.current,
//           0,
//         ),
//       );
//     };

//     resizeCanvas();

//     window.addEventListener("resize", resizeCanvas);

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, []);

//   /*
//    * --------------------------------------------------
//    * Preload frames
//    * --------------------------------------------------
//    */

//   useEffect(() => {
//     let cancelled = false;

//     const images = new Array(FRAME_COUNT);

//     let completed = 0;

//     const updateProgress = () => {
//       completed += 1;

//       if (cancelled) return;

//       setLoadedCount(completed);

//       if (completed === FRAME_COUNT) {
//         setIsReady(true);

//         /*
//          * اولین فریم را بلافاصله نمایش بده.
//          */
//         requestAnimationFrame(() => {
//           drawFrame(0);
//         });
//       }
//     };

//     /*
//      * اول فریم اول را لود می‌کنیم
//      * تا Hero سریع‌تر ظاهر شود.
//      */

//     const firstImage = new Image();

//     firstImage.decoding = "async";
//     firstImage.src = frameUrl(0);

//     firstImage.onload = () => {
//       if (cancelled) return;

//       images[0] = firstImage;

//       updateProgress();

//       requestAnimationFrame(() => {
//         drawFrame(0);
//       });
//     };

//     firstImage.onerror = updateProgress;

//     /*
//      * بقیه فریم‌ها
//      */

//     for (let i = 1; i < FRAME_COUNT; i++) {
//       const image = new Image();

//       image.decoding = "async";

//       image.onload = () => {
//         if (cancelled) return;

//         images[i] = image;

//         updateProgress();
//       };

//       image.onerror = () => {
//         console.warn(
//           `Failed to load frame ${i + 1}`,
//         );

//         updateProgress();
//       };

//       image.src = frameUrl(i);
//     }

//     imagesRef.current = images;

//     return () => {
//       cancelled = true;

//       imagesRef.current = [];

//       if (animationFrameRef.current) {
//         cancelAnimationFrame(
//           animationFrameRef.current,
//         );
//       }
//     };
//   }, []);

//   /*
//    * --------------------------------------------------
//    * Scroll → Frame
//    * --------------------------------------------------
//    */

//   useEffect(() => {
//     const handleScroll = () => {
//       if (scrollTickRef.current) return;

//       scrollTickRef.current = true;

//       animationFrameRef.current =
//         requestAnimationFrame(() => {
//           scrollTickRef.current = false;

//           const wrapper = wrapperRef.current;

//           if (!wrapper) return;

//           const rect =
//             wrapper.getBoundingClientRect();

//           const scrollableDistance =
//             wrapper.offsetHeight -
//             window.innerHeight;

//           if (scrollableDistance <= 0) return;

//           const rawProgress =
//             -rect.top / scrollableDistance;

//           const progress = clamp(
//             rawProgress,
//             0,
//             1,
//           );

//           /*
//            * مهم:
//            *
//            * 96 فریم یعنی index:
//            *
//            * 0 → 95
//            */

//           const frameIndex = Math.round(
//             progress * (FRAME_COUNT - 1),
//           );

//           /*
//            * اگر فریم موردنظر هنوز آماده نشده،
//            * نزدیک‌ترین فریم آماده را پیدا کن.
//            */

//           let frameToDraw = frameIndex;

//           const images =
//             imagesRef.current;

//           if (
//             !images[frameToDraw] ||
//             !images[frameToDraw].complete
//           ) {
//             /*
//              * از فریم فعلی به سمت فریم موردنظر
//              * نزدیک‌ترین فریم آماده را پیدا می‌کنیم.
//              */

//             const current =
//               currentFrameRef.current >= 0
//                 ? currentFrameRef.current
//                 : 0;

//             const direction =
//               frameIndex >= current
//                 ? 1
//                 : -1;

//             let found = -1;

//             for (
//               let distance = 0;
//               distance < FRAME_COUNT;
//               distance++
//             ) {
//               const candidate =
//                 frameIndex +
//                 distance * direction;

//               if (
//                 candidate >= 0 &&
//                 candidate < FRAME_COUNT &&
//                 images[candidate] &&
//                 images[candidate].complete &&
//                 images[candidate].naturalWidth > 0
//               ) {
//                 found = candidate;
//                 break;
//               }
//             }

//             if (found !== -1) {
//               frameToDraw = found;
//             } else {
//               return;
//             }
//           }

//           drawFrame(frameToDraw);

//           /*
//            * متن‌ها در سه بخش اصلی Hero
//            */

//           const textIndex = Math.min(
//             TEXTS.length - 1,
//             Math.floor(
//               progress * TEXTS.length,
//             ),
//           );

//           setActiveText((prev) =>
//             prev === textIndex
//               ? prev
//               : textIndex,
//           );
//         });
//     };

//     window.addEventListener(
//       "scroll",
//       handleScroll,
//       { passive: true },
//     );

//     handleScroll();

//     return () => {
//       window.removeEventListener(
//         "scroll",
//         handleScroll,
//       );

//       if (animationFrameRef.current) {
//         cancelAnimationFrame(
//           animationFrameRef.current,
//         );
//       }
//     };
//   }, []);

//   /*
//    * --------------------------------------------------
//    * Render
//    * --------------------------------------------------
//    */

//   const loadingPercentage = Math.round(
//     (loadedCount / FRAME_COUNT) * 100,
//   );

//   return (
//     <section
//       ref={wrapperRef}
//       dir="rtl"
//       className="relative bg-black"
//       style={{
//         height: `${SCROLL_LENGTH_VH}vh`,
//       }}
//     >
//       <div
//         className="
//           sticky
//           top-0
//           h-screen
//           w-full
//           overflow-hidden
//           bg-black
//         "
//       >
//         {/* -------------------------------- */}
//         {/* Canvas */}
//         {/* -------------------------------- */}

//         <canvas
//           ref={canvasRef}
//           className="
//             absolute
//             inset-0
//             h-full
//             w-full
//           "
//         />

//         {/* -------------------------------- */}
//         {/* Cinematic overlay */}
//         {/* -------------------------------- */}

//         <div
//           className="
//             pointer-events-none
//             absolute
//             inset-0
//             bg-gradient-to-b
//             from-black/25
//             via-transparent
//             to-black/70
//           "
//         />

//         <div
//           className="
//             pointer-events-none
//             absolute
//             inset-0
//             shadow-[inset_0_0_180px_rgba(0,0,0,0.65)]
//           "
//         />

//         {/* -------------------------------- */}
//         {/* Top fade */}
//         {/* -------------------------------- */}

//         <div
//           className="
//             pointer-events-none
//             absolute
//             inset-x-0
//             top-0
//             h-40
//             bg-gradient-to-b
//             from-black/60
//             to-transparent
//           "
//         />

//         {/* -------------------------------- */}
//         {/* Loading */}
//         {/* -------------------------------- */}

//         {!isReady && (
//           <div
//             className="
//               absolute
//               inset-0
//               z-50
//               flex
//               items-center
//               justify-center
//               bg-black
//             "
//           >
//             <div className="w-[260px] text-center">
//               <div className="mb-6 flex justify-center">
//                 <div
//                   className="
//                     flex
//                     h-14
//                     w-14
//                     items-center
//                     justify-center
//                     rounded-full
//                     border
//                     border-white/10
//                     bg-white/5
//                     text-white
//                   "
//                 >
//                   <Sparkles size={22} />
//                 </div>
//               </div>

//               <p className="text-sm font-medium text-white">
//                 آماده‌سازی صحنه
//               </p>

//               <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
//                 <div
//                   className="
//                     h-full
//                     rounded-full
//                     bg-white
//                     transition-all
//                     duration-300
//                   "
//                   style={{
//                     width: `${loadingPercentage}%`,
//                   }}
//                 />
//               </div>

//               <p className="mt-3 text-xs text-white/40">
//                 {loadingPercentage}%
//               </p>
//             </div>
//           </div>
//         )}

//         {/* -------------------------------- */}
//         {/* Content */}
//         {/* -------------------------------- */}

//         <div
//           className="
//             pointer-events-none
//             absolute
//             inset-0
//             z-20
//             flex
//             items-center
//             justify-center
//             px-5
//             sm:px-8
//           "
//         >
//           {TEXTS.map((text, index) => {
//             const isActive =
//               activeText === index;

//             return (
//               <div
//                 key={index}
//                 className={`
//                   absolute
//                   w-full
//                   max-w-xl
//                   transition-all
//                   duration-700
//                   ease-out
//                   ${
//                     isActive
//                       ? "translate-y-0 scale-100 opacity-100"
//                       : "translate-y-8 scale-95 opacity-0"
//                   }
//                 `}
//               >
//                 <div
//                   className="
//                     rounded-[28px]
//                     border
//                     border-white/10
//                     bg-black/30
//                     p-7
//                     text-center
//                     shadow-2xl
//                     backdrop-blur-xl
//                     sm:p-9
//                   "
//                 >
//                   <span
//                     className="
//                       inline-flex
//                       items-center
//                       rounded-full
//                       border
//                       border-white/15
//                       bg-white/5
//                       px-4
//                       py-1.5
//                       text-[10px]
//                       font-semibold
//                       tracking-[0.3em]
//                       text-white/70
//                     "
//                   >
//                     {text.eyebrow}
//                   </span>

//                   <h1
//                     className="
//                       mt-5
//                       text-3xl
//                       font-black
//                       leading-tight
//                       text-white
//                       drop-shadow-2xl
//                       sm:text-4xl
//                       md:text-5xl
//                     "
//                   >
//                     {text.title}
//                   </h1>

//                   <p
//                     className="
//                       mx-auto
//                       mt-5
//                       max-w-lg
//                       text-sm
//                       leading-7
//                       text-white/70
//                       sm:text-base
//                     "
//                   >
//                     {text.description}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* -------------------------------- */}
//         {/* Scroll indicator */}
//         {/* -------------------------------- */}

//         <div
//           className="
//             pointer-events-none
//             absolute
//             bottom-8
//             left-1/2
//             z-30
//             flex
//             -translate-x-1/2
//             flex-col
//             items-center
//             gap-3
//             text-white/60
//           "
//         >
//           <span
//             className="
//               text-[9px]
//               font-medium
//               tracking-[0.4em]
//             "
//           >
//             SCROLL TO EXPLORE
//           </span>

//           <div
//             className="
//               flex
//               h-10
//               w-6
//               justify-center
//               rounded-full
//               border
//               border-white/20
//               p-1
//             "
//           >
//             <ChevronDown
//               size={14}
//               className="animate-bounce"
//             />
//           </div>
//         </div>

//         {/* -------------------------------- */}
//         {/* Bottom fade */}
//         {/* -------------------------------- */}

//         <div
//           className="
//             pointer-events-none
//             absolute
//             inset-x-0
//             bottom-0
//             h-48
//             bg-gradient-to-t
//             from-black
//             via-black/40
//             to-transparent
//           "
//         />
//       </div>
//     </section>
//   );
// }

import { useEffect, useRef } from "react";

const FRAME_COUNT = 96;
const FRAME_BASE = "/frames_seq/frame_";
const FRAME_EXT = ".webp";
const FRAME_PAD = 3;

const SCROLL_LENGTH_VH = 400;

const TEXTS = [
  {
    title: "قدرت از انتخاب آغاز می‌شود",
    desc: "تجهیزات مناسب، اولین قدم در مسیر یک جنگجوست.",
  },
  {
    title: "وقتی شمشیر فرود می‌آید",
    desc: "دقت، قدرت و اصالت در یک لحظه.",
  },
  {
    title: "RONIN",
    desc: "برای کسانی که مسیر خودشان را انتخاب می‌کنند.",
  },
];

function frameUrl(index) {
  return FRAME_BASE + String(index + 1).padStart(FRAME_PAD, "0") + FRAME_EXT;
}

export default function ScrollHero() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  const imagesRef = useRef([]);
  const currentFrameRef = useRef(-1);
  const animationFrameRef = useRef(null);

  const textRefs = useRef([]);
  const activeTextRef = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    /*
    |--------------------------------------------------------------------------
    | Canvas
    |--------------------------------------------------------------------------
    */

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      currentFrameRef.current = -1;

      drawFrame(
        Math.max(0, Math.min(FRAME_COUNT - 1, currentFrameRef.current)),
      );
    };

    /*
    |--------------------------------------------------------------------------
    | Draw frame
    |--------------------------------------------------------------------------
    */

    const drawFrame = (index) => {
      const img = imagesRef.current[index];

      if (!img) return;

      if (!img.complete || img.naturalWidth === 0) return;

      if (index === currentFrameRef.current) return;

      currentFrameRef.current = index;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      /*
       * COVER
       *
       * تصویر کل صفحه را پر می‌کند
       * بدون کشیدگی
       */

      const scale = Math.max(width / iw, height / ih);

      const drawWidth = iw * scale;
      const drawHeight = ih * scale;

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      ctx.clearRect(0, 0, width, height);

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };

    /*
    |--------------------------------------------------------------------------
    | Text animation
    |--------------------------------------------------------------------------
    */

    const updateTexts = (progress) => {
      const segment = Math.min(
        TEXTS.length - 1,
        Math.floor(progress * TEXTS.length),
      );

      if (segment === activeTextRef.current) return;

      activeTextRef.current = segment;

      textRefs.current.forEach((el, index) => {
        if (!el) return;

        if (index === segment) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0px) scale(1)";
        } else {
          el.style.opacity = "0";
          el.style.transform = "translateY(30px) scale(0.97)";
        }
      });
    };

    /*
    |--------------------------------------------------------------------------
    | Scroll
    |--------------------------------------------------------------------------
    */

    const updateScroll = () => {
      const wrapper = wrapperRef.current;

      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();

      const scrollableDistance = wrapper.offsetHeight - window.innerHeight;

      let progress =
        scrollableDistance > 0 ? -rect.top / scrollableDistance : 0;

      progress = Math.max(0, Math.min(1, progress));

      /*
       * دقیقاً یک فریم برای هر بخش از اسکرول
       */

      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(progress * FRAME_COUNT),
      );

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        drawFrame(frameIndex);
        updateTexts(progress);
      });
    };

    /*
    |--------------------------------------------------------------------------
    | Preload ALL frames
    |--------------------------------------------------------------------------
    */

    const images = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();

      /*
       * هیچ lazy loading یا optimization نداریم.
       * همه فریم‌ها از ابتدا درخواست می‌شوند.
       */

      img.src = frameUrl(i);

      images.push(img);
    }

    imagesRef.current = images;

    /*
    |--------------------------------------------------------------------------
    | First frame
    |--------------------------------------------------------------------------
    */

    const firstImage = images[0];

    if (firstImage) {
      firstImage.onload = () => {
        drawFrame(0);
      };

      /*
       * اگر از cache آمده باشد
       */

      if (firstImage.complete && firstImage.naturalWidth > 0) {
        drawFrame(0);
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Init
    |--------------------------------------------------------------------------
    */

    resizeCanvas();
    updateScroll();

    /*
    |--------------------------------------------------------------------------
    | Events
    |--------------------------------------------------------------------------
    */

    window.addEventListener("resize", resizeCanvas);

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      window.removeEventListener("scroll", updateScroll);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      dir="rtl"
      style={{
        position: "relative",
        height: `${SCROLL_LENGTH_VH}vh`,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* ========================================================= */}
        {/* Canvas */}
        {/* ========================================================= */}

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        {/* ========================================================= */}
        {/* Dark Overlay */}
        {/* ========================================================= */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.35))",
            pointerEvents: "none",
          }}
        />

        {/* ========================================================= */}
        {/* TEXT CARDS */}
        {/* ========================================================= */}

        {TEXTS.map((text, index) => (
          <div
            key={index}
            ref={(el) => {
              textRefs.current[index] = el;
            }}
            style={{
              position: "absolute",

              /*
               * کارت وسط صفحه
               */

              top: "50%",
              right: "8%",

              transform:
                index === 0
                  ? "translateY(-50%) translateY(0px) scale(1)"
                  : "translateY(-50%) translateY(30px) scale(0.97)",

              width: "min(420px, 38vw)",

              padding: "32px",

              borderRadius: "28px",

              background: "rgba(15, 23, 42, 0.62)",

              border: "1px solid rgba(255,255,255,0.14)",

              backdropFilter: "blur(18px)",

              WebkitBackdropFilter: "blur(18px)",

              boxShadow: "0 25px 80px rgba(0,0,0,0.35)",

              color: "#fff",

              opacity: index === 0 ? 1 : 0,

              transition:
                "opacity 0.5s ease, transform 0.6s cubic-bezier(.22,1,.36,1)",

              pointerEvents: "none",

              zIndex: 5,
            }}
          >
            {/* Small label */}

            <div
              style={{
                marginBottom: "14px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "#60a5fa",
              }}
            >
              RONIN
            </div>

            {/* Title */}

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(26px, 3vw, 48px)",
                lineHeight: 1.15,
                fontWeight: 900,
                textShadow: "0 4px 25px rgba(0,0,0,0.4)",
              }}
            >
              {text.title}
            </h1>

            {/* Description */}

            <p
              style={{
                margin: "16px 0 0",

                fontSize: "clamp(14px, 1.4vw, 18px)",

                lineHeight: 1.9,

                color: "rgba(255,255,255,0.78)",
              }}
            >
              {text.desc}
            </p>
          </div>
        ))}

        {/* ========================================================= */}
        {/* Scroll Indicator */}
        {/* ========================================================= */}

        <div
          style={{
            position: "absolute",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            gap: "8px",

            color: "rgba(255,255,255,0.75)",

            fontSize: "12px",

            zIndex: 10,

            pointerEvents: "none",
          }}
        >
          <span>اسکرول کنید</span>

          <div
            style={{
              width: "22px",
              height: "36px",

              border: "1px solid rgba(255,255,255,0.45)",

              borderRadius: "999px",

              display: "flex",
              justifyContent: "center",

              paddingTop: "7px",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "7px",

                borderRadius: "999px",

                background: "#fff",

                animation: "scrollIndicator 1.5s infinite",
              }}
            />
          </div>
        </div>

        <style>
          {`
            @keyframes scrollIndicator {
              0% {
                transform: translateY(0);
                opacity: 0;
              }

              30% {
                opacity: 1;
              }

              70% {
                opacity: 1;
              }

              100% {
                transform: translateY(12px);
                opacity: 0;
              }
            }

            @media (max-width: 768px) {
              .scroll-hero-card {
                right: 5%;
                left: 5%;
                width: auto;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}
