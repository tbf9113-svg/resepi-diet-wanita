import RecipeExplorer from "@/components/RecipeExplorer";
import DietTips from "@/components/DietTips";
import { getAllRecipes } from "@/lib/recipes";

// Halaman utama (Server Component): bahagian hero + penjelajah resepi
export default function HomePage() {
  const recipes = getAllRecipes();

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-12 text-center sm:px-6 sm:pt-16">
        <span className="inline-block rounded-full bg-sage-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-sage-700">
          Sihat · Ringkas · Sedap
        </span>
        <h1 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-cocoa-900 sm:text-5xl">
          Resepi diet yang <span className="text-blush-600">mudah</span> untuk
          setiap hari
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-cocoa-500">
          Pilihan hidangan rendah kalori, tinggi protein dan seimbang — dari
          sarapan hingga snek dan pencuci mulut.
        </p>
      </section>

      <RecipeExplorer recipes={recipes} />
      <DietTips />
    </>
  );
}
