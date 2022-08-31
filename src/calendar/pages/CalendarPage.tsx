import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker'
import { addHours } from 'date-fns'
import { NavbarApp, NavBar } from '../components'
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
import { useTranslation } from 'react-i18next'

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
  const { t, i18n } = useTranslation('calendarPage')
  const { myEvents, setMyEvents }: any = useCalendarEvents()
  const [openedCollapse, setOpenedCollapse] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  const [formValues, setFormValues]: any = useState({
    id: new Date().getTime(),
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 1),
  })

  const en = 'español'
  const es = 'ingles'

  const onSubmitNewEvent = (e: any) => {
    e.preventDefault()
    setMyEvents([...myEvents, formValues])
    setOpenedCollapse(false)
  }

  const onDoubleClickEvent = (event: any) => {
    setFormValues({ ...event })
    setOpenModal(true)
  }
  const onSelectEvent = (event: any) => {
    setFormValues({ ...event })
    setOpenedCollapse(true)
  }

  const onViewChange = (event: any) => {
    console.log({ MyOnViewChange: event })
  }

  const changeLanguage = (e: any) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <AppShell
      header={<NavbarApp />}
      navbar={
        <NavBar width={{ base: 300 }} height={500} p='xs'>
          <Button onClick={() => setOpenedCollapse((o) => !o)}>
            {t('addButton')}
          </Button>
          <Collapse in={openedCollapse} transitionDuration={500}>
            <form onSubmit={onSubmitNewEvent}>
              <h1>{t('newEvent')}</h1>
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
                  label={t('titleForm')}
                  placeholder='Title'
                  name='title'
                  required
                  value={formValues.title}
                  onChange={(e) =>
                    setFormValues({ ...formValues, title: e.target.value })
                  }
                />
                <Textarea
                  label={t('notesForm')}
                  placeholder='Notes'
                  mt='sm'
                  name='notes'
                  value={formValues.notes}
                  onChange={(e) =>
                    setFormValues({ ...formValues, notes: e.target.value })
                  }
                />
                <div>
                  <Button type='submit'>{t('doneButton')}</Button>
                </div>
                <div>
                  <button onClick={changeLanguage} value='en-US'>
                    {t('changeMylenguage')}
                  </button>
                </div>
                <div>
                  <button onClick={changeLanguage} value='es-CL'>
                    {t('changeMylenguage')}
                  </button>
                </div>
              </Box>
            </form>
          </Collapse>
        </NavBar>
      }
    >
      {/* <CalendarModal
        formValues={formValues}
        setFormValues={setFormValues}
        openModal={openModal}
        setOpenModal={setOpenModal}
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
        onSelectEvent={onSelectEvent}
      />
    </AppShell>
  )
}
