// Server Component: footer bersama untuk semua halaman.
export default function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-emas bg-ink-deep text-tan">
      <div className="border-t border-slate/40 py-4 text-center text-sm text-tan/80">
        © {new Date().getFullYear()} Perpustakaan Senja By Diva Puspita
      </div>
    </footer>
  );
}
