"use client";

import { useState } from "react";

const pilihanKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

const formAwal = { nama: "", judul: "", kategori: "", alasan: "" };

const gayaInput =
  "mt-1 w-full rounded-lg border border-tan bg-white px-3 py-2.5 text-ink placeholder:text-slate focus:border-burgundy";

export default function Usulan() {
  const [form, setForm] = useState(formAwal);
  const [peringatan, setPeringatan] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function ubahIsian(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setPeringatan("");
  }

  function kirimUsulan(e) {
    e.preventDefault();
    setKonfirmasi("");

    const bersih = {
      nama: form.nama.trim(),
      judul: form.judul.trim(),
      kategori: form.kategori.trim(),
      alasan: form.alasan.trim(),
    };

    if (!bersih.nama || !bersih.judul || !bersih.kategori || !bersih.alasan) {
      setPeringatan("Semua kolom wajib diisi sebelum usulan dikirim.");
      return;
    }

    setDaftarUsulan([{ id: Date.now(), ...bersih }, ...daftarUsulan]);
    setKonfirmasi(`Terima kasih, ${bersih.nama}. Usulan "${bersih.judul}" berhasil dikirim.`);
    setPeringatan("");
    setForm(formAwal);
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-serif text-4xl font-semibold">Usulan Buku</h1>
      <p className="mt-2 max-w-xl text-muted">
        Ada judul yang belum ada di rak kami? Tulis usulanmu, dan kami
        pertimbangkan untuk koleksi berikutnya.
      </p>

      <form
        onSubmit={kirimUsulan}
        noValidate
        className="mt-8 space-y-5 rounded-xl border border-tan bg-white/60 p-5 sm:p-7"
      >
        <div>
          <label htmlFor="nama" className="font-semibold">Nama pengusul</label>
          <input
            id="nama"
            name="nama"
            type="text"
            value={form.nama}
            onChange={ubahIsian}
            placeholder="Contoh: Nabila"
            className={gayaInput}
          />
        </div>

        <div>
          <label htmlFor="judul" className="font-semibold">Judul buku yang diusulkan</label>
          <input
            id="judul"
            name="judul"
            type="text"
            value={form.judul}
            onChange={ubahIsian}
            placeholder="Contoh: Sapiens"
            className={gayaInput}
          />
        </div>

        <div>
          <label htmlFor="kategori" className="font-semibold">Kategori</label>
          <select
            id="kategori"
            name="kategori"
            value={form.kategori}
            onChange={ubahIsian}
            className={gayaInput}
          >
            <option value="">Pilih kategori</option>
            {pilihanKategori.map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="alasan" className="font-semibold">Alasan usulan</label>
          <textarea
            id="alasan"
            name="alasan"
            rows={4}
            value={form.alasan}
            onChange={ubahIsian}
            placeholder="Ceritakan kenapa buku ini layak ada di Pustaka Senja"
            className={gayaInput}
          />
        </div>

        {peringatan && (
          <p role="alert" className="rounded-lg bg-rose-soft px-4 py-3 font-medium text-burgundy-deep">
            {peringatan}
          </p>
        )}

        <button
          type="submit"
          className="rounded-lg bg-burgundy px-6 py-3 font-semibold text-paper transition-colors hover:bg-burgundy-deep"
        >
          Kirim Usulan
        </button>
      </form>

      {konfirmasi && (
        <p role="status" className="mt-6 rounded-lg bg-leaf-soft px-4 py-3 font-medium text-leaf">
          {konfirmasi}
        </p>
      )}

      <section className="mt-10" aria-labelledby="judul-daftar">
        <h2 id="judul-daftar" className="font-serif text-2xl font-semibold">
          Usulan sesi ini
        </h2>

        {daftarUsulan.length === 0 ? (
          <p className="mt-2 text-muted">
            Belum ada usulan. Usulan yang kamu kirim akan muncul di sini.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {daftarUsulan.map((usulan) => (
              <li key={usulan.id} className="rounded-xl border border-tan bg-white/60 p-4">
                <p className="font-serif text-lg font-semibold">{usulan.judul}</p>
                <p className="text-sm text-muted">
                  Diusulkan oleh {usulan.nama}, kategori {usulan.kategori}
                </p>
                <p className="mt-2 leading-relaxed">{usulan.alasan}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
