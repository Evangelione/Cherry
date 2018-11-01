import React, { Component } from 'react'
import { View, ScrollView, TouchableWithoutFeedback, Text, ImageBackground, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Button } from 'react-native-elements'
import CustomizeHeader from '../../components/Header'
import { BalanceList } from '../../common/listData'
import { baseRedColor } from '../../themes'

@inject('User')
@observer
export default class MyIncome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentItem: 1,
    }
  }

  goBalanceDetailPage = () => {
    this.props.navigation.navigate('MyBalanceDetail')
  }

  pressItem = (item, i) => {
    this.setState({
      currentItem: i,
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomizeHeader title='我的余额'
                         backgroundColor='#fff'
                         handler={true}
                         handlertitle='明细'
                         handlermethod={this.goBalanceDetailPage}/>
        <ImageBackground style={styles.imageBackground} source={require('../../asset/images/mission.png')}>
          <Text style={{fontSize: 48, color: '#fff'}}>{this.props.User.income}</Text>
          <Text style={{fontSize: 16, color: '#fff'}}>我的花瓣</Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
          <Button
            title="兑换"
            titleStyle={{color: '#fff'}}
            onPress={this.login}
            buttonStyle={{
              backgroundColor: baseRedColor,
              borderWidth: 1,
              borderColor: baseRedColor,
              borderRadius: 150,
              elevation: 0,
            }}
            containerStyle={{
              marginLeft: 30,
              marginRight: 30,
              borderRadius: 150,
              elevation: 0,
            }}
          />
          <Button
            title="提现"
            titleStyle={{color: baseRedColor}}
            onPress={this.login}
            buttonStyle={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: baseRedColor,
              borderRadius: 150,
              elevation: 0,
            }}
            containerStyle={{
              marginTop: 20,
              marginLeft: 30,
              marginRight: 30,
              borderRadius: 150,
              elevation: 0,
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    minHeight: 150,
    justifyContent: 'center',
    paddingLeft: 20,
  },
})
