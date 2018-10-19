import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator } from 'react-navigation'
import Iconfont from 'react-native-vector-icons/Iconfont'
import Explore from './pages/Explore/Explore'
import RandomStream from './pages/RandomStream/RandomStream'
import Mine from './pages/Mine/Mine'
import Login from './pages/Login'

const Icon = {
  'Home': require('./asset/images/Home.png'),
  'Home_un': require('./asset/images/Home_un.png'),
  'Stream': require('./asset/images/Stream.png'),
  'Mine': require('./asset/images/Mine.png'),
  'Mine_un': require('./asset/images/Mine_un.png'),
}

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
    showIcon: true,
    showLabel: false,
    tabStyle: {
      opacity: 1,
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
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
  },
  navigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, tintColor}) => {
      const {routeName} = navigation.state
      let iconName
      if (routeName === 'Explore') {
        focused ? iconName = Icon.Home : iconName = Icon.Home_un
      } else if (routeName === 'RandomStream') {
        iconName = Icon.Stream
        return <Image style={{width: 40, height: 40}} source={iconName}/>
      } else if (routeName === 'Mine') {
        focused ? iconName = Icon.Mine : iconName = Icon.Mine_un
      }
      return <Image style={{width: 24, height: 24}} source={iconName}/>
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
