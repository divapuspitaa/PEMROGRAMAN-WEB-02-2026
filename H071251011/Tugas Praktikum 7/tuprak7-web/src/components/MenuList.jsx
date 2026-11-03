import MenuCard from './MenuCard.jsx'
import foto1 from '../assets/gallery/kopi-susu.jpeg' // Kopi Susu
import foto2 from '../assets/gallery/americano.jpeg' // Americano
import foto3 from '../assets/gallery/cappucino.jpeg' // Cappuccino
import foto4 from '../assets/gallery/matcha-latte.jpeg' // Matcha Latte
import foto5 from '../assets/gallery/teh-tarik.jpeg' // Teh Tarik
import foto6 from '../assets/gallery/cokelat-panas.jpeg' // Cokelat Panas
import foto7 from '../assets/gallery/roti-bakar.jpeg' // Roti Bakar
import foto8 from '../assets/gallery/pisang-goreng.jpeg' // Pisang Goreng
import foto9 from '../assets/gallery/nasi-goreng.jpeg' // Nasi Goreng

// Kunci 1-9 sama dengan id menu di App.jsx.
const galeriFoto = {
  1: foto1,
  2: foto2,
  3: foto3,
  4: foto4,
  5: foto5,
  6: foto6,
  7: foto7,
  8: foto8,
  9: foto9,
}

function MenuList({ daftarMenu, daftarKategori, kategoriAktif, onPilihKategori, onTambah }) {
  const menuTampil =
    kategoriAktif === 'Semua'
      ? daftarMenu
      : daftarMenu.filter((menu) => menu.kategori === kategoriAktif)

  return (
    <div>
      <div className="sticky top-16 z-10 -mx-4 bg-cream/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        <div role="group" aria-label="Pilih kategori" className="flex flex-wrap gap-2">
          {daftarKategori.map((kategori) => {
            const aktif = kategori === kategoriAktif
            return (
              <button
                key={kategori}
                type="button"
                aria-pressed={aktif}
                onClick={() => onPilihKategori(kategori)}
                className={`rounded-full px-5 py-2 font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-merah ${
                  aktif
                    ? 'bg-merah text-kuning'
                    : 'bg-jambu/35 text-cokelat hover:bg-jambu/60'
                }`}
              >
                {kategori}
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-4 grid items-start gap-4 sm:grid-cols-2">
        {menuTampil.map((menu) => (
          <MenuCard
            key={menu.id}
            id={menu.id}
            nama={menu.nama}
            foto={galeriFoto[menu.id]}
            kategori={menu.kategori}
            harga={menu.harga}
            tersedia={menu.tersedia}
            deskripsi={menu.deskripsi}
            onTambah={onTambah}
          />
        ))}
      </ul>
    </div>
  )
}

export default MenuList