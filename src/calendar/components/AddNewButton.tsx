import { Button } from '@mantine/core'

export const AddNewButton = ({ setViewModal }: any) => {

  const onOpenViewModal = () => {
    setViewModal(true)
  }

  return (
    <>
      <Button my={16} onClick={onOpenViewModal}>
        add event
      </Button>
    </>
  )
}


