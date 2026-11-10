"use client";

import { useActionState } from "react";
import Link from "next/link";

const KATEGORI_BUKU = ["Teknologi", "Fiksi", "Pengembangan Diri"];

const gayaInput =
  "mt-1 w-full rounded-lg border border-tan bg-white px-3 py-2.5 text-ink placeholder:text-slate focus:border-burgundy";

function PesanGalat({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1 text-sm font-medium text-burgundy">
      {children}
    </p>
  );
}

// Form bersama untuk Create dan Update.
// `action` adalah Server Action (tambahBuku / ubahBuku) yang dikirim dari Server Component.
export default function BukuForm({ action, nilaiAwal, idBuku, labelKirim, hrefBatal, tanpaKartu = false }) {
  const [state, formAction, pending] = useActionState(action, {
    nilai: nilaiAwal,
    galat: {},
    n: 0,
  });
  const { nilai, galat } = state;

  return (
    // key berubah setiap submit agar isian terisi ulang dari state (form React direset otomatis)
    <form
      key={state.n}
      action={formAction}
      noValidate
      className={`space-y-5 ${tanpaKartu ? "" : "rounded-xl border border-tan bg-white/60 p-5 sm:p-7"}`}
    >
      {idBuku !== undefined && <input type="hidden" name="id" value={idBuku} />}

      {galat.umum && (
        <p role="alert" className="rounded-lg bg-rose-soft px-4 py-3 font-medium text-burgundy-deep">
          {galat.umum}
        </p>
      )}

      <div>
        <label htmlFor="judul" className="font-semibold">Judul buku</label>
        <input
          id="judul"
          name="judul"
          type="text"
          defaultValue={nilai.judul}
          placeholder="Contoh: Sapiens"
          aria-invalid={galat.judul ? "true" : undefined}
          aria-describedby={galat.judul ? "galat-judul" : undefined}
          className={gayaInput}
        />
        <PesanGalat id="galat-judul">{galat.judul}</PesanGalat>
      </div>

      <div>
        <label htmlFor="penulis" className="font-semibold">Penulis</label>
        <input
          id="penulis"
          name="penulis"
          type="text"
          defaultValue={nilai.penulis}
          placeholder="Contoh: Yuval Noah Harari"
          aria-invalid={galat.penulis ? "true" : undefined}
          aria-describedby={galat.penulis ? "galat-penulis" : undefined}
          className={gayaInput}
        />
        <PesanGalat id="galat-penulis">{galat.penulis}</PesanGalat>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="kategori" className="font-semibold">Kategori</label>
          <select
            id="kategori"
            name="kategori"
            defaultValue={nilai.kategori}
            aria-invalid={galat.kategori ? "true" : undefined}
            aria-describedby={galat.kategori ? "galat-kategori" : undefined}
            className={gayaInput}
          >
            <option value="">Pilih kategori</option>
            {KATEGORI_BUKU.map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
          <PesanGalat id="galat-kategori">{galat.kategori}</PesanGalat>
        </div>

        <div>
          <label htmlFor="tahun" className="font-semibold">Tahun terbit</label>
          <input
            id="tahun"
            name="tahun"
            type="text"
            inputMode="numeric"
            maxLength={4}
            defaultValue={nilai.tahun}
            placeholder="Contoh: 2018"
            aria-invalid={galat.tahun ? "true" : undefined}
            aria-describedby={galat.tahun ? "galat-tahun" : undefined}
            className={gayaInput}
          />
          <PesanGalat id="galat-tahun">{galat.tahun}</PesanGalat>
        </div>
      </div>

      <div>
        <label htmlFor="tersedia" className="font-semibold">Status ketersediaan</label>
        <select
          id="tersedia"
          name="tersedia"
          defaultValue={nilai.tersedia}
          aria-invalid={galat.tersedia ? "true" : undefined}
          aria-describedby={galat.tersedia ? "galat-tersedia" : undefined}
          className={gayaInput}
        >
          <option value="true">Tersedia</option>
          <option value="false">Sedang Dipinjam</option>
        </select>
        <PesanGalat id="galat-tersedia">{galat.tersedia}</PesanGalat>
      </div>

      <div>
        <label htmlFor="sinopsis" className="font-semibold">Sinopsis</label>
        <textarea
          id="sinopsis"
          name="sinopsis"
          rows={5}
          defaultValue={nilai.sinopsis}
          placeholder="Ringkasan singkat isi buku"
          aria-invalid={galat.sinopsis ? "true" : undefined}
          aria-describedby={galat.sinopsis ? "galat-sinopsis" : undefined}
          className={gayaInput}
        />
        <PesanGalat id="galat-sinopsis">{galat.sinopsis}</PesanGalat>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-burgundy px-6 py-3 font-semibold text-paper transition-colors hover:bg-burgundy-deep disabled:opacity-60"
        >
          {pending ? "Menyimpan..." : labelKirim}
        </button>
        <Link href={hrefBatal} className="px-4 py-3 font-semibold text-burgundy hover:underline">
          Batal
        </Link>
      </div>
    </form>
  );
}
