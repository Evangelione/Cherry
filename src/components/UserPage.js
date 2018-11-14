import React, { Component } from 'react'
import { View, Text, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Swiper from 'react-native-swiper'
import { baseRedColor, baseGreenColor } from '../themes/index'
import Iconfont from '../common/Iconfont'

const window = Dimensions.get('window')
const STICKY_HEADER_HEIGHT = 70
const PARALLAX_HEADER_HEIGHT = 300

export default class UserPage extends Component {

  navigateBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    const User = this.props.navigation.getParam('user', {})
    return (
      <ParallaxScrollView
        ref='ListView'
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
        <View style={{height: 500}}>
          <Text>Scroll me</Text>
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
})
