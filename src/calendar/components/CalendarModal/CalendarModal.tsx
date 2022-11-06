import 'react-datepicker/dist/react-datepicker.css'
import { TextInput, Button, Box, Text } from '@mantine/core'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { InputValuesProps } from '../../pages'
import DatePicker from 'react-datepicker'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addHours } from 'date-fns'
import { updateApiEvent } from '../../../services'

const schemaEditEvent = yup.object({
  title: yup.string().required(),
  start: yup.date().required().min(new Date()),
  end: yup.date().required().min(addHours(new Date(), 1)),
})

export const CalendarModal = ({ updateData, currentData }: any) => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm<InputValuesProps>({
    defaultValues: currentData,
    resolver: yupResolver(schemaEditEvent),
  })

  setValue('title', currentData.title)
  setValue('notes', currentData.notes)
  setValue('start', currentData.start)
  setValue('end', currentData.end)

  const onSubmit: SubmitHandler<InputValuesProps> = (data) => {
    data.id = currentData.id
    updateData(currentData.id, data)
    updateApiEvent(currentData.id, data)
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
