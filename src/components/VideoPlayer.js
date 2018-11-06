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
      videoUrl: 'http://v1-dy.ixigua.com/4f0c700630efc383fd47622f1ad2a5b2/5be15acb/video/m/2204779f5087aa74532b6f190596e822b1e115d7d3f00009d0121a81802/?rc=amt5bXdsO3g7aTMzOmkzM0ApQHRoaGR1KUg5Ojk4MzQzMzU0NDM0NDVvQGgzdSlAZmxkamV6aGhkZi1iNGNnLzRsLV8tLTItMHNzLW8janQ6aTM1LjYtLzUtLjEuMzMuNS06I28jOmEtbyNtbCtiK2p0Og%3D%3D',
      videoCover: 'https://p9-dy.bytecdn.cn/aweme/300x400/e16f000389ad747eb1f8.jpeg',
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

  _onPlayError = () => {
    console.log('视频播放失败')
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
