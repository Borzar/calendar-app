import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addHours } from 'date-fns'
import { useCalendarEvents } from '../../hooks'
import { Modal, Textarea, TextInput, Button, Box } from '@mantine/core'

export const CalendarModal = ({ openModal, setOpenModal }: any) => {
  const { initialEvent, setInitialEvent }: any = useCalendarEvents()
  const [formValues, setFormValues]: any = useState({
    title: 'new title here...',
    notes: 'new notes here...',
    start: new Date(),
    end: addHours(new Date(), 1),
  })

  const onSubmit = (e: any) => {
    e.preventDefault()
    setInitialEvent([...initialEvent, formValues])
    console.log(initialEvent)
  }

  //ocupar un useEffect para mostrar el evento del calendario para editar

  return (
    <>
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title='Edit Event'
      >
        <form onSubmit={onSubmit}>
          <Box sx={{ maxWidth: 340 }} mx='auto'>
            <DatePicker
              selected={formValues.start}
              onChange={(start) => setFormValues({ ...formValues, start })}
              required
            />
            <DatePicker
              selected={formValues.end}
              onChange={(end) => setFormValues({ ...formValues, end })}
              minDate={formValues.end}
              required
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
            <Button mt={16} type='submit'>
              edit
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  )
}
