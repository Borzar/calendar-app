import { Button } from '@mantine/core'
import { addHours } from 'date-fns'
import { useEffect, useState } from 'react'
import { useCalendarEvents } from '../../hooks'

export const AddModalButton = ({ setFormValues }: any) => {
  const { newEvent } = useCalendarEvents()
  const onOpenViewModal = (event: any) => {
    setFormValues({
      ...newEvent,
    })
  }

  return (
    <>
      <Button my={16} onClick={onOpenViewModal}>
        new event
      </Button>
    </>
  )
}
