import { Cormorant_Garamond, Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fraunces = Cormorant_Garamond({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Pustaka Senja | Ruang Baca Komunitas",
    template: "%s | Pustaka Senja",
  },
  description:
    "Katalog buku, usulan judul baru, dan informasi ruang baca komunitas Pustaka Senja.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}