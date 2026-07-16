import { ShoppingCart, Heart, Eye, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

function ProductsCard({ product }) {
  const isSpecial = product.categories?.some((cat) => cat.slug === "special");

  return (
    <Link to={`/products/${product.slug}`}>
      <article
        className="
      group
      overflow-hidden
      rounded-3xl
      border
      border-gray-200
      bg-white
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-blue-400
      hover:shadow-xl
      "
      >
        {/* Image */}

        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={"http://127.0.0.1:8000" + product.image}
            alt={product.name}
            className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
          "
          />

          {/* Gradient */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

          {/* Special */}

          {isSpecial && (
            <div className="absolute left-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-white shadow">
              ویژه
            </div>
          )}

          {/* Wishlist */}

          <button
            className="
          absolute
          right-3
          top-3
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-white/90
          backdrop-blur
          transition
          hover:bg-red-50
          "
          >
            <Heart
              size={18}
              className="text-gray-600 transition group-hover:text-red-500"
            />
          </button>

          {/* Quick View */}

          <button
            className="
          absolute
          bottom-4
          left-1/2
          flex
          -translate-x-1/2
          translate-y-6
          items-center
          gap-2
          rounded-full
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          opacity-0
          shadow-lg
          transition-all
          duration-300
          group-hover:translate-y-0
          group-hover:opacity-100
          "
          >
            <Eye size={16} />
            مشاهده
          </button>
        </div>

        {/* Content */}

        <div className="p-5">
          {/* Categories */}

          <div className="mb-3 flex flex-wrap gap-2">
            {product.categories?.slice(0, 2).map((cat) => (
              <span
                key={cat.id}
                className="
              rounded-full
              bg-gray-100
              px-3
              py-1
              text-xs
              text-gray-600
              transition
              hover:bg-blue-100
              hover:text-blue-600
              "
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Name */}

          <h3 className="line-clamp-2 min-h-[48px] text-[15px] font-semibold leading-6 text-gray-800 transition group-hover:text-blue-600">
            {product.name}
          </h3>

          {/* Stock */}

          <div className="mt-3 flex items-center gap-2">
            {product.available ? (
              <>
                <Check size={16} className="text-emerald-500" />

                <span className="text-sm text-emerald-600">موجود</span>
              </>
            ) : (
              <>
                <X size={16} className="text-red-500" />

                <span className="text-sm text-red-500">ناموجود</span>
              </>
            )}
          </div>

          {/* Price */}

          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500">قیمت</p>

              <h4 className="text-xl font-bold text-gray-900">
                {Number(product.price).toLocaleString("fa-IR")}
              </h4>

              <span className="text-sm text-gray-500">تومان</span>
            </div>
          </div>

          {/* Button */}

          <button
            disabled={!product.available}
            className={`
          mt-5
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          py-3
          text-sm
          font-semibold
          transition-all
          duration-300
          ${
            product.available
              ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
              : "cursor-not-allowed bg-gray-200 text-gray-500"
          }
          `}
          >
            <ShoppingCart size={18} />

            {product.available ? "افزودن به سبد خرید" : "ناموجود"}
          </button>
        </div>
      </article>
    </Link>
  );
}

export default ProductsCard;
