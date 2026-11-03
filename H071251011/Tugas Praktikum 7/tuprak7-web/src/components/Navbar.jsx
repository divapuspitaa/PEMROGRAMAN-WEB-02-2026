function Navbar({ totalJumlah, totalHarga }) {
  return (
    <header className="sticky top-0 z-20 border-b border-cokelat/10 bg-cream/95 backdrop-blur">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="" className="h-10 w-10 rounded-full bg-jambu object-cover"></img>
          <p className="font-judul text-2xl font-extrabold leading-none text-merah sm:text-3xl">
            Kedai Kopi Senja
          </p>
        </div>

        <a
          href="#ringkasan"
          className="flex items-center gap-3 rounded-full bg-merah px-5 py-2.5 text-kuning shadow-sm transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-merah">
          <span className="text-sm font-medium">{totalJumlah} item</span>
          <span className="font-bold">Rp {totalHarga.toLocaleString('id-ID')}</span>
        </a>
      </nav>
    </header>
  )
}

export default Navbar
