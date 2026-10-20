import jepaFoto from '../assets/gallery/dipaa.png'

const dataDiriList = [
  { id: 1, label: 'Nama Lengkap', value: 'Diva Puspita' },
  { id: 2, label: 'NIM', value: 'H071251011' },
  { id: 3, label: 'Program Studi', value: 'Sistem Informasi' },
  { id: 4, label: 'Semester', value: '3 (Tiga)' },
]

const pendidikanList = [
  {
    id: 1,
    jenjang: 'S1 Sistem Informasi',
    institusi: 'Universitas Hasanuddin',
    mulai: '2025',
    selesai: 'Sekarang',
    aktif: true,
  },
  {
    id: 2,
    jenjang: 'SMA',
    institusi: 'SMAN 5 Parepare',
    mulai: '2022',
    selesai: '2025',
    aktif: false,
  },
  {
    id: 3,
    jenjang: 'SMP / MTs',
    institusi: 'MTsN 1 Majene',
    mulai: '2019',
    selesai: '2022',
    aktif: false,
  },
  {
    id: 4,
    jenjang: 'SD',
    institusi: 'SDN 6 Kamp. Baru Majene',
    mulai: '2013',
    selesai: '2019',
    aktif: false,
  },
]

export default function About() {
  return (
    <section id="tentang" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-6">
      <div className="reveal mb-12 text-center">
        <span className="block font-mono text-sm font-medium text-brand-pistachio-dark">
          Who Am I
        </span>
        <h2 className="mt-2 text-3xl font-bold text-zinc-900 md:text-5xl">
          Crafting Logic{' '}
          <span className="font-serif font-normal italic text-brand-rose">since 2025</span>
        </h2>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Kiri: foto */}
        <figure className="reveal mx-auto w-full max-w-md lg:max-w-none">
          <div className="glass-card overflow-hidden rounded-4xl p-3 shadow-xl">
            <div className="aspect-4/5 overflow-hidden rounded-3xl bg-brand-pink-light">
              <img
                src={jepaFoto}
                alt="Diva Puspita mempresentasikan proyeknya"
                className="h-full w-full object-cover object-[50%_30%]"
              />
            </div>
          </div>
          <figcaption className="mt-4 flex items-end justify-between gap-4 px-2">
            <span className="rounded-full border border-brand-pistachio/40 bg-brand-pistachio-light px-3 py-1.5 font-mono text-[11px] font-bold text-brand-pistachio-dark">
              Universitas Hasanuddin
            </span>
            <span className="text-right">
              <span className="block text-sm font-bold text-zinc-900">Diva Puspita</span>
              <span className="block text-xs text-zinc-500">Mahasiswa Sistem Informasi</span>
            </span>
          </figcaption>
        </figure>

        {/* Kanan: perkenalan, data diri, pendidikan */}
        <div className="reveal flex flex-col gap-8">
          <p className="text-sm leading-relaxed text-zinc-700 md:text-base">
            Saya Diva Puspita, mahasiswa Sistem Informasi semester 3 di Universitas Hasanuddin.
            Saya tertarik mengembangkan sistem web terintegrasi dan mengelola basis data, mulai
            dari membangun antarmuka web yang interaktif hingga mengolah data terstruktur
            menggunakan PostgreSQL, Java, dan Python.
          </p>

          {/* Data diri (array of object) */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-brand-pink/40 py-6">
            {dataDiriList.map((item) => (
              <div key={item.id}>
                <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-rose">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-800">{item.value}</dd>
              </div>
            ))}
          </dl>

          {/* Riwayat pendidikan */}
          <div>
            <h3 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Riwayat Pendidikan
            </h3>
            <ul className="divide-y divide-brand-pink/30">
              {pendidikanList.map((item) => (
                <li
                  key={item.id}
                  className="group flex items-start justify-between gap-4 py-4 transition hover:pl-2"
                >
                  <div>
                    <span className="flex flex-wrap items-center gap-2 text-sm font-bold text-zinc-900 transition group-hover:text-brand-rose">
                      {item.jenjang}
                      {item.aktif && (
                        <span className="rounded-full bg-brand-pistachio-light px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-brand-pistachio-dark">
                          Aktif
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-xs text-zinc-500">{item.institusi}</span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-sm font-medium tabular-nums text-zinc-800">
                    {item.mulai}
                    <span className="mx-1.5 text-brand-rose">→</span>
                    {item.selesai}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}