import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { NavbarApp, CalendarModal } from '../components'
import { localizer } from '../../helpers'
import { useCalendarEvents } from '../../hooks'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { DatePicker } from '@mantine/dates'
import {
  AppShell,
  Box,
  Collapse,
  Divider,
  TextInput,
  Button
} from '@mantine/core'

const eventStyleGetter: any = (
  event: any,
  start: Date,
  end: Date,
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

type formValuesProps = {
  id: number
  title: string
  notes: string
  start: Date
  end: Date
}

export const CalendarPage = () => {
  const { myEvents, setMyEvents }: any = useCalendarEvents()
  const [openModal, setOpenModal] = useState(false)
  const [viewEvent, setViewEvent] = useState(null)
  const [opened, setOpened] = useState(false)
  const { control, handleSubmit } = useForm<formValuesProps>()

  const onSubmit: SubmitHandler<formValuesProps> = (data) => {
    console.log(data)
    setMyEvents([...myEvents, data])
  }

  const onDoubleClickEvent = (event: any) => {
    setViewEvent({ ...myEvents })
    setOpenModal(true)
  }
  const onSelectEvent = (event: any) => {
    console.log(event)
    setViewEvent({ ...event })
  }

  const onViewChange = (event: any) => {
    console.log({ MyOnViewChange: event })
  }

  return (
    <AppShell header={<NavbarApp />}>
      <CalendarModal
        viewEvent={viewEvent}
        setViewEvent={setViewEvent}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <Box sx={{ marginBottom: 12, display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
        <Button onClick={() => setOpened((o) => !o)}>+</Button>
        <Collapse in={opened}>
          <Box sx={{ marginTop: 12, marginBottom: 12, padding: 18, border: 'solid', borderWidth: 0.1, borderRadius: 10, borderColor: '#d9d9d9'}}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex',  }}>
                  <Controller
                    name='start'
                    control={control}
                    defaultValue={new Date()}
                    render={({ field }) => (
                      <DatePicker
                        sx={{ marginRight: 10 }}
                        label='Initial date'
                        minDate={new Date()}
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                      />
                    )}
                  />
                  <Controller
                    name='end'
                    control={control}
                    defaultValue={new Date()}
                    render={({ field }) => (
                      <DatePicker
                        sx={{ marginRight: 10 }}
                        label='Final date'
                        minDate={new Date()}
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                      />
                    )}
                  />
                  <Controller
                    name='title'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextInput
                        sx={{ marginRight: 10 }}
                        label='Title'
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                      />
                    )}
                  />
                  <Controller
                    name='notes'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextInput
                        sx={{ marginRight: 10 }}
                        label='Notes'
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                      />
                    )}
                  />
                  <Box sx={{ marginTop: 25 }}>
                    <Button sx={{ alignItems: 'center' }} type='submit'>
                      Done
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
        </Collapse>
      </Box>
      <Divider sx={{ margin: 16 }} />
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc( 100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClickEvent}
        onView={onViewChange}
        onSelectEvent={onSelectEvent}
      />
    </AppShell>
  )
}
