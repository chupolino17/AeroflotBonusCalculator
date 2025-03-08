import { normalize, schema } from 'normalizr'

export function normalizeTicket(ticketList) {
  const legSchema = new schema.Entity('legs')
  const ticketSchema = new schema.Entity('ticket', { leg: [legSchema] })

  return normalize(ticketList, [ticketSchema])
}
