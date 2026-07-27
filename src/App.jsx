import { useEffect, useRef } from 'react'

/* ------------------------------------------------------------------ */
/*  Dados do negócio                                                   */
/* ------------------------------------------------------------------ */
const WHATSAPP = '5551998599983' // (51) 99859-9983
const INSTAGRAM = 'https://www.instagram.com/adrycosmeticosrs/'
const ADDRESS = 'R. Lindóia, 16 - loja 3 - Vila Vista Alegre, Cachoeirinha - RS'
const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Adry+Cosm%C3%A9ticos+R.+Lind%C3%B3ia+16+loja+3+Cachoeirinha+RS'
const MAPS_EMBED =
  'https://www.google.com/maps?q=R.%20Lind%C3%B3ia%2C%2016%20-%20Vila%20Vista%20Alegre%2C%20Cachoeirinha%20-%20RS%2C%2094945-340&output=embed'

const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`

const LINKS = [
  {
    icon: '🛍️',
    title: 'Loja de Produtos',
    sub: 'Esmaltes, géis, decorações e acessórios',
    href: wa('Olá! Vim pela bio e quero conhecer os produtos da Adry Cosméticos 💅'),
    featured: true,
  },
  {
    icon: '💅',
    title: 'Agendar Manicure',
    sub: 'Alongamento, manutenção e esmaltação',
    href: wa('Olá! Gostaria de agendar um horário de manicure na Adry Cosméticos 💅'),
  },
  {
    icon: '🎓',
    title: 'Curso Iniciante',
    sub: 'Comece do zero na arte das unhas',
    href: wa('Olá! Tenho interesse no curso INICIANTE de manicure da Adry Cosméticos 🎓'),
  },
  {
    icon: '✨',
    title: 'Curso de Aperfeiçoamento',
    sub: 'Eleve o nível da sua técnica',
    href: wa('Olá! Tenho interesse no curso de APERFEIÇOAMENTO da Adry Cosméticos ✨'),
  },
]

const GALLERY = [
  { src: './images/unhas-1.jpg', cap: 'Alongamento em gel' },
  { src: './images/unhas-2.jpg', cap: 'Acabamento natural' },
  { src: './images/produto-1.jpg', cap: 'Produtos profissionais' },
  { src: './images/produto-2.jpg', cap: 'Técnica & qualidade' },
]

// 0 = domingo ... 6 = sábado
const HOURS = [
  { label: 'Segunda-feira', open: '14:00', close: '18:00' },
  { label: 'Terça-feira', open: '09:00', close: '18:00' },
  { label: 'Quarta-feira', open: '09:00', close: '18:00' },
  { label: 'Quinta-feira', open: '09:00', close: '18:00' },
  { label: 'Sexta-feira', open: '09:00', close: '18:00' },
  { label: 'Sábado', open: '09:00', close: '16:00' },
  { label: 'Domingo', open: null, close: null },
]
// mapear índice getDay() -> índice HOURS (seg=0)
const dayToHours = (d) => (d === 0 ? 6 : d - 1)

function isOpenNow() {
  const now = new Date()
  const h = HOURS[dayToHours(now.getDay())]
  if (!h.open) return false
  const [oh, om] = h.open.split(':').map(Number)
  const [ch, cm] = h.close.split(':').map(Number)
  const mins = now.getHours() * 60 + now.getMinutes()
  return mins >= oh * 60 + om && mins < ch * 60 + cm
}

/* ------------------------------------------------------------------ */
/*  Ícones                                                             */
/* ------------------------------------------------------------------ */
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.51.01-4.75.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7C3.21 8.49 3.2 8.86 3.2 12s.01 3.51.07 4.75c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.04-.9-.19-1.38-.32-1.7a2.86 2.86 0 0 0-.68-1.06 2.86 2.86 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.51 4.01 15.14 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 8.15A3.21 3.21 0 1 0 12 8.8a3.21 3.21 0 0 0 0 6.41Zm6.29-8.35a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
  </svg>
)
const IconWhatsapp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.06 8.06 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.19-.31a8.03 8.03 0 0 1-1.25-4.3c0-4.46 3.63-8.09 8.1-8.09Zm4.68 11.5c-.08-.13-.29-.2-.6-.36-.31-.16-1.84-.91-2.13-1.01-.29-.11-.5-.16-.71.16-.21.31-.81 1.01-.99 1.22-.18.21-.37.24-.68.08-.31-.16-1.31-.48-2.5-1.54a9.4 9.4 0 0 1-1.73-2.15c-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54l-.6-.01c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.23 3.4 5.4 4.77.75.32 1.34.52 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48Z" />
  </svg>
)

/* ------------------------------------------------------------------ */
/*  Reveal on scroll                                                   */
/* ------------------------------------------------------------------ */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  const ref = useReveal()
  const open = isOpenNow()
  const todayIdx = dayToHours(new Date().getDay())

  return (
    <div className="page" ref={ref}>
      {/* HERO */}
      <header className="hero">
        <p className="brand-script">bem-vinda à</p>
        <div className="avatar-wrap">
          <div className="avatar-ring" />
          <img className="avatar" src="./images/adry-perfil.jpg" alt="Adriana — Adry Cosméticos" />
          <span className={`badge-open ${open ? '' : 'closed'}`}>
            <span className="dot" />
            {open ? 'Aberto agora' : 'Fechado'}
          </span>
        </div>
        <h1 className="title">Adry Cosméticos</h1>
        <p className="subtitle">
          Produtos para manicure · Atendimento · Cursos
        </p>
        <div className="rating">
          <span className="stars">★★★★★</span>
          <span>5,0 · 7 avaliações no Google</span>
        </div>
        <div className="location">📍 Cachoeirinha · Rio Grande do Sul</div>
      </header>

      {/* LINKS PRINCIPAIS */}
      <section className="section links reveal" aria-label="Links principais">
        {LINKS.map((l) => (
          <a
            key={l.title}
            className={`link-card ${l.featured ? 'featured' : ''}`}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="link-ico">{l.icon}</span>
            <span className="link-body">
              <span className="link-title">{l.title}</span>
              <span className="link-sub">{l.sub}</span>
            </span>
            <span className="link-arrow">›</span>
          </a>
        ))}
      </section>

      {/* SOBRE */}
      <section className="section reveal">
        <h2 className="section-label">A profissional</h2>
        <div className="about">
          <img className="about-img" src="./images/adry-sobre.jpg" alt="Adriana, especialista em unhas" />
          <div className="about-body">
            <h3>Prazer, sou a Adry</h3>
            <p>
              Especialista em unhas e apaixonada pelo que faço. Na Adry Cosméticos você
              encontra os melhores produtos para manicure, um atendimento cuidadoso e
              cursos para quem quer começar ou se aperfeiçoar na profissão. 💚
            </p>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="section reveal">
        <h2 className="section-label">Nossos trabalhos</h2>
        <div className="gallery">
          {GALLERY.map((g, i) => (
            <figure key={i}>
              <img src={g.src} alt={g.cap} loading="lazy" />
              <figcaption>{g.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* HORÁRIOS */}
      <section className="section reveal">
        <h2 className="section-label">Horários</h2>
        <div className="card">
          <ul className="hours">
            {HOURS.map((h, i) => (
              <li key={h.label} className={i === todayIdx ? 'today' : ''}>
                <span className="day">
                  {h.label}
                  {i === todayIdx && <span className="today-tag">hoje</span>}
                </span>
                <span className={`time ${h.open ? '' : 'closed'}`}>
                  {h.open ? `${h.open} – ${h.close}` : 'Fechado'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AVALIAÇÃO */}
      <section className="section reveal">
        <h2 className="section-label">Quem já foi, aprova</h2>
        <div className="card review">
          <div className="quote-mark">“</div>
          <p>
            A loja é ótima, sempre tem tudo que preciso para unhas e epilação. A Adry é uma
            excelente profissional, muito simpática e prestativa.
          </p>
          <div className="stars">★★★★★</div>
          <div className="author">
            <strong>Chelly Seibel</strong> · avaliação no Google
          </div>
        </div>
      </section>

      {/* ENDEREÇO / MAPA */}
      <section className="section reveal">
        <h2 className="section-label">Onde estamos</h2>
        <div className="card map-card">
          <iframe
            title="Localização da Adry Cosméticos"
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="map-info">
            <div className="addr">
              📍
              <span>
                {ADDRESS}
                <br />
                CEP 94945-340
              </span>
            </div>
            <a className="map-btn" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              Como chegar →
            </a>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <div className="socials reveal">
        <a
          className="social-btn"
          href={wa('Olá! Vim pela bio da Adry Cosméticos 💅')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <IconWhatsapp />
        </a>
        <a className="social-btn" href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <IconInstagram />
        </a>
        <a className="social-btn" href={`tel:+${WHATSAPP}`} aria-label="Telefone">
          <span style={{ fontSize: 20 }}>📞</span>
        </a>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="logo">
          Adry
          <small>Cosméticos</small>
        </div>
        <p className="copy">
          © {new Date().getFullYear()} Adry Cosméticos · Cachoeirinha/RS
          <br />
          Feito com 💚 para quem ama unhas
        </p>
      </footer>

      {/* WHATSAPP FLUTUANTE */}
      <a
        className="wa-float"
        href={wa('Olá! Vim pela bio e gostaria de mais informações 💅')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale no WhatsApp"
      >
        <IconWhatsapp />
      </a>
    </div>
  )
}
