import React from 'react';
import { observer } from 'mobx-react';
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';
import SubmitButton from './SubmitButton';
import './App.css';

class App extends React.Component{

  // API CALLS
  async componentDidMount(){
    // TO CHECK IF THE USER IS LOGGED IN OR NOT WHEN THE COMPONENT IS MOUNTED WITH AN ERROR HANDLER AS WELL
    try {
      let res = await fetch('/isLoggedIn',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      let result = await res.json();
      
      if (result && result.success){
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.email = result.email;
      }

      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }

    catch(e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }
  // API CODES TO LOGOUT ON THE CLICK OF THE LOGOUT BUTTON

  async doLogout(){
    try {
      let res = await fetch('/logout',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

      });
      
      let result = await res.json();
      
      if (result && result.success){
        UserStore.isLoggedIn = false;
        UserStore.email = '';
      }

    }

    catch(e) {

      console.log(e)
    }
  } 


  render(){

    if (UserStore.loading){
      return(
        <div className = "app">
          <div className = 'container'>
            Loading, please wait...
          </div>
        </div>
      );
    }

    else {
      if (UserStore.isLoggedIn){
        return(
          <div className = "app">
            <div className = 'container'>
              Welcome {UserStore.email}
            {/*LOG OUT BUTTON */}
              <SubmitButton
                text = {'Log out'}
                disabled = {false}
                onClick = { () => this.doLogout()}
              />

            </div>
          </div>
        );
      }
    

      return(
        <div className="app">
          <div className = 'container'>
            <LoginForm/>
          </div>
          
        </div>
      );
    }
  }
}

export default observer(App);