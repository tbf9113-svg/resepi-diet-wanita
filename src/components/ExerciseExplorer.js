"use client";

import { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import ExerciseCard from "./ExerciseCard";
import { EXERCISE_CATEGORIES, LEVELS, filterExercises } from "@/lib/exercises";

/**
 * Carian + penapis jenis senaman + penapis tahap.
 */
export default function ExerciseExplorer({ exercises }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [level, setLevel] = useState("Semua Tahap");

  const filtered = useMemo(
    () => filterExercises(exercises, { query, category, level }),
    [exercises, query, category, level]
  );

  const resetFilters = () => {
    setQuery("");
    setCategory("Semua");
    setLevel("Semua Tahap");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Cari senaman atau otot, cth: squat, perut..."
        />
        <CategoryFilter
          categories={EXERCISE_CATEGORIES}
          active={category}
          onSelect={setCategory}
          label="Penapis jenis senaman"
        />
        <CategoryFilter
          categories={LEVELS}
          active={level}
          onSelect={setLevel}
          label="Penapis tahap"
        />
      </div>

      <p className="mb-4 text-sm text-cocoa-500">{filtered.length} senaman ditemui</p>

      {filtered.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-blush-200 bg-blush-50 px-6 py-16 text-center">
          <p className="text-4xl">🧘‍♀️</p>
          <p className="mt-3 font-serif text-lg text-cocoa-900">Tiada senaman ditemui</p>
          <p className="mt-1 text-sm text-cocoa-500">Cuba kata kunci atau penapis lain.</p>
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
