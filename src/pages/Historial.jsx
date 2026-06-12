import { useEffect, useRef, useState, useMemo } from 'react'
import { api, calculateFillPercentage, API_BASE } from '../services/api'
import { subscribeToHistorial } from '../services/supabase'

const COLUMNS = [
  { key: 'creado_en', label: 'Fecha y Hora', render: (v) => new Date(v).toLocaleString('es-ES') },
  { key: 'tacho_nombre', label: 'Tacho', render: (v) => v || '—' },
  { key: 'distancia', label: 'Distancia (cm)', render: (v) => v === -1 ? 'Error' : `${v} cm` },
  { key: 'porcentaje', label: 'Llenado (%)', render: (v) => `${v}%` }
]

export default function Historial() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterTacho, setFilterTacho] = useState('')
  const tachoMapRef = useRef(new Map())

  useEffect(() => {
    let mounted = true
    api.getTachos()
      .then(async (tachos) => {
        if (!mounted) return
        const tachoMap = new Map(tachos.map(t => [t.id, t]))
        tachoMapRef.current = tachoMap
        const allRecords = []
        for (const [id, tacho] of tachoMap) {
          try {
            const res = await fetch(`${API_BASE}/tachos/${id}/historial`)
            if (res.ok) {
              const data = await res.json()
              allRecords.push(...data.map(r => ({
                tacho_id: r.tacho_id,
                creado_en: r.creado_en,
                distancia: r.distancia,
                tacho_nombre: tacho?.nombre,
                porcentaje: calculateFillPercentage(r.distancia)
              })))
            }
          } catch (e) {
            console.error(`Error fetching historial for tacho ${id}:`, e)
          }
        }
        mounted && setRecords(allRecords.sort((a, b) => new Date(b.creado_en) - new Date(a.creado_en)))
      })
      .catch(err => mounted && setError(err.message))
      .finally(() => mounted && setLoading(false))

    const unsubscribe = subscribeToHistorial((nuevo) => {
      const tacho = tachoMapRef.current.get(nuevo.tacho_id)
      setRecords(prev => [{
        tacho_id: nuevo.tacho_id,
        creado_en: nuevo.creado_en,
        distancia: nuevo.distancia,
        tacho_nombre: tacho?.nombre,
        porcentaje: calculateFillPercentage(nuevo.distancia)
      }, ...prev])
    })

    return () => {
      mounted = false
      unsubscribe()
    }
  }, [])

  const tachoOptions = useMemo(() => {
    const names = [...new Set(records.map(r => r.tacho_nombre).filter(Boolean))]
    return ['', ...names.sort()]
  }, [records])

  const filteredRecords = useMemo(() => {
    if (!filterTacho) return records
    return records.filter(r => r.tacho_nombre === filterTacho)
  }, [records, filterTacho])

  if (loading) {
    return (
      <section className="page historial-page" aria-busy="true">
        <header className="page-header">
          <h1>Historial de Mediciones</h1>
          <p className="page-subtitle">Registros cronológicos de sensores</p>
        </header>
        <div className="table-skeleton">
          <div className="filter-skeleton" />
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {COLUMNS.map(col => <th key={col.key}><div className="skeleton" style={{ width: '100px', height: '16px' }} /></th>)}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {COLUMNS.map(col => <td key={col.key}><div className="skeleton" /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="page historial-page" role="alert">
        <header className="page-header">
          <h1>Historial de Mediciones</h1>
        </header>
        <div className="error-state">
          <p>Error cargando historial: {error}</p>
          <button onClick={() => window.location.reload()} className="btn-retry">Reintentar</button>
        </div>
      </section>
    )
  }

  return (
    <section className="page historial-page">
      <header className="page-header">
        <h1>Historial de Mediciones</h1>
        <p className="page-subtitle">Registros cronológicos de sensores (más reciente primero)</p>
      </header>
      <div className="historial-filters">
        <label htmlFor="tacho-filter" className="filter-label">Filtrar por tacho:</label>
        <select
          id="tacho-filter"
          value={filterTacho}
          onChange={(e) => setFilterTacho(e.target.value)}
          className="filter-select"
        >
          {tachoOptions.map(opt => (
            <option key={opt} value={opt}>{opt || 'Todos los tachos'}</option>
          ))}
        </select>
        <span className="record-count">{filteredRecords.length} registro(s)</span>
      </div>
      <div className="table-wrapper">
        {filteredRecords.length === 0 ? (
          <div className="empty-state" role="status">
            <p>No hay registros disponibles</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                {COLUMNS.map(col => <th key={col.key} scope="col">{col.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={`${record.tacho_id}-${record.creado_en}-${index}`}>
                  {COLUMNS.map(col => (
                    <td key={col.key}>{col.render(record[col.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}