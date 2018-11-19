import React, { Component } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import Swiper from 'react-native-swiper'
import { baseRedColor, dividerColor } from '../themes/index'
import { width } from '../utils/device'
import Iconfont from '../common/Iconfont'

const window = Dimensions.get('window')
const STICKY_HEADER_HEIGHT = 70
const PARALLAX_HEADER_HEIGHT = 260

export default class UserPage extends Component {
  state = {
    index: 0,
    routes: [
      {key: 'SKIllS', title: `技能(${this.props.navigation.getParam('user', {}).skills.length})`},
      {key: 'WORKS', title: `作品(${this.props.navigation.getParam('user', {}).discovery})`},
    ],
  }
  navigateBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    const User = this.props.navigation.getParam('user', {})
    const SKIllS = () => (
      <View>
        {User.skills.map((item, i) => (
          <View key={i}>
            <View style={{flexDirection: 'row'}}>
              <Image source={{uri: item.photo, width: 68, height: 68}}
                     style={{borderRadius: 4, marginTop: 12, marginLeft: 12}}/>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <View>
                  <Text
                    style={{color: '#3E3E3E', fontSize: 14, marginTop: 18, marginBottom: 4, marginLeft: 12}}>语音通话</Text>
                  <Text style={styles.tag}>{item.tag}</Text>
                </View>
                <View style={{marginRight: 20}}>
                  <Text style={{marginTop: 8, color: baseRedColor, marginBottom: 34}}>{item.price}樱花/分钟</Text>
                  <TouchableOpacity activeOpacity={0.6} style={styles.invite}>
                    <Text style={{color: '#fff', fontSize: 12}}>邀请</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {i !== User.skills.length - 1 ?
              <View style={styles.dividerLine}/> : null}
          </View>
        ))}
      </View>
    )
    const WORKS = () => (
      <View>
        {User.skills.map((item, i) => (
          <View style={{flexDirection: 'row'}} key={i}>
            <Image source={{uri: item.photo, width: 68, height: 68}} style={{borderRadius: 4}}/>
            <View>
              <Text>语音通话</Text>
              <Text style={styles.tag}>{item.tag}</Text>
            </View>
          </View>
        ))}
      </View>
    )
    return (
      <ParallaxScrollView
        ref='ListView'
        contentBackgroundColor='#EBEBEB'
        fadeOutForeground={false}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        renderForeground={() => (
          <Swiper activeDotColor={baseRedColor} loop={false}>
            <Image source={{
              uri: User.avatar,
              width: window.width,
              height: PARALLAX_HEADER_HEIGHT,
            }}/>
            <Image source={{
              uri: User.avatar,
              width: window.width,
              height: PARALLAX_HEADER_HEIGHT,
            }}/>
          </Swiper>
        )}
        renderBackground={() => (
          <Image source={{
            uri: User.avatar,
            width: window.width,
            height: PARALLAX_HEADER_HEIGHT,
          }}/>
        )}
        renderFixedHeader={() => (
          <TouchableOpacity activeOpacity={0.6} onPress={this.navigateBack} style={styles.fixedSection}>
            <Iconfont name='zuojiantou' size={18} color='#fff' style={styles.fixedSectionIcon}/>
          </TouchableOpacity>
        )}>
        <View style={styles.scrollContent}>
          <View>
            <View style={styles.avatar}>
              <Image source={{uri: User.avatar, width: 54, height: 54}} style={{borderRadius: 29}}/>
            </View>
            <Text style={{color: '#4A4A4A', fontSize: 16, marginTop: 6, marginBottom: 2}}>{User.nickname}</Text>
            <Text style={{color: '#9B9B9B', fontSize: 14, marginBottom: 12}}>ID：{User.id}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 12}}>
            <Text style={{fontSize: 12, color: '#5F5F5F'}}>粉丝：{User.fans}</Text>
            <View style={{
              width: 2,
              height: 12,
              backgroundColor: '#D9D9D9',
              marginLeft: 14,
              marginRight: 14,
              marginTop: 3
            }}/>
            <Text style={{fontSize: 12, color: '#5F5F5F'}}>关注：{User.follow}</Text>
          </View>
        </View>
        <View style={{marginTop: 10, marginBottom: 10, padding: 14, backgroundColor: '#fff'}}>
          <Text style={{color: '#BBBBBB', fontSize: 12}}>{User.signature}</Text>
        </View>
        <View style={{backgroundColor: '#fff', height: 300}}>
          <TabView
            navigationState={this.state}
            onIndexChange={index => this.setState({index})}
            renderScene={SceneMap({SKIllS, WORKS})}
            renderTabBar={props =>
              <TabBar
                {...props}
                style={{backgroundColor: '#fff', elevation: 0, borderBottomWidth: 1, borderBottomColor: '#eee'}}
                labelStyle={{color: '#5F5F5F'}}
                indicatorStyle={{backgroundColor: baseRedColor, width: 20, left: ((width / 2 - 20) / 2)}}
              />
            }
          />
        </View>
      </ParallaxScrollView>
    )
  }
}

const styles = StyleSheet.create({
  fixedSection: {
    color: '#999',
    fontSize: 20,
  },
  fixedSectionIcon: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  avatar: {
    marginTop: -16,
    width: 58,
    height: 58,
    padding: 2,
    borderRadius: 29,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  tag: {
    color: '#D8D8D8',
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#D8D8D8',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    marginLeft: 12,
  },
  invite: {
    backgroundColor: baseRedColor,
    width: 46,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: 25,
  },
  dividerLine: {
    width: width - 92,
    backgroundColor: dividerColor,
    height: 1,
    marginTop: 12,
    marginLeft: 92
  },
  scrollContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 17,
    backgroundColor: '#fff'
  }
})
