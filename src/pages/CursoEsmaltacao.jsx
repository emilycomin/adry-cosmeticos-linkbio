import { useState } from 'react'
import { Link } from 'react-router-dom'
import { wa, useReveal, IconWhatsapp, ADDRESS, MAPS_URL } from '../lib.jsx'

const INSCRICAO_MSG =
  'Olá! Tenho interesse no Curso de Esmaltação em Gel com a Adriana. Quero mais informações e garantir minha vaga! ✨'
const inscricaoHref = wa(INSCRICAO_MSG)

const PROGRAMA = [
  {
    icon: '📚',
    titulo: 'Teoria',
    itens: ['Biossegurança', 'Anatomia das unhas', 'Patologias mais comuns', 'Tipos de pele'],
  },
  {
    icon: '🧴',
    titulo: 'Produtos',
    itens: ['Apresentação dos produtos e como utilizá-los'],
  },
  {
    icon: '💅',
    titulo: 'Prática',
    itens: [
      'Cutilagem combinada (broca e alicate)',
      'Alinhamento de lâmina ungueal',
      'Controle de produtos',
      'Aplicação e remoção da esmaltação em gel',
    ],
  },
]

const BONUS = [
  {
    icon: '💬',
    t: 'Suporte por 30 dias',
    d: 'Acompanhamento após o curso, via WhatsApp',
  },
  {
    icon: '🏷️',
    t: '10% de desconto',
    d: 'Na sua 1ª compra aqui na loja',
  },
  {
    icon: '📜',
    t: 'Certificado',
    d: 'De conclusão do curso',
  },
]

const GALERIA = [
  '/images/produto-2.jpg',
  '/images/unhas-1.jpg',
  '/images/unhas-2.jpg',
  '/images/cursos/curso-aula.jpg',
]

const DEPOIMENTOS = [
  '/images/cursos/depoimento-1.jpg',
  '/images/cursos/depoimento-2.jpg',
  '/images/cursos/depoimento-3.jpg',
]

export default function CursoEsmaltacao() {
  const ref = useReveal()
  const [zoom, setZoom] = useState(null)

  return (
    <div className="course" ref={ref}>
      {/* TOPO */}
      <div className="course-top">
        <Link to="/" className="back-link">
          ‹ Adry Cosméticos
        </Link>
      </div>

      {/* HERO */}
      <header className="course-hero">
        <span className="eyebrow">Curso presencial · Cachoeirinha/RS</span>
        <h1 className="course-title">
          Esmaltação
          <br />
          em Gel
        </h1>
        <p className="course-tagline">“Dando asas ao seu talento”</p>

        <div className="course-hero-img">
          <img src="/images/adry-sobre.jpg" alt="Adriana, instrutora do curso de esmaltação em gel" />
        </div>

        <p className="instructor">
          com <strong>Adriana Christo</strong> · Instrutora
        </p>

        {/* INFORMAÇÕES DO CURSO */}
        <div className="turma-card">
          <span className="turma-flag">Inscrições abertas</span>
          <ul className="turma-info">
            <li>
              <span className="ti-ico">🕐</span>
              <span className="ti-text">
                <small>Carga horária</small>
                <strong>4 horas</strong>
              </span>
            </li>
            <li>
              <span className="ti-ico">🧴</span>
              <span className="ti-text">
                <small>Material</small>
                <strong>Fornecido pela instrutora</strong>
              </span>
            </li>
            <li>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                <span className="ti-ico">📍</span>
                <span className="ti-text">
                  <small>Local</small>
                  <strong>{ADDRESS}</strong>
                </span>
              </a>
            </li>
          </ul>
        </div>
        <p className="turma-note">
          ⚠️ A aluna deve trazer seu <strong>motor e cabine</strong> (por questão de adaptação).
        </p>

        <div className="pitch">
          💅 Entregue às suas clientes uma esmaltação impecável, segura e com durabilidade de
          <strong> 15 a 21 dias</strong>.
        </div>

        <a className="cta-btn" href={inscricaoHref} target="_blank" rel="noopener noreferrer">
          <IconWhatsapp /> Quero garantir minha vaga
        </a>
      </header>

      {/* CONTEÚDO */}
      <section className="course-section reveal">
        <h2 className="section-label">O conteúdo do curso</h2>
        {PROGRAMA.map((grupo) => (
          <div className="syllabus-group" key={grupo.titulo}>
            <h3 className="syllabus-title">
              <span>{grupo.icon}</span> {grupo.titulo}
            </h3>
            <ul className="check-list">
              {grupo.itens.map((it) => (
                <li key={it}>
                  <span className="check">✓</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* BÔNUS */}
      <section className="course-section reveal">
        <h2 className="section-label">Bônus inclusos</h2>
        <div className="bonus-list">
          {BONUS.map((b) => (
            <div className="bonus-item" key={b.t}>
              <span className="bonus-ico">{b.icon}</span>
              <span className="bonus-body">
                <strong>{b.t}</strong>
                <span>{b.d}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* GALERIA */}
      <section className="course-section reveal">
        <h2 className="section-label">O curso na prática</h2>
        <div className="course-gallery">
          {GALERIA.map((src, i) => (
            <figure key={i}>
              <img src={src} alt={`Curso de esmaltação em gel ${i + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS (galeria) */}
      <section className="course-section reveal">
        <h2 className="section-label">O que dizem as alunas</h2>
        <p className="gallery-hint">toque para ampliar</p>
        <div className="depo-gallery">
          {DEPOIMENTOS.map((src, i) => (
            <figure key={i} className={i === 0 ? 'wide' : ''} onClick={() => setZoom(src)}>
              <img src={src} alt={`Depoimento de aluna ${i + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      {/* INVESTIMENTO */}
      <section className="course-section reveal">
        <h2 className="section-label">Investimento</h2>
        <div className="price-card">
          <span className="price-old-label">Valor do curso</span>
          <div className="price-main">
            R$ 470<span>,00</span>
          </div>
          <span className="price-note">à vista (dinheiro ou PIX)</span>
          <div className="price-split">
            ou em até <strong>3x no cartão</strong> (juros conforme a bandeira)
          </div>
          <ul className="price-details">
            <li>
              <strong>Inscrição de R$ 150,00</strong> para garantir a vaga
              <small>não reembolsável em caso de desistência ou não comparecimento</small>
            </li>
            <li>
              Saldo pago <strong>até o dia do curso</strong>
            </li>
          </ul>
          <a className="cta-btn" href={inscricaoHref} target="_blank" rel="noopener noreferrer">
            <IconWhatsapp /> Quero me inscrever
          </a>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="course-section reveal">
        <div className="final-cta">
          <h3>Pronta para dar esse passo?</h3>
          <p>
            Vagas limitadas para garantir a qualidade da prática. Fale comigo e reserve a sua.
          </p>
          <a className="cta-btn light" href={inscricaoHref} target="_blank" rel="noopener noreferrer">
            <IconWhatsapp /> Falar no WhatsApp
          </a>
          <a className="phone-line" href="tel:+5551998599983">
            📱 (51) 99859-9983
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="logo">
          Adry<small>Cosméticos</small>
        </div>
        <p className="copy">
          © {new Date().getFullYear()} Adry Cosméticos · Cachoeirinha/RS
          <br />
          <Link to="/" className="back-foot">
            ‹ Voltar para a página inicial
          </Link>
        </p>
      </footer>

      {/* BARRA FIXA DE CONVERSÃO */}
      <div className="sticky-cta">
        <div className="sc-price">
          <small>Investimento</small>
          <strong>R$ 470,00</strong>
        </div>
        <a className="sc-btn" href={inscricaoHref} target="_blank" rel="noopener noreferrer">
          Garantir vaga
        </a>
      </div>

      {/* LIGHTBOX DEPOIMENTOS */}
      {zoom && (
        <div className="lightbox" onClick={() => setZoom(null)} role="dialog" aria-modal="true">
          <button className="lb-close" aria-label="Fechar" onClick={() => setZoom(null)}>
            ×
          </button>
          <img src={zoom} alt="Depoimento ampliado" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}
