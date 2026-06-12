import { api } from '../services/api'
import { useEffect, useState } from 'react'

const STATS_CONFIG = [
  { key: 'total', label: 'Total Tachos', icon: '🗑️', color: 'var(--color-primary)' },
  { key: 'llenos', label: 'Llenos', icon: '🔴', color: 'var(--color-danger)' },
  { key: 'disponibles', label: 'Disponibles', icon: '🟢', color: 'var(--color-success)' }
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
        {STATS_CONFIG.map(() => (
          <div key={Math.random()} className="stat-card skeleton">
            <div className="stat-icon" />
            <div className="stat-content">
              <div className="stat-value skeleton" />
              <div className="stat-label skeleton" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="stats-grid" role="alert">
        <div className="stat-card error">
          <span>⚠️</span>
          <p>Error cargando estadísticas: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="stats-grid" role="region" aria-label="Resumen de métricas">
      {STATS_CONFIG.map(({ key, label, icon, color }) => (
        <article key={key} className="stat-card" style={{ '--card-color': color }}>
          <div className="stat-icon" style={{ backgroundColor: color }} aria-hidden="true">{icon}</div>
          <div className="stat-content">
            <div className="stat-value">{stats[key] ?? 0}</div>
            <div className="stat-label">{label}</div>
          </div>
        </article>
      ))}
    </div>
  )
}