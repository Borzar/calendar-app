import { Grid, Text, Button } from '@mantine/core';

export const NavbarApp = () => {
  return (
    <>
      <Grid sx={{ alignItems: 'center', backgroundColor: '#A5D8FF' }}>
        <Grid.Col span={8}>
          <Text>Boris</Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text align="right">
            <Button>Logout</Button>
          </Text>
        </Grid.Col>
      </Grid>
    </>
  );
};
