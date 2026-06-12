import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const tabs = [
    { path: '/', label: 'Estado', exact: true },
    { path: '/historial', label: 'Historial' }
  ]

  return (
    <nav className="navbar" role="navigation" aria-label="Navegación principal">
      <div className="navbar-brand">
        <div className="navbar-logo" aria-hidden="true" />
        <span className="title">EcoSmart Dashboard</span>
      </div>
      <div className="navbar-tabs" role="tablist">
        {tabs.map(({ path, label, exact }) => (
          <NavLink
            key={path}
            to={path}
            end={exact}
            role="tab"
            className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
          >
            <span className="tab-indicator" />
            <span className="tab-label">{label}</span>
          </NavLink>
        ))}
      </div>
      <div className="navbar-status">
        <span className="status-indicator" aria-live="polite" />
        <span className="status-text">Conectado</span>
      </div>
    </nav>
  )
}