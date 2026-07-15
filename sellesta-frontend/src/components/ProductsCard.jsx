function ProductsCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-transition-y-1 hover:border-blue-500 hover:shadow-lg">
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 text-sm font-semiblod text-gray-800">
          {product.name}
        </h3>
        <div className="mt-3 flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">
                {Number(product.price).toLocaleString("fa-IR")}تومان
            </span>
        </div>

        <button className="mt-3 w-full rounded-xl bg-blue-600 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 active:scale-95">افزودن به سبد</button>
      </div>
    </div>
  );
}

export default ProductsCard;