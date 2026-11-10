"use client";

// Tampil jika terjadi galat di server, misalnya database belum menyala atau
// DATABASE_URL salah. Detail galat tidak ditampilkan agar kredensial tidak bocor.
export default function Error({ reset }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 text-center">
      <h1 className="font-serif text-3xl font-semibold">Terjadi kendala</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Data buku belum bisa dimuat. Pastikan PostgreSQL berjalan, lalu coba lagi.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-burgundy px-6 py-3 font-bold text-paper transition-colors hover:bg-burgundy-deep"
      >
        Coba Lagi
      </button>
    </div>
  );
}
