import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Button, Divider } from 'react-native-elements'
import CustomizeHeader from '../../components/Header'
import { baseRedColor, titleBlack, detailGray, dividerColor } from '../../themes'

@inject('User')
@observer
export default class PhotoWall extends Component {
  renderPhotos = () => {
    const {User} = this.props
    let photoArr = []
    for (let i = 0; i < 4; i++) {
      if (i < User.photos.length) {
        photoArr = User.photos.map(item => (
          <View style={styles.imageView} key={i}>
            <Image style={styles.image} source={{uri: item}}/>
            <TouchableOpacity style={styles.delImage} onPress={this.delPhoto}>
              <Text style={styles.X}>×</Text>
            </TouchableOpacity>
          </View>
        ))
      } else {
        photoArr.push(
          <View style={styles.emptyPhotoBox} key={i}></View>,
        )
      }
    }
    return photoArr
  }

  renderVideo = () => {
    const {User} = this.props
    let videoArr = []
    if (User.video.length) {
      videoArr = User.video.map(item => (
        <View style={styles.imageView} key={item}>
          <Image style={styles.image} source={{uri: item}}/>
          <TouchableOpacity style={styles.delImage} onPress={this.delPhoto}>
            <Text style={styles.X}>×</Text>
          </TouchableOpacity>
        </View>
      ))
    } else {
      videoArr.push(
        <View style={styles.emptyPhotoBox} key={'empty'}></View>,
      )
    }
    return videoArr
  }

  delPhoto = (url) => {

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomizeHeader title='照片墙设置' backgroundColor='#fff'/>
        <View style={styles.container}>
          <Text style={styles.title}>上传本人照片及视频</Text>
          <Text style={styles.detail}>最多4张照片及1条视频</Text>
          <Divider style={styles.divider}/>
          <View style={styles.photoContainer}>
            {this.renderPhotos()}
          </View>
          <View style={styles.videoContainer}>
            {this.renderVideo()}
          </View>
        </View>
        <Button
          title="保存"
          titleStyle={{color: '#fff'}}
          onPress={this.login}
          buttonStyle={{
            backgroundColor: baseRedColor,
            borderWidth: 1,
            borderColor: baseRedColor,
            borderRadius: 8,
            elevation: 0,
          }}
          containerStyle={{
            marginTop: 40,
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 8,
            elevation: 0,
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
  },
  title: {
    color: titleBlack,
    fontSize: 16,
    paddingTop: 15,
    paddingLeft: 12,
  },
  detail: {
    color: detailGray,
    fontSize: 14,
    marginTop: 4,
    paddingLeft: 12,
  },
  divider: {
    backgroundColor: dividerColor,
    marginTop: 12,
    marginBottom: 12,
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageView: {
    position: 'relative',
    borderRadius: 2,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 2,
  },
  delImage: {
    position: 'absolute',
    top: -7,
    right: -6,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#000',
    opacity: 0.7,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  X: {
    fontSize: 14,
    color: '#fff',
    marginTop: -1,
  },
  emptyPhotoBox: {
    width: 76,
    height: 76,
    backgroundColor: '#D8D8D8',
    borderRadius: 2,
  },
  videoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 12,
    marginBottom: 30,
  },
})
