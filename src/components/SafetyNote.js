// Peringatan keselamatan senaman
const NOTES = [
  "Panaskan badan 5 minit sebelum bersenam dan buat regangan selepasnya.",
  "Mulakan dengan tahap Mudah dan tingkatkan secara beransur-ansur.",
  "Hentikan senaman jika terasa sakit dada, pening atau sesak nafas yang luar biasa.",
  "Dapatkan nasihat doktor jika anda hamil, baru bersalin, atau mempunyai masalah kesihatan.",
];

export default function SafetyNote() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="rounded-3xl bg-sage-50 p-6 sm:p-8">
        <h2 className="font-serif text-2xl font-semibold text-cocoa-900">Bersenam dengan Selamat</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {NOTES.map((note) => (
            <li key={note} className="flex gap-3 rounded-2xl bg-white p-4 text-sm text-cocoa-700">
              <span className="text-sage-500">✔</span>
              {note}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-cocoa-500">
          * Anggaran kalori dikira untuk wanita seberat 60 kg berdasarkan nilai MET dan boleh berbeza
          mengikut berat badan serta intensiti.
        </p>
      </div>
    </section>
  );
}
