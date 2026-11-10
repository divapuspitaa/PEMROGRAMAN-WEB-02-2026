import Image from "next/image";

// Pemetaan id buku (hasil seed database) ke nama file di public/covers
const fileCover = {
  "1": "/covers/clean-code.jpg",
  "2": "/covers/designing-data.jpg",
  "3": "/covers/refactoring.jpg",
  "4": "/covers/laut-bercerita.jpg",
  "5": "/covers/bumi-manusia.jpg",
  "6": "/covers/cantik-itu-luka.jpg",
  "7": "/covers/atomic-habits.jpg",
  "8": "/covers/deep-work.jpg",
  "9": "/covers/filosofi-teras.jpg",
};

export default function BukuCover({ buku, className = "w-36" }) {
  const sumber = fileCover[String(buku.id)];

  return (
    <div className={`group/cover relative aspect-2/3 shrink-0 ${className}`}>
      <div className="relative h-full w-full origin-bottom overflow-hidden rounded-l-sm rounded-r-md shadow-[3px_5px_12px_rgba(0,0,0,0.5)] group-hover/cover:animate-goyang">
        {sumber ? (
          <Image
            src={sumber}
            alt={`Sampul buku ${buku.judul}`}
            fill
            sizes="(min-width: 768px) 14rem, 10rem"
            className="object-cover"
          />
        ) : (
          // Buku baru dari database belum punya file sampul: tampilkan sampul teks.
          <div
            role="img"
            aria-label={`Sampul buku ${buku.judul}`}
            className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[linear-gradient(160deg,#5B5172_0%,#673D38_70%,#250000_100%)] p-3 text-center"
          >
            <span className="font-serif text-sm leading-tight font-semibold text-emas-terang">
              {buku.judul}
            </span>
            <span className="h-px w-8 bg-emas/70" />
            <span className="text-[0.65rem] tracking-wide text-paper/80">{buku.penulis}</span>
          </div>
        )}
        {/* Kilau punggung buku */}
        <span className="pointer-events-none absolute inset-y-0 left-0 w-[7%] bg-linear-to-r from-black/30 to-transparent" />
      </div>
    </div>
  );
}
