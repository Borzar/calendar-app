import { Stack, Button } from '@mantine/core'
import { Calendar, List } from 'tabler-icons-react'

export const Menu = (props: any) => {
  return (
    <Stack
      align='flex-start'
      sx={{
        paddingLeft: 20,
        backgroundColor: '#E7F5FF',
        width: 200,
        paddingTop: 60,
        opacity: '100%',
      }}
    >
      <Button
        color='dark'
        variant='subtle'
        leftIcon={<List />}
        onClick={() => props.setShowCalendar(true)}
      >
        events
      </Button>
      <Button
        color='dark'
        variant='subtle'
        leftIcon={<Calendar />}
        onClick={() => props.setShowCalendar(false)}
      >
        calendar
      </Button>
    </Stack>
  )
}
