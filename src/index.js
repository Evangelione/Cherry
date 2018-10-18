import React from 'react'
import { createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Explore from './pages/Explore/Explore'
import RandomStream from './pages/RandomStream/RandomStream'
import Mine from './pages/Mine/Mine'
import Login from './pages/Login'

const AppStack = createMaterialTopTabNavigator({
  Explore: {
    screen: createStackNavigator({
      Explore: Explore,
    }, {
      navigationOptions: {
        header: null,
      },
    }),
  },
  RandomStream: createStackNavigator({
    RandomStream: RandomStream,
  }, {
    navigationOptions: {
      header: null,
    },
  }),
  Mine: createStackNavigator({
    Mine: Mine,
  }, {
    navigationOptions: {
      header: null,
    },
  }),
}, {
  initialRouteName: 'Explore',
  swipeEnabled: true,
  backBehavior: false,
  tabBarOptions: {
    activeTintColor: '#666',
    inactiveTintColor: '#ccc',
    showIcon: true,
    showLabel: false,
    tabStyle: {
      backgroundColor: 'rgba(255,255,255,0)',
    },
    indicatorStyle: {
      height: 0,
    },
    style: {
      backgroundColor: '#fff', // rgba(255,255,255,0)
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      elevation: 0,
    },
  },
  navigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, tintColor}) => {
      const {routeName} = navigation.state
      let iconName
      if (routeName === 'Explore') {
        iconName = 'ios-compass'
      } else if (routeName === 'RandomStream') {
        iconName = 'ios-add-circle'
      } else if (routeName === 'Mine') {
        iconName = 'ios-person'
      }
      return <Ionicons name={iconName} size={26} color={tintColor}/>
    },
  }),
})

export default createSwitchNavigator({
  Login: Login,  //constructor 会变灰色，不知道为什么
  App: AppStack,
}, {
  initialRouteName: 'Login',
  backBehavior: false,
})
