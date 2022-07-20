import { useState } from 'react'
import { Calendar, Clock } from 'tabler-icons-react'
import { addHours, differenceInSeconds } from 'date-fns'
import { Modal, Textarea } from '@mantine/core'
import { DatePicker, TimeInput } from '@mantine/dates'
import { TextInput, Button, Box, Group } from '@mantine/core'

export const CalendarModal = ({ viewModalComp, setViewModal }: any) => {
  const [errorDate, setDateError] = useState(false)
  const [errorTitle, setTitleError] = useState(false)
  const [formValues, setFormValues] = useState({
    start: new Date(),
    end: addHours(new Date(), 1),
    title: 'Boris',
    notes: 'notes',
  })

  const onInputChange = ({ target }: { target: any }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
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

    console.log(formValues)
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
              placeholder='Start date'
              label='Start date'
              value={formValues.start}
              onChange={(event) => onDateChanged(event, 'start')}
              error={errorDate && 'error'}
              required
            />
            <DatePicker
              icon={<Calendar />}
              placeholder='End date'
              label='End date'
              value={formValues.end}
              onChange={(event) => onDateChanged(event, 'end')}
              minDate={formValues.start}
              error={errorDate && 'error'}
              required
            />
            <TimeInput
              icon={<Clock />}
              label='Pick time start'
              value={formValues.start}
              onChange={(event) => onDateChanged(event, 'start')}
              error={errorDate && 'error'}
              required
            />
            <TimeInput
              icon={<Clock />}
              label='Pick time end'
              value={formValues.end}
              onChange={(event) => onDateChanged(event, 'end')}
              error={errorDate && 'error'}
              required
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
