const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function fetchJson(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error desconocido' }))
    throw new Error(error.message || `Error ${response.status}`)
  }

  return response.json()
}

export const api = {
  getTachos: () => fetchJson('/tachos'),
  getFullTachos: () => fetchJson('/tachos/llenos'),
  getStats: () => fetchJson('/tachos/stats')
}

export function calculateFillPercentage(distancia) {
  const MAX_DIST = 120
  const UMBRAL = 25

  if (distancia === -1 || distancia >= MAX_DIST) return 0
  if (distancia <= UMBRAL) return 100

  return Math.round(((MAX_DIST - distancia) / MAX_DIST) * 100)
}

export function isFull(distancia) {
  return distancia !== -1 && distancia <= 25
}