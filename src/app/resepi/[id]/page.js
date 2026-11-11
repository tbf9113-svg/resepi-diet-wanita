import Link from "next/link";
import { notFound } from "next/navigation";
import RecipeImage from "@/components/RecipeImage";
import RecipeMeta from "@/components/RecipeMeta";
import { getAllRecipes, getRecipeById } from "@/lib/recipes";

// Jana semua halaman resepi semasa build (laju & mesra SEO)
export function generateStaticParams() {
  return getAllRecipes().map((recipe) => ({ id: recipe.id }));
}

// Tajuk tab pelayar berdasarkan resepi
export async function generateMetadata({ params }) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) return { title: "Resepi tidak ditemui" };
  return {
    title: `${recipe.title} | Resepi Diet Wanita`,
    description: recipe.description,
  };
}

export default async function RecipeDetailPage({ params }) {
  const { id } = await params;
  const recipe = getRecipeById(id);

  // Papar halaman 404 jika id tidak wujud
  if (!recipe) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-cocoa-500 hover:text-blush-600"
      >
        ← Kembali ke semua resepi
      </Link>

      {/* Gambar utama */}
      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl bg-cream-100">
        <RecipeImage
          src={recipe.image}
          alt={recipe.title}
          emoji={recipe.emoji}
          priority
          sizes="(min-width: 896px) 896px, 100vw"
        />
      </div>

      {/* Tajuk & maklumat ringkas */}
      <header className="mt-8">
        <div className="flex flex-wrap gap-2">
          {recipe.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-sage-200 px-3 py-1 text-xs font-semibold text-sage-700"
            >
              {cat}
            </span>
          ))}
        </div>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-cocoa-900 sm:text-4xl">
          {recipe.title}
        </h1>
        <p className="mt-3 text-cocoa-500">{recipe.description}</p>
        <div className="mt-5">
          <RecipeMeta
            prepTime={recipe.prepTime}
            calories={recipe.calories}
            servings={recipe.servings}
          />
        </div>
      </header>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.4fr]">
        {/* Senarai bahan */}
        <section className="h-fit rounded-3xl bg-sage-50 p-6">
          <h2 className="font-serif text-xl font-semibold text-cocoa-900">
            Bahan-bahan
          </h2>
          <ul className="mt-4 space-y-3">
            {recipe.ingredients.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-cocoa-700">
                <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-sage-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Cara memasak langkah demi langkah */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-cocoa-900">
            Cara Penyediaan
          </h2>
          <ol className="mt-4 space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-blush-100 text-sm font-semibold text-blush-700">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-cocoa-700">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}
