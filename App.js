import React, { PureComponent } from 'react'
import { BackHandler, NetInfo, Alert } from 'react-native'
import { Provider } from 'mobx-react'
import stores from './src/store'
import StackNavigator from './src'

export default class App extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid,
    )
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    )
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
