import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import CustomizeHeader from '../../components/Header'
import { baseRedColor, baseGreenColor, detailGray } from '../../themes'
import Iconfont from '../../common/Iconfont'

@inject('User')
@observer
export default class FansList extends Component {
  goUserPage = (item) => {
    this.props.navigation.navigate('UserPage', {user: item})
  }

  attentionPersion = (id) => {
    console.log(id)
    let persion = this.props.User.fanslist.filter(item => item.id === id)
    console.log(persion)
    persion[0].attention = !persion[0].attention
  }

  render() {
    const {User} = this.props
    return (
      <View>
        <CustomizeHeader title='粉丝' backgroundColor='#fff'/>
        {User.fanslist.length ?
          <ScrollView style={{backgroundColor: '#fff', marginTop: 10}}>
            {User.fanslist.map((item, i) => (
              <TouchableOpacity key={i} activeOpacity={0.6} onPress={this.goUserPage.bind(null, item)}>
                <View style={styles.listItem}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 54, height: 54, borderRadius: 40}} source={{uri: item.avatar}}/>
                    <View style={{marginLeft: 10}}>
                      <View style={styles.title}>
                        <Text style={{color: '#5F5F5F', marginRight: 6, fontSize: 14}}>{item.nickname}</Text>
                        <Iconfont name={item.gender === '男' ? 'xingbienan' : 'xingbienv'} size={12}
                                  color={item.gender === '男' ? '#75B9EB' : baseRedColor} style={{marginRight: 6}}/>
                        <View style={styles.age}>
                          <Text style={{color: '#fff', fontSize: 10}}>14</Text>
                        </View>
                        {item.certifications ?
                          <Iconfont name='yirenzheng' size={16} color={baseRedColor}/> : null}
                      </View>
                      <View style={styles.description}>
                        <Iconfont name='dingwei' size={12} color={baseRedColor}/>
                        <Text style={{color: '#6C6C6C', marginLeft: 4, fontSize: 12}}>{item.area}</Text>
                        <Text style={{color: '#BBBBBB', marginLeft: 10, fontSize: 12}}>{item.lasttime}分钟前在线</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity activeOpacity={0.6} onPress={this.attentionPersion.bind(null, item.id)}>
                    <Iconfont name={item.attention ? 'guanzhu1' : 'quxiaoguanzhu'} size={26}
                              color={item.attention ? baseRedColor : detailGray}/>
                  </TouchableOpacity>
                </View>
                {i !== User.balancedetail.length - 1 ? <Divider style={styles.divider}/> : null}
              </TouchableOpacity>
            ))}
          </ScrollView> : <View style={styles.emptyBox}>
            <Iconfont name='wufensi' size={130} color='#B8B8B8'/>
          </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  divider: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#EEEEEE',
  },
  green: {
    fontSize: 16,
    color: baseGreenColor,
  },
  red: {
    fontSize: 16,
    color: baseRedColor,
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  age: {
    backgroundColor: '#51E5CB',
    borderRadius: 2,
    marginRight: 6,
    paddingLeft: 5,
    paddingRight: 5,
  },
})
