import { addHours } from 'date-fns'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

type DefaultEventsProps = {
  id: string,
  title: string,
  notes: string,
  start: Date,
  end: Date,
  bgColor?: string,
  user: {
    _id: string,
    name: string
  } 
}

const defaultEvents = [
  {
    id: uuidv4(),
    title: 'evento1',
    notes: 'notas del evento1',
    start: new Date(),
    end: addHours(new Date(), 1),
    bgColor: '#D0EBFF',
    user: {
      _id: '123',
      name: 'boris',
    },
  },
]


export const useCalendarEvents = () => {
  const [myEvents, setMyEvents] = useState<DefaultEventsProps[]>(defaultEvents)

  return {
    myEvents,
    setMyEvents,
  }
}
