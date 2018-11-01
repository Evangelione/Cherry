import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements'
import Iconfont from '../common/Iconfont'
import { withNavigation } from 'react-navigation'
import { baseRedColor } from '../themes'

class CustomizeHeader extends Component {

  navigateBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    const {title, backgroundColor, handler, handlertitle, handlermethod} = this.props
    return (
      <>
        <Header backgroundColor={backgroundColor}>
          <TouchableOpacity onPress={this.navigateBack} style={{padding: 10}}>
            <Iconfont name='zuojiantou' size={18} color='#6C6C6C'/>
          </TouchableOpacity>
          <Text style={{fontSize: 18, color: '#3e3e3e'}}>{title}</Text>
          {handler ? <TouchableOpacity onPress={handlermethod} style={{padding: 10}}>
            <Text style={{color: baseRedColor}}>{handlertitle}</Text>
          </TouchableOpacity> : ''}
        </Header>
      </>
    )
  }
}

export default withNavigation(CustomizeHeader)
