import { useState } from 'react'
import Navbar from './components/Navbar'
import MenuList from './components/MenuList'
import RingkasanPesanan from './components/RingkasanPesanan'
import FormPesan from './components/FormPesan'
import Footer from './components/Footer'

// Satu-satunya sumber data menu. Komponen anak hanya menerimanya lewat props.
const DAFTAR_MENU = [
  { id: 1, nama: 'Kopi Susu', kategori: 'Kopi', harga: 18000, tersedia: true, deskripsi: 'Espresso dengan susu segar dan gula aren.' },
  { id: 2, nama: 'Americano', kategori: 'Kopi', harga: 15000, tersedia: true, deskripsi: 'Espresso dengan air panas, rasa kuat dan bersih.' },
  { id: 3, nama: 'Cappuccino', kategori: 'Kopi', harga: 22000, tersedia: true, deskripsi: 'Espresso, susu panas, dan busa susu tebal.' },
  { id: 4, nama: 'Matcha Latte', kategori: 'Non-Kopi', harga: 24000, tersedia: true, deskripsi: 'Teh hijau matcha dengan susu.' },
  { id: 5, nama: 'Teh Tarik', kategori: 'Non-Kopi', harga: 14000, tersedia: false, deskripsi: 'Teh susu yang ditarik hingga berbusa.' },
  { id: 6, nama: 'Cokelat Panas', kategori: 'Non-Kopi', harga: 20000, tersedia: true, deskripsi: 'Cokelat pekat dengan susu hangat.' },
  { id: 7, nama: 'Roti Bakar', kategori: 'Makanan', harga: 16000, tersedia: true, deskripsi: 'Roti tebal dengan selai cokelat dan keju.' },
  { id: 8, nama: 'Pisang Goreng', kategori: 'Makanan', harga: 12000, tersedia: false, deskripsi: 'Pisang goreng renyah dengan taburan keju.' },
  { id: 9, nama: 'Nasi Goreng', kategori: 'Makanan', harga: 25000, tersedia: true, deskripsi: 'Nasi goreng kampung dengan telur mata sapi.' },
]

const DAFTAR_KATEGORI = ['Semua', 'Kopi', 'Non-Kopi', 'Makanan']

function App() {
  const [kategoriAktif, setKategoriAktif] = useState('Semua')
  // Pesanan hanya menyimpan id dan jumlah. Nama dan harga selalu dibaca dari DAFTAR_MENU.
  const [pesanan, setPesanan] = useState([])
  // Berisi { nama, meja } setelah pesanan terkirim, null jika belum.
  const [terkirim, setTerkirim] = useState(null)

  function tambahPesanan(id) {
    const menu = DAFTAR_MENU.find((item) => item.id === id)
    if (!menu || !menu.tersedia) 
    return

    setTerkirim(null)
    setPesanan((sebelumnya) =>
      sebelumnya.some((item) => item.id === id)
        ? sebelumnya.map((item) =>
            item.id === id ? { ...item, jumlah: item.jumlah + 1 } : item,
          )
        : [...sebelumnya, { id, jumlah: 1 }],
    )
  }

  function kurangiPesanan(id) {
    setPesanan((sebelumnya) =>
      sebelumnya
        .map((item) => (item.id === id ? { ...item, jumlah: item.jumlah - 1 } : item))
        .filter((item) => item.jumlah > 0),
    )
  }

  function hapusPesanan(id) {
    setPesanan((sebelumnya) => sebelumnya.filter((item) => item.id !== id))
  }

  function kirimPesanan({ nama, meja }) {
    setTerkirim({ nama, meja })
    setPesanan([])
  }

  // Nilai turunan: dihitung sekali di sini, dipakai Navbar dan Ringkasan sehingga angkanya selalu sama.
  const barisPesanan = pesanan.map((item) => {
    const menu = DAFTAR_MENU.find((m) => m.id === item.id)
    return { id: menu.id, nama: menu.nama, harga: menu.harga, jumlah: item.jumlah }
  })
  const totalJumlah = barisPesanan.reduce((total, baris) => total + baris.jumlah, 0)
  const totalHarga = barisPesanan.reduce((total, baris) => total + baris.harga * baris.jumlah, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar totalJumlah={totalJumlah} totalHarga={totalHarga} />

      <section className="bg-kuning">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-10 sm:px-6 sm:py-14">
          <div>
            <h1 className="font-judul text-5xl font-extrabold leading-[0.95] text-merah sm:text-7xl">
              Pesan dari
              <br />
              mejamu
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed">
              Pilih menu, tekan Tambah, lalu kirim pesanan dengan nama dan nomor mejamu.
            </p>
          </div>
          <img
            src="/logo.png"
            alt="logo kedai kopi senja"
            className="hidden h-44 w-44 shrink-0 rounded-full bg-jambu object-cover sm:block">
          </img>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
        <section aria-label="Daftar menu">
          <MenuList
            daftarMenu={DAFTAR_MENU}
            daftarKategori={DAFTAR_KATEGORI}
            kategoriAktif={kategoriAktif}
            onPilihKategori={setKategoriAktif}
            onTambah={tambahPesanan}
          />
        </section>

        <aside
          id="ringkasan"
          className="mt-12 space-y-6 lg:sticky lg:top-20 lg:mt-0 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto"
        >
          {terkirim && (
            <div role="status" className="rounded-3xl bg-kuning p-5">
              <p className="font-judul text-2xl font-extrabold text-merah">Terima kasih, {terkirim.nama}!</p>
              <p className="mt-1">
                Pesananmu untuk meja {terkirim.meja} sudah kami terima dan sedang disiapkan.
              </p>
            </div>
          )}

          <RingkasanPesanan
            barisPesanan={barisPesanan}
            totalJumlah={totalJumlah}
            totalHarga={totalHarga}
            onTambah={tambahPesanan}
            onKurangi={kurangiPesanan}
            onHapus={hapusPesanan}
          />

          <FormPesan totalJumlah={totalJumlah} onKirim={kirimPesanan} />
        </aside>
      </main>

      <Footer />
    </div>
  )
}

export default App
