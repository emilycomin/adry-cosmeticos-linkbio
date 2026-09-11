import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  WHATSAPP,
  INSTAGRAM,
  ADDRESS,
  MAPS_URL,
  MAPS_EMBED,
  wa,
  useReveal,
  IconInstagram,
  IconWhatsapp,
} from '../lib.jsx'

const SERVICES = [
  {
    key: 'loja',
    icon: '🛍️',
    title: 'Loja de Produtos',
    sub: 'Esmaltes, géis, decorações e acessórios',
    type: 'photos',
    photos: [
      '/images/produto-1.jpg',
      '/images/produto-2.jpg',
      '/images/unhas-1.jpg',
      '/images/unhas-2.jpg',
    ],
    cta: {
      label: 'Falar com a loja',
      href: wa('Olá! Vim pela bio e quero conhecer os produtos da Adry Cosméticos 💅'),
    },
  },
  {
    key: 'manicure',
    icon: '💅',
    title: 'Serviços de Manicure',
    sub: 'Agende o seu horário',
    type: 'list',
    items: [
      { label: 'Esmaltação em gel', href: wa('Olá! Quero agendar uma esmaltação em gel na Adry Cosméticos 💅') },
      { label: 'Alongamentos', href: wa('Olá! Quero agendar um alongamento de unhas na Adry Cosméticos 💅') },
      { label: 'Manutenção', href: wa('Olá! Quero agendar uma manutenção na Adry Cosméticos 💅') },
    ],
  },
  {
    key: 'cursos',
    icon: '🎓',
    title: 'Cursos',
    sub: 'Aprenda ou aperfeiçoe sua técnica',
    type: 'list',
    items: [
      { label: 'Iniciante', href: wa('Olá! Tenho interesse no curso Iniciante da Adry Cosméticos 🎓') },
      { label: 'Cutilagem perfeita', href: wa('Olá! Tenho interesse no curso de Cutilagem perfeita da Adry Cosméticos 🎓') },
      { label: 'Alongamento em gel', to: '/curso-alongamento-gel', tag: 'ver página' },
      { label: 'Esmaltação em gel', to: '/curso-esmaltacao-gel', tag: 'ver página' },
    ],
  },
]

const GALLERY = [
  { src: '/images/unhas-1.jpg', cap: 'Alongamento em gel' },
  { src: '/images/unhas-2.jpg', cap: 'Acabamento natural' },
  { src: '/images/produto-1.jpg', cap: 'Produtos profissionais' },
  { src: '/images/produto-2.jpg', cap: 'Técnica & qualidade' },
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

/* ---------- Localização com mapa no hover ---------- */
function Location() {
  const [hover, setHover] = useState(false)
  return (
    <a
      className="location"
      href={MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Ver no Google Maps"
    >
      <span className="loc-text">📍 {ADDRESS}</span>
      <span className={`loc-map ${hover ? 'show' : ''}`}>
        {hover && (
          <iframe
            title="Mapa da Adry Cosméticos"
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </span>
    </a>
  )
}

/* ---------- Card de serviço com submenu (accordion) ---------- */
function SubItem({ it }) {
  const inner = (
    <>
      <span>
        {it.label}
        {it.tag && <span className="sub-tag">{it.tag}</span>}
      </span>
      <span className="sub-arrow">›</span>
    </>
  )
  if (it.to) {
    return (
      <li>
        <Link to={it.to} className="is-page">
          {inner}
        </Link>
      </li>
    )
  }
  return (
    <li>
      <a href={it.href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    </li>
  )
}

function ServiceCard({ svc, open, onToggle }) {
  return (
    <div className="service">
      <button
        type="button"
        className={`link-card ${open ? 'open' : ''}`}
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="link-ico">{svc.icon}</span>
        <span className="link-body">
          <span className="link-title">{svc.title}</span>
          <span className="link-sub">{svc.sub}</span>
        </span>
        <span className="link-arrow">›</span>
      </button>

      <div className={`submenu ${open ? 'open' : ''}`}>
        <div className="submenu-inner">
          {svc.type === 'photos' ? (
            <>
              <div className="submenu-photos">
                {svc.photos.map((src, i) => (
                  <img key={i} src={src} alt={`${svc.title} ${i + 1}`} loading="lazy" />
                ))}
              </div>
              <a
                className="submenu-cta"
                href={svc.cta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {svc.cta.label} <span>›</span>
              </a>
            </>
          ) : (
            <ul className="submenu-list">
              {svc.items.map((it) => (
                <SubItem key={it.label} it={it} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Página inicial (link na bio)                                        */
/* ------------------------------------------------------------------ */
export default function Home() {
  const ref = useReveal()
  const open = isOpenNow()
  const todayIdx = dayToHours(new Date().getDay())
  const [openKey, setOpenKey] = useState(null)
  const toggle = (key) => setOpenKey((cur) => (cur === key ? null : key))

  return (
    <div className="page" ref={ref}>
      {/* HERO */}
      <header className="hero">
        <div className="avatar-wrap">
          <div className="avatar-ring" />
          <img className="avatar" src="/images/adry-perfil.jpg" alt="Adriana — Adry Cosméticos" />
          <span className={`badge-open ${open ? '' : 'closed'}`}>
            <span className="dot" />
            {open ? 'Aberto agora' : 'Fechado'}
          </span>
        </div>
        <h1 className="title">Adry Cosméticos</h1>
        <p className="subtitle">Produtos • Cursos • Serviços de Manicure</p>
        <div className="rating">
          <span className="stars">★★★★★</span>
          <span>5,0 · 7 avaliações no Google</span>
        </div>
        <Location />
      </header>

      {/* CURSO EM DESTAQUE */}
      <Link to="/curso-alongamento-gel" className="course-highlight reveal">
        <div className="ch-body">
          <span className="ch-flag-inline">✨ Nova turma · 23/08</span>
          <h2 className="ch-title">Curso de Alongamento em Gel</h2>
          <div className="ch-meta">
            <span>📅 23 de agosto</span>
            <span>🕗 13h às 19h</span>
          </div>
          <span className="ch-cta">
            Ver o curso e garantir vaga <span>›</span>
          </span>
        </div>
      </Link>

      {/* SERVIÇOS (com submenu) */}
      <section className="section links reveal" aria-label="Serviços">
        {SERVICES.map((svc) => (
          <ServiceCard
            key={svc.key}
            svc={svc}
            open={openKey === svc.key}
            onToggle={() => toggle(svc.key)}
          />
        ))}
      </section>

      {/* SOBRE */}
      <section className="section reveal">
        <h2 className="section-label">A profissional</h2>
        <div className="about">
          <img className="about-img" src="/images/adry-sobre.jpg" alt="Adriana, especialista em unhas" />
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
