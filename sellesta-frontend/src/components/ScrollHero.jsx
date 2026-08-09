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
