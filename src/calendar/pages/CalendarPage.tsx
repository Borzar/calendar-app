import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US';
import { addHours, format, parse, startOfWeek, getDay } from 'date-fns';
import { NavbarApp } from '../components';
import { AppShell } from '@mantine/core';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Cumple',
    notes: 'comprar cosas',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#FFD43B',
    user: {
      _id: '123',
      name: 'Boris',
    },
  },
];

export const CalendarPage = () => {
  return (
    <AppShell header={<NavbarApp />}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
      />
    </AppShell>
  );
};
