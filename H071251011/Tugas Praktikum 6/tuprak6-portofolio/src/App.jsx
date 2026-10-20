import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Cahaya ambient (immersive) di atas latar putih */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-24 left-1/2 h-112 w-4xl max-w-[140vw] -translate-x-1/2 animate-pulse rounded-full bg-linear-to-tr from-brand-pink/40 via-brand-pink-light to-brand-pistachio/30 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 h-120 w-120 rounded-full bg-brand-pistachio/25 blur-[140px]" />
        <div className="absolute -left-32 top-1/2 h-96 w-120 rounded-full bg-brand-pink/25 blur-[140px]" />
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}

export default App;
