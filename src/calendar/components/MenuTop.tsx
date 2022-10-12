import { Button, Box, Overlay } from '@mantine/core'
import { UserCircle } from 'tabler-icons-react'

export const MenuTop = () => {
  return (
    <>
      <Overlay
        opacity={1}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '#A5D8FF',
          position: 'fixed',
          width: '100%',
          height: 36,
        }}
      >
        <Box>
          <Button color='dark' variant='subtle' leftIcon={<UserCircle />}>
            Logout
          </Button>
        </Box>
      </Overlay>
    </>
  )
}
