import Link from "next/link";
import { notFound } from "next/navigation";
import ExerciseMeta from "@/components/ExerciseMeta";
import { getAllExercises, getExerciseById } from "@/lib/exercises";

// Jana semua halaman senaman semasa build
export function generateStaticParams() {
  return getAllExercises().map((exercise) => ({ id: exercise.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const exercise = getExerciseById(id);
  if (!exercise) return { title: "Senaman tidak ditemui" };
  return { title: `${exercise.name} | Senaman Diet`, description: exercise.description };
}

export default async function ExerciseDetailPage({ params }) {
  const { id } = await params;
  const exercise = getExerciseById(id);
  if (!exercise) notFound();

  // Cadangan senaman lain dalam kategori yang sama
  const related = getAllExercises()
    .filter((e) => e.category === exercise.category && e.id !== exercise.id)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/senaman"
        className="inline-flex items-center gap-1 text-sm font-medium text-cocoa-500 hover:text-blush-600"
      >
        ← Kembali ke semua senaman
      </Link>

      {/* Kepala halaman */}
      <header className="mt-6 flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-blush-100 via-cream-100 to-sage-100 p-6 sm:flex-row sm:items-center sm:p-10">
        <span className="grid h-24 w-24 flex-none place-items-center rounded-3xl bg-white/70 text-6xl shadow-sm">
          {exercise.emoji}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-sage-700">
            {exercise.category}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-cocoa-900 sm:text-4xl">
            {exercise.name}
          </h1>
          <p className="mt-2 text-cocoa-700">{exercise.description}</p>
          <div className="mt-4">
            <ExerciseMeta
              level={exercise.level}
              dose={exercise.dose}
              caloriesPer10Min={exercise.caloriesPer10Min}
            />
          </div>
        </div>
      </header>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.4fr]">
        {/* Maklumat ringkas */}
        <aside className="flex h-fit flex-col gap-5 rounded-3xl bg-sage-50 p-6">
          <div>
            <h2 className="font-serif text-lg font-semibold text-cocoa-900">Otot Disasarkan</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {exercise.muscles.map((m) => (
                <span key={m} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-sage-700">
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-cocoa-900">Peralatan</h2>
            <p className="mt-2 text-sm text-cocoa-700">{exercise.equipment}</p>
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-cocoa-900">Sasaran</h2>
            <p className="mt-2 text-sm text-cocoa-700">{exercise.dose}</p>
          </div>
        </aside>

        <div className="flex flex-col gap-8">
          {/* Langkah demi langkah */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-cocoa-900">Cara Melakukan</h2>
            <ol className="mt-4 space-y-4">
              {exercise.steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-blush-100 text-sm font-semibold text-blush-700">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-cocoa-700">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Tip */}
          <section className="rounded-3xl border border-blush-200 bg-blush-50 p-5">
            <h2 className="font-serif text-lg font-semibold text-cocoa-900">💡 Tip</h2>
            <ul className="mt-3 space-y-2">
              {exercise.tips.map((tip) => (
                <li key={tip} className="text-sm text-cocoa-700">• {tip}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Senaman berkaitan */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-xl font-semibold text-cocoa-900">
            Senaman {exercise.category} Lain
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((e) => (
              <Link
                key={e.id}
                href={`/senaman/${e.id}`}
                className="flex items-center gap-3 rounded-2xl border border-cream-200 bg-white p-4 text-sm font-medium text-cocoa-900 hover:border-blush-200 hover:text-blush-600"
              >
                <span className="text-2xl">{e.emoji}</span>
                {e.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
