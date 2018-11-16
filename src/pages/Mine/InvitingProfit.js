import React, { Component } from 'react'
import { View, ImageBackground, ScrollView, Text, TouchableOpacity, Clipboard, StyleSheet } from 'react-native'
import CustomizeHeader from '../../components/Header'
import { Button } from 'react-native-elements'
import { baseRedColor } from '../../themes/index'
import Toast from 'react-native-easy-toast'
import { width } from '../../utils/device'
import { Rules, Ps } from '../../common/InvitationRule'

class Authentication extends Component {

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

  copyCode = () => {
    Clipboard.setString('9GYUXU')
    this.toast.show('邀请码已经复制到粘贴板')
  }

  renderRules = () => {
    let elemet = []
    for (let i = 0; i < Rules.length; i++) {
      elemet.push(<Text key={i} style={styles.text}>
        {Rules[i]}
      </Text>)
    }
    return elemet
  }

  renderPs = () => {
    let elemet = []
    for (let i = 0; i < Ps.length; i++) {
      elemet.push(<Text key={i} style={styles.text}>
        {Ps[i]}
      </Text>)
    }
    return elemet
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomizeHeader title='邀请获利' backgroundColor='#fff'/>
        <ScrollView>
          <ImageBackground source={require('../../asset/images/bgbar.png')}
                           style={{minHeight: 140, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 14}}>我的邀请码</Text>
            <Text style={{color: '#fff', fontSize: 20, marginTop: 6, marginBottom: 10}}>9GYUXU</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={this.copyCode}>
              <Text style={styles.textBox}>复制</Text>
            </TouchableOpacity>
          </ImageBackground>
          <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <Text style={{color: '#5F5F5F', fontSize: 16, marginTop: 18, marginBottom: 8}}>我的邀请</Text>
            <View style={{width: 28, height: 2, backgroundColor: '#EFEFEF', marginBottom: 12}}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: width}}>
              <View style={{marginBottom: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#9B9B9B', fontSize: 13}}>成功邀请（人）</Text>
                <Text style={{fontSize: 28, color: '#3E3E3E'}}>546</Text>
              </View>
              <View style={{marginBottom: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#9B9B9B', fontSize: 13}}>累计获利（樱花）</Text>
                <Text style={{fontSize: 28, color: baseRedColor}}>289546</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{marginTop: 20, color: '#5F5F5F', fontSize: 16, marginBottom: 8}}>邀请规则</Text>
            <View style={{width: 28, height: 2, backgroundColor: '#EFEFEF', marginBottom: 12}}/>
            {this.renderRules()}
          </View>
          <View style={{backgroundColor: '#fff', paddingBottom: 16}}>
            <Text style={{paddingLeft: 28, marginBottom: 6, color: '#5F5F5F', fontSize: 14}}>Ps:</Text>
            {this.renderPs()}
          </View>
          <Button
            title="立即邀请"
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
        </ScrollView>
        <Toast ref={ref => this.toast = ref} position='bottom'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textBox: {
    color: '#fff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 100,
    paddingLeft: 26,
    paddingRight: 26,
    paddingTop: 4,
    paddingBottom: 4,
  },
  text: {
    paddingLeft: 28,
    paddingRight: 28,
    color: '#5F5F5F',
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 22,
  }
})

export default Authentication