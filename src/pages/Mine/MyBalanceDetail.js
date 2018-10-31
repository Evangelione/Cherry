import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CustomizeHeader from '../../components/Header'

class MyBalance extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CustomizeHeader title='余额明细' backgroundColor='#fff'/>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text>余额明细</Text>
        </View>
      </View>
    )
  }
}

export default MyBalance
