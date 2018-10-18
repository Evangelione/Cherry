import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

export default class Welcome extends Component {
  static navigationOptions = {
    title: 'Welcome',
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      SplashScreen.hide()
      console.log('asdasdasd')
    }, 500)
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  render() {
    return (
      <View>
        <Text>欢迎12123123123</Text>
        <Button
          title="Go to Explore"
          onPress={() => this.props.navigation.navigate('Explore')}
        />
      </View>
    )
  }
}
