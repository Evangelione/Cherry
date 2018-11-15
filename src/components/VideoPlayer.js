import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import Video from 'react-native-video'
import Modal from 'react-native-modal'
import Iconfont from '../common/Iconfont'

const SCREENWIDTH = Dimensions.get('window').width
const SCREENHEIGHT = Dimensions.get('window').height

export default class VideoPlayScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoUrl: this.props.videoUrl,
      videoCover: this.props.videoCover,
      videoWidth: this.props.videoWidth,
      videoHeight: this.props.videoHeight,
      isEnd: false,
      paused: false,
      modalVisible: false,
    }
  }

  _onPlayEnd = () => {
    console.log('视频播放结束')
    this.setState({
      isEnd: true,
    })
  }

  _onPlayError = (err) => {
    console.log('视频播放失败')
    console.log(err)
  }

  /// 点击了播放按钮
  onPressPlayButton = () => {
    this.setState({
      isEnd: false,
      paused: false,
      modalVisible: true,
    })
  }

  replayVideo = () => {
    this.videoPlayer && this.videoPlayer.seek(0)
    this.setState({
      isEnd: false,
      paused: false,
    })
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
    })
  }

  render() {
    const {videoUrl, videoCover, isEnd, paused} = this.state
    return (
      <>
        <View style={styles.container}>
          <Image style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}} source={{uri: videoCover}}/>
          <TouchableWithoutFeedback onPress={this.onPressPlayButton}>
            <View style={styles.playBtn}>
              <Iconfont name='shipin' size={24} color='#fff'/>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Modal
          isVisible={this.state.modalVisible}
          onBackButtonPress={this.hideModal}
          backdropOpacity={1}
          style={{margin: 0, position: 'relative'}}>
          <StatusBar backgroundColor={'#000'} barStyle='light-content'/>
          <Video
            ref={ref => this.videoPlayer = ref}
            source={{uri: videoUrl}}
            paused={paused}
            onEnd={this._onPlayEnd}
            onError={this._onPlayError}
            style={{width: SCREENWIDTH, height: SCREENHEIGHT}}/>
          {isEnd ? <View style={styles.replayBtn}>
            <TouchableOpacity onPress={this.replayVideo}>
              <Iconfont name='shipin' size={44} color='#fff'/>
            </TouchableOpacity>
          </View> : null}
        </Modal>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 76,
    height: 76,
    backgroundColor: '#f0f0f0',
  },
  playBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  replayBtn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
})
