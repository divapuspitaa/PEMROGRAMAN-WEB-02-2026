import Link from "next/link";
import BukuCard from "@/components/BukuCard";
import BukuForm from "@/components/BukuForm";
import pool from "@/lib/db";
import { tambahBuku } from "./action";

const FILTER_KATEGORI = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export const dynamic = "force-dynamic";

export const metadata = { title: "Katalog Buku" };

export default async function Katalog({ searchParams }) {
  // Filter kategori dibaca dari URL (?kategori=Fiksi), jadi halaman tetap Server Component.
  const { kategori, tambah } = await searchParams;
  const kategoriAktif = FILTER_KATEGORI.includes(kategori) ? kategori : "Semua";

  // Form tambah buku tampil sebagai pop-up saat URL memuat ?tambah=1
  const formTerbuka = tambah === "1";
  const hrefKatalog =
    kategoriAktif === "Semua" ? "/katalog" : `/katalog?kategori=${encodeURIComponent(kategoriAktif)}`;
  const hrefTambah = `${hrefKatalog}${hrefKatalog.includes("?") ? "&" : "?"}tambah=1`;

  const { rows: bukuTampil } =
    kategoriAktif === "Semua"
      ? await pool.query(
          "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku ORDER BY id DESC"
        )
      : await pool.query(
          "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku WHERE kategori = $1 ORDER BY id",
          [kategoriAktif]
        );

  const { rows } = await pool.query("SELECT COUNT(*)::int AS total FROM buku");
  const totalBuku = rows[0].total;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl font-semibold">Katalog Buku</h1>
          <p className="mt-2 max-w-xl text-muted">
            Pilih kategori untuk mempersempit rak, lalu buka detail buku untuk
            membaca sinopsisnya.
          </p>
        </div>
        <Link
          href={hrefTambah}
          className="rounded-lg bg-burgundy px-5 py-3 font-semibold text-paper transition-colors hover:bg-burgundy-deep"
        >
          + Tambah Buku
        </Link>
      </div>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Filter kategori">
        {FILTER_KATEGORI.map((item) => {
          const aktif = kategoriAktif === item;
          return (
            <Link
              key={item}
              href={item === "Semua" ? "/katalog" : `/katalog?kategori=${encodeURIComponent(item)}`}
              aria-current={aktif ? "true" : undefined}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                aktif
                  ? "border-burgundy bg-burgundy text-paper"
                  : "border-tan bg-white/60 text-ink hover:bg-sand"
              }`}
            >
              {item}
            </Link>
          );
        })}
      </nav>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Menampilkan {bukuTampil.length} dari {totalBuku} buku
      </p>

      {bukuTampil.length === 0 ? (
        <p className="mt-4 rounded-xl border border-tan bg-white/60 p-6 text-muted">
          Belum ada buku pada kategori ini.
        </p>
      ) : (
        <div className="mt-4 grid gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {bukuTampil.map((buku) => (
            <BukuCard key={buku.id} buku={buku} aksi />
          ))}
        </div>
      )}

      {formTerbuka && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-ink-deep/60 backdrop-blur-sm">
          <div className="relative flex min-h-full items-start justify-center p-4 sm:items-center">
            {/* Klik area gelap = tutup pop-up */}
            <Link
              href={hrefKatalog}
              aria-label="Tutup form tambah buku"
              tabIndex={-1}
              className="absolute inset-0 cursor-default"
            />

            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="judul-tambah"
              className="relative my-8 w-full max-w-2xl rounded-4xl bg-white p-6 shadow-2xl sm:p-9"
            >
              <Link
                href={hrefKatalog}
                aria-label="Tutup"
                className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-rose-soft text-burgundy transition-colors hover:bg-rose"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </Link>

              <span className="inline-block rounded-full bg-rose-soft px-3 py-1 text-xs font-bold tracking-wide text-burgundy">
                BUKU BARU
              </span>
              <h2 id="judul-tambah" className="mt-3 pr-12 font-serif text-3xl font-semibold">
                Tambah Buku
              </h2>
              <p className="mt-1 mb-6 text-muted">
                Isi data buku baru. Setelah disimpan, buku langsung tampil di katalog.
              </p>

              <BukuForm
                action={tambahBuku}
                nilaiAwal={{ judul: "", penulis: "", kategori: "", tahun: "", tersedia: "true", sinopsis: "" }}
                labelKirim="Simpan Buku"
                hrefBatal={hrefKatalog}
                tanpaKartu
              />
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
