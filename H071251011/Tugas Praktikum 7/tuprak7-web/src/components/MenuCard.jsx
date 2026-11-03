import { useState } from 'react'

const TAMPILAN_KATEGORI = {
  Kopi: { ikon: '☕', latar: 'bg-jambu' },
  'Non-Kopi': { ikon: '🍵', latar: 'bg-kuning' },
  Makanan: { ikon: '🍽️', latar: 'bg-jambu/50' },
}

function MenuCard({ id, nama, foto, kategori, harga, tersedia, deskripsi, onTambah }) {
  // Setiap kartu punya state sendiri, jadi membuka detail satu menu tidak memengaruhi menu lain.
  const [detailTerbuka, setDetailTerbuka] = useState(false)
  const tampilan = TAMPILAN_KATEGORI[kategori]
  const efekHabis = tersedia ? '' : 'opacity-50 grayscale'

  return (
    <li className="overflow-hidden rounded-3xl border border-cokelat/10 bg-white shadow-sm">
      {/* Foto kartu: pembungkus overflow-hidden menahan foto saat membesar */}
      <div className="group overflow-hidden">
        {foto ? (
          <img
            src={foto}
            alt={nama}
            loading="lazy"
            className={`h-40 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 ${efekHabis}`}
          />
        ) : (
          <div
            aria-hidden="true"
            className={`flex h-40 items-center justify-center text-6xl transition-transform duration-500 ease-out group-hover:scale-110 ${tampilan.latar} ${efekHabis}`}
          >
            {tampilan.ikon}
          </div>
        )}
      </div>

      {!tersedia && (
        <p className="bg-cokelat px-4 py-1.5 text-center text-sm font-bold text-kuning">
          Sedang habis
        </p>
      )}

      <div className="p-4">
        <p className="text-sm font-medium text-cokelat/70">{kategori}</p>
        <h2
          className={`font-judul text-2xl font-extrabold leading-tight ${
            tersedia ? 'text-cokelat' : 'text-cokelat/50'
          }`}
        >
          {nama}
        </h2>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className={`text-lg font-bold ${tersedia ? 'text-merah' : 'text-cokelat/50 line-through'}`}>
            Rp {harga.toLocaleString('id-ID')}
          </p>
          <button
            type="button"
            disabled={!tersedia}
            onClick={() => onTambah(id)}
            className="rounded-full bg-merah px-5 py-2 font-bold text-kuning transition-colors hover:bg-cokelat focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-merah disabled:cursor-not-allowed disabled:bg-cokelat/15 disabled:text-cokelat/55 disabled:hover:bg-cokelat/15"
          >
            {tersedia ? 'Tambah' : 'Habis'}
          </button>
        </div>

        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => setDetailTerbuka(true)}
          className="mt-3 text-sm font-medium text-merah underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-merah"
        >
          Lihat detail
        </button>
      </div>

      {/* Pop-up detail: klik area gelap, ikon silang, atau tombol Esc untuk menutup */}
      {detailTerbuka && (
        <div
          onClick={() => setDetailTerbuka(false)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setDetailTerbuka(false)
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-cokelat/60 p-4"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`judul-detail-${id}`}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-full w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
          >
            <button
              type="button"
              autoFocus
              aria-label="Tutup detail"
              onClick={() => setDetailTerbuka(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-jambu/40 text-merah transition-colors hover:bg-jambu/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-merah"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {foto ? (
              <img
                src={foto}
                alt={nama}
                className={`h-52 w-full rounded-2xl object-cover ${efekHabis}`}
              />
            ) : (
              <div
                aria-hidden="true"
                className={`flex h-52 items-center justify-center rounded-2xl text-7xl ${tampilan.latar} ${efekHabis}`}
              >
                {tampilan.ikon}
              </div>
            )}

            <span className="mt-5 inline-block rounded-full bg-jambu/40 px-3 py-1 text-xs font-bold text-merah">
              {kategori}
            </span>
            <h3
              id={`judul-detail-${id}`}
              className="mt-2 font-judul text-3xl font-extrabold leading-tight text-cokelat"
            >
              {nama}
            </h3>
            <p className="mt-2 leading-relaxed text-cokelat/85">{deskripsi}</p>

            <div className="mt-5 flex items-center justify-between rounded-2xl bg-kuning px-4 py-3">
              <p className="text-sm font-medium">{tersedia ? 'Tersedia' : 'Sedang habis'}</p>
              <p className="text-lg font-bold text-merah">Rp {harga.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>
      )}
    </li>
  )
}

export default MenuCard