import jepaFoto from '../assets/gallery/jepa.jpeg'
import oopFoto from '../assets/gallery/oop.jpeg'
import pyFoto from '../assets/gallery/py.jpeg'
import divaFoto from '../assets/gallery/dato.jpeg'

const galleryList = [
  {
    id: 1,
    src: jepaFoto,
    title: 'Presentasi Jepa Mandar',
    caption: 'Mempresentasikan proyek mandiri Sistem Informasi Jepa Mandar.',
    position: 'object-[50%_30%]',
    projectTitle: 'Sistem Informasi Jepa Sebagai Makanan Tradisional Mandar',
    type: 'Proyek Mandiri (Solo Project)',
    desc: 'Platform web interaktif untuk mempromosikan dan melestarikan Jepa sebagai makanan tradisional khas Mandar kepada generasi muda (Gen-Z). Dilengkapi informasi edukatif, direktori resep, dan tampilan antarmuka modern.',
    role: 'Full-Stack Web Developer (merancang konsep, antarmuka responsif dengan Tailwind CSS, serta logika interaktivitas JavaScript).',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript'],
    repo: 'https://github.com/divapuspitaa/JEPANA_MANDAR.git',
  },
  {
    id: 2,
    src: oopFoto,
    title: 'DIVERYU-26',
    caption: 'Dokumentasi tim proyek Java OOP di depan papan Prodi Sistem Informasi.',
    position: 'object-[50%_45%]',
    projectTitle: 'DIVERYU - E-Commerce App (Java & Gradle)',
    type: 'Proyek Kelompok Pemrograman Berorientasi Objek',
    desc: 'Aplikasi e-commerce berbasis OOP Java dengan penerapan Inheritance, Encapsulation, dan Polymorphism. Dependensi dan proses build dikelola otomatis menggunakan Gradle.',
    role: 'Front-End Developer (merancang antarmuka pengguna DIVERYU bersama Ayu dan mengonfigurasi berkas build.gradle).',
    tech: ['Java 17', 'Gradle', 'OOP Architecture'],
    repo: 'https://github.com/divapuspitaa/E-COMMERCE-OOP-KLP-26.git',
  },
  {
    id: 3,
    src: pyFoto,
    title: 'Presentasi AP-2-HEALTH',
    caption: 'Bersama tim proyek Python AP-2-HEALTH usai presentasi.',
    position: 'object-center',
    projectTitle: 'AP-2-HEALTH (Health & Lifestyle Tracker)',
    type: 'Proyek Kelompok Pemrograman Python',
    desc: 'Program Python untuk memantau gaya hidup sehat secara interaktif: kalkulator BMI & Smartfat, Health Check (tidur, air, olahraga), Set Health Mission, Health Progress, EyeCheck, serta modul kesehatan mental.',
    role: "Logic Programmer & Module Developer (mengembangkan fitur 'How Are You Today' untuk memantau kondisi kesehatan mental pengguna).",
    tech: ['Python', 'Algorithmic Logic', 'Interactive Scripting'],
    repo: 'https://github.com/arenjiee/AP-2-HEALTH',
  },
  {
    id: 4,
    src: divaFoto,
    title: 'Presentasi Pantai Dato Majene',
    caption: 'Mempresentasikan proyek mandiri Sistem Informasi Pantai Dato Majene.',
    position: 'object-[50%_30%]',
    projectTitle: 'Sistem Informasi Pantai Dato Sebagai Tempat Wisata Masyarakat Mandar',
    type: 'Proyek Mandiri (Solo Project)',
    desc: 'Platform web interaktif untuk mempromosikan dan melestarikan Pantai Dato sebagai tempat wisata di kota Majene kepada generasi muda (Gen-Z). Dilengkapi informasi edukatif, pilihan destinasi, dan tampilan antarmuka modern.',
    role: 'Full-Stack Web Developer (merancang konsep, antarmuka responsif dengan Tailwind CSS, serta logika interaktivitas JavaScript).',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript'],
  },
]

function Gallery() {
  const bukaDetail = (id) => {
    document.getElementById(`detail-${id}`).showModal()
  }

  const tutupDetail = (id) => {
    document.getElementById(`detail-${id}`).close()
  }

  return (
    <section id="galeri" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20">
      <div className="reveal mb-12 text-center">
        <span className="block font-mono text-xs font-bold uppercase tracking-widest text-brand-rose">
          Moments &amp; Works
        </span>
        <h2 className="mt-2 text-3xl font-bold text-zinc-900 md:text-5xl">
          Gallery{' '}
          <span className="font-serif font-normal italic text-brand-pistachio-dark">
            Dokumentasi
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {galleryList.map((foto) => (
          <figure
            key={foto.id}
            className="reveal glass-card group flex flex-col overflow-hidden rounded-4xl p-3 transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-pink/40"
          >
            <div className="aspect-4/5 overflow-hidden rounded-3xl bg-brand-pink-light">
              <img
                src={foto.src}
                alt={foto.title}
                loading="lazy"
                className={`h-full w-full object-cover transition duration-700 group-hover:scale-110 ${foto.position}`}
              />
            </div>

            <figcaption className="flex flex-1 flex-col px-2 pb-2 pt-4">
              <h3 className="text-sm font-bold text-zinc-900 transition group-hover:text-brand-rose">
                {foto.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-600">{foto.caption}</p>

              {/* Tombol hanya muncul jika foto punya data proyek (repo) */}
              {foto.desc && (
                <button
                  type="button"
                  onClick={() => bukaDetail(foto.id)}
                  className="mt-4 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-brand-rose px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow-md shadow-brand-rose/30 transition hover:scale-105 hover:bg-brand-rose-dark"
                >
                  Lihat Detail <span>→</span>
                </button>
              )}
            </figcaption>

            {/* Modal detail (elemen <dialog> bawaan HTML, tanpa useState) */}
            {foto.desc && (
              <dialog
                id={`detail-${foto.id}`}
                onClick={(e) => {
                  if (e.target === e.currentTarget) tutupDetail(foto.id)
                }}
                className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-[2.5rem] bg-white p-0 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
              >
                <div className="relative p-6 md:p-8">
                  <button
                    type="button"
                    onClick={() => tutupDetail(foto.id)}
                    aria-label="Tutup detail"
                    className="absolute right-5 top-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-brand-pink-light text-brand-rose transition hover:scale-110"
                  >
                    ✕
                  </button>

                  <span className="rounded-full bg-brand-pink-light px-3 py-1 font-mono text-[10px] font-bold uppercase text-brand-rose">
                    Project Details
                  </span>

                  <h3 className="mt-3 pr-10 text-2xl font-bold text-zinc-900">
                    {foto.projectTitle}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-700">{foto.desc}</p>

                  <div className="mt-4 space-y-3 text-xs leading-relaxed text-zinc-700">
                    <p>
                      <strong className="text-brand-rose">Tipe Proyek: </strong>
                      {foto.type}
                    </p>
                    <p>
                      <strong className="text-brand-rose">Peran Saya: </strong>
                      {foto.role}
                    </p>
                  </div>

                  <div className="mt-4 rounded-2xl border border-brand-pistachio/40 bg-brand-pistachio-light p-4">
                    <span className="mb-2 block text-xs font-bold text-zinc-700">
                      Tech Stack Digunakan:
                    </span>
                    <ul className="flex flex-wrap gap-2">
                      {foto.tech.map((item, index) => (
                        <li
                          key={index}
                          className="rounded-lg bg-white px-2.5 py-1 font-mono text-[11px] font-bold text-brand-pistachio-dark"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {foto.repo && (
                  <a
                    href={foto.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-rose py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-rose/30 transition duration-300 hover:scale-[1.02] hover:bg-brand-rose-dark">
                    Buka Link Repositori ↗
                  </a>
                  )}
                </div>
              </dialog>
            )}
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Gallery