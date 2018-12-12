import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import MainView from './MainView'
import SignUpView from './SignUpView';
import LogInView from './LogInView';

export default class App extends React.Component {


  constructor(props) {
    super(props)
  }

  render() {
    return <MainNavigator/>
  }
  
}
//Create a switch navigator to allow the user to see different pages.
const MainNavigator = createSwitchNavigator({
  Main: MainView,
  SignUp: SignUpView,
  LogIn: LogInView
},
{initialRouteName: 'LogIn'});
