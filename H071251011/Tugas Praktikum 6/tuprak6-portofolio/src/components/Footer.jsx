const tahun = new Date().getFullYear()

const socialList = [
  { id: 1, name: 'GitHub', href: 'https://github.com/divapuspitaa', icon: '/github.svg' },
  { id: 2, name: 'LinkedIn', href: 'https://linkedin.com/in/divapuspita', icon: '/linkedin.svg' },
  { id: 3, name: 'Instagram', href: 'https://instagram.com/div4__0', icon: '/instagram.svg' },
]

function Footer() {
  return (
    <footer className="glass-card relative z-10 mt-10 border-x-0 border-b-0 px-5 py-12 text-center">
      <div className="mb-6 flex items-center justify-center gap-6">
        {socialList.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.name}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-pistachio/40 bg-brand-pistachio-light shadow-sm transition hover:scale-110 hover:bg-brand-pistachio-light/60"
          >
            <img src={social.icon} alt="" className="h-5 w-5" />
          </a>
        ))}
      </div>

      <p className="mx-auto max-w-xl font-mono text-xs leading-relaxed text-zinc-500">
        &copy; {tahun} Portofolio Diva Puspita, Mahasiswa Sistem Informasi Universitas
        Hasanuddin. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer