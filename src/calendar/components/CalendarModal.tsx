import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useCalendarEvents } from '../../hooks'
import { Modal, Textarea, TextInput, Button, Box } from '@mantine/core'
import { useEffect, useState } from 'react'
import { addHours } from 'date-fns/esm'

export const CalendarModal = ({
  formValues,
  openModal,
  setOpenModal,
  onDoubleClickEvent,
}: any) => {
  const { initialEvent, setInitialEvent }: any = useCalendarEvents()
  const [editForm, setEditForm]: any = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 1),
  })
  const [editStartDate, setEditStartDate] = useState()
  const [editEndDate, setEditEndDate] = useState()
  const [editTitle, setEditTitle] = useState()
  const [editNotes, setEditNotes] = useState()

  useEffect(() => {
    setEditForm({ ...formValues })
  }, [formValues])

  // const onEditEvent = (e: any) => {
  //   e.preventDefault()
  //   setInitialEvent([...editForm, initialEvent])
  // }
  console.log({ initialEvent }, initialEvent)

  return (
    <>
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title='Edit Event'
      >
        <form>
          <Box sx={{ maxWidth: 340 }} mx='auto'>
            {/* <DatePicker
              selected={formValues.start}
              onChange={(e: any) =>
                setFormValues({ ...formValues, start: e.target.value })
              }
              showTimeSelect
              dateFormat='Pp'
              required
            />
            <DatePicker
              selected={formValues.end}
              onChange={(e: any) =>
                setFormValues({ ...formValues, end: e.target.value })
              }
              minDate={formValues.end}
              showTimeSelect
              dateFormat='Pp'
              required
            /> */}
            <TextInput
              label='Title'
              placeholder='Title'
              name='title'
              value={editForm.title}
              onChange={(e) => setEditForm(e.target.value)}
            />
            <Textarea
              label='Notes'
              placeholder='Notes'
              mt='sm'
              name='notes'
              value={editForm.notes}
              onChange={(e) => setEditForm(e.target.value)}
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
