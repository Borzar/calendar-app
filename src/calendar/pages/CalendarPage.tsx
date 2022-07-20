import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'
import { CalendarEvent, CalendarModal, NavbarApp } from '../components'
import { AppShell } from '@mantine/core'
import { localizer } from '../../helpers'
import { useState } from 'react'

const events = [
  {
    title: 'Cumpleaños',
    notes: 'Comprar cosas',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#E3FAFC',
    user: {
      _id: '123',
      name: 'Boris',
    },
  },
]

export const CalendarPage = () => {
  const [viewModal, setViewModal] = useState(false)
  const eventStyleGetter: any = (
    event: any,
    start: any,
    end: any,
    isSelected: any
  ) => {
    const style = {
      backgroundColor: '#22B8CF',
      color: 'black',
    }

    return {
      style,
    }
  }

  const onDoubleClickEvent = () => {
    setViewModal(true)
  }

  const onSelect = (event: any) => {
    console.log({ MyOnSelectEvent: event })
  }

  const onViewChange = (event: any) => {
    console.log({ MyOnViewChange: event })
  }

  return (
    <AppShell header={<NavbarApp />}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc( 100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal viewModalComp={viewModal} setViewModal={setViewModal} />
    </AppShell>
  )
}
