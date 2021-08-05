import React from 'react'
import Home from './component/Home';
import './App.css'
import {BrowserRouter, Switch , Route} from 'react-router-dom';


const App = () => {
  return (
    <>
    <BrowserRouter>
     <Switch>
     <Route exact path="/" component={Home} />

     </Switch>
    
    </BrowserRouter>
    
      
    </>
  )
}

export default App
