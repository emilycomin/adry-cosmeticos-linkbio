import { useState } from 'react'
import { Link } from 'react-router-dom'
import { wa, useReveal, IconWhatsapp, ADDRESS, MAPS_URL } from '../lib.jsx'

const INSCRICAO_MSG =
  'Olá! Tenho interesse no Curso de Alongamento em Gel com a Adriana. Quero mais informações e garantir minha vaga! ✨'
const inscricaoHref = wa(INSCRICAO_MSG)

const CONTEUDO = [
  'Para que serve cada um dos produtos e como utilizá-los',
  'Preparação da unha natural',
  'Controle de produtos',
  'Formatos e acabamento',
  'Manutenção',
  'Remoção',
]

const CRONOGRAMA = [
  { t: 'Teoria', d: 'Fundamentos para trabalhar com segurança' },
  { t: 'Demonstração das técnicas', d: 'A instrutora executa passo a passo' },
  { t: 'Prática', d: 'Auto aplicação ou modelo (por conta da aluna)' },
  { t: 'Coffee break', d: 'Uma pausa para relaxar e trocar ideias' },
  { t: 'Entrega do certificado', d: 'Você sai com seu certificado em mãos' },
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
    d: 'Em compras realizadas no dia do curso, aqui na loja',
  },
]

const GALERIA = [
  '/images/cursos/curso-turma.jpg',
  '/images/cursos/curso-aula.jpg',
  '/images/cursos/curso-kit.jpg',
  '/images/cursos/curso-brinde.jpg',
]

const DEPOIMENTOS = [
  '/images/cursos/depoimento-1.jpg',
  '/images/cursos/depoimento-2.jpg',
  '/images/cursos/depoimento-3.jpg',
]

export default function CursoAlongamento() {
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
          Alongamento
          <br />
          em Gel
        </h1>
        <p className="course-tagline">“Dando asas ao seu talento”</p>

        <div className="course-hero-img">
          <img src="/images/produto-1.jpg" alt="Adriana demonstrando alongamento em gel" />
        </div>

        <p className="instructor">
          com <strong>Adriana Christo</strong> · Instrutora
        </p>

        {/* INFORMAÇÕES DO CURSO */}
        <div className="turma-card">
          <span className="turma-flag">Inscrições abertas</span>
          <ul className="turma-info">
            <li>
              <span className="ti-ico">🕗</span>
              <span className="ti-text">
                <small>Horário</small>
                <strong>13:00 às 19:00</strong>
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

        <div className="pitch">
          🏆 O mercado precisa de qualidade — e você precisa estar pronta. 🚀
        </div>

        <a className="cta-btn" href={inscricaoHref} target="_blank" rel="noopener noreferrer">
          <IconWhatsapp /> Quero garantir minha vaga
        </a>
      </header>

      {/* CONTEÚDO */}
      <section className="course-section reveal">
        <h2 className="section-label">O que você vai aprender</h2>
        <ul className="check-list">
          {CONTEUDO.map((c) => (
            <li key={c}>
              <span className="check">✓</span>
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* CRONOGRAMA */}
      <section className="course-section reveal">
        <h2 className="section-label">Como é o dia</h2>
        <ol className="timeline">
          {CRONOGRAMA.map((c, i) => (
            <li key={c.t}>
              <span className="tl-num">{i + 1}</span>
              <span className="tl-body">
                <strong>{c.t}</strong>
                <span>{c.d}</span>
              </span>
            </li>
          ))}
        </ol>
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

      {/* DURAÇÃO */}
      <section className="course-section reveal">
        <div className="info-cards">
          <div className="info-card">
            <span className="ic-ico">🕗</span>
            <strong>6 horas</strong>
            <span>das 13h às 19h</span>
          </div>
          <div className="info-card">
            <span className="ic-ico">📜</span>
            <strong>Certificado</strong>
            <span>entregue no fim do curso</span>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="course-section reveal">
        <h2 className="section-label">O curso na prática</h2>
        <div className="course-gallery">
          {GALERIA.map((src, i) => (
            <figure key={i}>
              <img src={src} alt={`Curso de alongamento em gel ${i + 1}`} loading="lazy" />
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
            <figure
              key={i}
              className={i === 0 ? 'wide' : ''}
              onClick={() => setZoom(src)}
            >
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
            R$ 590<span>,00</span>
          </div>
          <span className="price-note">à vista (dinheiro ou PIX)</span>
          <div className="price-split">
            ou <strong>parcelado no cartão</strong>
          </div>
          <ul className="price-details">
            <li>
              <strong>Inscrição de R$ 150,00</strong> para garantir a vaga
              <small>o valor faz parte do total do curso</small>
            </li>
            <li>
              Saldo de <strong>R$ 440,00</strong> pago até o dia do curso
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
          <h3>Pronta para elevar o seu nível?</h3>
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
          <strong>R$ 590,00</strong>
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
