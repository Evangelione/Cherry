import React, { PureComponent } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

export default class PlacehoderImage extends PureComponent {
  constructor() {
    super()
    this.state = {
      contentDidLoad: false
    }
  }

  _renderPlaceholder = () => {
    const {placeholder} = this.props
    return (
      <Image
        source={placeholder}
        resizeMode={FastImage.resizeMode.center}
        style={styles.content}
      />
    )
  }

  _renderImage = () => {
    const {source, resizeMode} = this.props
    const ImageType = source.uri.indexOf('http') < 0 ? Image : FastImage
    return (
      <ImageType
        source={source}
        resizeMode={resizeMode || FastImage.resizeMode.cover}
        style={styles.content}
        onProgress={this._onProgress}
        onLoadStart={this._onLoadStart}
        onLoadEnd={this._onLoadEnd}
        onLoad={this._onLoad}
        onError={this._onError}
        onLayout={this._onLayout}
      />
    )
  }

  _onProgress = () => {
    const {onProgress} = this.props
    onProgress && onProgress()
  }

  _onLoadStart = () => {
    const {onLoadStart} = this.props
    onLoadStart && onLoadStart()
  }

  _onLoadEnd = () => {
    const {onLoadEnd} = this.props
    onLoadEnd && onLoadEnd()
  }

  _onLoad = () => {
    this.setState({
      contentDidLoad: true,
    })
    const {onLoad} = this.props
    onLoad && onLoad()
  }

  _onError = () => {
    const {onError} = this.props
    onError && onError()
  }

  _onLayout = () => {
    const {onLayout} = this.props
    onLayout && onLayout()
  }

  render() {
    const {style, placeholder} = this.props
    return (
      <View style={[style, {overflow: 'hidden'}]}>
        {(!this.state.contentDidLoad && placeholder) ? this._renderPlaceholder() : null}
        {this._renderImage()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
})
