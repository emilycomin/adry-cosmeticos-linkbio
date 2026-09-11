import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Home from './pages/Home.jsx'
import CursoAlongamento from './pages/CursoAlongamento.jsx'
import CursoEsmaltacao from './pages/CursoEsmaltacao.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/curso-alongamento-gel" element={<CursoAlongamento />} />
        <Route path="/curso-esmaltacao-gel" element={<CursoEsmaltacao />} />
        {/* fallback: qualquer rota desconhecida volta para a home */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Analytics />
    </>
  )
}
