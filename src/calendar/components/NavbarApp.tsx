import { Grid, Text, Button } from '@mantine/core'
import { UserCircle } from 'tabler-icons-react'

export const NavbarApp = () => {
  return (
    <>
      <Grid sx={{ alignItems: 'center', backgroundColor: '#E7F5FF' }}>
        <Grid.Col span={8}>
          <Text ml={16} weight={700}>
            Usuario
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text align='right'>
            <Button variant='subtle' mr={16} leftIcon={<UserCircle />}>
              Logout
            </Button>
          </Text>
        </Grid.Col>
      </Grid>
    </>
  )
}
