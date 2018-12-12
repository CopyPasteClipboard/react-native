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
const MainNavigator = createSwitchNavigator({
  Main: MainView,
  SignUp: SignUpView,
  LogIn: LogInView
},
{initialRouteName: 'LogIn'});
