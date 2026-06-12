import { useEffect, useState } from 'react'
import { api } from '../services/api'
import StatsCards from '../components/StatsCards'
import TachoCard from '../components/TachoCard'

export default function Estado() {
  const [tachos, setTachos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    api.getTachos()
      .then(data => mounted && setTachos(data))
      .catch(err => mounted && setError(err.message))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  if (loading) {
    return (
      <section className="page estado-page" aria-busy="true">
        <StatsCards />
        <div className="tachos-grid" role="list" aria-label="Tachos cargando">
          {[...Array(5)].map((_, i) => (
            <article key={i} className="tacho-card skeleton" role="listitem">
              <div className="tacho-header">
                <div className="skeleton" style={{ width: '40px', height: '20px' }} />
                <div className="skeleton" style={{ width: '100px', height: '24px' }} />
              </div>
              <div className="skeleton" style={{ width: '60%', height: '24px', margin: '16px 0' }} />
              <div className="skeleton" style={{ height: '8px', borderRadius: '4px' }} />
              <div className="skeleton" style={{ width: '80%', height: '14px', marginTop: '8px' }} />
            </article>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="page estado-page" role="alert">
        <StatsCards />
        <div className="error-state">
          <p>Error cargando tachos: {error}</p>
          <button onClick={() => window.location.reload()} className="btn-retry">Reintentar</button>
        </div>
      </section>
    )
  }

  return (
    <section className="page estado-page">
      <header className="page-header">
        <h1>Estado General de los Tachos</h1>
        <p className="page-subtitle">Monitoreo en tiempo real del nivel de llenado</p>
      </header>
      <StatsCards />
      <div className="tachos-section">
        <h2 className="section-title">Estado Individual</h2>
        <div className="tachos-grid" role="list" aria-label="Lista de tachos">
          {tachos.length === 0 ? (
            <div className="empty-state" role="status">
              <p>No hay tachos registrados</p>
            </div>
          ) : (
            tachos.map(tacho => (
              <TachoCard key={tacho.id} tacho={tacho} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}