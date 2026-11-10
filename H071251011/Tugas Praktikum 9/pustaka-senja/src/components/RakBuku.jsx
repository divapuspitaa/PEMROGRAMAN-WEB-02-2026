// Ceruk rak kayu mahoni dengan sorot cahaya hangat dari atas.
// Server Component.
export default function RakBuku({ children, className = "" }) {
  return (
    <div className={className}>
      <div className="flex justify-center rounded-t-lg bg-kayu-belakang bg-[radial-gradient(ellipse_at_50%_25%,rgba(255,196,120,0.30),transparent_70%),repeating-linear-gradient(90deg,rgba(0,0,0,0.16)_0_2px,transparent_2px_30px)] px-4 pt-8 shadow-[inset_0_16px_24px_rgba(0,0,0,0.55)]">
        {children}
      </div>
      <div className="h-4 border-t-2 border-kayu-terang bg-kayu shadow-[0_6px_8px_rgba(0,0,0,0.35)]" />
    </div>
  );
}