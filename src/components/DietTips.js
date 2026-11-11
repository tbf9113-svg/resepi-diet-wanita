// Tip diet sihat (daripada dokumen "30 Resepi Makanan Sihat untuk Diet")
const TIPS = [
  { icon: "🍽", text: "Amalkan konsep Suku-Suku Separuh: ¼ karbohidrat, ¼ protein, ½ sayur & buah." },
  { icon: "💧", text: "Minum sekurang-kurangnya 8 gelas air sehari." },
  { icon: "🧂", text: "Kurangkan gula, garam dan minyak; pilih kaedah kukus, rebus, bakar atau air fryer." },
  { icon: "🌾", text: "Pilih karbohidrat kompleks seperti nasi perang, oat dan roti gandum penuh." },
];

export default function DietTips() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="rounded-3xl bg-sage-50 p-6 sm:p-8">
        <h2 className="font-serif text-2xl font-semibold text-cocoa-900">
          Tip Diet Sihat
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {TIPS.map((tip) => (
            <li key={tip.text} className="flex gap-3 rounded-2xl bg-white p-4 text-sm text-cocoa-700">
              <span className="text-xl">{tip.icon}</span>
              {tip.text}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-cocoa-500">
          * Kalori dinyatakan adalah anggaran bagi satu hidangan dan boleh berbeza mengikut bahan.
        </p>
      </div>
    </section>
  );
}
