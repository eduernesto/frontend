import ProgressBar from './ProgressBar'
import { calculateFillPercentage, isFull } from '../services/api'

export default function TachoCard({ tacho }) {
  const percentage = tacho.porcentaje ?? calculateFillPercentage(tacho.distancia_actual)
  const full = tacho.esta_lleno ?? isFull(tacho.distancia_actual)
  const distancia = tacho.distancia_actual

  return (
    <article className={`tacho-card ${full ? 'full' : ''}`}>
      <div className="tacho-header">
        <div className="tacho-id">#{tacho.id}</div>
        <div className={`tacho-status ${full ? 'status-full' : 'status-ok'}`} aria-live="polite">
          {full ? '🔴 LLENO' : '🟢 DISPONIBLE'}
        </div>
      </div>
      <h3 className="tacho-name">{tacho.nombre || 'Sin nombre'}</h3>
      <ProgressBar
        percentage={percentage}
        label={`Distancia: ${distancia === -1 ? 'Error' : `${distancia} cm`}`}
      />
      <div className="tacho-meta">
        <span className="tacho-distance">
          {distancia === -1 ? 'Sensor error' : `${distancia} cm de ${120} cm`}
        </span>
        {full && <span className="tacho-alert">⚠ Requiere recolección</span>}
      </div>
    </article>
  )
}