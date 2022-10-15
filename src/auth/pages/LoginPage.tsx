import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Box, Button, Text, TextInput } from '@mantine/core'
import { userLogin, userRegister } from '../../api/userAuth'
import { useNavigate } from 'react-router-dom'

interface IFormTextInputRegister {
  name: string
  email: string
  password: string
}

interface IFormTextInputLogin {
  email: string
  password: string
}

export const LoginPage = () => {
  const { control: controlRegister, handleSubmit: handleSubmitRegister } =
    useForm<IFormTextInputRegister>()
  const { control: controlLogin, handleSubmit: handleSubmitLogin } =
    useForm<IFormTextInputLogin>()
  const navigate = useNavigate()

  const onSubmitRegister: SubmitHandler<IFormTextInputRegister> = (data) => {
    userRegister(data)
  }

  const checkAuthenticated = () => {
    const userAuthenticated = localStorage.getItem('token')
    if (userAuthenticated) return navigate('/')
  }

  const onSubmitLogin: SubmitHandler<IFormTextInputLogin> = async (data) => {
    localStorage.clear()
    userLogin(data)
    setTimeout(checkAuthenticated, 500)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100vh',
        backgroundColor: '#E7F5FF',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          border: 'solid',
          borderWidth: 1,
          borderColor: '#d9d9d9',
          borderRadius: 5,
          padding: 30,
          width: 400,
          marginRight: 30,
          backgroundColor: '#A5D8FF',
        }}
      >
        <Text
          italic
          weight={800}
          size='xl'
          sx={{ marginBottom: 20, textAlign: 'center' }}
        >
          Register
        </Text>
        <form onSubmit={handleSubmitRegister(onSubmitRegister)}>
          <Controller
            name='name'
            control={controlRegister}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                placeholder='name'
                label='Nombre'
                sx={{ paddingBottom: 14, textAlign: 'start' }}
                {...field}
              />
            )}
          />
          <Controller
            name='email'
            control={controlRegister}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                placeholder='you@email.com'
                label='Email'
                sx={{ paddingBottom: 14, color: '#F8F9FA', textAlign: 'start' }}
                {...field}
              />
            )}
          />
          <Controller
            name='password'
            control={controlRegister}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                placeholder='pasword'
                label='Password'
                sx={{ paddingBottom: 14, textAlign: 'start' }}
                {...field}
              />
            )}
          />
          <Button variant='gradient' type='submit' sx={{ marginTop: 20 }}>
            submit
          </Button>
        </form>
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          border: 'solid',
          borderWidth: 1,
          borderColor: '#d9d9d9',
          borderRadius: 5,
          padding: 30,
          width: 400,
          marginRight: 30,
          backgroundColor: '#A5D8FF',
        }}
      >
        <Text italic weight={800} size='xl' sx={{ marginBottom: 20 }}>
          Login
        </Text>
        <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
          <Controller
            name='email'
            control={controlLogin}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                placeholder='@email'
                label='Email'
                sx={{ paddingBottom: 14, textAlign: 'start' }}
                {...field}
              />
            )}
          />
          <Controller
            name='password'
            control={controlLogin}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                placeholder='pasword'
                label='Password'
                sx={{ textAlign: 'start', paddingBottom: 14 }}
                {...field}
              />
            )}
          />
          <Button variant='gradient' type='submit' sx={{ marginTop: 20 }}>
            submit
          </Button>
        </form>
      </Box>
    </Box>
  )
}
