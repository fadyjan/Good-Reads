import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import WelcomePage from './components/welcomePage/welcomePage';
import Footer from './components/footer/footer';
import Categories from './components/categories/categories'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/categories" component={Categories} />
        </Switch>
        <Footer/>
    </div>
  );
}

export default App;
