import React, { Component } from 'react'
import { View, ScrollView, TouchableWithoutFeedback, Text, ImageBackground, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Button } from 'react-native-elements'
import CustomizeHeader from '../../components/Header'
import { BalanceList } from '../../common/listData'
import { baseRedColor } from '../../themes'

@inject('User')
@observer
export default class MyBalance extends Component {
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
        <ImageBackground style={styles.imageBackground} source={require('../../asset/images/cherry.png')}>
          <Text style={{fontSize: 48, color: '#fff'}}>{this.props.User.balance}</Text>
          <Text style={{fontSize: 16, color: '#fff'}}>我的樱花币</Text>
        </ImageBackground>
        <ScrollView style={{marginTop: 10, backgroundColor: '#fff'}}>
          <Text style={{flex: 1, textAlign: 'center', color: '#BFBFBF', marginTop: 20}}>请选择充值额度</Text>
          {BalanceList.filter((item, i) => {
            return i % 2 === 0
          }).map((item, i) => (
            <View key={i} style={{flexDirection: 'row', paddingLeft: 5, paddingRight: 5}}>
              <TouchableWithoutFeedback onPress={this.pressItem.bind(null, item, i * 2)} style={{position: 'relative'}}>
                <View style={[styles.rechargeItem, this.state.currentItem === i * 2 ? styles.currentItem : null]}>
                  <Text>{item.title}</Text>
                  <Text>{item.value}</Text>
                  {item.gift ? <View style={styles.giftBar}>
                    <Text style={{color: '#fff', fontSize: 12}}>送{item.gift}樱花币</Text>
                  </View> : null}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.pressItem.bind(null, BalanceList[i * 2 + 1], i * 2 + 1)}
                                        style={{position: 'relative'}}>
                <View style={[styles.rechargeItem, this.state.currentItem === i * 2 + 1 ? styles.currentItem : null]}>
                  <Text>{BalanceList[i * 2 + 1].title}</Text>
                  <Text>{BalanceList[i * 2 + 1].value}</Text>
                  {BalanceList[i * 2 + 1].gift ?
                    <View style={styles.giftBar}>
                      <Text style={{color: '#fff', fontSize: 12}}>送{BalanceList[i * 2 + 1].gift}樱花币</Text>
                    </View> : null}
                </View>
              </TouchableWithoutFeedback>
            </View>
          ))}
          <Button
            title="立即支付"
            titleStyle={{color: '#fff'}}
            onPress={this.login}
            buttonStyle={{
              backgroundColor: baseRedColor,
              marginTop: 50,
              marginLeft: 20,
              marginRight: 20,
            }}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    minHeight: 140,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  rechargeItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 12,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 12,
    paddingRight: 12,
  },
  giftBar: {
    position: 'absolute',
    top: -1,
    right: -1,
    backgroundColor: '#FD798F',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 4,
  },
  currentItem: {
    borderWidth: 1,
    borderColor: baseRedColor,
  },
})
