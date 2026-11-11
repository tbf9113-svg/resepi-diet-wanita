// Fungsi pembantu untuk data senaman tempatan (sama seperti lib/recipes.js)
import exercises from "@/data/exercises.json";

export const EXERCISE_CATEGORIES = [
  "Semua",
  "Kardio",
  "HIIT",
  "Kaki & Punggung",
  "Lengan & Bahagian Atas",
  "Perut & Teras",
  "Yoga & Regangan",
];

export const LEVELS = ["Semua Tahap", "Mudah", "Sederhana", "Sukar"];

export function getAllExercises() {
  return exercises;
}

export function getExerciseById(id) {
  return exercises.find((exercise) => exercise.id === id);
}

/**
 * Tapis senaman mengikut carian (nama atau otot), kategori dan tahap.
 */
export function filterExercises(list, { query = "", category = "Semua", level = "Semua Tahap" }) {
  const keyword = query.trim().toLowerCase();

  return list.filter((exercise) => {
    const haystack = [exercise.name, ...exercise.muscles].join(" ").toLowerCase();
    const matchesQuery = keyword === "" || haystack.includes(keyword);
    const matchesCategory = category === "Semua" || exercise.category === category;
    const matchesLevel = level === "Semua Tahap" || exercise.level === level;
    return matchesQuery && matchesCategory && matchesLevel;
  });
}
