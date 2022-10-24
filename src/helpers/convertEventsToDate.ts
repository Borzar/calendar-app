import { parseISO } from 'date-fns'

export const convertEventsToDate = (events: any) => {
  return events.map((event: any) => {
    event.start = parseISO(event.start)
    event.end = parseISO(event.end)
    return event
  })
}
