import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker'
import { addHours } from 'date-fns'
import { CalendarModal, NavbarApp } from '../components'
import { localizer } from '../../helpers'
import { useCalendarEvents } from '../../hooks'
import { AppShell, Box, Button, Textarea, TextInput } from '@mantine/core'

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

export const CalendarPage = () => {
  const { setInitialEvent, initialEvent }: any = useCalendarEvents()
  const [openModal, setOpenModal] = useState(false)
  const [formValues, setFormValues]: any = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 1),
  })

  const onDoubleClickEvent = (event: any) => {
    setOpenModal(true)
    console.log({ onDoubleClickEvent: event })
  }

  const onSelect = (event: any) => {
    console.log({ onSelectEvent: event })
  }

  const onViewChange = (event: any) => {
    console.log({ MyOnViewChange: event })
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    setInitialEvent([...initialEvent, formValues])
    console.log(initialEvent)
  }
  return (
    <AppShell header={<NavbarApp />}>
      <CalendarModal openModal={openModal} setOpenModal={setOpenModal} />
      <form onSubmit={onSubmit}>
        <Box sx={{ maxWidth: 340 }} mx='auto'>
          <DatePicker
            selected={formValues.start}
            onChange={(start) => setFormValues({ ...formValues, start })}
            required
            showTimeSelect
            dateFormat='Pp'
          />
          <DatePicker
            selected={formValues.end}
            onChange={(end) => setFormValues({ ...formValues, end })}
            minDate={formValues.end}
            required
            showTimeSelect
            dateFormat='Pp'
          />
          <TextInput
            label='Title'
            placeholder='Title'
            name='title'
            value={formValues.title}
            onChange={(e) =>
              setFormValues({ ...formValues, title: e.target.value })
            }
          />
          <Textarea
            label='Notes'
            placeholder='Notes'
            mt='sm'
            name='notes'
            value={formValues.notes}
            onChange={(e) =>
              setFormValues({ ...formValues, notes: e.target.value })
            }
          />
          <Button type='submit'>Save</Button>
        </Box>
      </form>
      <Calendar
        localizer={localizer}
        events={initialEvent}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc( 100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClickEvent}
        onView={onViewChange}
        onSelectEvent={onSelect}
      />
    </AppShell>
  )
}
