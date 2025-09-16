document.addEventListener("DOMContentLoaded", () => {
    // Tooltip init
    var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (el) {
        return new bootstrap.Tooltip(el);
    });

    // اضافه کردن کلاس انیمیشن به همه آیتم‌های محصولات و برندها
    document.querySelectorAll(".product-item").forEach((el) => {
        el.classList.add("animate-on-scroll");
    });

    // تابع عمومی برای مقداردهی هر اسلایدر
    function initSlider(trackId) {
        const track = document.getElementById(trackId);
        if (!track) return;

        const container = track.parentElement;
        const prev = document.querySelector(`.prev[data-target="${trackId}"]`);
        const next = document.querySelector(`.next[data-target="${trackId}"]`);

        let items = Array.from(track.querySelectorAll(".product-item"));
        const originalCount = items.length;
        let index = 0;

        // دو برابر کردن آیتم‌ها برای لوپ بی‌نهایت
        track.innerHTML += track.innerHTML;
        items = Array.from(track.querySelectorAll(".product-item"));

        function itemsPerView() {
            if (window.innerWidth < 577) return 2;
            if (window.innerWidth < 993) return 4;
            return 6;
        }

        if (trackId === "track-brands") {
            let offset = 0;
            let speed = 0.3;
            let autoPlay = true;
            let startX = 0;
            let currentX = 0;
            let dragging = false;
            let dragDelta = 0;

            track.innerHTML += track.innerHTML;

            function animate() {
                if (autoPlay && !dragging) {
                    offset -= speed;
                }
                if (Math.abs(offset) >= track.scrollWidth / 2) {
                    offset = 0;
                }
                track.style.transform = `translateX(${offset + dragDelta}px)`;
                requestAnimationFrame(animate);
            }

            animate();

            track.addEventListener("touchstart", (e) => {
                autoPlay = false;
                dragging = true;
                startX = e.touches[0].clientX;
                dragDelta = 0;
            });

            track.addEventListener("touchmove", (e) => {
                if (!dragging) return;
                currentX = e.touches[0].clientX;
                dragDelta = currentX - startX;
            });

            track.addEventListener("touchend", () => {
                offset += dragDelta;
                dragDelta = 0;
                dragging = false;
                autoPlay = true;
            });
        }

        // IntersectionObserver برای انیمیشن ورود/خروج
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0.5) {
                        entry.target.classList.add("in-view");
                        entry.target.classList.remove("out-view");
                    } else if (entry.intersectionRatio === 0) {
                        entry.target.classList.remove("in-view");
                        entry.target.classList.add("out-view");
                    }
                });
            },
            {
                threshold: [0, 0.5], // ۰٪ و ۵۰٪ رو بررسی کن
            }
        );

        document
            .querySelectorAll(".animate-on-scroll")
            .forEach((el) => observer.observe(el));

        function updateSlider(animate = true) {
            const perView = itemsPerView();
            const containerWidth = container.clientWidth;
            const itemWidth = containerWidth / perView;
            const translateX = -index * itemWidth;

            track.style.transition = animate ? "transform 0.5s ease" : "none";
            track.style.transform = `translateX(${translateX}px)`;
        }

        if (next) {
            next.addEventListener("click", () => {
                index++;
                updateSlider(true);
                if (index >= originalCount) {
                    setTimeout(() => {
                        index = 0;
                        updateSlider(false);
                    }, 500);
                }
            });
        }

        if (prev) {
            prev.addEventListener("click", () => {
                if (index <= 0) {
                    index = originalCount;
                    updateSlider(false);
                }
                setTimeout(() => {
                    index--;
                    updateSlider(true);
                }, 20);
            });
        }

        let startX = 0;
        let isDragging = false;

        track.addEventListener(
            "touchstart",
            (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
                track.style.transition = "none";
            },
            { passive: true }
        );

        track.addEventListener(
            "touchmove",
            (e) => {
                if (!isDragging) return;
                const currentX = e.touches[0].clientX;
                const delta = currentX - startX;

                const perView = itemsPerView();
                const containerWidth = container.clientWidth;
                const itemWidth = containerWidth / perView;
                const offsetPx = -index * itemWidth + delta;

                track.style.transform = `translateX(${offsetPx}px)`;
            },
            { passive: true }
        );

        track.addEventListener("touchend", (e) => {
            isDragging = false;
            const delta = e.changedTouches[0].clientX - startX;
            const threshold = container.clientWidth * 0.15;

            if (delta < -threshold) {
                index++;
            } else if (delta > threshold) {
                index--;
            }

            if (index < 0) index = 0;
            if (index >= originalCount) index = originalCount - 1;

            updateSlider(true);
        });

        window.addEventListener("resize", () => updateSlider(false));
        updateSlider(false);
    }

    initSlider("track-products");
    initSlider("track-brands");

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smooth: true,
        smoothTouch: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- هدر sticky با انیمیشن ---
    // --- هدر sticky با انیمیشن ---
    const navbar = document.querySelector(".navbar.sticky-top");
    if (navbar) {
        const SCROLL_THRESHOLD = 24;

        // استفاده مستقیم از lenis برای گرفتن موقعیت اسکرول
        lenis.on("scroll", ({ scroll }) => {
            if (scroll > SCROLL_THRESHOLD) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

});

// document.addEventListener("DOMContentLoaded", function () {
//   const images = document.querySelectorAll(".lazy-img");

//   images.forEach(img => {
//     if (img.complete) {
//       // اگر عکس قبلاً لود شده (مثلاً کش مرورگر)
//       img.classList.add("loaded");
//     } else {
//       img.addEventListener("load", () => {
//         img.classList.add("loaded");
//       });
//     }
//   });
// });