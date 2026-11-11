// Fungsi pembantu untuk mengakses data resepi tempatan.
// Semua komponen membaca data melalui fail ini, jadi jika anda
// bertukar kepada API/pangkalan data kelak, hanya fail ini perlu diubah.
import recipes from "@/data/recipes.json";

// Senarai kategori untuk butang penapis ("Semua" sentiasa pertama)
export const CATEGORIES = [
  "Semua",
  "Rendah Karbo",
  "Tinggi Protein",
  "Sarapan",
  "Makan Tengah Hari",
  "Makan Malam",
  "Snek",
  "Pencuci Mulut",
];

export function getAllRecipes() {
  return recipes;
}

export function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

/**
 * Tapis resepi mengikut teks carian dan kategori.
 * Carian tidak sensitif huruf besar/kecil dan memadankan tajuk.
 */
export function filterRecipes(list, { query = "", category = "Semua" }) {
  const keyword = query.trim().toLowerCase();

  return list.filter((recipe) => {
    const matchesQuery =
      keyword === "" || recipe.title.toLowerCase().includes(keyword);
    const matchesCategory =
      category === "Semua" || recipe.categories.includes(category);
    return matchesQuery && matchesCategory;
  });
}
