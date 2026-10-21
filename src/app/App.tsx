import React from 'react';
import "../css/app.css";
import { Container, Stack, Box, Typography, Button } from '@mui/material';
import { RippleBadge } from './MaterailTheme/styled';

function App() {
  return (
    <Container sx={{background: "orange" }}>
      <Stack direction="column">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h4">
            Create React App on TypeScript with Redux
          </Typography>
        </Box>
        <Box>
          <RippleBadge badgeContent={4}>
            <Button variant="contained"> Click me</Button>
          </RippleBadge>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;