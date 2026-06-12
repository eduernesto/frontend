import { api } from '../services/api'
import { useEffect, useState } from 'react'

const STATS_CONFIG = [
  { key: 'total', label: 'Total Tachos', color: 'var(--color-primary)' },
  { key: 'llenos', label: 'Llenos', color: 'var(--color-danger)' },
  { key: 'disponibles', label: 'Disponibles', color: 'var(--color-success)' }
]

export default function StatsCards() {
  const [stats, setStats] = useState({ total: 0, llenos: 0, disponibles: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    api.getStats()
      .then(data => mounted && setStats(data))
      .catch(err => mounted && setError(err.message))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  if (loading) {
    return (
      <div className="stats-grid" aria-busy="true">
        {STATS_CONFIG.map((_, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon skeleton" />
            <div className="stat-content">
              <div className="stat-value skeleton" style={{ height: '28px', width: '60px' }} />
              <div className="stat-label skeleton" style={{ height: '14px', width: '100px', marginTop: '6px' }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="stats-grid" role="alert">
        <div className="stat-card">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Error cargando estadísticas: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="stats-grid" role="region" aria-label="Resumen de métricas">
      {STATS_CONFIG.map(({ key, label, color }) => (
        <article key={key} className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: color }} aria-hidden="true">
            <div className="stat-icon-dot" />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats[key] ?? 0}</div>
            <div className="stat-label">{label}</div>
          </div>
        </article>
      ))}
    </div>
  )
}