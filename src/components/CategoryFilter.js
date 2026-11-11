"use client";

// Butang penapis kategori berbentuk "pil"
export default function CategoryFilter({
  categories,
  active,
  onSelect,
  label = "Penapis kategori",
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-blush-500 text-white shadow-sm"
                : "border border-cream-200 bg-white text-cocoa-700 hover:border-blush-200 hover:bg-blush-50"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
