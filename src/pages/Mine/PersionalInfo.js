import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { View, Text, TouchableOpacity, ScrollView, Image, Clipboard } from 'react-native'
import { ListItem, Divider } from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker'
import CustomizeHeader from '../../components/Header'
import Toast from 'react-native-easy-toast'
import ActionSheet from 'react-native-actionsheet'

@inject('User')
@observer
export default class PersionalInfo extends Component {
  pressItem = (item) => {
    const {key, title, value} = item
    switch (key) {
      case 'id':
        Clipboard.setString(value)
        this.toast.show('ID已经复制到粘贴板')
        return false
        break
      case 'gender':
        this.ActionSheet.show()
        return false
        break
    }
    this.props.navigation.navigate('ModifyInfo', {key, title, value})
  }

  pressAvatar = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 300,
      height: 300,
    }).then(image => {
      console.log(image)
    }).catch(e => {
      console.log(e)
    })
  }

  sexChange = (index) => {
    if (index === 0) {
      this.props.User.update('gender', '男')
    } else if (index === 1) {
      this.props.User.update('gender', '女')
    }
  }

  render() {
    const list = [{
      key: 'id',
      title: 'ID',
      value: this.props.User.id,
      chevron: false,
    }, {
      key: 'nickname',
      title: '昵称',
      value: this.props.User.nickname,
      chevron: true,
    }, {
      key: 'gender',
      title: '性别',
      value: this.props.User.gender,
      chevron: true,
    }, {
      key: 'birthday',
      title: '生日',
      value: this.props.User.birthday,
      chevron: true,
    }, {
      key: 'area',
      title: '地区',
      value: this.props.User.area,
      chevron: true,
    }, {
      key: 'phone',
      title: '手机号',
      value: this.props.User.phone,
      chevron: true,
    }]
    return (
      <View>
        <CustomizeHeader title='个人资料' backgroundColor='#fff'/>
        <ScrollView>
          <TouchableOpacity style={{marginTop: 10, marginBottom: 10}} activeOpacity={0.6} onPress={this.pressAvatar}>
            <ListItem
              chevron
              title='头像'
              rightElement={<Image
                style={{width: 54, height: 54, borderRadius: 40}}
                source={{uri: this.props.User.avatar}}
              />}
            />
          </TouchableOpacity>
          {list.map((item, i) => (
            <TouchableOpacity key={i} activeOpacity={0.6} onPress={this.pressItem.bind(null, item)}>
              <View>
                <ListItem
                  key={i}
                  chevron={item.chevron}
                  title={item.title}
                  rightElement={<Text style={item.chevron ? {color: '#AEAEAE'} : {
                    color: '#AEAEAE',
                    paddingRight: 33,
                  }}>{item.value}</Text>}
                />
                {i !== (list.length - 1) ?
                  <Divider style={{backgroundColor: '#eee'}}/> : null}
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={{marginTop: 10, marginBottom: 10}} activeOpacity={0.6} onPress={this.pressItem}>
            <ListItem title='个性签名'/>
            <Divider style={{backgroundColor: '#eee'}}/>
            <ListItem subtitle={<Text style={{color: '#9B9B9B'}}>{this.props.User.signature}</Text>}/>
          </TouchableOpacity>
        </ScrollView>
        <ActionSheet
          ref={ref => this.ActionSheet = ref}
          options={['男', '女', '取消']}
          cancelButtonIndex={2}
          onPress={this.sexChange}/>
        <Toast ref={ref => this.toast = ref} position='bottom'/>
      </View>
    )
  }
}

