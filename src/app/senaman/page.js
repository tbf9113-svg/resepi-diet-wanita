import ExerciseExplorer from "@/components/ExerciseExplorer";
import SafetyNote from "@/components/SafetyNote";
import { getAllExercises } from "@/lib/exercises";

export const metadata = {
  title: "Senaman Diet | Resepi Diet Wanita",
  description: "Koleksi senaman untuk wanita — kardio, HIIT, kekuatan, perut dan yoga, dengan panduan langkah demi langkah.",
};

// Halaman senarai senaman
export default function SenamanPage() {
  const exercises = getAllExercises();

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-12 text-center sm:px-6 sm:pt-16">
        <span className="inline-block rounded-full bg-blush-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blush-700">
          Aktif · Kuat · Yakin
        </span>
        <h1 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-cocoa-900 sm:text-5xl">
          Senaman untuk <span className="text-blush-600">menyokong</span> diet anda
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-cocoa-500">
          {exercises.length} senaman dengan panduan langkah demi langkah — kebanyakannya boleh
          dilakukan di rumah tanpa alat.
        </p>
      </section>

      <ExerciseExplorer exercises={exercises} />
      <SafetyNote />
    </>
  );
}
