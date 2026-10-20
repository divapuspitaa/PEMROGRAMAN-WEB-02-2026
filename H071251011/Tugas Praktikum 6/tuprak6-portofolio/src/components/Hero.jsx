const highlightList = [
  { id: 1, text: 'Universitas Hasanuddin' },
  { id: 2, text: 'Semester 3' },
  { id: 3, text: 'H071251011' },
]

export default function Hero() {
  const handleButtonClick = () => {
    console.log('Tombol "Lihat Galeri" diklik: selamat datang di portofolio Diva Puspita!')
    document.getElementById('galeri')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="beranda"
      className="relative mx-auto max-w-6xl scroll-mt-24 overflow-hidden px-5 pt-10 sm:px-6 md:pt-14"
    >
      {/* Gradasi pink + pistachio di belakang foto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-40 -z-10 mx-auto max-w-4xl"
      >
        <div className="absolute bottom-0 left-0 h-[85%] w-3/5 rounded-full bg-brand-pink/70 blur-[90px]" />
        <div className="absolute bottom-0 right-0 h-[85%] w-3/5 rounded-full bg-brand-pistachio/60 blur-[90px]" />
      </div>

      {/* Sapaan (berada DI BELAKANG foto) */}
      <div className="relative z-0 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-pistachio/40 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-pistachio-dark">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-pistachio" />
          Selamat datang di portofolio saya
        </span>

        <h1 className="mt-5 text-4xl animate-pulse font-extrabold leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl md:text-7xl">
          Hai, saya <span className="text-brand-rose">Diva</span> 👋
          <span className="block font-serif font-medium italic text-brand-pistachio-dark">
            Mahasiswa Sistem Informasi
          </span>
        </h1>
      </div>

      {/* Panggung: foto di tengah, teks di tepi kiri & kanan */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Foto (ditarik naik agar kepala menutupi baris serif) */}
        <img
          src="/apa.png"
          alt="Foto profil Diva Puspita"
          className="-mt-6 h-104 w-auto max-w-none object-contain object-bottom drop-shadow-2xl mask-[linear-gradient(to_bottom, black_80%, transparent)] sm:-mt-10 sm:h-128 lg:-mt-8 lg:h-168"/>
        {/* Deskripsi + tombol: kanan di layar besar */}
        <div className="mt-6 text-center lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-64 lg:text-left">
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-zinc-700 lg:mx-0">
            Saya berfokus pada pengembangan antarmuka web yang interaktif dan responsif, serta
            pengelolaan basis data terstruktur.
          </p>
          <button
            type="button"
            onClick={handleButtonClick}
            className="group mt-5 inline-flex cursor-pointer items-center gap-3 whitespace-nowrap rounded-full bg-zinc-900 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-brand-rose"
          >
            Lihat Galeri
            <span className="transition group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* Highlight: kiri di layar besar */}
        <ul className="mb-10 mt-6 flex flex-wrap justify-center gap-2 lg:absolute lg:bottom-10 lg:left-0 lg:mb-0 lg:mt-0 lg:flex-col lg:items-start">
          {highlightList.map((item) => (
            <li
              key={item.id}
              className="glass-card whitespace-nowrap rounded-xl px-3 py-1.5 font-mono text-[11px] font-semibold text-brand-rose-dark"
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}