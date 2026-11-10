import Link from "next/link";
import Hero from "@/components/Hero";
import BukuCard from "@/components/BukuCard";
import pool from "@/lib/db";

// Statistik harus selalu diambil ulang dari database, bukan di-cache.
export const dynamic = "force-dynamic";

export default async function Beranda() {
  // Statistik dihitung oleh PostgreSQL dari data yang benar-benar tersimpan
  const { rows: ringkasan } = await pool.query(
    `SELECT COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE tersedia)::int AS tersedia,
            COUNT(*) FILTER (WHERE NOT tersedia)::int AS dipinjam
     FROM buku`
  );
  const { total: totalBuku, tersedia: bukuTersedia, dipinjam: bukuDipinjam } = ringkasan[0];

  const statistik = [
    { label: "Total koleksi buku", nilai: totalBuku },
    { label: "Buku tersedia", nilai: bukuTersedia },
    { label: "Buku dipinjam", nilai: bukuDipinjam },
  ];

  // Empat buku terbaru yang bisa langsung dipinjam
  const { rows: pilihan } = await pool.query(
    `SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis
     FROM buku
     WHERE tersedia = TRUE
     ORDER BY tahun DESC, id ASC
     LIMIT 4`
  );

  return (
    <>
        <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca komunitas di dekat kampus. Datang sore hari, pulang membawa satu cerita baru."
        lokasi="Jl. Pelajar No. 12, dekat kampus"
        jamBuka="Senin sampai Sabtu, 09.00 sampai 20.00"
        gambar="/home2.jpg"
        altGambar="Suasana ruang baca pustaka senja">
        <Link
          href="/katalog"
          className="rounded-lg bg-emas px-6 py-3 font-semibold text-ink-deep shadow-lg shadow-black/30 transition-colors hover:bg-emas-terang">
          Lihat Katalog Buku
        </Link>
        <Link
          href="/usulan"
          className="rounded-lg border border-emas px-6 py-3 font-semibold text-emas-terang transition-colors hover:bg-ink-deep">
          Usulkan Buku
        </Link>
      </Hero>

      <section
        aria-label="Ringkasan koleksi"
        className="relative z-10 mx-auto -mt-10 max-w-6xl px-5"
      >
        <dl className="grid grid-cols-3 divide-x divide-burgundy-deep/20 overflow-hidden rounded-xl border border-emas bg-[linear-gradient(135deg,#F4C7B2_0%,#F0A18C_55%,#EA7C63_100%)] ring-1 ring-emas/60 ring-offset-4 ring-offset-paper">
          {statistik.map((item) => (
            <div key={item.label} className="px-3 py-6 text-center sm:px-6">
              <dd className="font-serif text-5xl font-semibold text-burgundy-deep lining-nums">
                {item.nilai}
              </dd>
              <span
                aria-hidden="true"
                className="mx-auto my-2 flex items-center justify-center gap-2"
              >
                <span className="h-px w-8 bg-burgundy-deep/40" />
                <span className="h-1.5 w-1.5 rotate-45 bg-burgundy-deep" />
                <span className="h-px w-8 bg-burgundy-deep/40" />
              </span>
              <dt className="text-sm font-medium tracking-wide text-ink">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-3xl font-semibold">Baru di rak</h2>
              <span className="mt-2 block h-0.5 w-14 bg-emas"></span>
            <p className="mt-1 text-muted">
              Terbitan terbaru yang bisa dipinjam hari ini.
            </p>
          </div>
          <Link
            href="/katalog"
            className="font-semibold text-burgundy underline-offset-4 hover:underline"
          >
            Lihat semua buku
          </Link>
        </div>

        <div className="mt-6 grid gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {pilihan.map((buku) => (
            <BukuCard key={buku.id} buku={buku} />
          ))}
        </div>
      </section>
    </>
  );
}
