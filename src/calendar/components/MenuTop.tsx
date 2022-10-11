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
          backgroundColor: 'indigo',
          position: 'fixed',
          width: '100%',
          height: 36,
        }}
      >
        <Box>
          <Button color='violet' leftIcon={<UserCircle />}>
            Logout
          </Button>
        </Box>
      </Overlay>
    </>
  )
}
