"use client";

import { hapusBuku } from "@/app/katalog/action";

// Client Component kecil: hanya bagian konfirmasi (confirm) yang butuh browser.
// Query DELETE tetap ada di Server Action hapusBuku, bukan di sini.
export default function TombolHapus({ id, judul, kembali = false, className }) {
  return (
    <form
      action={hapusBuku}
      onSubmit={(e) => {
        if (!confirm(`Yakin hapus buku "${judul}"? Tindakan ini tidak bisa dibatalkan.`)) {
          e.preventDefault(); // dibatalkan: Server Action tidak dijalankan
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      {kembali && <input type="hidden" name="kembali" value="1" />}
      <button
        type="submit"
        className={
          className ??
          "w-full rounded-lg border border-burgundy/40 px-3 py-2 text-sm font-semibold text-burgundy transition-colors hover:bg-rose-soft"
        }
      >
        Hapus
      </button>
    </form>
  );
}
