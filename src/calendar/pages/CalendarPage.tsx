import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker'
import { addHours } from 'date-fns'
import { CalendarModal, NavbarApp, NavBar } from '../components'
import { localizer } from '../../helpers'
import { useCalendarEvents } from '../../hooks'
import {
  AppShell,
  Box,
  Button,
  Textarea,
  TextInput,
  Collapse,
} from '@mantine/core'

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
  const [openedCollapse, setOpenedCollapse] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [formValues, setFormValues]: any = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 1),
  })

  const onDoubleClickEvent = (event: any) => {
    setFormValues({...event })
    setOpenModal(true)
    console.log({ onDoubleClickEvent: event })
  }

  const onSelect = (event: any) => {
    console.log({ onSelectEvent: event })
  }

  const onViewChange = (event: any) => {
    console.log({ MyOnViewChange: event })
  }

  const onSubmitNewEvent = (e: any) => {
    e.preventDefault()
    setInitialEvent([...initialEvent, formValues])
    setOpenedCollapse(false)
    console.log(initialEvent)
  }
  return (
    <AppShell
      header={<NavbarApp />}
      navbar={
        <NavBar width={{ base: 300 }} height={500} p='xs'>
          <Button onClick={() => setOpenedCollapse((o) => !o)}>
            Add event
          </Button>
          <Collapse in={openedCollapse} transitionDuration={500}>
            <form onSubmit={onSubmitNewEvent}>
              <Box>
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
                  required
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
          </Collapse>
        </NavBar>
      }
    >
      <CalendarModal
        formValues={formValues}
        setFormValues={setFormValues}
        initialEvent={initialEvent}
        setInitialEvent={setInitialEvent}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
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
