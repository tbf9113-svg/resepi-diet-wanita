// prepTime ialah teks, cth: "10 minit" atau "10 minit + 2 jam"
// Lencana kecil untuk masa penyediaan dan kalori (diguna semula di kad & halaman butiran)
export default function RecipeMeta({ prepTime, calories, servings }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs font-medium">
      <span className="rounded-full bg-sage-100 px-3 py-1 text-sage-700">
        ⏱ {prepTime}
      </span>
      <span className="rounded-full bg-blush-100 px-3 py-1 text-blush-700">
        🔥 ±{calories} kcal
      </span>
      {servings && (
        <span className="rounded-full bg-cream-200 px-3 py-1 text-cocoa-700">
          🍽 {servings} hidangan
        </span>
      )}
    </div>
  );
}
