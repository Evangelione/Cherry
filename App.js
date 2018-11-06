import React, { Component } from 'react'
import { BackHandler, NetInfo, Alert } from 'react-native'
import { Provider } from 'mobx-react'
import stores from './src/store'
import StackNavigator from './src'
import Orientation from 'react-native-orientation'

export default class App extends Component {
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid,
    )
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    )
    Orientation.lockToPortrait()
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid,
    )
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    )
  }

  onBackButtonPressAndroid = () => true
  handleConnectivityChange = () => {
    NetInfo.isConnected.fetch().then((isConnected) => {
      if (!isConnected) {
        Alert.alert('提示', '网络已断开，请连接网络重试')
      }
    })
  }

  render() {
    return (
      <Provider {...stores}>
        <StackNavigator/>
      </Provider>
    )
  }
}
