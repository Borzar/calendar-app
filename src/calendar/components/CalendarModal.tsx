import { Modal, Textarea } from '@mantine/core';
import { useState } from 'react';

import { DatePicker } from '@mantine/dates';
import { TextInput, Button, Box, Group } from '@mantine/core';

export const CalendarModal = () => {
  const [open, setOpen] = useState(true);

  const onClose = () => {
    console.log('cerrando');
    setOpen(false);
  };

  return (
    <>
      <Modal opened={open} onClose={onClose} title="New Event">
        <Box sx={{ maxWidth: 340 }} mx="auto">
          <form>
            <DatePicker placeholder="Start date" label="Start date" required />
            <DatePicker placeholder="End date" label="End date" required />
            <TextInput required label="Title" placeholder="Title" />
            <Textarea
              required
              label="Description"
              placeholder="Description"
              mt="sm"
            />
            <Group position="left" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
};
