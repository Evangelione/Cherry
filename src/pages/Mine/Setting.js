import React, { Component } from 'react'
import { View, ScrollView, Switch, Text, TouchableOpacity } from 'react-native'
import CustomizeHeader from '../../components/Header'
import { ListItem, Divider } from 'react-native-elements'
import { detailGray, dividerColor } from '../../themes'

class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disturb: false,
      mute: false,
      shock: false,
    }
  }

  changeSwitch = (val) => {
    this.setState({
      [val]: !this.state[val]
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomizeHeader title='设置' backgroundColor='#fff'/>
        <ScrollView style={{flex: 1}}>
          <ListItem
            containerStyle={{marginTop: 10}}
            leftElement={<Text style={{fontSize: 16}}>免打扰（23：00 - 08：00不接收推送）</Text>}
            rightElement={<Switch style={{position: 'absolute', right: 10}}
                                  thumbColor={'#fff'}
                                  trackColor={{false: '#CFCFCF', true: '#FD798F'}}
                                  value={this.state.disturb} onValueChange={this.changeSwitch.bind(null, 'disturb')}/>}
          />
          <View style={{paddingLeft: 8, paddingRight: 8, backgroundColor: '#fff'}}>
            <Divider style={{backgroundColor: dividerColor}}/>
          </View>
          <ListItem
            leftElement={<Text style={{fontSize: 16}}>应用内消息提示音</Text>}
            rightElement={<Switch style={{position: 'absolute', right: 10}}
                                  thumbColor={'#fff'}
                                  trackColor={{false: '#CFCFCF', true: '#FD798F'}}
                                  value={this.state.mute} onValueChange={this.changeSwitch.bind(null, 'mute')}/>}
          />
          <View style={{paddingLeft: 8, paddingRight: 8, backgroundColor: '#fff'}}>
            <Divider style={{backgroundColor: dividerColor}}/>
          </View>
          <ListItem
            leftElement={<Text style={{fontSize: 16}}>应用内震动</Text>}
            rightElement={<Switch style={{position: 'absolute', right: 10}}
                                  thumbColor={'#fff'}
                                  trackColor={{false: '#CFCFCF', true: '#FD798F'}}
                                  value={this.state.shock} onValueChange={this.changeSwitch.bind(null, 'shock')}/>}
          />
          <View style={{paddingLeft: 8, paddingRight: 8, backgroundColor: '#fff'}}>
            <Divider style={{backgroundColor: dividerColor}}/>
          </View>
          <TouchableOpacity activeOpacity={0.6}>
            <ListItem
              chevron
              title='关于我们'
            />
          </TouchableOpacity>
          <View style={{paddingLeft: 8, paddingRight: 8, backgroundColor: '#fff'}}>
            <Divider style={{backgroundColor: dividerColor}}/>
          </View>
          <TouchableOpacity activeOpacity={0.6}>
            <ListItem
              title='清除缓存'
              rightElement={<Text style={{color: detailGray}}>13.14MB</Text>}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={{
            marginTop: 10,
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingTop: 14,
            paddingBottom: 14
          }}>
            <Text style={{color: '#3E3E3E'}}>退出登录</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default Setting