import { Button, Box } from '@mantine/core'
import { UserCircle } from 'tabler-icons-react'

export const MenuTop = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: 'indigo',
        }}
      >
        <Box>
          <Button 
            color='violet'
            leftIcon={<UserCircle />}>
            Logout
          </Button>
        </Box>
      </Box>
    </>
  )
}
