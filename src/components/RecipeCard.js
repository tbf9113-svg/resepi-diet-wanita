import Link from "next/link";
import RecipeImage from "./RecipeImage";
import RecipeMeta from "./RecipeMeta";

// Kad resepi tunggal — klik untuk ke halaman butiran /resepi/[id]
export default function RecipeCard({ recipe }) {
  return (
    <Link
      href={`/resepi/${recipe.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blush-100"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
        <div className="absolute inset-0 transition duration-500 group-hover:scale-105">
          <RecipeImage
            src={recipe.image}
            alt={recipe.title}
            emoji={recipe.emoji}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-sage-700 backdrop-blur">
          {recipe.categories[0]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-serif text-lg font-semibold text-cocoa-900 group-hover:text-blush-600">
          {recipe.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm text-cocoa-500">
          {recipe.description}
        </p>
        <RecipeMeta prepTime={recipe.prepTime} calories={recipe.calories} />
      </div>
    </Link>
  );
}
