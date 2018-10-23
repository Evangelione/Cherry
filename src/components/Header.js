import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Header } from 'react-native-elements'
import Toast from 'react-native-easy-toast'
import Iconfont from 'react-native-vector-icons/Iconfont'
import { withNavigation } from 'react-navigation'


@inject('User')
@observer
class CustomizeHeader extends Component {

  navigateBack = () => {
    this.props.navigation.goBack()
  }

  determine = () => {
    const {title, setkey, settext} = this.props
    if (settext === '') {
      this.toast.show(`${title}不能为空！`)
      return false
    }
    this.props.User.update(setkey, settext)
    this.navigateBack()
  }

  render() {
    const {title, backgroundColor, determine} = this.props
    return (
      <>
        <Header backgroundColor={backgroundColor}>
          <TouchableOpacity onPress={this.navigateBack} style={{padding: 10}}>
            <Iconfont name='zuojiantou' size={18} color='#6C6C6C'/>
          </TouchableOpacity>
          <Text style={{fontSize: 18, color: '#3e3e3e'}}>{title}</Text>
          {determine ? <TouchableOpacity onPress={this.determine} style={{padding: 10}}>
            <Text style={{color: '#FD798F'}}>完成</Text>
          </TouchableOpacity> : ''}
        </Header>
        <Toast ref={(ref) => {
          this.toast = ref
        }} position="center"/>
      </>
    )
  }
}

export default withNavigation(CustomizeHeader)
