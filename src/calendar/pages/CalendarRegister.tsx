import { useTranslation } from 'react-i18next'

export const CalendarRegister = () => {
  const { t } = useTranslation('calendarRegister')

  return (
    <div>
      <form>
        <div> {t('myForm')}</div>

        <label>
          {t('myName')}:
          <input type='text' name='name' />
        </label>
        <label>
          {t('myLastname')}:
          <input type='text' name='name' />
        </label>
        <label>
          {t('myEmail')}:
          <input type='text' name='name' />
        </label>
        <label>
          {t('myAdress')}:
          <input type='text' name='name' />
        </label>
      </form>
    </div>
  )
}
