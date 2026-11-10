"use client";

import { useState } from "react";
import Link from "next/link";
import BukuCover from "@/components/BukuCover";
import RakBuku from "@/components/RakBuku";
import TombolHapus from "@/components/TombolHapus";

// aksi = true menampilkan tombol Edit dan Hapus (dipakai di halaman Katalog).
export default function BukuCard({ buku, aksi = false }) {
  const [disimpan, setDisimpan] = useState(false);

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-tan/70 bg-white/60">
      <RakBuku>
        <BukuCover buku={buku} className="w-32 sm:w-36" />
      </RakBuku>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-sm text-muted">
          {buku.kategori}, {buku.tahun}
        </p>
        <h3 className="font-serif text-lg leading-snug font-semibold text-ink">
          {buku.judul}
        </h3>
        <p className="text-sm text-muted">{buku.penulis}</p>

        <p className="mt-2">
          {buku.tersedia ? (
            <span className="inline-block rounded-full bg-leaf-soft px-2.5 py-0.5 text-sm font-medium text-leaf">
              Tersedia
            </span>
          ) : (
            <span className="inline-block rounded-full bg-rose-soft px-2.5 py-0.5 text-sm font-medium text-burgundy">
              Sedang Dipinjam
            </span>
          )}
        </p>

        <div className="mt-auto flex gap-2 pt-4">
          <Link
            href={`/katalog/${buku.id}`}
            className="flex-1 rounded-lg bg-burgundy px-3 py-2 text-center text-sm font-semibold text-paper transition-colors hover:bg-burgundy-deep"
          >
            Lihat Detail
          </Link>
          <button
            type="button"
            onClick={() => setDisimpan(!disimpan)}
            aria-pressed={disimpan}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
              disimpan
                ? "border-burgundy bg-rose-soft text-burgundy"
                : "border-tan text-ink hover:bg-sand"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill={disimpan ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
            </svg>
            {disimpan ? "Tersimpan" : "Simpan"}
          </button>
        </div>

        {aksi && (
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/katalog/${buku.id}/edit`}
              className="rounded-lg border border-tan px-3 py-2 text-center text-sm font-semibold text-ink transition-colors hover:bg-sand"
            >
              Edit
            </Link>
            <TombolHapus id={buku.id} judul={buku.judul} />
          </div>
        )}
      </div>
    </article>
  );
}
