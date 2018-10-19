import React, { Component } from 'react'
import { View, Text, Image, ScrollView, ImageBackground, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import { ListItem, Badge, Divider } from 'react-native-elements'
import Iconfont from 'react-native-vector-icons/Iconfont'

const BARHEIGHT = StatusBar.currentHeight

const list = [
  {
    title: '余额',
    icon: <Image style={{width: 22, height: 22}} source={require('../../asset/images/balance.png')}/>,
    count: 12800,
  },
  {
    title: '收益',
    icon: <Image style={{width: 22, height: 22}} source={require('../../asset/images/income.png')}/>,
    count: 8000,
  },
]

const list2 = [
  {
    title: '照片墙（增加曝光度）',
    icon: <Image style={{width: 22, height: 19}} source={require('../../asset/images/photowall.png')}/>,
  },
  {
    title: '技能宝库',
    icon: <Image style={{width: 22, height: 22}} source={require('../../asset/images/skill.png')}/>,
  },
]

const list3 = [
  {
    title: '身份认证',
    icon: <Image style={{width: 22, height: 22}} source={require('../../asset/images/idconfirm.png')}/>,
    certifications: false,
  },
  {
    title: '邀请获利',
    icon: <Image style={{width: 22, height: 20}} source={require('../../asset/images/invite.png')}/>,
    badge: true,
  },
  {
    title: '设置',
    icon: <Image style={{width: 22, height: 20}} source={require('../../asset/images/setting.png')}/>,
  },
]


export default class Mine extends Component {
  static navigationOptions = {
    title: 'Mine',
    headerTitleStyle: {
      justifyContent: 'center',
    },
  }

  pressItem = () => {
    console.log('pressItem')
  }

  renderRightItem = (item) => {
    let result = null
    switch (item.title) {
      case '身份认证' :
        result = item.certifications ? <Text style={{color: '#FD798F'}}>已认证</Text> :
          <Text style={{color: '#FD798F'}}>未认证</Text>
        break
      case '邀请获利':
        result = item.badge ? <Badge
          containerStyle={{backgroundColor: '#FD798F', padding: 3, width: 6, height: 6}}
          textStyle={{color: 'orange'}}
        /> : null
        break
    }
    return result
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground style={styles.imageBackground}
                         source={require('../../asset/images/bg.png')}>
          <View style={styles.userBox}>
            <Iconfont name='gerenziliao' size={20} color="#fff"/>
          </View>
          <View style={styles.avatarBox}>
            <View style={styles.avatar}>
              <TouchableOpacity style={styles.avatarPadding} activeOpacity={0.6}>
                <Image
                  style={{width: 54, height: 54, borderRadius: 40}}
                  source={require('../../asset/images/mm.png')}
                />
              </TouchableOpacity>
              <View style={styles.userName}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>你的太阳啊</Text>
                <Text style={{color: '#fff'}}>ID：5201314</Text>
              </View>
            </View>
            <View style={styles.signIn}>
              <TouchableOpacity style={styles.roundSignIn} activeOpacity={0.6}>
                <Iconfont style={{marginRight: 5}} name='qiandao' size={14} color="#FF8282"/>
                <Text style={{color: '#FF8282'}}>
                  签到
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.fanBox}>
            <TouchableOpacity style={styles.fanItem} activeOpacity={0.6}>
              <Text style={styles.BW16}>63930</Text>
              <Text style={{color: '#fff'}}>粉丝</Text>
            </TouchableOpacity>
            <View style={styles.line}/>
            <TouchableOpacity style={styles.fanItem} activeOpacity={0.6}>
              <Text style={styles.BW16}>70</Text>
              <Text style={{color: '#fff'}}>关注</Text>
            </TouchableOpacity>
            <View style={styles.line}/>
            <TouchableOpacity style={styles.fanItem} activeOpacity={0.6}>
              <Text style={styles.BW16}>130</Text>
              <Text style={{color: '#fff'}}>动态圈</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <ScrollView style={{flex: 1}}>
          <View>
            {list.map((item, i) => (
              <TouchableOpacity key={i} activeOpacity={0.6} onPress={this.pressItem}>
                <View>
                  <ListItem
                    key={i}
                    chevron
                    title={item.title}
                    leftElement={item.icon}
                    rightElement={<Text style={{color: '#AEAEAE'}}>{item.count}</Text>}
                  />
                  {
                    i !== (list.length - 1) ?
                      <Divider style={{backgroundColor: '#eee'}}/> : null
                  }
                </View>
              </TouchableOpacity>

            ))}
          </View>
          <View style={{marginTop: 20}}>
            {list2.map((item, i) => (
              <TouchableOpacity key={i} activeOpacity={0.6} onPress={this.pressItem}>
                <View>
                  <ListItem
                    key={i}
                    chevron
                    title={item.title}
                    leftElement={item.icon}
                  />
                  {
                    i !== (list2.length - 1) ?
                      <Divider style={{backgroundColor: '#eee'}}/> : null
                  }
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{marginTop: 20, marginBottom: 70}}>
            {list3.map((item, i) => (
              <TouchableOpacity key={i} activeOpacity={0.6} onPress={this.pressItem}>
                <View>
                  <ListItem
                    key={i}
                    chevron
                    title={item.title}
                    leftElement={item.icon}
                    rightElement={this.renderRightItem.bind(null, item)}
                  />
                  {
                    i !== (list3.length - 1) ?
                      <Divider style={{backgroundColor: '#eee'}}/> : null
                  }
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  BW16: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  line: {
    width: 1,
    height: 20,
    backgroundColor: '#fff',
    marginTop: 16,
  },
  imageBackground: {
    paddingTop: BARHEIGHT,
    minHeight: 240,
    backgroundColor: '#fff',
  },
  userBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginRight: 15,
  },
  avatarBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 25,
  },
  avatar: {
    flex: 1,
    flexDirection: 'row',
  },
  signIn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,

  },
  avatarPadding: {
    width: 56,
    height: 56,
    borderRadius: 40,
    padding: 1,
    backgroundColor: '#fff',
  },
  userName: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
  },
  roundSignIn: {
    width: 80,
    height: 28,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fanBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  fanItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
})
