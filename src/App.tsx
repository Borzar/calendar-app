import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { MantineProvider } from '@mantine/core'

function App() {
  return (
    <>
      <MantineProvider withGlobalStyles>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </MantineProvider>
    </>
  )
}

export default App
