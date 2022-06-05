import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import Dropdown from './components/Dropdown';
import Nav from './components/Nav';
import Home from './pages/Home/Home'

function App() {

  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [theme, setTheme] = useState('dark');

  const toggle = () => {  
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <Router>
      <ReactNotification className="fixed bottom-2 right-0" />
        <Nav toggle={toggle} />
        <Dropdown isOpen={dropdownOpen} toggle={toggle} />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
    </div> 
  )
};

export default App;