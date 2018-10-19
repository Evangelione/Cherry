import React, { Component } from 'react'
import { View, Text, ScrollView, ImageBackground, StatusBar, TouchableHighlight } from 'react-native'
import { ListItem, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'

const BARHEIGHT = StatusBar.currentHeight

const list = [
  {
    title: 'Appointments',
    icon: 'av-timer',
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff',
  },
]


export default class Mine extends Component {
  static navigationOptions = {
    title: 'Mine',
    headerTitleStyle: {
      justifyContent: 'center',
    },
  }

  pressItem = () => {
    console.log('pressItem')
  }

  render() {
    return (
      <ScrollView>
        <ImageBackground style={{paddingTop: BARHEIGHT, minHeight: 240, backgroundColor: '#fff'}}
                         source={require('../../asset/images/bg.png')}></ImageBackground>
        <View>
          {list.map((item, i) => (
            <TouchableHighlight key={i} underlayColor={'#666'} onPress={this.pressItem}>
              <View>
                <ListItem
                  key={i}
                  chevron
                  title={item.title}
                  leftIcon={{name: item.icon}}
                />
                {
                  i !== (list.length - 1) ?
                    <Divider/> : null
                }
              </View>
            </TouchableHighlight>

          ))}
        </View>
        <View style={{marginTop: 20}}>
          {list.map((item, i) => (
            <TouchableHighlight key={i} underlayColor={'#666'} onPress={this.pressItem}>
              <View>
                <ListItem
                  key={i}
                  chevron
                  title={item.title}
                  leftIcon={{name: item.icon}}
                />
                {
                  i !== (list.length - 1) ?
                    <Divider/> : null
                }
              </View>
            </TouchableHighlight>
          ))}
        </View>
        <View style={{marginTop: 20}}>
          {list.map((item, i) => (
            <TouchableHighlight key={i} underlayColor={'#666'} onPress={this.pressItem}>
              <View>
                <ListItem
                  key={i}
                  chevron
                  title={item.title}
                  leftIcon={{name: item.icon}}
                />
                {
                  i !== (list.length - 1) ?
                    <Divider/> : null
                }
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>
    )
  }
}
