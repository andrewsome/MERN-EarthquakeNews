import React from 'react';
import Main from './components/Main';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NavBar from './components/NavBar';
import EarthquakeDetail from './components/EarthquakeDetail';
import LatestNews from './components/LatestNews';
// import StatusBar from './components/StatusBar';
// import Register from './components/Auth/Register';
// import Login from './components/Auth/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* <Route path='/register' component={Register} /> */}
      {/* <Route path='/login' component={Login} /> */}
      <Wrapper>
        {/* <StatusBar /> */}
        <Header>This App can show your rencent Earthquake News</Header>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/detail' component={EarthquakeDetail} />
          <Route path='/latest' component={LatestNews}/>
        </Switch>
      </Wrapper>
    </Router>  
  );
}

export default App;
