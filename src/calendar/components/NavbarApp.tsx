import { Button, Box } from '@mantine/core'
import { UserCircle } from 'tabler-icons-react'

export const NavbarApp = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '#228BE6',
        }}
      >
        <Box>
          <Button leftIcon={<UserCircle />}>
            Logout
          </Button>
        </Box>
      </Box>
    </>
  )
}
