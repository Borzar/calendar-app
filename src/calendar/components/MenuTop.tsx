import { Button, Box, Overlay, Text } from '@mantine/core'
import { UserCircle } from 'tabler-icons-react'
import { useEffect, useState } from 'react'
import { apiCalendar } from '../../services'
import { useNavigate } from 'react-router-dom'

export const MenuTop = () => {
  const [user, setUser] = useState<string>()
  const navigate = useNavigate()

  useEffect(() => {
    getNameUser()
  }, [])

  async function getNameUser() {
    try {
      const response = await apiCalendar.get('/auth/renew')
      setUser(response.data.name)
    } catch (error) {
      console.error(error)
    }
  }

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
          backgroundColor: '#A5D8FF',
          position: 'fixed',
          width: '100%',
          height: 55,
        }}
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
            onClick={onLogout}
            color='dark'
            variant='subtle'
            leftIcon={<UserCircle />}
          >
            Logout
          </Button>
        </Box>
      </Overlay>
    </>
  )
}
