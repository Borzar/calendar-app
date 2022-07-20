import { Grid, Text, Button } from '@mantine/core'
import { UserCircle } from 'tabler-icons-react'

export const NavbarApp = () => {
  return (
    <>
      <Grid sx={{ alignItems: 'center', backgroundColor: '#0B7285' }}>
        <Grid.Col span={8}>
          <Text ml={16} weight={700} color='white'>
            Usuario
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text align='right'>
            <Button mr={16} leftIcon={<UserCircle />} color='cyan'>
              Logout
            </Button>
          </Text>
        </Grid.Col>
      </Grid>
    </>
  )
}
