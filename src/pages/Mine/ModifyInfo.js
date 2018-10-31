import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Input } from 'react-native-elements'
import CustomizeHeader from '../../components/Header'
import Iconfont from '../../common/Iconfont'
import Toast from 'react-native-easy-toast'

@inject('User')
@observer
class ModifyInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.navigation.getParam('value', ''),
    }
  }

  setText = (text) => {
    this.setState({
      text,
    })
  }

  renderRightIcon = () => {
    return <TouchableOpacity onPress={this.clearInputText}>
      <Iconfont name='shanchuwenzi' size={18} color="#bfbfbf"/>
    </TouchableOpacity>
  }

  clearInputText = () => {
    this.setState({
      text: '',
    })
    this.refs.input.clear()
  }

  renderItem = () => {
    const {navigation} = this.props
    const key = navigation.getParam('key', '')
    const title = navigation.getParam('title', '')
    const value = navigation.getParam('value', '')
    let element = <></>
    switch (key) {
      case 'nickname':
        element = <Input placeholder={`请输入${title}`} defaultValue={value} inputStyle={style.input}
                         ref='input'
                         onChangeText={this.setText}
                         rightIcon={this.renderRightIcon}
                         rightIconContainerStyle={style.clearIcon}
                         containerStyle={{flex: 1}}
                         inputContainerStyle={{borderBottomColor: 'rgba(255,255,255,0)'}}/>
        break
      case 'birthday':
        element = <></>
        break
      case 'area':
        element = <></>
        break
      case 'phone':
        element = <Input placeholder={`请输入${title}`} defaultValue={value} inputStyle={style.input}
                         ref='input'
                         onChangeText={this.setText}
                         rightIcon={this.renderRightIcon}
                         rightIconContainerStyle={style.clearIcon}
                         containerStyle={{flex: 1}}
                         inputContainerStyle={{borderBottomColor: 'rgba(255,255,255,0)'}}/>
        break
    }
    return element
  }

  determine = () => {
    const title = this.props.navigation.getParam('title', '')
    const key = this.props.navigation.getParam('key', '')
    const {text} = this.state
    if (text === '') {
      this.toast.show(`${title}不能为空！`)
      return false
    }
    this.props.User.update(key, text)
    this.props.navigation.goBack()
  }

  render() {
    const {navigation} = this.props
    const title = navigation.getParam('title', '')
    return (
      <View style={{flex: 1}}>
        <CustomizeHeader title={`修改${title}`}
                         backgroundColor='#fff'
                         handler={true}
                         handlertitle='完成'
                         handlermethod={this.determine}/>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {this.renderItem()}
        </View>
        <Toast ref={ref => this.toast = ref} position='center'/>
      </View>
    )
  }
}

const style = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 0,
    paddingLeft: 20,
    height: 50,
  },
  clearIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
  },
})

export default ModifyInfo
