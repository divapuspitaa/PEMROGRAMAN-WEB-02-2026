const skillList = [
  'HTML & CSS',
  'Tailwind CSS',
  'JavaScript',
  'React.js',
  'Java (OOP)',
  'Python',
  'PostgreSQL',
  'Gradle',
]

// Dua warna bergantian: pink dan hijau pistachio
const toneList = [
  {
    card: 'border-brand-pink/50 hover:shadow-brand-pink/40',
    number: 'bg-brand-pink-light text-brand-rose',
  },
  {
    card: 'border-brand-pistachio/40 hover:shadow-brand-pistachio/40',
    number: 'bg-brand-pistachio-light text-brand-pistachio-dark',
  },
]

function Skills() {
  return (
    <section id="keahlian" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-6">
      <div className="reveal mb-12 text-center">
        <span className="block font-mono text-xs font-bold uppercase tracking-widest text-brand-rose">
          Tech Stack &amp; Tools
        </span>
        <h2 className="mt-2 text-3xl font-bold text-zinc-900 md:text-5xl">
          Interactive{' '}
          <span className="font-serif font-normal italic text-brand-pistachio-dark">
            Capabilities
          </span>
        </h2>
      </div>

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {skillList.map((skill, index) => {
          const tone = toneList[index % toneList.length]

          return (
            <li
              key={index}
              className={`reveal glass-card group relative overflow-hidden rounded-4xl border p-5 transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl md:p-6 ${tone.card}`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-2xl font-mono text-sm font-bold transition duration-300 group-hover:scale-110 ${tone.number}`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-base font-bold text-zinc-800 md:text-lg">{skill}</h3>
              <span
                className={`mt-4 block h-1 w-8 rounded-full transition-all duration-500 group-hover:w-full`}
              />
            </li>
          )
        })}
      </ul>
    </section>
  );
}

export default Skills;
