import React, { Component } from 'react'
import { View, ImageBackground, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CustomizeHeader from '../../components/Header'
import { ListItem, Input, Divider, Button } from 'react-native-elements'
import { baseRedColor, dividerColor } from '../../themes/index'
import ActionSheet from 'react-native-actionsheet'
import Iconfont from '../../common/Iconfont'
import { width } from '../../utils/device'
import ImagePicker from 'react-native-image-crop-picker'
import RNFetchBlob from 'rn-fetch-blob'

const ITEMWIDTH = (width - 30) / 2

class Authentication extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      idNum: '',
      sex: '',
      idPhotoFront: '',
      idPhotoObverse: '',
      handHeldPhoto: '',
      video: ''
    }
  }


  setText = (text) => {
    this.setState({
      text,
    })
  }

  sexChange = (index) => {
    if (index === 0) {
      this.setState({
        sex: '男',
      })
    } else if (index === 1) {
      this.setState({
        sex: '女',
      })
    }
  }

  submitCertification = () => {
    this.setState({
      name: '',
      idNum: '',
      sex: '',
      idPhotoFront: '',
      idPhotoObverse: '',
      handHeldPhoto: '',
      video: ''
    })
  }

  uploadPhoto = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 300,
      height: 300,
      // includeBase64: true,
      hideBottomControls: true,
    }).then(image => {
      RNFetchBlob.fetch('POST', 'http://192.168.2.159/app/select/upload-imgs', {
        // 上传图片要设置Header
        'Content-Type': 'multipart/form-data',
      }, [
        {name: 'image', filename: modificationDate, type: image.mime, data: RNFetchBlob.wrap(image.path)}
      ]).uploadProgress((written, total) => {
        // 本地查找进度
      }).progress((received, total) => {
        let perent = received / total
        // 上传进度打印
        console.log(perent)
      }).then((response) => {
        // 上传信息返回
        console.log(response)
        let data = JSON.parse(response.data)
        this.setState({
          photos: [...this.state.photos, data.url]
        })
      }).catch((error) => {
        // 错误信息
        console.log(error)
      })

    }).catch(e => {
      console.log(e)
    })
  }

  uploadVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log(video)
      RNFetchBlob.fetch('POST', 'http://192.168.2.159/app/select/upload-video', {
        // 上传图片要设置Header
        'Content-Type': 'multipart/form-data',
      }, [
        {name: 'video', filename: video.modificationDate, type: video.mime, data: RNFetchBlob.wrap(video.path)}
      ]).uploadProgress((written, total) => {
        // 本地查找进度
      }).progress((received, total) => {
        let perent = received / total
        // 上传进度打印
        console.log(perent)
      }).then((response) => {
        // 上传信息返回
        console.log(response)
        let data = JSON.parse(response.data)
        this.setState({
          video: {
            videoUrl: data.url,
            videoCover: 'http://img3.imgtn.bdimg.com/it/u=850016154,2966264409&fm=26&gp=0.jpg'
          }
        })
      }).catch((error) => {
        // 错误信息
        console.log(error)
      })
    }).catch(e => {
      console.log(e)
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomizeHeader title='身份认证' backgroundColor='#fff'/>
        <ScrollView>
          <ImageBackground source={require('../../asset/images/confirm.png')} style={{minHeight: 120}}/>
          <ListItem containerStyle={{paddingTop: 0, paddingBottom: 0}}
                    leftElement={<Text style={{fontSize: 16}}>真实姓名</Text>}
                    rightElement={<Input placeholder='请输入您的真实姓名'
                                         ref='input'
                                         inputStyle={styles.input}
                                         onChangeText={this.setText}
                                         containerStyle={{flex: 1}}
                                         inputContainerStyle={{borderBottomColor: 'rgba(255,255,255,0)'}}/>}/>
          <View style={{paddingLeft: 8}}>
            <Divider style={{backgroundColor: dividerColor}}/>
          </View>
          <ListItem containerStyle={{paddingTop: 0, paddingBottom: 0}}
                    leftElement={<Text style={{fontSize: 16}}>证件号码</Text>}
                    rightElement={<Input placeholder='请输入您的身份证号码'
                                         ref='input2'
                                         inputStyle={styles.input}
                                         onChangeText={this.setText}
                                         containerStyle={{flex: 1}}
                                         inputContainerStyle={{borderBottomColor: 'rgba(255,255,255,0)'}}/>}/>
          <Divider style={{backgroundColor: dividerColor}}/>
          <TouchableOpacity activeOpacity={0.6} onPress={() => this.ActionSheet.show()}>
            <ListItem chevron title='选择性别' rightElement={<Text>{this.state.sex}</Text>}/>
          </TouchableOpacity>
          <View style={{marginTop: 10, backgroundColor: '#fff', padding: 10}}>
            <Text>上传身份证照片</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
              <TouchableOpacity style={styles.uploadItem} activeOpacity={0.6} onPress={this.uploadPhoto}>
                <ImageBackground source={require('../../asset/images/shangchuanshenfenzhengrenmianxiang.png')}
                                 style={{minHeight: 100}}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadItem} activeOpacity={0.6} onPress={this.uploadPhoto}>
                <ImageBackground source={require('../../asset/images/shangchuanshenfenzhengguohuimian.png')}
                                 style={{minHeight: 100}}/>
              </TouchableOpacity>
            </View>
            <Text style={{color: '#BBBBBB', marginTop: 10, marginBottom: 10, fontSize: 12}}>
              <Iconfont name='tishi' size={12} color="#BBBBBB" style={{marginRight: 5}}/>
              &nbsp;&nbsp;请保持照片中身份证显示完整，字体清晰可见，亮度均匀
            </Text>
          </View>
          <View style={{marginTop: 10, backgroundColor: '#fff', padding: 10}}>
            <Text>上传手持身份证照片</Text>
            <View style={{marginTop: 10}}>
              <TouchableOpacity style={styles.uploadItem} activeOpacity={0.6} onPress={this.uploadPhoto}>
                <ImageBackground source={require('../../asset/images/shangchuanshouchizhengjianzhao.png')}
                                 style={{minHeight: 100}}/>
              </TouchableOpacity>
            </View>
            <Text style={{color: '#BBBBBB', marginTop: 10, marginBottom: 10, fontSize: 12}}>
              <Iconfont name='tishi' size={12} color="#BBBBBB" style={{marginRight: 5}}/>
              &nbsp;&nbsp;证件与人物头像无重叠，且清晰可见
            </Text>
          </View>
          <View style={{marginTop: 10, backgroundColor: '#fff', padding: 10}}>
            <Text>上传手持身份证照片</Text>
            <View style={{marginTop: 10}}>
              <TouchableOpacity style={styles.uploadItem} activeOpacity={0.6} onPress={this.uploadVideo}>
                <ImageBackground source={require('../../asset/images/shangchuanzipaishipin.png')}
                                 style={{minHeight: 100}}/>
              </TouchableOpacity>
            </View>
            <Text style={{color: '#BBBBBB', marginTop: 10, marginBottom: 10, fontSize: 12}}>
              <Iconfont name='tishi' size={12} color="#BBBBBB" style={{marginRight: 5}}/>
              &nbsp;&nbsp;用于平台审核，不对外展示
            </Text>
          </View>
          <Button
            title="提交认证"
            titleStyle={{color: '#fff'}}
            onPress={this.submitCertification}
            buttonStyle={{
              backgroundColor: baseRedColor,
              borderWidth: 1,
              borderColor: baseRedColor,
              borderRadius: 8,
              elevation: 0,
            }}
            containerStyle={{
              marginTop: 30,
              marginBottom: 30,
              marginLeft: 18,
              marginRight: 18,
              borderRadius: 8,
              elevation: 0,
            }}
          />
          <ActionSheet
            ref={ref => this.ActionSheet = ref}
            options={['男', '女', '取消']}
            cancelButtonIndex={2}
            onPress={this.sexChange}/>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    marginTop: 2,
    marginLeft: 0,
    paddingLeft: 20,
    height: 50,
    fontSize: 14,
  },
  clearIcon: {
    position: 'absolute',
    top: 5,
    right: 20,
  },
  uploadItem: {
    width: ITEMWIDTH,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CFCFCF',
    borderRadius: 4,
    overflow: 'hidden'
  }
})

export default Authentication