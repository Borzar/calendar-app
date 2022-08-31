import { Grid, Text, Button } from '@mantine/core'
import { changeLanguage } from 'i18next'
import { useTranslation } from 'react-i18next'
import { UserCircle } from 'tabler-icons-react'

export const NavbarApp = () => {
  const { t } = useTranslation('calendarPage')

  return (
    <>
      <Grid sx={{ alignItems: 'center', backgroundColor: '#E7F5FF' }}>
        <Grid.Col span={8}>
          <Text ml={16} weight={700}>
            {t('user')}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text align='right'>
            <Button variant='subtle' mr={16} leftIcon={<UserCircle />}>
              {t('logout')}
            </Button>
          </Text>
        </Grid.Col>
      </Grid>
    </>
  )
}
