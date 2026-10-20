const menuList = [
  { id: 1, label: 'Beranda', href: '#beranda' },
  { id: 2, label: 'Tentang', href: '#tentang' },
  { id: 3, label: 'Keahlian', href: '#keahlian' },
  { id: 4, label: 'Galeri', href: '#galeri' },
]

function Navbar() {
  const handleMenuClick = (namaMenu) => {
    console.log(`Menu diklik: ${namaMenu}`)
    // Tutup menu burger setelah dipilih
    document.getElementById('menu-toggle').checked = false
  }

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />

      <header className="sticky top-3 z-50 mx-auto max-w-5xl px-3 sm:top-4 sm:px-4">
        <div className="glass-card flex flex-wrap items-center justify-between rounded-3xl px-4 py-3 shadow-lg sm:px-6">
          {/* Checkbox tersembunyi sebagai penyimpan status buka/tutup (tanpa useState) */}
          <input id="menu-toggle" type="checkbox" className="peer sr-only" />

          {/* Logo */}
          <a
            href="#beranda"
            onClick={() => handleMenuClick('Logo diva.dev')}
            className="flex items-center gap-2 font-serif text-2xl font-bold italic tracking-tight text-brand-rose"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-rose opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-rose" />
            </span>
            diva
            <span className="font-sans text-lg font-bold not-italic text-brand-pistachio-dark">
              .dev
            </span>
          </a>

          {/* Tombol burger */}
          <label
            htmlFor="menu-toggle"
            aria-label="Buka atau tutup menu"
            className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.25 rounded-full bg-brand-pink-light text-brand-rose transition hover:bg-brand-pink/40 peer-checked:bg-brand-rose peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-rose"
          >
            <span className="block h-0.5 w-5 rounded-full bg-current transition duration-300 peer-checked:[&>span:nth-child(1)]:translate-y-1.75"/>
            <span className="block h-0.5 w-5 rounded-full bg-current transition duration-300" />
            <span className="block h-0.5 w-5 rounded-full bg-current transition duration-300" />
          </label>

          {/* Menu: vertikal di layar kecil, horizontal di layar besar */}
          <nav
            aria-label="Navigasi utama"
            className="invisible grid w-full grid-rows-[0fr] transition-[grid-template-rows,visibility] duration-300 peer-checked:visible peer-checked:grid-rows-[1fr]"
          >
            <div className="overflow-hidden">
              <ul className="flex flex-col gap-1 pt-3 sm:flex-row sm:justify-end sm:gap-2">
                {menuList.map((menu) => (
                  <li key={menu.id}>
                    <a
                      href={menu.href}
                      onClick={() => handleMenuClick(menu.label)}
                      className="block rounded-2xl px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 transition hover:bg-brand-pink-light hover:text-brand-rose sm:rounded-full sm:py-2"
                    >
                      {menu.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;