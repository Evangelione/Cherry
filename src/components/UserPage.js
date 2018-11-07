import React, { Component } from 'react'
import { View, Text, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
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
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={10}
        renderBackground={() => (
          <View>
            <Image source={{
              uri: User.avatar,
              width: window.width,
              height: PARALLAX_HEADER_HEIGHT,
            }}/>
            <View style={{
              position: 'absolute',
              top: 0,
              width: window.width,
              height: PARALLAX_HEADER_HEIGHT,
            }}/>
          </View>
        )}

        renderFixedHeader={() => (
          <View style={styles.fixedSection}>
            <TouchableOpacity onPress={this.navigateBack} style={styles.fixedSectionText}>
              <Iconfont name='zuojiantou' size={18} color='#fff'/>
            </TouchableOpacity>
          </View>
        )}>
        <View style={{height: 500}}>
          <Text>Scroll me</Text>
        </View>
      </ParallaxScrollView>
    )
  }
}


const styles = StyleSheet.create({
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end',
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10,
  },
  fixedSection: {
    position: 'absolute',
    left: 20,
    bottom: 15,
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20,
  },
})
