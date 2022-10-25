import { useState } from 'react'

type DefaultEventsProps = {
  id: string
  title: string
  notes: string
  start: Date
  end: Date
  bgColor?: string
  user: {
    _id: string
    name: string
  }
}

export const useCalendarEvents = () => {
  const [myEvents, setMyEvents] = useState<DefaultEventsProps[]>()

  return {
    myEvents,
    setMyEvents,
  }
}
