import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const tabs = [
    { path: '/', label: 'Estado', icon: '📊', exact: true },
    { path: '/historial', label: 'Historial', icon: '📋' }
  ]

  return (
    <nav className="navbar" role="navigation" aria-label="Navegación principal">
      <div className="navbar-brand">
        <span className="logo">🗑️</span>
        <span className="title">EcoSmart Dashboard</span>
      </div>
      <div className="navbar-tabs" role="tablist">
        {tabs.map(({ path, label, icon, exact }) => (
          <NavLink
            key={path}
            to={path}
            end={exact}
            role="tab"
            className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
          >
            <span className="tab-icon" aria-hidden="true">{icon}</span>
            <span className="tab-label">{label}</span>
          </NavLink>
        ))}
      </div>
      <div className="navbar-status">
        <span className="status-indicator" aria-live="polite"></span>
        <span className="status-text">Conectado</span>
      </div>
    </nav>
  )
}