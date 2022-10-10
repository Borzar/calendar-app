


import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { MenuTop, CalendarModal, Menu, CalendarTable } from '../components'
import { useCalendarEvents } from '../../hooks'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { DatePicker } from '@mantine/dates'
import {
  AppShell,
  Box,
  Collapse,
  Divider,
  TextInput,
  Button,
  Modal,
} from '@mantine/core'
import { addHours } from 'date-fns'
import {Calendar} from 'react-big-calendar'
import {localizer} from '../../helpers'

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

export type InputValuesProps = {
  id: string
  title: string
  notes: string
  start: Date
  end: Date
}

export const EventsPage = () => {
  const { myEvents, setMyEvents }: any = useCalendarEvents()
  const [openModal, setOpenModal] = useState(false)
  const [opened, setOpened] = useState(false)
  const { control, handleSubmit, setValue } = useForm<InputValuesProps>()
  const [initialValuesEditForm, setInitialValuesEditForm] =
    useState<InputValuesProps>({
      id: '',
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 1),
    })
  const [currentData, setCurrentData] = useState<InputValuesProps>(
    initialValuesEditForm
  )

  const editFormValues = (input: InputValuesProps) => {
    setOpenModal(true)
    setCurrentData({
      id: input.id,
      title: input.title,
      notes: input.notes,
      start: input.start,
      end: input.end,
    })
  }

  const updateData = (id: string, updatedData: InputValuesProps) => {
    setOpenModal(false)
    setMyEvents(
      myEvents.map((x: InputValuesProps) => (x.id === id ? updatedData : x))
    )
  }

  const deleteEvent = (id: string) => {
    setMyEvents(myEvents.filter((x: InputValuesProps) => x.id !== id))
  }

  const onSubmit: SubmitHandler<InputValuesProps> = (data) => {
    data.id = uuidv4()
    setMyEvents([...myEvents, data])
    setValue('title', '')
    setValue('notes', '')
    setValue('start', new Date())
    setValue('end', new Date())
  }

  const onDoubleClickEvent = (event: any, data: any) => {
    editFormValues(event)
  }

  const onSelectEvent = (event: any) => {
    //console.log(event)
  }

  const onViewChange = (event: any) => {
    console.log({ MyOnViewChange: event })
  }

  return (
    <AppShell 
      header={<MenuTop/>}
      navbar={<Menu />}
    >
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title='edit event'
      >
        <CalendarModal
          control={control}
          currentData={currentData}
          updateData={updateData}
          deleteEvent={deleteEvent}
        />
      </Modal>
      <Box
        sx={{
          marginBottom: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button onClick={() => setOpened((o) => !o)}>+</Button>
        <Collapse in={opened}>
          <Box
            sx={{
              marginTop: 12,
              marginBottom: 12,
              padding: 18,
              border: 'solid',
              borderWidth: 0.1,
              borderRadius: 10,
              borderColor: '#d9d9d9',
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex' }}>
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
      <CalendarTable
        deleteEvent={deleteEvent}
        editFormValues={editFormValues}
        myEvents={myEvents}
      />
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
