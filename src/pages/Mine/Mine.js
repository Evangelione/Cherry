import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  View,
  Text,
  Image,
  Modal,
  ScrollView,
  CameraRoll,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { ListItem, Badge, Divider } from 'react-native-elements'
import Iconfont from '../../common/Iconfont'
import Toast from 'react-native-easy-toast'
import ImageViewer from 'react-native-image-zoom-viewer'
import RNFS from 'react-native-fs'
import { OS } from '../../utils/device'

const BARHEIGHT = StatusBar.currentHeight

@inject('User')
@observer
export default class Mine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAvatar: false,
    }
  }

  toggleAvatar = () => {
    this.setState({
      showAvatar: !this.state.showAvatar,
    })
  }

  persionalInfo = () => {
    this.props.navigation.navigate('PersionalInfo')
  }

  saveAvatarToLocal = (url) => {
    // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)

    // 图片
    const cache = OS === 'android' ? RNFS.DocumentDirectoryPath : RNFS.MainBundlePath
    const downloadDest = `${cache}/${((Math.random() * 1000) | 0)}.jpg`
    const formUrl = url

    // 文件
    // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.zip`;
    // const formUrl = 'http://files.cnblogs.com/zhuqil/UIWebViewDemo.zip';

    // 视频
    // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.mp4`;
    // http://gslb.miaopai.com/stream/SnY~bbkqbi2uLEBMXHxGqnNKqyiG9ub8.mp4?vend=miaopai&
    // https://gslb.miaopai.com/stream/BNaEYOL-tEwSrAiYBnPDR03dDlFavoWD.mp4?vend=miaopai&
    // const formUrl = 'https://gslb.miaopai.com/stream/9Q5ADAp2v5NHtQIeQT7t461VkNPxvC2T.mp4?vend=miaopai&';

    // 音频
    // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.mp3`;
    // http://wvoice.spriteapp.cn/voice/2015/0902/55e6fc6e4f7b9.mp3
    // const formUrl = 'http://wvoice.spriteapp.cn/voice/2015/0818/55d2248309b09.mp3';

    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
    }

    try {
      const ret = RNFS.downloadFile(options)
      ret.promise.then(res => {
        console.log('success', res)
        console.log('file://' + downloadDest)
        // 例如保存图片
        CameraRoll.saveToCameraRoll(downloadDest)
          .then(() => {
            this.toast.show('图片已保存到相册')
          }).catch(() => {
          this.toast.show('图片保存失败')
        })
      }).catch(err => {
        this.toast.show('downloadFile Error', err)
      })
    }
    catch (e) {
      this.toast.show('downloadFile Error', e)
    }

    // let index = this.props.curentImage
    // let url = this.props.imaeDataUrl[index]
    // let promise = CameraRoll.saveToCameraRoll(url)
    // promise.then(_ => {
    //   this.toast.show('已保存到系统相册')
    // }).catch(error => {
    //   this.toast.show('保存失败！\n' + error)
    //   console.log(url)
    // })
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
    const list = [{
      title: '余额',
      icon: <Image style={{width: 22, height: 22}} source={require('../../asset/images/balance.png')}/>,
      count: this.props.User.balance,
    }, {
      title: '收益',
      icon: <Image style={{width: 22, height: 22}} source={require('../../asset/images/income.png')}/>,
      count: this.props.User.income,
    }]
    const list2 = [{
      title: '照片墙（增加曝光度）',
      icon: <Image style={{width: 22, height: 19}} source={require('../../asset/images/photowall.png')}/>,
    }, {
      title: '技能宝库',
      icon: <Image style={{width: 22, height: 22}} source={require('../../asset/images/skill.png')}/>,
    }]
    const list3 = [{
      title: '身份认证',
      icon: <Image style={{width: 22, height: 22}} source={require('../../asset/images/idconfirm.png')}/>,
      certifications: this.props.User.certifications,
    }, {
      title: '邀请获利',
      icon: <Image style={{width: 22, height: 20}} source={require('../../asset/images/invite.png')}/>,
      badge: this.props.User.invitebadge,
    }, {
      title: '设置',
      icon: <Image style={{width: 22, height: 20}} source={require('../../asset/images/setting.png')}/>,
    }]
    const list4 = [{
      title: '粉丝',
      count: this.props.User.fans,
    }, {
      title: '关注',
      count: this.props.User.follow,
    }, {
      title: '动态圈',
      count: this.props.User.discovery,
    }]
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={this.state.showAvatar ? 'black' : 'transparent'}
                   translucent={!this.state.showAvatar}></StatusBar>
        <ImageBackground style={styles.imageBackground}
                         source={require('../../asset/images/bg.png')}>
          <View style={styles.userBox}>
            <TouchableOpacity style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10}} activeOpacity={0.6}
                              onPress={this.persionalInfo}>
              <Iconfont name='gerenziliao' size={20} color="#fff"/>
            </TouchableOpacity>
          </View>
          <View style={styles.avatarBox}>
            <View style={styles.avatar}>
              <TouchableOpacity style={styles.avatarPadding} activeOpacity={0.6} onPress={this.toggleAvatar}>
                <Image
                  style={{width: 54, height: 54, borderRadius: 40}}
                  source={{uri: this.props.User.avatar}}/>
                <Modal onRequestClose={this.toggleAvatar} animationType='slide' visible={this.state.showAvatar}
                       transparent={true}>
                  <ImageViewer
                    imageUrls={[{
                      url: this.props.User.avatar,
                    }]}
                    onClick={this.toggleAvatar}
                    onSave={this.saveAvatarToLocal}
                    menuContext={{'saveToLocal': '保存图片', 'cancel': '取消'}}></ImageViewer>
                  <Toast ref={ref => this.toast = ref} position='bottom'/>
                </Modal>
              </TouchableOpacity>
              <View style={styles.userName}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>{this.props.User.nickname}</Text>
                <Text style={{color: '#fff'}}>ID：{this.props.User.id}</Text>
              </View>
            </View>
            <View style={styles.signIn}>
              <TouchableOpacity style={styles.roundSignIn} activeOpacity={0.6}>
                <Iconfont style={{marginRight: 5}} name='qiandao' size={14} color="#FF8282"/>
                <Text style={{color: '#FF8282'}}>签到</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.fanBox}>
            {list4.map((item, i) => (
              <TouchableOpacity style={styles.fanItem} key={i} activeOpacity={0.6}>
                <Text style={styles.BW16}>{item.count}</Text>
                <Text style={{color: '#fff'}}>{item.title}</Text>
                {i !== (list4.length - 1) ?
                  <View style={styles.line}/> : null}
              </TouchableOpacity>
            ))}
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
                  {i !== (list.length - 1) ?
                    <Divider style={{backgroundColor: '#eee'}}/> : null}
                </View>
              </TouchableOpacity>

            ))}
          </View>
          <View style={{marginTop: 10}}>
            {list2.map((item, i) => (
              <TouchableOpacity key={i} activeOpacity={0.6} onPress={this.pressItem}>
                <View>
                  <ListItem
                    key={i}
                    chevron
                    title={item.title}
                    leftElement={item.icon}
                  />
                  {i !== (list2.length - 1) ?
                    <Divider style={{backgroundColor: '#eee'}}/> : null}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{marginTop: 10, marginBottom: 70}}>
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
                  {i !== (list3.length - 1) ?
                    <Divider style={{backgroundColor: '#eee'}}/> : null}
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
    position: 'absolute',
    top: 12,
    right: 0,
  },
  imageBackground: {
    paddingTop: BARHEIGHT,
    minHeight: 240,
    backgroundColor: '#fff',
  },
  userBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
