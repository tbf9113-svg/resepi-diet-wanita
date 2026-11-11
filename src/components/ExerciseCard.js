import Link from "next/link";
import ExerciseMeta from "./ExerciseMeta";

// Kad senaman — klik untuk ke /senaman/[id]
export default function ExerciseCard({ exercise }) {
  return (
    <Link
      href={`/senaman/${exercise.id}`}
      className="group flex gap-4 rounded-3xl border border-cream-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blush-100"
    >
      <span className="grid h-16 w-16 flex-none place-items-center rounded-2xl bg-gradient-to-br from-blush-100 to-sage-100 text-3xl">
        {exercise.emoji}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-sage-700">
          {exercise.category}
        </p>
        <h3 className="font-serif text-lg font-semibold leading-snug text-cocoa-900 group-hover:text-blush-600">
          {exercise.name}
        </h3>
        <p className="line-clamp-2 text-sm text-cocoa-500">{exercise.description}</p>
        <ExerciseMeta level={exercise.level} caloriesPer10Min={exercise.caloriesPer10Min} />
      </div>
    </Link>
  );
}
