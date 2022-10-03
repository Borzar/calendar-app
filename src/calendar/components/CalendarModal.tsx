import 'react-datepicker/dist/react-datepicker.css'
import { Modal, TextInput, Button, Box } from '@mantine/core'

export const CalendarModal = ({
  viewEvent,
  setViewEvent,
  openModal,
  setOpenModal,
}: any) => {

  //  IN PROGRESS 

  return (
    <>
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title='Event'
      >
        <form >
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

            { /*           <TextInput
              label='Title'
              placeholder='Title'
              name='title'
              value={formValues.title}
              onChange={(e) =>
                setFormValues({ ...formValues, title: e.target.value })
              }
            />
            <TextInput
              label='Notes'
              placeholder='Notes'
              mt='sm'
              name='notes'
              value={formValues.notes}
              onChange={(e) =>
                setFormValues({...formValues, notes: e.target.value })
              }
            />*/ }  
            <Button mt={16} type='submit'>
              edit
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  )
}
