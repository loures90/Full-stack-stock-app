import { useState } from 'react';
import Router from './Router/Router';

function App() {
  const [productToUpdate, setProductToUpdate] = useState({})
  return (
    <div>
      <Router productToUpdate={productToUpdate} setProductToUpdate={setProductToUpdate}/>
    </div>
  );
}

export default App;
