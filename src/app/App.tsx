import React from 'react';
import "../css/app.css";
import { Container, Stack, Box, Typography, Button } from '@mui/material';

function App() {
  return (
    <Container maxWidth="sm">
      <Stack direction="column">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h4">
            Create React App on TypeScript with Redux
          </Typography>
        </Box>

        <Button variant="contained"> Click me</Button>
      </Stack>
    </Container>
  );
}

export default App;