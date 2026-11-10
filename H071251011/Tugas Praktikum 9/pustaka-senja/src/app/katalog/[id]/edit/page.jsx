import { notFound } from "next/navigation";
import BukuForm from "@/components/BukuForm";
import pool from "@/lib/db";
import { ubahBuku } from "../../action";

export const dynamic = "force-dynamic";

// Id dari URL dianggap valid hanya jika berupa angka (maks. 9 digit agar muat di INTEGER).
function parseId(nilai) {
  return /^\d{1,9}$/.test(String(nilai)) ? Number(nilai) : null;
}

export const metadata = { title: "Edit Buku" };

export default async function EditBuku({ params }) {
  const { id: idUrl } = await params;

  // ID dari URL divalidasi dulu, lalu dikirim ke query sebagai parameter ($1).
  const id = parseId(idUrl);
  if (id === null) notFound();

  const { rows } = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku WHERE id = $1",
    [id]
  );
  const buku = rows[0];
  if (!buku) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-serif text-4xl font-semibold">Edit Buku</h1>
      <p className="mt-2 max-w-xl text-muted">
        Ubah data buku &quot;{buku.judul}&quot;, lalu simpan perubahannya.
      </p>

      <div className="mt-8">
        <BukuForm
          action={ubahBuku}
          idBuku={buku.id}
          nilaiAwal={{
            judul: buku.judul,
            penulis: buku.penulis,
            kategori: buku.kategori,
            tahun: String(buku.tahun),
            tersedia: String(buku.tersedia),
            sinopsis: buku.sinopsis,
          }}
          labelKirim="Simpan Perubahan"
          hrefBatal="/katalog"
        />
      </div>
    </div>
  );
}
