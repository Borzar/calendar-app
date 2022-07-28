import { useState, useEffect } from 'react'
import { Calendar, Clock } from 'tabler-icons-react'
import { addHours, differenceInSeconds } from 'date-fns'
import { Modal, Textarea, TextInput, Button, Box, Group } from '@mantine/core'
import { DatePicker, TimeInput } from '@mantine/dates'
import { useCalendarEvents } from '../../hooks'

export const CalendarModal = ({
  tempEvent,
  viewModalComp,
  setViewModal,
}: any) => {
  const [errorDate, setDateError] = useState(false)
  const [errorTitle, setTitleError] = useState(false)
  const [formValues, setFormValues] = useState({
    title: 'asfasf',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 1),
  })

  useEffect(() => {
    setFormValues({ ...tempEvent })
  }
  , [tempEvent])

  const onInputChange = ({ target }: { target: any }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value, //  OBJECT !!!
    })
  }

  const onDateChanged = (event: any, changing: any) => {
    setFormValues({ ...formValues, [changing]: event })
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    const differenceTime = differenceInSeconds(formValues.end, formValues.start)

    if (isNaN(differenceTime) || differenceTime <= 0) {
      setDateError(true)
      return
    }

    if (formValues.title.length <= 0) {
      setTitleError(true)
      return
    }
  }

  return (
    <>
      <Modal
        opened={viewModalComp}
        onClose={() => setViewModal(false)}
        title='New Event'
      >
        <Box sx={{ maxWidth: 340 }} mx='auto'>
          <form onSubmit={onSubmit}>
            <DatePicker
              icon={<Calendar />}
              value={formValues.start}
              onChange={(event) => onDateChanged(event, 'start')}
              label='Start date'
              error={errorDate && 'error'}
              required
            />
            <TimeInput
              icon={<Clock />}
              label='Time start'
              value={formValues.start}
              error={errorDate && 'error'}
            />
            <DatePicker
              icon={<Calendar />}
              value={formValues.end}
              onChange={(event) => onDateChanged(event, 'end')}
              minDate={formValues.end}
              label='End date'
              error={errorDate && 'error'}
              required
            />
            <TimeInput
              icon={<Clock />}
              label='Time end'
              value={formValues.end}
              error={errorDate && 'error'}
            />
            <TextInput
              label='Title'
              placeholder='Title'
              name='title'
              value={formValues.title}
              onChange={onInputChange}
              error={errorTitle && 'error in title'}
            />

            <Textarea
              label='Notes'
              placeholder='Notes'
              mt='sm'
              name='notes'
              value={formValues.notes}
              onChange={onInputChange}
            />
            <Group position='left' mt='md'>
              <Button type='submit'>Save</Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  )
}
