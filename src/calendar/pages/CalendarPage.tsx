import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';
import { NavbarApp } from '../components';
import { AppShell } from '@mantine/core';
import { localizer } from '../../helpers';

const eventos = [
  {
    title: 'Cumpleaños',
    notes: 'comprar cosas',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#E3FAFC',
    user: {
      _id: '123',
      name: 'Boris',
    },
  },
];

export const CalendarPage = () => {
  const eventStyleGetter: any = (
    event: any,
    start: any,
    end: any,
    isSelected: any
  ) => {
    const style = {
      backgroundColor: '#22B8CF',
      color: 'black',
    };

    return {
      style,
    };
  };

  return (
    <AppShell header={<NavbarApp />}>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
      />
    </AppShell>
  );
};
