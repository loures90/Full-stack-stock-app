import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';

import { useState } from 'react';
import Router from './Router/Router';

function App () {
  const [productToUpdate, setProductToUpdate] = useState({})
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">Estoque</Typography>
        </Toolbar>
      </AppBar>
      <Router productToUpdate={productToUpdate} setProductToUpdate={setProductToUpdate} />
    </>
  );
}

export default App;
