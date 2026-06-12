export default function ProgressBar({ percentage, label, className = '' }) {
  const getColor = (pct) => {
    if (pct >= 100) return 'var(--color-danger)'
    if (pct >= 75) return 'var(--color-warning)'
    if (pct >= 50) return 'var(--color-info)'
    return 'var(--color-success)'
  }

  const color = getColor(percentage)

  return (
    <div className={`progress-bar ${className}`} role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label={label || `Nivel de llenado: ${percentage}%`}>
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-value" style={{ color }}>{percentage}%</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  )
}