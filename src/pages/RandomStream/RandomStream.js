import React, { PureComponent } from 'react'
import { View, Text, StatusBar } from 'react-native'

const BARHEIGHT = StatusBar.currentHeight

export default class RandomStream extends PureComponent {
  static navigationOptions = {
    title: 'RandomStream'
  }

  render() {
    return (
      <View style={{marginTop: BARHEIGHT}}>
        <Text>RandomStream</Text>
      </View>
    )
  }
}
