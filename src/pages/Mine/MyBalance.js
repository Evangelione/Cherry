import React, { Component } from 'react'
import { View, ScrollView, TouchableWithoutFeedback, Text, ImageBackground, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import CustomizeHeader from '../../components/Header'
import { BalanceList } from '../../common/listConfig'

export default class MyBalance extends Component {
  goBalanceDetailPage = () => {
    this.props.navigation.navigate('MyBalanceDetail')
  }

  pressItem = (item) => {
    console.log(item)
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
          <Text style={{fontSize: 48, color: '#fff'}}>123</Text>
          <Text style={{fontSize: 16, color: '#fff'}}>我的樱花币</Text>
        </ImageBackground>
        <ScrollView style={{marginTop: 10, backgroundColor: '#fff'}}>
          <Text style={{flex: 1, textAlign: 'center', color: '#BFBFBF', marginTop: 20}}>请选择充值额度</Text>
          {BalanceList.filter((item, i) => {
            return i % 2 === 0
          }).map((item, i) => (
            <View key={i} style={{flexDirection: 'row', paddingLeft: 5, paddingRight: 5}}>
              <TouchableWithoutFeedback onPress={this.pressItem.bind(null, item)} style={{position: 'relative'}}>
                <View style={styles.rechargeItem}>
                  <Text>{item.title}</Text>
                  <Text>{item.value}</Text>
                  {item.gift ? <View style={styles.giftBar}>
                    <Text>{item.gift}</Text>
                  </View> : null}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.pressItem.bind(null, BalanceList[i * 2 + 1])}
                                        style={{position: 'relative'}}>
                <View style={styles.rechargeItem}>
                  <Text>{BalanceList[i * 2 + 1].title}</Text>
                  <Text>{BalanceList[i * 2 + 1].value}</Text>
                  {BalanceList[i * 2 + 1].gift ?
                    <View style={styles.giftBar}>
                      <Text>{BalanceList[i * 2 + 1].gift}</Text>
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
              backgroundColor: '#FD798F',
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
    top: 0,
    right: 0,
  },
})
