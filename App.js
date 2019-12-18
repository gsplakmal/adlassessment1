import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './MainComponent';
import Login from './LoginScreen';
import { ConfigureStore } from './redux/configureStore';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { colors } from 'react-native-elements';

const store = ConfigureStore();

const Navigator = createStackNavigator({
  LoginNav: { screen: Login },
  UserListNav: { screen: Main }
}, {
  initialRouteName: 'LoginNav',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.grey3
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    },
    headerLeft: null
  }
}
)
const MainNavigation = createAppContainer(Navigator);

export default function App() {
  return (
    <Provider store={store}><MainNavigation></MainNavigation></Provider>
  );
}

