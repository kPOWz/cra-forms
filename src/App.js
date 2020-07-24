import React from 'react';
import Form from './Form';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <Container className="App" maxWidth="sm">
      <Typography variant="h1" component="h1" gutterBottom>
          Form Validation Example
        </Typography>
     <Form />
    </Container>
  );
}

export default App;
