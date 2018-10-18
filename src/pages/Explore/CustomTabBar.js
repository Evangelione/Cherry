import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Animated,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { OS, isIPhoneX } from '../../utils/device'

const ButtonAndroid = props => <TouchableNativeFeedback
  delayPressIn={0}
  background={TouchableNativeFeedback.SelectableBackground()}
  {...props}
>
  {props.children}
</TouchableNativeFeedback>

const ButtonIos = props => <TouchableOpacity {...props}>{props.children}</TouchableOpacity>

export default class CustomTabBar extends Component {
  _renderTab(name, page, isTabActive, onPressHandler) {
    const textColor = isTabActive ? this.props.activeColor : this.props.inactiveColor
    const fontWeight = isTabActive ? 'bold' : 'normal'
    const Button = OS == 'ios' ? ButtonIos : ButtonAndroid

    return (<Button
      style={{flex: 1}}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={styles.tab}>
        <Text style={[{color: textColor, fontWeight}]}>
          {name}
        </Text>
      </View>
    </Button>)
  }

  _renderUnderline() {
    const containerWidth = this.props.containerWidth / 2
    const numberOfTabs = this.props.tabs.length
    const underlineWidth = this.props.tabUnderlineDefaultWidth ? this.props.tabUnderlineDefaultWidth : containerWidth / (numberOfTabs * 2)
    const scale = this.props.tabUnderlineScaleX ? this.props.tabUnderlineScaleX : 3
    const deLen = (containerWidth / 2 - underlineWidth) / 2 + (containerWidth / 2)
    const tabUnderlineStyle = {
      position: 'absolute',
      width: underlineWidth,
      height: 2,
      borderRadius: 2,
      backgroundColor: this.props.activeColor,
      bottom: 0,
      left: deLen,
    }

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    })

    const scaleValue = (defaultScale) => {
      let number = 4
      let arr = new Array(number * 2)
      return arr.fill(0).reduce(function(pre, cur, idx) {
        idx == 0 ? pre.inputRange.push(cur) : pre.inputRange.push(pre.inputRange[idx - 1] + 0.5)
        idx % 2 ? pre.outputRange.push(defaultScale) : pre.outputRange.push(1)
        return pre
      }, {inputRange: [], outputRange: []})
    }

    const scaleX = this.props.scrollValue.interpolate(scaleValue(scale))

    return (
      <Animated.View
        style={[
          tabUnderlineStyle,
          {
            transform: [
              {translateX},
              {scaleX},
            ],
          },
          this.props.underlineStyle,
        ]}
      />
    )
  }

  _renderButton(onPress, image) {
    return (
      <TouchableOpacity
        style={{flex: 1, width: 44, height: 44, marginTop: isIPhoneX ? 44 : 20, alignItems: 'center'}}
        onPress={onPress}>
        <Image source={image} style={{width: 20, height: 20}} resizeMode={'contain'}/>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor}, this.props.style]}>
        <View style={{flex: 1}}></View>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page
          return this._renderTab(name, page, isTabActive, this.props.goToPage)
        })}
        {
          this._renderUnderline()
        }
        {this._renderButton(this.props.onLeftItem, require('../../asset/images/title_button_search.png'))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#f4f4f4',
  },
})
