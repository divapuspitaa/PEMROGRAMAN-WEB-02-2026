import Link from "next/link";

export const metadata = { title: "Halaman tidak ditemukan" };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 text-center">
      <p className="font-serif text-6xl font-semibold text-burgundy">404</p>
      <h1 className="mt-3 font-serif text-3xl font-semibold">Buku tidak ditemukan</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Halaman atau buku yang kamu cari tidak ada di koleksi kami. Mungkin
        alamatnya salah, atau bukunya sudah dihapus.
      </p>
      <Link
        href="/katalog"
        className="mt-6 inline-block rounded-full bg-burgundy px-6 py-3 font-bold text-paper transition-colors hover:bg-burgundy-deep"
      >
        Kembali ke Katalog
      </Link>
    </div>
  );
}
