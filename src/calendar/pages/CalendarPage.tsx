import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {
  AddModalButton,
  CalendarEvent,
  CalendarModal,
  NavbarApp,
} from '../components'
import { AppShell } from '@mantine/core'
import { localizer } from '../../helpers'
import { useState } from 'react'
import { useCalendarEvents } from '../../hooks'

export const CalendarPage = () => {
  const { initialEvent, onInitialEvent }: any = useCalendarEvents()
  const [viewModal, setViewModal] = useState(false)
  const eventStyleGetter: any = (
    event: any,
    start: any,
    end: any,
    isSelected: any
  ) => {
    const style = {
      backgroundColor: '#A5D8FF',
      color: 'black',
    }

    return {
      style,
    }
  }

  const onDoubleClickEvent = (event: any) => {
    setViewModal(true)
  }

  const onSelect = (event: any) => {
    onInitialEvent([event])
  }

  const onViewChange = (event: any) => {
    console.log({ MyOnViewChange: event })
  }

  return (
    <AppShell header={<NavbarApp />}>
      <Calendar
        localizer={localizer}
        events={initialEvent}
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
      <CalendarModal
        viewModalComp={viewModal}
        setViewModal={setViewModal}
      />
    </AppShell>
  )
}
