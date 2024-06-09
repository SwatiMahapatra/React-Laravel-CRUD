import React from 'react';
import './App.css';
import ShowComp from './components/ShowComp';
import 'bootstrap/dist/css/bootstrap.css';
import NavComp from './components/NavComp';
import FormComp from './components/FormComp';
import { Route,Routes} from 'react-router-dom';
import {DataProvider} from './Context/DataContext';
import EditComp from './components/EditComp';



function App() {
  return (
    <DataProvider>
    <div className="App">
        <NavComp/>
        

        <Routes>
        
        <Route path="/" element={ <ShowComp/> } />

          <Route path="/forms" element={ <FormComp/> } />
          <Route path="/update/:id" element={<EditComp/>}/>

        </Routes>
    </div>
    </DataProvider>
  );
}

export default App;
