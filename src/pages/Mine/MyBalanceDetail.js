import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import CustomizeHeader from '../../components/Header'
import { baseRedColor, baseGreenColor } from '../../themes'

@inject('User')
@observer
export default class MyBalance extends Component {
  render() {
    const {User} = this.props
    return (
      <View style={{flex: 1}}>
        <CustomizeHeader title='余额明细' backgroundColor='#fff'/>
        <View>
          <Text style={styles.description}>系统只保留近一个月的樱花币明细哦</Text>
          <ScrollView style={{backgroundColor: '#fff'}}>
            {User.balancedetail.map((item, i) => (
              <View key={i}>
                <View style={styles.listItem}>
                  <View>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDay}>{item.day} {item.time}</Text>
                  </View>
                  <Text style={item.value.substr(0, 1) === '+' ? styles.red : styles.green}>{item.value}</Text>
                </View>
                {i !== User.balancedetail.length - 1 ? <Divider style={styles.divider}/> : null}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    fontSize: 13,
    color: '#9B9B9B',
    paddingLeft: 25,
    paddingTop: 5,
    paddingBottom: 5,
  },
  listItem: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    color: '#3E3E3E',
    fontSize: 16,
  },
  itemDay: {
    marginTop: 2,
    fontSize: 13,
    color: '#6C6C6C',
  },
  divider: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#EEEEEE',
  },
  green: {
    fontSize: 16,
    color: baseGreenColor,
  },
  red: {
    fontSize: 16,
    color: baseRedColor,
  },
})
