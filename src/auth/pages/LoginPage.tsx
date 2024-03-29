import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Box, Button, Text, TextInput } from '@mantine/core'
import { userLogin, userRegister } from '../../services'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schemaRegister = yup.object({
  name: yup
    .string()
    .required()
    .min(2, 'must have at least two letters of any combination'),
  email: yup.string().required().email('email incomplete'),
  password: yup
    .string()
    .required()
    .min(6, 'must have at least six letters of any combination'),
})

const schemaLogin = yup.object({
  email: yup.string().required().email('email incomplete'),
  password: yup
    .string()
    .required()
    .min(6, 'must have at least six letters of any combination'),
})

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
  const {
    formState: { errors: errorsRegister },
    control: controlRegister,
    handleSubmit: handleSubmitRegister,
  } = useForm<IFormTextInputRegister>({
    resolver: yupResolver(schemaRegister),
  })
  const {
    formState: { errors: errorsLogin },
    control: controlLogin,
    handleSubmit: handleSubmitLogin,
  } = useForm<IFormTextInputLogin>({
    resolver: yupResolver(schemaLogin),
  })
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
        backgroundColor: '#F8F0FC',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          border: 'solid',
          borderWidth: 1,
          borderColor: '#662f62',
          borderRadius: 5,
          padding: 30,
          width: 400,
          marginRight: 30,
          backgroundColor: '#F3D9FA ',
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
              <Box>
                <TextInput
                  placeholder='name'
                  label='Nombre'
                  sx={{ paddingBottom: 14, textAlign: 'start' }}
                  {...field}
                />
                <Text
                  style={{ fontSize: 14, color: 'red', fontStyle: 'italic' }}
                >
                  {errorsRegister.name?.message}
                </Text>
              </Box>
            )}
          />
          <Controller
            name='email'
            control={controlRegister}
            defaultValue=''
            render={({ field }) => (
              <Box>
                <TextInput
                  type='email'
                  placeholder='you@email.com'
                  label='Email'
                  sx={{
                    paddingBottom: 14,
                    color: '#F8F9FA',
                    textAlign: 'start',
                  }}
                  {...field}
                />
                <Text
                  style={{ fontSize: 14, color: 'red', fontStyle: 'italic' }}
                >
                  {errorsRegister.email?.message}
                </Text>
              </Box>
            )}
          />
          <Controller
            name='password'
            control={controlRegister}
            defaultValue=''
            render={({ field }) => (
              <Box>
                <TextInput
                  type='password'
                  placeholder='password'
                  label='Password'
                  sx={{ paddingBottom: 14, textAlign: 'start' }}
                  {...field}
                />
                <Text
                  style={{ fontSize: 14, color: 'red', fontStyle: 'italic' }}
                >
                  {errorsRegister.password?.message}
                </Text>
              </Box>
            )}
          />
          <Button variant='filled' type='submit' sx={{ marginTop: 20, backgroundColor: '#662f62'}}>
            submit
          </Button>
        </form>
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          border: 'solid',
          borderWidth: 1,
          borderColor: '#662f62',
          borderRadius: 5,
          padding: 30,
          width: 400,
          marginRight: 30,
          backgroundColor: '#F3D9FA',
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
              <Box>
                <TextInput
                  placeholder='@email'
                  label='Email'
                  sx={{ paddingBottom: 14, textAlign: 'start' }}
                  {...field}
                />
                <Text
                  style={{ fontSize: 14, color: 'red', fontStyle: 'italic' }}
                >
                  {errorsLogin.email?.message}
                </Text>
              </Box>
            )}
          />
          <Controller
            name='password'
            control={controlLogin}
            defaultValue=''
            render={({ field }) => (
              <Box>
                <TextInput
                  type='password'
                  placeholder='password'
                  label='Password'
                  sx={{ textAlign: 'start', paddingBottom: 14 }}
                  {...field}
                />
                <Text
                  style={{ fontSize: 14, color: 'red', fontStyle: 'italic' }}
                >
                  {errorsLogin.password?.message}
                </Text>
              </Box>
            )}
          />
          <Button variant='filled' type='submit' sx={{ marginTop: 20, backgroundColor: '#662f62'}}>
            submit
          </Button>
        </form>
      </Box>
    </Box>
  )
}
