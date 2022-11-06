export const CalendarEvent = ({ event }: any) => {
  const { title, notes } = event

  // sin uso por el momento

  return (
    <>
      <strong>{title}</strong>
      <strong> - {notes}</strong>
    </>
  )
}
