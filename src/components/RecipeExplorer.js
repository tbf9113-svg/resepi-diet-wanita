"use client";

import { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import RecipeCard from "./RecipeCard";
import { CATEGORIES, filterRecipes } from "@/lib/recipes";

/**
 * Komponen utama yang interaktif: menyimpan keadaan carian & kategori,
 * kemudian memaparkan grid resepi yang telah ditapis.
 */
export default function RecipeExplorer({ recipes }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");

  // Kira semula senarai hanya apabila input berubah
  const filtered = useMemo(
    () => filterRecipes(recipes, { query, category }),
    [recipes, query, category]
  );

  const resetFilters = () => {
    setQuery("");
    setCategory("Semua");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-4">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter
          categories={CATEGORIES}
          active={category}
          onSelect={setCategory}
        />
      </div>

      <p className="mb-4 text-sm text-cocoa-500">
        {filtered.length} resepi ditemui
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        // Paparan kosong apabila tiada padanan
        <div className="rounded-3xl border border-dashed border-blush-200 bg-blush-50 px-6 py-16 text-center">
          <p className="text-4xl">🥄</p>
          <p className="mt-3 font-serif text-lg text-cocoa-900">
            Tiada resepi ditemui
          </p>
          <p className="mt-1 text-sm text-cocoa-500">
            Cuba kata kunci lain atau pilih kategori berbeza.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 rounded-full bg-blush-500 px-5 py-2 text-sm font-medium text-white hover:bg-blush-600"
          >
            Set semula carian
          </button>
        </div>
      )}
    </section>
  );
}
