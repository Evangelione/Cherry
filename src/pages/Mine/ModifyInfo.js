import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import CustomizeHeader from '../../components/Header'
import Iconfont from 'react-native-vector-icons/Iconfont'

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

  render() {
    const {navigation} = this.props
    const {text} = this.state
    const key = navigation.getParam('key', '')
    const title = navigation.getParam('title', '')
    const value = navigation.getParam('value', '')
    return (
      <View style={{flex: 1}}>
        <CustomizeHeader title={`修改${title}`} backgroundColor='#fff'
                         determine={true}
                         setkey={key}
                         settext={text}/>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Input placeholder={`请输入${title}`} defaultValue={value} inputStyle={style.input}
                 ref='input'
                 onChangeText={this.setText}
                 rightIcon={this.renderRightIcon}
                 rightIconContainerStyle={style.clearIcon}
                 containerStyle={{flex: 1}}
                 inputContainerStyle={{borderBottomColor: 'rgba(255,255,255,0)'}}/>
        </View>
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
