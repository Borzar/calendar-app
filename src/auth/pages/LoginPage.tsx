import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Box, Button, Text, TextInput } from '@mantine/core'

interface IFormTextInput {
  name: string
  email: string
  password: string
}

export const LoginPage = () => {
  const { control, handleSubmit } = useForm<IFormTextInput>()

  const onSubmit: SubmitHandler<IFormTextInput> = (data) => {
    console.log(data)
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
        <Text italic weight={800} size='xl' sx={{ marginBottom: 20, textAlign: 'center'}}>
          Register
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                placeholder='name'
                label='Nombre'
                sx={{ paddingBottom: 14, textAlign: 'start'}}
                {...field}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                placeholder='you@email.com'
                label='Email'
                sx={{ paddingBottom: 14, color:'#F8F9FA', textAlign: 'start'}}
                {...field}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                placeholder='@email'
                label='Email'
                sx={{ paddingBottom: 14,  textAlign: 'start' }}
                {...field}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                placeholder='pasword'
                label='Password'
                sx={{  textAlign: 'start', paddingBottom: 14 }}
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
