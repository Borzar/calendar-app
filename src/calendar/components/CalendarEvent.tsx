export const CalendarEvent = ({ event }: { event: any }) => {
  const { title, user } = event

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  )
}
