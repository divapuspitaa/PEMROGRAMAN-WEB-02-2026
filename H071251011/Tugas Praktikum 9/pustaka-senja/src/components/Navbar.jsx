"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { path: "/", label: "Beranda" },
  { path: "/katalog", label: "Katalog" },
  { path: "/usulan", label: "Usulan Buku" },
];

// Menu "Katalog" tetap aktif saat membuka /katalog/[id]
function cekAktif(pathname, path) {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [terbuka, setTerbuka] = useState(false);
  const [digulir, setDigulir] = useState(false);

  // Navbar jadi transparan setelah halaman digulir ke bawah
  useEffect(() => {
    function cekGulir() {
      setDigulir(window.scrollY > 20);
    }

    window.addEventListener("scroll", cekGulir, { passive: true });
    return () => window.removeEventListener("scroll", cekGulir);
  }, []);

  return (
    <header 
    className={`sticky top-0 z-30 border-b transition-colors duration-300 ${
            digulir && !terbuka
              ? "border-emas/20 bg-ink-deep/50 backdrop-blur-md"
              : "border-emas/40 bg-ink-deep"
            }`}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-5 py-3 md:flex-nowrap">
        <Link
          href="/"
          onClick={() => setTerbuka(false)}
          className="flex items-center gap-3 focus-visible:outline-emas"
        >
         <Image
          src="/logo-ikon.svg"
          alt=""
          width={32}
          height={40}
          className="h-10 w-auto"
         />
         <span className="font-serif text-2xl font-semibold tracking-wide text-emas-terang">
            Pustaka Senja
         </span>
        </Link>

        {/* Tombol menu: hanya tampil di layar kecil */}
        <button
          type="button"
          onClick={() => setTerbuka(!terbuka)}
          aria-expanded={terbuka}
          aria-controls="menu-utama"
          aria-label={terbuka ? "Tutup menu" : "Buka menu"}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-emas/50 text-tan hover:bg-ink focus-visible:outline-emas md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {terbuka ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <nav
          id="menu-utama"
          aria-label="Navigasi utama"
          className={`${terbuka ? "block" : "hidden"} w-full md:block md:w-auto`}
        >
          <ul className="flex flex-col gap-1 py-3 md:flex-row md:items-center md:gap-8 md:py-0">
            {menu.map((item) => {
              const aktif = cekAktif(pathname, item.path);
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setTerbuka(false)}
                    aria-current={aktif ? "page" : undefined}
                    className={`block rounded-md px-3 py-2 font-medium tracking-wide transition-colors focus-visible:outline-emas md:rounded-none md:border-b-2 md:px-0.5 md:py-1.5 ${
                      aktif
                        ? "bg-ink text-emas-terang md:border-emas md:bg-transparent"
                        : "text-tan hover:bg-ink hover:text-paper md:border-transparent md:hover:border-emas/50 md:hover:bg-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}