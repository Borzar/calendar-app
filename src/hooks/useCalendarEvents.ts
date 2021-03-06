import { addHours } from 'date-fns'
import { useState } from 'react'

const tempEvent = {
  _id: new Date().getTime(),
  title: 'Cumpleaños del Jefe',
  notes: 'Comprar pastel',
  start: new Date(),
  end: addHours(new Date(), 1),
  bgColor: '#D0EBFF',
  user: {
    _id: '123',
    name: 'Boris',
  },
}

const newEvent = {
  title: 'new title here...',
  notes: 'new notes here...',
  start: new Date(),
  end: addHours(new Date(), 1),
  bgColor: '#D0EBFF',
  user: {
    _id: '123',
    name: 'Boris',
  },
}

export const useCalendarEvents = () => {
  const [initialEvent, setInitialEvent] = useState([tempEvent])
  const [addNewEvent, setAddNewEvent] = useState([newEvent])

  const onInitialEvent = (event: any) => {
    setInitialEvent(event)
  }

  return {
    setAddNewEvent,
    addNewEvent,
    newEvent,
    tempEvent,
    initialEvent,
    onInitialEvent,
    setInitialEvent,
  }
}
