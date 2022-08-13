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

  useEffect(() => {
    setEditForm({ ...formValues })
  }, [formValues])

  const onEditEvent = (e: any) => {
    e.preventDefault()
    setInitialEvent({
      ...initialEvent,
      title: editForm.title,
      notes: editForm.notes,
    })
    console.log({ editForm }, editForm)
  }

  // console.log({ editForm }, editForm)

  return (
    <>
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title='Edit Event'
      >
        <form onSubmit={onEditEvent}>
          <Box sx={{ maxWidth: 340 }} mx='auto'>
            {/* <DatePicker
              selected={editForm.start}
              onChange={(e: any) =>
                setEditForm({ ...editForm, start: e.target.value })
              }
              showTimeSelect
              dateFormat='Pp'
              required
            />
            <DatePicker
              selected={editForm.end}
              onChange={(e: any) =>
                setEditForm({ ...editForm, end: e.target.value })
              }
              minDate={editForm.end}
              showTimeSelect
              dateFormat='Pp'
              required
            /> */}
            <TextInput
              label='Title'
              placeholder='Title'
              name='title'
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
            />
            <Textarea
              label='Notes'
              placeholder='Notes'
              mt='sm'
              name='notes'
              value={editForm.notes}
              onChange={(e) =>
                setEditForm({ ...editForm, notes: e.target.value })
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
