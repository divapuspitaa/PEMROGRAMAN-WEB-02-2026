"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

const KATEGORI_BUKU = ["Teknologi", "Fiksi", "Pengembangan Diri"];
const PESAN_DUPLIKAT = "Buku ini sudah ada di katalog (judul dan penulis yang sama)."; 

// Mengubah id dari form menjadi angka. Mengembalikan null jika tidak valid
// (maksimal 9 digit agar tidak melebihi batas INTEGER di PostgreSQL).
function parseId(nilai) {
  const teks = String(nilai ?? "").trim();
  return /^\d{1,9}$/.test(teks) ? Number(teks) : null;
}

// Memvalidasi isian form buku (dipakai oleh Create dan Update).
// Mengembalikan { nilai, galat, data }:
//  - nilai : isian apa adanya (untuk mengisi ulang form jika ada galat)
//  - galat : pesan galat per kolom
//  - data  : data bersih bertipe benar, atau null jika ada galat
function validasiBuku(formData) {
  const nilai = {
    judul: String(formData.get("judul") ?? "").trim(),
    penulis: String(formData.get("penulis") ?? "").trim(),
    kategori: String(formData.get("kategori") ?? "").trim(),
    tahun: String(formData.get("tahun") ?? "").trim(),
    tersedia: String(formData.get("tersedia") ?? "").trim(),
    sinopsis: String(formData.get("sinopsis") ?? "").trim(),
  };

  const galat = {};
  const tahunIni = new Date().getFullYear();

  if (!nilai.judul) galat.judul = "Judul wajib diisi.";
  else if (nilai.judul.length > 200) galat.judul = "Judul maksimal 200 karakter.";

  if (!nilai.penulis) galat.penulis = "Penulis wajib diisi.";
  else if (nilai.penulis.length > 150) galat.penulis = "Penulis maksimal 150 karakter.";

  if (!KATEGORI_BUKU.includes(nilai.kategori)) {
    galat.kategori = "Pilih salah satu kategori yang tersedia.";
  }

  if (!/^\d{4}$/.test(nilai.tahun)) {
    galat.tahun = "Tahun terbit harus berupa angka 4 digit, misalnya 2018.";
  } else if (Number(nilai.tahun) < 1000 || Number(nilai.tahun) > tahunIni) {
    galat.tahun = `Tahun terbit harus antara 1000 dan ${tahunIni}.`;
  }

  if (nilai.tersedia !== "true" && nilai.tersedia !== "false") {
    galat.tersedia = "Pilih status ketersediaan.";
  }

  if (!nilai.sinopsis) galat.sinopsis = "Sinopsis wajib diisi.";
  else if (nilai.sinopsis.length > 2000) galat.sinopsis = "Sinopsis maksimal 2000 karakter.";

  if (Object.keys(galat).length > 0) return { nilai, galat, data: null };

  return {
    nilai,
    galat,
    data: {
      judul: nilai.judul,
      penulis: nilai.penulis,
      kategori: nilai.kategori,
      tahun: Number(nilai.tahun),
      tersedia: nilai.tersedia === "true",
      sinopsis: nilai.sinopsis,
    },
  };
}

// Memberi tahu Next.js bahwa halaman yang memakai data buku harus diambil ulang.
function segarkanHalaman(id) {
  revalidatePath("/"); // statistik + "Baru di rak"
  revalidatePath("/katalog");
  if (id) revalidatePath(`/katalog/${id}`);
}

// CREATE ---------------------------------------------------------------
// Dipakai lewat useActionState, sehingga menerima (stateSebelumnya, formData).
export async function tambahBuku(stateSebelumnya, formData) {
  const { nilai, galat, data } = validasiBuku(formData);
  const n = (stateSebelumnya?.n ?? 0) + 1;

  if (!data) return { nilai, galat, n };

  try {
    const { rows: duplikat } = await pool.query(
      "SELECT id FROM buku WHERE LOWER(judul) = LOWER($1) AND LOWER(penulis) = LOWER($2) LIMIT 1",
      [data.judul, data.penulis]
    );

    if(duplikat.length > 0) {
      return {nilai, galat: { judul : PESAN_DUPLIKAT }, n};
    }

    await pool.query(
      `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis]
    );
  } catch (error) {
    if (error.code === "23505") return {nilai, galat: { judul: PESAN_DUPLIKAT}, n };
    console.error("Gagal menambah buku:", error);
    return { nilai, galat: { umum: "Buku gagal disimpan. Coba lagi sebentar lagi." }, n };
  }

  segarkanHalaman();
  redirect("/katalog");
}

// UPDATE ---------------------------------------------------------------
export async function ubahBuku(stateSebelumnya, formData) {
  const id = parseId(formData.get("id"));
  const { nilai, galat, data } = validasiBuku(formData);
  const n = (stateSebelumnya?.n ?? 0) + 1;

  if (id === null) {
    return { nilai, galat: { umum: "ID buku tidak valid." }, n };
  }
  if (!data) return { nilai, galat, n };

  let hasil;
  try {
    // WHERE id = $7 memastikan hanya satu buku yang berubah.
    const { rows: duplikat } = await pool.query(
      "SELECT id FROM buku WHERE LOWER(judul) = LOWER($1) AND LOWER(penulis) = LOWER($2) AND id <> $3 LIMIT 1",
      [data.judul, data.penulis, id]
    );

    if (duplikat.length > 0) {
      return {nilai, galat: { judul : PESAN_DUPLIKAT}, n};
    }

    hasil = await pool.query(
      `UPDATE buku
       SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6
       WHERE id = $7`,
      [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis, id]
    );
  } catch (error) {
    if (error.code === "23505") return {nilai, galat: {judul : PESAN_DUPLIKAT}, n };
    console.error("Gagal mengubah buku:", error);
    return { nilai, galat: { umum: "Perubahan gagal disimpan. Coba lagi sebentar lagi." }, n };
  }

  if (hasil.rowCount === 0) {
    return { nilai, galat: { umum: "Buku tidak ditemukan. Mungkin sudah dihapus." }, n };
  }

  segarkanHalaman(id);
  redirect("/katalog");
}

// DELETE ---------------------------------------------------------------
// Konfirmasi dilakukan di TombolHapus (Client Component) sebelum action ini jalan.
export async function hapusBuku(formData) {
  const id = parseId(formData.get("id"));
  if (id === null) return; // id tidak valid: jangan jalankan query apa pun

  // WHERE id = $1 wajib: tanpa WHERE, seluruh baris tabel ikut terhapus.
  await pool.query("DELETE FROM buku WHERE id = $1", [id]);

  segarkanHalaman(id);

  // Jika dihapus dari halaman detail, buku itu sudah tidak ada: kembali ke katalog.
  if (formData.get("kembali") === "1") redirect("/katalog");
}
