function RingkasanPesanan({
  barisPesanan,
  totalJumlah,
  totalHarga,
  onTambah,
  onKurangi,
  onHapus,
}) {
  const tombolKecil =
    'flex h-9 w-9 items-center justify-center rounded-full bg-kuning/15 text-lg font-bold leading-none hover:bg-kuning hover:text-cokelat focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kuning'

  return (
    <section aria-labelledby="judul-ringkasan" className="rounded-3xl bg-cokelat p-5 text-kuning">
      <h2 id="judul-ringkasan" className="font-judul text-2xl font-extrabold leading-none">
        Ringkasan pesanan
      </h2>

      {barisPesanan.length === 0 ? (
        <p className="mt-4 text-kuning/85">
          Belum ada pesanan. Tekan Tambah pada menu yang kamu mau.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-kuning/20">
          {barisPesanan.map((baris) => (
            <li key={baris.id} className="py-3">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-medium">{baris.nama}</p>
                <p className="font-bold">
                  Rp {(baris.harga * baris.jumlah).toLocaleString('id-ID')}
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  aria-label={`Kurangi ${baris.nama}`}
                  onClick={() => onKurangi(baris.id)}
                  className={tombolKecil}
                >
                  -
                </button>
                <span className="min-w-8 text-center font-bold">{baris.jumlah}</span>
                <button
                  type="button"
                  aria-label={`Tambah ${baris.nama}`}
                  onClick={() => onTambah(baris.id)}
                  className={tombolKecil}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => onHapus(baris.id)}
                  className="ml-auto rounded-full px-3 py-1 text-sm underline underline-offset-4 hover:bg-kuning/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kuning"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-baseline justify-between border-t border-kuning/40 pt-4">
        <p>{totalJumlah} item</p>
        <p className="font-judul text-3xl font-extrabold leading-none">
          Rp {totalHarga.toLocaleString('id-ID')}
        </p>
      </div>
    </section>
  )
}

export default RingkasanPesanan
