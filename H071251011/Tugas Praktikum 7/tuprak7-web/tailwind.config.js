/** Palet Pastry Shop: kuning krem, jambu, merah, cokelat zaitun */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        kuning: '#FFF9B4',
        jambu: '#D79F90',
        merah: '#8E1913',
        cokelat: '#3D351B',
        susu: '#FFFDE8', // tint kuning untuk latar halaman
      },
      fontFamily: {
        judul: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
