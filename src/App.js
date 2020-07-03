import React from 'react';
import { Switch , Route } from 'react-router-dom';
import './App.css';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import HomePage from './pages/homepage/homepage.component';
import {auth} from './firebase/firebase.util';




class App extends React.Component {
 
  constructor(){
    super();
    this.state = {
      currentUser:null
    }
  }
  unsuscribeFromAuth = null;
  componentDidMount(){
    this.unsuscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState = ({currentUser : user});
      console.log(user);
    });
  }

  componentWillUnmount(){
    this.unsuscribeFromAuth=null;
  }
  render(){
    return (
      <div >
        <Header currentUser= {this.setState.currentUser} />
        <Switch>
        <Route exact path='/' component={HomePage} />
       <Route path='/shop' component={ShopPage} />
       <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      
      </div>
    );
  }

 
}

export default App;
