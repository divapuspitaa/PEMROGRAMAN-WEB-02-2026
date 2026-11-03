import { useState } from 'react'

const MEJA_MAKSIMAL = 30

function FormPesan({ totalJumlah, onKirim }) {
  const [nama, setNama] = useState('')
  const [meja, setMeja] = useState('')
  const [pesanError, setPesanError] = useState({})

  const periksa = () => {
    const hasil = {}
    const namaBersih = nama.trim()
    const mejaBersih = meja.trim()

    if (namaBersih === '') {
      hasil.nama = 'Nama wajib diisi YAKK!'
    } else if (namaBersih.length < 2) {
      hasil.nama = 'Isi nama dengan minimal 2 huruf OII'
    } else if (!/^\p{L}[\p{L}\s.'-]*$/u.test(namaBersih)) {
      hasil.nama = 'Nama hanya boleh berisi huruf dan spasi aja yach.'
    }

    if (mejaBersih === '') {
      hasil.meja = 'Nomor meja WAJIB diisi!!'
    } else if (
      !/^\d+$/.test(mejaBersih) ||
      Number(mejaBersih) < 1 ||
      Number(mejaBersih) > MEJA_MAKSIMAL
    ) {
      hasil.meja = `Nomor meja harus berupa angka 1 sampai ${MEJA_MAKSIMAL}.`
    }

    if (totalJumlah === 0) {
      hasil.pesanan = 'Pesanan masih kosong. Tambahkan minimal satu menu.'
    }

    return hasil
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const hasil = periksa()
    setPesanError(hasil)
    if (Object.keys(hasil).length > 0) return

    onKirim({ nama: nama.trim(), meja: meja.trim() })
    setNama('')
    setMeja('')
  }

  const kolom =
    'mt-1 w-full rounded-xl border-2 bg-cream px-4 py-3 text-cokelat focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-merah'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="judul-form"
      className="rounded-3xl border-2 border-jambu bg-white p-5"
    >
      <h2 id="judul-form" className="font-judul text-2xl font-extrabold leading-none text-merah">
        Kirim pesanan
      </h2>

      <div className="mt-4">
        <label htmlFor="nama" className="font-medium">
          Nama
        </label>
        <input
          id="nama"
          type="text"
          value={nama}
          onChange={(event) => setNama(event.target.value)}
          autoComplete="off"
          aria-invalid={pesanError.nama ? 'true' : 'false'}
          aria-describedby={pesanError.nama ? 'error-nama' : undefined}
          className={`${kolom} ${pesanError.nama ? 'border-merah' : 'border-cokelat/25'}`}
        />
        {pesanError.nama && (
          <p id="error-nama" className="mt-1 text-sm font-bold text-merah">
            {pesanError.nama}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="meja" className="font-medium">
          Nomor meja
        </label>
        <input
          id="meja"
          type="text"
          inputMode="numeric"
          value={meja}
          onChange={(event) => setMeja(event.target.value)}
          autoComplete="off"
          aria-invalid={pesanError.meja ? 'true' : 'false'}
          aria-describedby={pesanError.meja ? 'error-meja' : undefined}
          className={`${kolom} ${pesanError.meja ? 'border-merah' : 'border-cokelat/25'}`}
        />
        {pesanError.meja && (
          <p id="error-meja" className="mt-1 text-sm font-bold text-merah">
            {pesanError.meja}
          </p>
        )}
      </div>

      {pesanError.pesanan && totalJumlah === 0 && (
        <p role="alert" className="mt-4 rounded-xl bg-kuning px-4 py-3 text-sm font-bold text-merah">
          {pesanError.pesanan}
        </p>
      )}

      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-merah px-5 py-3 text-lg font-bold text-kuning transition-colors hover:bg-cokelat focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-merah"
      >
        Kirim pesanan
      </button>
    </form>
  )
}

export default FormPesan