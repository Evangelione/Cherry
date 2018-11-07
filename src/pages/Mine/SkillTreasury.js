import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { ListItem, Divider } from 'react-native-elements'
import CustomizeHeader from '../../components/Header'
import { detailGray } from '../../themes'

@inject('User')
@observer
export default class SkillTreasury extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomizeHeader title='技能宝库' backgroundColor='#fff'/>
        <TouchableOpacity activeOpacity={0.6} style={{marginTop: 10}}>
          <View>
            <ListItem
              chevron
              title='语音聊天'
              leftElement={<Image style={{width: 22, height: 22}}
                                  source={require('../../asset/images/yuyinliaotian.png')}/>}
              rightElement={<Text style={{color: detailGray}}>20樱花/分钟</Text>}
            />
            <Divider style={{backgroundColor: '#eee'}}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6}>
          <ListItem
            chevron
            title='视频聊天'
            leftElement={<Image style={{width: 22, height: 22}}
                                source={require('../../asset/images/shipinliaotian.png')}/>}
            rightElement={<Text style={{color: detailGray}}>20樱花/分钟</Text>}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
