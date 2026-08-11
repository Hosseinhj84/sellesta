import {
  ShoppingCart,
  Heart,
  Eye,
  Check,
  X,
  ShieldCheck,
  Flame,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/axios";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function ProductsCard({ product }) {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { user } = useAuth();

  const isSpecial = product.categories?.some((cat) => cat.slug === "special");

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    addToCart(product.id);
  };

  const imageSrc = product.image?.startsWith("http")
    ? product.image
    : `${BASE_URL}${product.image}`;

  return (
    <Link to={`/products/${product.slug}`}>
      <article
        className="
        group
        relative
        overflow-hidden

        rounded-[28px]

        border
        border-zinc-200

        bg-white

        shadow-sm

        transition-all
        duration-500

        hover:-translate-y-2
        hover:border-red-500
        hover:shadow-2xl
        hover:shadow-red-100
      "
      >
        {/* Image */}

        <div className="relative aspect-square overflow-hidden bg-zinc-100">
          <img
            src={imageSrc}
            alt={product.name}
            className="
            h-full
            w-full
            object-cover

            transition-all
            duration-700

            group-hover:scale-110
          "
          />

          {/* Overlay */}

          <div
            className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/60
            via-black/10
            to-transparent

            opacity-0

            transition-all
            duration-500

            group-hover:opacity-100
          "
          />

          {/* Ronin Badge */}

          {isSpecial && (
            <div
              className="
              absolute
              left-4
              top-4

              flex
              items-center
              gap-1

              rounded-full

              bg-red-600

              px-3
              py-1.5

              text-xs
              font-bold
              text-white

              shadow-lg
            "
            >
              <Flame size={13} />
              پیشنهاد رونین
            </div>
          )}

          {/* Wishlist */}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="
            absolute
            right-4
            top-4

            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-full

            border
            border-white/40

            bg-white/80

            backdrop-blur-md

            transition-all
            duration-300

            hover:scale-110
            hover:bg-red-600
            hover:text-white
          "
          >
            <Heart
              size={18}
              className="
              transition-all
              duration-300
            "
            />
          </button>

          {/* Quick View */}

          <div
            className="
            absolute
            bottom-5
            left-1/2

            -translate-x-1/2
            translate-y-10

            opacity-0

            transition-all
            duration-500

            group-hover:translate-y-0
            group-hover:opacity-100
          "
          >
            <button
              className="
              flex
              items-center
              gap-2

              rounded-full

              bg-white

              px-5
              py-3

              text-sm
              font-semibold

              text-zinc-800

              shadow-xl

              transition-all

              hover:bg-red-600
              hover:text-white
            "
            >
              <Eye size={17} />
              مشاهده محصول
            </button>
          </div>
        </div>

        {/* Content */}

        <div className="space-y-4 p-5">
          {/* Categories */}

          <div className="flex flex-wrap gap-2">
            {product.categories?.slice(0, 2).map((cat) => (
              <span
                key={cat.id}
                className="
                rounded-full
                border
                border-zinc-200
                bg-zinc-50

                px-3
                py-1.5

                text-[11px]
                font-semibold

                text-zinc-700

                transition-all
                duration-300

                hover:border-red-500
                hover:bg-red-50
                hover:text-red-600
              "
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Product Name */}

          <h3
            className="
            min-h-[58px]

            text-[17px]
            font-bold

            leading-7

            text-zinc-900

            transition-all
            duration-300

            group-hover:text-red-600
          "
          >
            {product.name}
          </h3>

          {/* Stock */}

          <div className="flex items-center justify-between">
            {product.available ? (
              <div
                className="
                flex
                items-center
                gap-2

                rounded-full

                bg-emerald-50

                px-3
                py-1.5
              "
              >
                <ShieldCheck size={15} className="text-emerald-600" />

                <span className="text-xs font-semibold text-emerald-700">
                  آماده ارسال
                </span>
              </div>
            ) : (
              <div
                className="
                flex
                items-center
                gap-2

                rounded-full

                bg-red-50

                px-3
                py-1.5
              "
              >
                <X size={15} className="text-red-600" />

                <span className="text-xs font-semibold text-red-600">
                  ناموجود
                </span>
              </div>
            )}
          </div>

          {/* Price */}

          <div
            className="
            flex
            items-end
            justify-between

            border-t
            border-zinc-100

            pt-4
          "
          >
            <div>
              <p className="text-xs text-zinc-500">قیمت</p>

              <h4
                className="
                mt-1

                text-2xl
                font-black

                tracking-tight

                text-zinc-900
              "
              >
                {Number(product.price).toLocaleString("fa-IR")}
              </h4>

              <span className="text-sm text-zinc-500">تومان</span>
            </div>
          </div>

          {/* Button */}

          <button
            onClick={handleAddToCart}
            disabled={!product.available}
            className={`
            mt-2

            flex
            w-full
            items-center
            justify-center
            gap-2

            rounded-2xl

            py-3.5

            text-sm
            font-bold

            transition-all
            duration-300

            ${
              product.available
                ? `
                  bg-zinc-900
                  text-white

                  hover:-translate-y-0.5
                  hover:bg-red-600
                  hover:shadow-xl
                  hover:shadow-red-200

                  active:scale-95
                `
                : `
                  cursor-not-allowed
                  bg-zinc-200
                  text-zinc-500
                `
            }
          `}
          >
            <ShoppingCart size={18} />

            {product.available ? "خرید محصول" : "ناموجود"}
          </button>
        </div>
      </article>
    </Link>
  );
}

export default ProductsCard;
