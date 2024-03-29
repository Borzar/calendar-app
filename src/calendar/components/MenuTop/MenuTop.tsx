import { Button, Box, Overlay, Text } from '@mantine/core'
import { UserCircle } from 'tabler-icons-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getNameUser } from '../../../services'

export const MenuTop = () => {
  const [user, setUser] = useState<string>()
  const navigate = useNavigate()

  useEffect(() => {
    getNameUser(setUser)
  }, [])

  const onLogout = () => {
    localStorage.clear()
    navigate('/auth')
  }

  return (
    <>
      <Overlay
        opacity={1}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '#662f62',
          color: 'white',
          position: 'fixed',
          width: '100%',
          height: 55,
        }}
        data-testid='menu-top'
      >
        <Box
          sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}
        >
          <Box sx={{ paddingRight: 22 }}>
            <Text weight={700} transform='capitalize'>
              {user?.toLowerCase()}
            </Text>
          </Box>
          <Button
            sx={{ color: 'white', marginRight: '16px' }}
            color='dark'
            onClick={onLogout}
            variant='outline'
            leftIcon={<UserCircle />}
          >
            Logout
          </Button>
        </Box>
      </Overlay>
    </>
  )
}
