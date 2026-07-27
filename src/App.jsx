import { useEffect, useRef, useState } from 'react'

/* ------------------------------------------------------------------ */
/*  Dados do negócio                                                   */
/* ------------------------------------------------------------------ */
const WHATSAPP = '5551998599983' // (51) 99859-9983
const INSTAGRAM = 'https://www.instagram.com/adrycosmeticosrs/'
const ADDRESS = 'R. Lindóia, 16 - loja 3 - Vila Vista Alegre'
const CITY = 'Cachoeirinha - RS · CEP 94945-340'
const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Adry+Cosm%C3%A9ticos+R.+Lind%C3%B3ia+16+loja+3+Cachoeirinha+RS'
const MAPS_EMBED =
  'https://www.google.com/maps?q=R.%20Lind%C3%B3ia%2C%2016%20-%20Vila%20Vista%20Alegre%2C%20Cachoeirinha%20-%20RS%2C%2094945-340&output=embed'

const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`

const MENU = [
  { label: 'Sobre', id: 'sobre' },
  { label: 'Serviços', id: 'servicos' },
  { label: 'Cursos', id: 'cursos' },
  { label: 'Depoimentos', id: 'depoimentos' },
  { label: 'Contato', id: 'contato' },
]

// 0 = domingo ... 6 = sábado  → índice HOURS (seg=0)
const HOURS = [
  { label: 'Segunda', open: '14:00', close: '18:00' },
  { label: 'Terça', open: '09:00', close: '18:00' },
  { label: 'Quarta', open: '09:00', close: '18:00' },
  { label: 'Quinta', open: '09:00', close: '18:00' },
  { label: 'Sexta', open: '09:00', close: '18:00' },
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

/* ------------------------------------------------------------------ */
/*  Selo circular giratório                                            */
/* ------------------------------------------------------------------ */
function Stamp({ id, text, href, className = '' }) {
  return (
    <a
      className={`stamp ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp"
    >
      <svg viewBox="0 0 120 120">
        <defs>
          <path id={id} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <text>
          <textPath href={`#${id}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="stamp-mid">✦</span>
    </a>
  )
}

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

const STAMP_TEXT = '· AGENDE  SEU  HORÁRIO  NA  ADRY  '

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  const ref = useReveal()
  const [menuOpen, setMenuOpen] = useState(false)
  const open = isOpenNow()
  const todayIdx = dayToHours(new Date().getDay())

  const go = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="shell" ref={ref}>
      {/* TOPBAR */}
      <div className="topbar">
        <button
          className={`burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {MENU.map((m) => (
            <li key={m.id}>
              <a onClick={() => go(m.id)} role="button" tabIndex={0}>
                {m.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <header className="hero-name">
        <h1 className="display">
          Adry
          <br />
          Cosméticos
        </h1>
      </header>
      <p className="role">
        Loja de produtos para manicure
        <br />
        Manicure profissional · Cursos
      </p>

      <div className="hero-photo">
        <img src="./images/adry-perfil.jpg" alt="Adriana — Adry Cosméticos" />
        <Stamp id="stamp-hero" text={STAMP_TEXT} href={wa('Olá! Vim pela bio e gostaria de agendar um horário 💅')} className="stamp-float" />
      </div>

      <p className="lede">
        Ajudo você a cuidar das suas unhas com produtos de qualidade, um
        atendimento carinhoso e cursos para quem quer viver da profissão.
      </p>

      {/* SOBRE */}
      <div className="gap-lg" />
      <section id="sobre" className="block reveal">
        <h2 className="h-section">Sobre</h2>
        <div className="gap-sm" />
        <p className="prose">
          <span className="u">Sou a Adriana, especialista em unhas</span> e apaixonada
          pelo que faço.
        </p>
        <p className="prose">
          Na <strong>Adry Cosméticos</strong> você encontra esmaltes, géis para
          alongamento, decorações, cera depilatória e todos os acessórios que uma
          manicure precisa — sempre com <span className="u">produtos profissionais</span> e
          de confiança.
        </p>
      </section>

      <div className="gap-md" />
      <div className="gallery3 reveal">
        <img src="./images/produto-1.jpg" alt="Produtos profissionais" loading="lazy" />
        <img src="./images/adry-sobre.jpg" alt="Adriana em atendimento" loading="lazy" />
        <img src="./images/unhas-1.jpg" alt="Alongamento em gel" loading="lazy" />
      </div>

      <div className="gap-md" />
      <div className="block reveal">
        <p className="prose">
          Dou atenção a cada detalhe, do <span className="u">alongamento à esmaltação</span>,
          para que você saia com as unhas impecáveis e muita autoestima.
        </p>
        <p className="prose">
          Atendo <span className="u">clientes e também outras manicures</span> que buscam os
          melhores produtos para o dia a dia.
        </p>
      </div>

      {/* SERVIÇOS */}
      <div className="gap-lg" />
      <section id="servicos" className="block reveal">
        <h2 className="h-section">Meus</h2>
        <h3 className="h-sub">Serviços</h3>
        <div className="gap-sm" />
        <p className="prose">
          Atendimento pensado para o seu momento — seja para renovar as unhas ou
          para se abastecer de produtos.
        </p>
      </section>
      <div className="svc reveal">
        <div className="svc-item">
          <span className="n">01</span>
          <span>
            <span className="t">Loja de produtos</span>
            <br />
            <span className="d">Esmaltes, géis, decorações, cera e acessórios</span>
          </span>
        </div>
        <div className="svc-item">
          <span className="n">02</span>
          <span>
            <span className="t">Manicure &amp; alongamento</span>
            <br />
            <span className="d">Alongamento em gel, manutenção e esmaltação</span>
          </span>
        </div>
        <div className="svc-item">
          <span className="n">03</span>
          <span>
            <span className="t">Atendimento para profissionais</span>
            <br />
            <span className="d">Produtos e indicações para manicures</span>
          </span>
        </div>
      </div>

      {/* ATELIER + POLAROID */}
      <div className="atelier reveal">
        <Stamp id="stamp-svc" text={STAMP_TEXT} href={wa('Olá! Gostaria de agendar um horário de manicure 💅')} className="stamp-float" />
        <figure className="polaroid">
          <img src="./images/unhas-2.jpg" alt="Trabalho Adry Cosméticos" loading="lazy" />
          <figcaption>Adry Cosméticos</figcaption>
        </figure>
      </div>

      {/* CURSOS */}
      <div className="gap-lg" />
      <section id="cursos" className="block reveal">
        <h2 className="h-section">Cursos</h2>
        <h3 className="h-sub">&amp; Treinamentos</h3>
        <div className="gap-sm" />
        <p className="prose">
          Quer aprender ou aperfeiçoar sua técnica? Ofereço cursos para você
          <span className="u"> começar do zero</span> ou <span className="u">evoluir de
          verdade</span> na arte das unhas.
        </p>
      </section>
      <div className="svc reveal">
        <div className="svc-item">
          <span className="n">01</span>
          <span>
            <span className="t">Curso Iniciante</span>
            <br />
            <span className="d">Do zero ao primeiro atendimento com segurança</span>
          </span>
        </div>
        <div className="svc-item">
          <span className="n">02</span>
          <span>
            <span className="t">Curso de Aperfeiçoamento</span>
            <br />
            <span className="d">Técnicas avançadas para elevar o seu nível</span>
          </span>
        </div>
      </div>
      <div className="gap-md" />
      <div className="contacts reveal">
        <a className="pill" href={wa('Olá! Tenho interesse nos cursos da Adry Cosméticos 🎓')}>
          Quero saber dos cursos
        </a>
      </div>

      {/* DEPOIMENTOS */}
      <div className="gap-lg" />
      <section id="depoimentos" className="block reveal">
        <h2 className="h-section">Depoimentos</h2>
        <div className="gap-sm" />
        <p className="prose">
          “A loja é ótima, sempre tem tudo que preciso para unhas e epilação. A Adry é
          uma <span className="u">excelente profissional</span>, muito simpática e
          prestativa.”
        </p>
        <p className="prose">
          <strong>Chelly Seibel</strong> · ★★★★★ no Google
        </p>
      </section>
      <div className="swipe reveal">
        <span>trabalhos</span>
        <span className="line" />
      </div>
      <div className="gallery3 reveal">
        <img src="./images/produto-2.jpg" alt="Produtos Adry" loading="lazy" />
        <img src="./images/unhas-1.jpg" alt="Unhas em gel" loading="lazy" />
        <img src="./images/adry-sobre.jpg" alt="Adriana" loading="lazy" />
      </div>

      {/* CONTATO */}
      <div className="gap-lg" />
      <section id="contato" className="block reveal">
        <h2 className="h-section">Contato</h2>
        <div className="gap-sm" />
        <p className="prose">
          Ficou com vontade de cuidar das suas unhas ou tem alguma dúvida? Fale
          comigo pelo canal que preferir.
        </p>
      </section>
      <div className="gap-md" />
      <div className="contacts reveal">
        <a className="pill" href={wa('Olá! Vim pela bio da Adry Cosméticos 💅')}>
          WhatsApp
        </a>
        <a className="pill" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a className="pill" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
          Como chegar
        </a>
      </div>

      {/* HORÁRIOS */}
      <div className="gap-md" />
      <ul className="hours reveal">
        {HOURS.map((h, i) => (
          <li key={h.label} className={i === todayIdx ? 'today' : ''}>
            <span className="day">{h.label}</span>
            <span className={`time ${h.open ? '' : 'closed'}`}>
              {h.open ? `${h.open} – ${h.close}` : 'Fechado'}
            </span>
          </li>
        ))}
      </ul>
      <div className={`status ${open ? '' : 'closed'}`}>
        <span className="dot" />
        {open ? 'Aberto agora' : 'Fechado no momento'}
      </div>

      {/* MAPA */}
      <div className="gap-md" />
      <div className="map reveal">
        <iframe
          title="Localização da Adry Cosméticos"
          src={MAPS_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <p className="addr">
          📍 {ADDRESS}
          <br />
          {CITY}
        </p>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="fname">
          Adry
          <small>COSMÉTICOS</small>
        </div>
        <p>
          © {new Date().getFullYear()} Adry Cosméticos · Cachoeirinha/RS
          <br />
          Loja de cosméticos, esmaltes e produtos para manicure.
          <br />
          Atendimento via{' '}
          <a href={wa('Olá! Vim pela bio 💅')} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>{' '}
          ·{' '}
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
            @adrycosmeticosrs
          </a>
        </p>
      </footer>
    </div>
  )
}
