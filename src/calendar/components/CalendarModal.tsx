import 'react-datepicker/dist/react-datepicker.css'
import { TextInput, Button, Box } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { InputValuesProps } from '../pages'

export const CalendarModal = (props: any) => {
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: props.currentData,
  })

  setValue('title', props.currentData.title)
  setValue('notes', props.currentData.notes)
  setValue('start', props.currentData.start)
  setValue('end', props.currentData.end)

  const onSubmit: SubmitHandler<InputValuesProps> = (data) => {
    data.id = props.currentData.id
    props.updateData(props.currentData.id, data)
  }

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
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
                Edit
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  )
}
