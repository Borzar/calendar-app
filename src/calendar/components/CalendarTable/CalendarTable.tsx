import { Box, Button, Table } from '@mantine/core'

export const CalendarTable = ({ myEvents, editFormValues, deleteEvent }: any) => {
  return (
    <Box mb={39}>
      <Table withBorder striped>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>notes</th>
            <th>start</th>
            <th>end</th>
            <th>actions</th>
          </tr>
        </thead>
        {myEvents &&
          myEvents.map((x: any) => (
            <tbody key={x.id}>
              <tr>
                <td>{x.id}</td>
                <td>{x.title}</td>
                <td>{x.notes}</td>
                <td>{x.start.toString()}</td>
                <td>{x.end.toString()}</td>
                <td>
                  <Button
                    variant='outline'
                    sx={{ marginRight: 4 }}
                    onClick={() => editFormValues(x)}
                  >
                    edit
                  </Button>
                  <Button
                    color='red'
                    variant='outline'
                    sx={{ marginRight: 4 }}
                    onClick={() => deleteEvent(x.id)}
                  >
                    delete
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </Box>
  )
}
