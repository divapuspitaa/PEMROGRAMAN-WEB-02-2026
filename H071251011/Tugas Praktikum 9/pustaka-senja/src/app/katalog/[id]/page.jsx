import Link from "next/link";
import BukuCard from "@/components/BukuCard";
import BukuCover from "@/components/BukuCover";
import RakBuku from "@/components/RakBuku";
import TombolHapus from "@/components/TombolHapus";
import pool from "@/lib/db";

// Id dari URL dianggap valid hanya jika berupa angka (maks. 9 digit agar muat di INTEGER).
function parseId(nilai) {
  return /^\d{1,9}$/.test(String(nilai)) ? Number(nilai) : null;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id: idUrl } = await params;
  const id = parseId(idUrl);
  if (id === null) return { title: "Buku tidak ditemukan" };

  const { rows } = await pool.query("SELECT judul FROM buku WHERE id = $1", [id]);
  return { title: rows[0] ? rows[0].judul : "Buku tidak ditemukan" };
}

export default async function DetailBuku({ params }) {
  const { id: idUrl } = await params;

  // ID dari URL divalidasi dulu; jika tidak valid, query tidak dijalankan.
  const id = parseId(idUrl);
  let buku = null;
  if (id !== null) {
    const { rows } = await pool.query(
      "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku WHERE id = $1",
      [id]
    );
    buku = rows[0] ?? null;
  }

  // Daftar buku untuk latar dekoratif di belakang pop-up
  const { rows: dataBuku } = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku ORDER BY id"
  );

  return (
    <>
      {/* Latar dekoratif: daftar katalog yang diburamkan di belakang pop-up */}
      <div aria-hidden="true" inert className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="font-serif text-4xl font-semibold">Katalog Buku</h2>
        <div className="mt-8 grid gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {dataBuku.map((item) => (
            <BukuCard key={item.id} buku={item} />
          ))}
        </div>
      </div>

      {/* Lapisan pop-up */}
      <div className="fixed inset-0 z-50 overflow-y-auto bg-ink-deep/60 backdrop-blur-sm">
        <div className="relative flex min-h-full items-start justify-center p-4 sm:items-center">
          {/* Klik area gelap = tutup (kembali ke katalog) */}
          <Link
            href="/katalog"
            aria-label="Tutup detail buku"
            tabIndex={-1}
            className="absolute inset-0 cursor-default"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="judul-detail"
            className="relative my-8 w-full max-w-2xl rounded-4xl bg-white p-6 shadow-2xl sm:p-9"
          >
            <Link
              href="/katalog"
              aria-label="Tutup"
              className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-rose-soft text-burgundy transition-colors hover:bg-rose"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </Link>

            {buku ? (
              <>
                <span className="inline-block rounded-full bg-rose-soft px-3 py-1 text-xs font-bold tracking-wide text-burgundy">
                  DETAIL BUKU
                </span>

                <div className="mt-4 grid gap-6 sm:grid-cols-[10rem_1fr]">
                  <RakBuku className="mx-auto w-40 self-start">
                    <BukuCover buku={buku} className="w-28" />
                  </RakBuku>

                  <div>
                    <h1
                      id="judul-detail"
                      className="pr-10 font-serif text-3xl leading-tight font-semibold sm:pr-0"
                    >
                      {buku.judul}
                    </h1>
                    <p className="mt-3 text-lg leading-relaxed text-muted">
                      {buku.sinopsis}
                    </p>
                    <p className="mt-4">
                      <strong className="text-burgundy">Penulis:</strong> {buku.penulis}
                    </p>
                    <p className="mt-1">
                      <strong className="text-burgundy">Tahun terbit:</strong> {buku.tahun}
                    </p>
                  </div>
                </div>

                <div
                  className={`mt-6 rounded-2xl border-2 p-4 ${
                    buku.tersedia
                      ? "border-leaf/30 bg-leaf-soft/60"
                      : "border-burgundy/25 bg-rose-soft/60"
                  }`}
                >
                  <p className="font-semibold text-ink">Info Koleksi:</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    <li className="rounded-lg bg-white px-3 py-1 text-sm font-semibold">
                      {buku.kategori}
                    </li>
                    <li className="rounded-lg bg-white px-3 py-1 text-sm font-semibold">
                      {buku.tahun}
                    </li>
                    <li
                      className={`rounded-lg bg-white px-3 py-1 text-sm font-bold ${
                        buku.tersedia ? "text-leaf" : "text-burgundy"
                      }`}
                    >
                      {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <h1
                  id="judul-detail"
                  className="pr-12 font-serif text-3xl font-semibold"
                >
                  Buku tidak ditemukan
                </h1>
                <p className="mt-3 text-lg text-muted">
                  Tidak ada buku dengan kode &quot;{idUrl}&quot; di koleksi kami.
                  Coba pilih buku dari katalog.
                </p>
              </>
            )}

            {buku && (
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link
                  href={`/katalog/${buku.id}/edit`}
                  className="rounded-full border-2 border-burgundy px-6 py-3 text-center font-bold text-burgundy transition-colors hover:bg-rose-soft"
                >
                  Edit
                </Link>
                <TombolHapus
                  id={buku.id}
                  judul={buku.judul}
                  kembali
                  className="w-full rounded-full border-2 border-burgundy/40 px-6 py-3 font-bold text-burgundy transition-colors hover:bg-rose-soft"
                />
              </div>
            )}

            <Link
              href="/katalog"
              className="mt-3 block rounded-full bg-burgundy px-6 py-3.5 text-center font-bold text-paper shadow-lg shadow-burgundy/25 transition-colors hover:bg-burgundy-deep"
            >
              Kembali ke Katalog
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}