import Image from "next/image";

// Server Component: hanya menerima props dan menampilkan banner.
export default function Hero({ nama, slogan, lokasi, jamBuka, gambar, altGambar, children }) {
  return (
    <section className="relative isolate overflow-hidden border-b-4 border-emas bg-[linear-gradient(180deg,#2b2540_0%,#5B5172_32%,#673D38_72%,#250000_100%)] text-paper">
      {/* Semburat senja di cakrawala bawah */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,rgba(234,124,99,0.45),rgba(197,134,122,0.15)_45%,transparent_72%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-[1.1fr_1fr] md:py-20">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-emas uppercase">
            <span className="h-px w-10 bg-emas/70" />
            Ruang Baca &amp; Perpustakaan Komunitas
          </p>

          <h1 className="mt-5 font-serif text-5xl leading-[1.05] font-semibold sm:text-6xl">
            {nama}
          </h1>
          <p className="mt-5 max-w-lg font-serif text-2xl leading-snug text-tan italic">
            {slogan}
          </p>

          <dl className="mt-7 space-y-1.5 text-paper/90">
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 text-emas">Lokasi</dt>
              <dd>{lokasi}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 text-emas">Jam buka</dt>
              <dd>{jamBuka}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">{children}</div>
        </div>

        {/* Bingkai jendela lengkung */}
        <div className="group relative isolate mx-auto w-full max-w-sm rounded-t-full border border-emas/70 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Cahaya peach tepat di belakang jendela */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-20 -top-12 -bottom-20 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(234,124,99,0.55),rgba(197,134,122,0.22)_45%,transparent_70%)]"
          />
          <div className="relative aspect-4/5 overflow-hidden rounded-t-full">
            <Image
              src={gambar}
              alt={altGambar}
              fill
              priority
              sizes="(min-width: 768px) 24rem, 100vw"
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(18,31,54,0.55))]" />
          </div>
        </div>
      </div>
    </section>
  );
}