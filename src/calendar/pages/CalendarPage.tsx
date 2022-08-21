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
  const { myEvents, setMyEvents }: any = useCalendarEvents()
  const [edit, setEdit] = useState(false)
  const [openedCollapse, setOpenedCollapse] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [tempEvent, setTempEvent]: any = useState({})
  const [formValues, setFormValues]: any = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 1),
  })

  const onDoubleClickEvent = (event: any) => {
    setFormValues({ ...event })
    setOpenModal(true)
  }

  // AT WORK
  const onEditEvent = (event: any) => {
    // findIndex regresara un booleano
    // este booleano le indica a findIndex que hemos encontrado el valor.
    // es decir, la función va a recorrer el arreglo, y comparará los
    // valores con la búsqueda. Si la función regresa false, seguirá buscando.
    // si regresa true, se detiene y nos da el índice.

    // el metodo splice cambia el contenido del arreglo eliminando o
    // sustituyendo los elementos existentes por otros nuevos

    setOpenedCollapse(true)
    setEdit(true)
    setFormValues({ ...event })
    const newEvent = {
      id: tempEvent.id,
      title: tempEvent.title,
      notes: tempEvent.notes,
    }
    const index = myEvents.findIndex((x: any) => x._id === tempEvent.id)
    const newEventList = [...myEvents]

    newEventList.splice(index, 1, newEvent)
    setMyEvents(newEventList)
  }

  const onViewChange = (event: any) => {
    console.log({ MyOnViewChange: event })
  }

  const onCancelSubmit = () => {
    setOpenedCollapse(false)
  }

  const onSubmitNewEvent = (e: any) => {
    e.preventDefault()
    setMyEvents([...myEvents, formValues])
    setOpenedCollapse(false)
    setEdit(false)
  }

  return (
    <AppShell
      header={<NavbarApp />}
      navbar={
        <NavBar width={{ base: 300 }} height={500} p='xs'>
          {edit ? (
            <Button onClick={() => setOpenedCollapse((o) => !o)}>Edit</Button>
          ) : (
            <Button onClick={() => setOpenedCollapse((o) => !o)}>add</Button>
          )}
          <Collapse in={openedCollapse} transitionDuration={500}>
            <form onSubmit={onSubmitNewEvent}>
              <Box>
                <DatePicker
                  selected={formValues.start}
                  onChange={(start) => setFormValues({ ...formValues, start })}
                  showTimeSelect
                  dateFormat='Pp'
                />
                <DatePicker
                  selected={formValues.end}
                  onChange={(end) => setFormValues({ ...formValues, end })}
                  minDate={formValues.end}
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
                {edit ? (
                  <div>
                    <Button type='submit'>done</Button>
                    <Button onClick={onCancelSubmit}>cancel</Button>
                  </div>
                ) : (
                  <div>
                    <Button type='submit'>done</Button>
                    <Button>cancel</Button>
                  </div>
                )}
              </Box>
            </form>
          </Collapse>
        </NavBar>
      }
    >
      {/* <CalendarModal
        formValues={formValues}
        setFormValues={setFormValues}
        initialEvent={initialEvent}
        setInitialEvent={setInitialEvent}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onDoubleClickEvent={onDoubleClickEvent}
      /> */}
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc( 100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClickEvent}
        onView={onViewChange}
        onSelectEvent={onEditEvent}
      />
    </AppShell>
  )
}
