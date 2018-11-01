import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Button, Divider } from 'react-native-elements'
import CustomizeHeader from '../../components/Header'
import { baseRedColor, titleBlack, detailGray, dividerColor } from '../../themes'

@inject('User')
@observer
export default class PhotoWall extends Component {

  goBalanceDetailPage = () => {
    this.props.navigation.navigate('MyBalanceDetail')
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomizeHeader title='照片墙设置' backgroundColor='#fff'/>
        <View style={styles.container}>
          <Text style={styles.title}>上传本人照片及视频</Text>
          <Text style={styles.detail}>最多4张照片及1条视频</Text>
          <Divider style={styles.divider}/>
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
    marginBottom: 7,
  },
})
