import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator } from 'react-navigation'
import Explore from './pages/Explore/Explore'
import RandomStream from './pages/RandomStream/RandomStream'
import Mine from './pages/Mine/Mine'
import PersionalInfo from './pages/Mine/PersionalInfo'
import MyBalance from './pages/Mine/MyBalance'
import MyBalanceDetail from './pages/Mine/MyBalanceDetail'
import MyIncome from './pages/Mine/MyIncome'
import PhotoWall from './pages/Mine/PhotoWall'

import Login from './pages/Login'
import ModifyInfo from './pages/Mine/ModifyInfo'

const Icon = {
  'Home': require('./asset/images/Home.png'),
  'Home_un': require('./asset/images/Home_un.png'),
  'Stream': require('./asset/images/Stream.png'),
  'Mine': require('./asset/images/Mine.png'),
  'Mine_un': require('./asset/images/Mine_un.png'),
}


const AppStack = createMaterialTopTabNavigator({
  Explore: createStackNavigator({
    Explore: Explore,
  }, {
    navigationOptions: {
      header: null,
    },
  }),
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

const PageStack = createStackNavigator({
  App: AppStack,
  PersionalInfo,
  ModifyInfo,
  MyBalance,
  MyBalanceDetail,
  MyIncome,
  PhotoWall,
}, {
  initialRouteName: 'App',
  navigationOptions: {
    header: null,
  },
})

export default createSwitchNavigator({
  Login: Login,  //constructor 会变灰色，不知道为什么
  Page: PageStack,
}, {
  initialRouteName: 'Login',
  backBehavior: false,
})
