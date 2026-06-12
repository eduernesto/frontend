import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: { params: { eventsPerSecond: 10 } }
})

export function subscribeToTachos(callback) {
  const channel = supabase
    .channel('tachos-realtime')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'tachos' },
      (payload) => callback(payload.new)
    )
    .subscribe()

  return () => supabase.removeChannel(channel)
}

export function subscribeToHistorial(callback) {
  const channel = supabase
    .channel('historial-realtime')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'historial_mediciones' },
      (payload) => callback(payload.new)
    )
    .subscribe()

  return () => supabase.removeChannel(channel)
}