import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { MenuTop, CalendarModal, Menu, CalendarTable } from '../components'
import { useCalendarEvents } from '../../hooks'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
  AppShell,
  Box,
  TextInput,
  Button,
  Modal,
  Text,
  Divider,
} from '@mantine/core'
import { addHours } from 'date-fns'
import { Calendar } from 'react-big-calendar'
import { localizer } from '../../helpers'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { createApiEvent, deleteApiEvent, getApiEvents } from '../../services'

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

const schemaNewEvent = yup.object({
  title: yup.string().required(),
  start: yup.date().required().min(new Date()),
  end: yup.date().required().min(addHours(new Date(), 1)),
})

export const CalendarPage = () => {
  const [showCalendar, setShowCalendar] = useState(false)
  const { myEvents, setMyEvents }: any = useCalendarEvents()
  const [openModal, setOpenModal] = useState(false)
  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm<InputValuesProps>({
    resolver: yupResolver(schemaNewEvent),
  })
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

  useEffect(() => {
    getApiEvents(setMyEvents)
  }, [])

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
    deleteApiEvent(id)
  }

  const onSubmit: SubmitHandler<InputValuesProps> = (data) => {
    data.id = uuidv4()
    setMyEvents([...myEvents, data])
    createApiEvent(data)
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
      header={<MenuTop />}
      navbar={<Menu setShowCalendar={setShowCalendar} />}
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
      {showCalendar ? (
        <Box
          sx={{
            marginTop: 50,
          }}
        >
          <Box>
            <Text italic weight={700}>
              NEW EVENT
            </Text>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              marginTop: 12,
              marginBottom: 30,
              padding: 18,
              border: 'solid',
              borderWidth: 0.1,
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
                    <Box sx={{ marginRight: 10 }}>
                      <Text
                        style={{
                          display: 'inline-block',
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#212529',
                        }}
                      >
                        Initial date
                      </Text>
                      <DatePicker
                        minDate={new Date()}
                        onChange={(e) => field.onChange(e)}
                        selected={field.value}
                        showTimeSelect
                        dateFormat='MMMM d, yyyy h:mm aa'
                        className='datePicker'
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'red',
                          fontStyle: 'italic',
                        }}
                      >
                        {errors.start?.message}
                      </Text>
                    </Box>
                  )}
                />
                <Controller
                  name='end'
                  control={control}
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <Box sx={{ marginRight: 10 }}>
                      <Text
                        style={{
                          display: 'inline-block',
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#212529',
                        }}
                      >
                        Final date
                      </Text>
                      <DatePicker
                        minDate={addHours(new Date(), 1)}
                        onChange={(e) => field.onChange(e)}
                        selected={field.value}
                        showTimeSelect
                        dateFormat='MMMM d, yyyy h:mm aa'
                        className='datePicker'
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'red',
                          fontStyle: 'italic',
                        }}
                      >
                        {errors.end?.message}
                      </Text>
                    </Box>
                  )}
                />
                <Controller
                  name='title'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <Box>
                      <TextInput
                        sx={{ marginRight: 10 }}
                        label='Title'
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'red',
                          fontStyle: 'italic',
                        }}
                      >
                        {errors.title?.message}
                      </Text>
                    </Box>
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
                  <Button
                    sx={{ alignItems: 'center' }}
                    variant='gradient'
                    color='black'
                    type='submit'
                  >
                    Done
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
          <Divider my='xl' />
          <CalendarTable
            deleteEvent={deleteEvent}
            editFormValues={editFormValues}
            myEvents={myEvents}
          />
        </Box>
      ) : (
        <Calendar
          localizer={localizer}
          events={myEvents}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 'calc( 70vh - 80px)', marginTop: 50 }}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClickEvent}
          onView={onViewChange}
          onSelectEvent={onSelectEvent}
        />
      )}
    </AppShell>
  )
}
