import {
  Dimensions,
  Platform,
  StatusBar,
  PixelRatio
} from 'react-native'

export const {width, height} = Dimensions.get('window')
const fontScale = PixelRatio.getFontScale() // 返回字体大小缩放比例
const pixelRatio = PixelRatio.get() // 当前设备的像素密度

export const RVW = width / 100
export const RVH = height / 100
export const RFT = RVW / fontScale
export const RPX = 1 / pixelRatio

export const OS = Platform.OS
export const ios = (OS === 'ios')
export const android = (OS === 'android')
export const isIPhoneX = (ios && height === 812 && width === 375)
export const statusBarHeight = (ios ? (isIPhoneX ? 44 : 20) : StatusBar.currentHeight)
