import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native'
import { Header, ListItem, Divider } from 'react-native-elements'
import Iconfont from 'react-native-vector-icons/Iconfont'

const list = [
  {
    title: 'ID',
    value: 5201314,
  },
  {
    title: '昵称',
    value: '你的太阳啊',
  },
  {
    title: '性别',
    value: '女',
  },
  {
    title: '生日',
    value: '1998-05-07',
  },
  {
    title: '地区',
    value: '浙江 杭州',
  },
  {
    title: '手机号',
    value: '15088888888',
  },
]

export default class PersionalInfo extends Component {
  static navigationOptions = {
    title: 'Mine',
    headerTitleStyle: {
      justifyContent: 'center',
    },
  }

  navigateBack = () => {
    this.props.navigation.navigate('Mine')
  }

  pressItem = () => {
    console.log('123')
  }

  render() {
    return (
      <View>
        <StatusBar barStyle='dark-content' translucent={true} backgroundColor='transparent'/>
        <Header backgroundColor='#fff'>
          <TouchableOpacity onPress={this.navigateBack} style={{padding: 10}}>
            <Iconfont name='youjiantou' size={18} color='#6C6C6C'/>
          </TouchableOpacity>
          <Text style={{fontSize: 18, color: '#3e3e3e'}}>个人资料</Text>
        </Header>
        <ScrollView>
          <TouchableOpacity style={{marginTop: 10, marginBottom: 10}} activeOpacity={0.6} onPress={this.pressItem}>
            <ListItem
              chevron
              title='头像'
              rightElement={<Image
                style={{width: 54, height: 54, borderRadius: 40}}
                source={require('../../asset/images/mm.png')}
              />}
            />
          </TouchableOpacity>
          {list.map((item, i) => (
            <TouchableOpacity key={i} activeOpacity={0.6} onPress={this.pressItem}>
              <View>
                <ListItem
                  key={i}
                  chevron
                  title={item.title}
                  rightElement={<Text style={{color: '#AEAEAE'}}>{item.value}</Text>}
                />
                {i !== (list.length - 1) ?
                  <Divider style={{backgroundColor: '#eee'}}/> : null}
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={{marginTop: 10, marginBottom: 10}} activeOpacity={0.6} onPress={this.pressItem}>
            <ListItem title='个性签名'/>
            <Divider style={{backgroundColor: '#eee'}}/>
            <ListItem subtitle={<Text style={{color: '#9B9B9B'}}>123</Text>}/>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

