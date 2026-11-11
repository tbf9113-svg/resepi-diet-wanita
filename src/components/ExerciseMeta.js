// Lencana tahap, sasaran dan anggaran kalori untuk senaman
const LEVEL_STYLES = {
  Mudah: "bg-sage-100 text-sage-700",
  Sederhana: "bg-cream-200 text-cocoa-700",
  Sukar: "bg-blush-100 text-blush-700",
};

export default function ExerciseMeta({ level, dose, caloriesPer10Min }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs font-medium">
      <span className={`rounded-full px-3 py-1 ${LEVEL_STYLES[level]}`}>📶 {level}</span>
      {dose && (
        <span className="rounded-full bg-white px-3 py-1 text-cocoa-700 ring-1 ring-cream-200">
          🎯 {dose}
        </span>
      )}
      <span className="rounded-full bg-blush-50 px-3 py-1 text-blush-700">
        🔥 ±{caloriesPer10Min} kcal / 10 min
      </span>
    </div>
  );
}
