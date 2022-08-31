import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'es-CL',
  debug: true,
  resources: {
    'es-CL': {
      calendarPage: require('./locales/es-CL/calendarPage.json'),
      calendarRegister: require('./locales/es-CL/calendarRegister.json'),
    },
    'en-US': {
      calendarPage: require('./locales/en-US/calendarPage.json'),
      calendarRegister: require('./locales/en-US/calendarRegister.json'),
    },
  },
})

export default i18n
