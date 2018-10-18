import React, { Component } from 'react'
import { View, ScrollView, TouchableHighlight, StatusBar } from 'react-native'
import { ListItem, Divider } from 'react-native-elements'

const BARHEIGHT = StatusBar.currentHeight
const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
]

const list2 = [
  {
    title: 'Appointments',
    icon: 'av-timer',
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff',
  },
]

const list3 = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
]

const userInfo = {
  name: 'Amy Farha',
  avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  subtitle: 'Vice President',
}
const list4 = [
  {
    name: 'Amy Farha',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
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
    console.log(1111)
  }

  keyExtractor = (item, index) => index

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      subtitle={item.subtitle}
      leftAvatar={{
        source: item.avatar_url && {uri: item.avatar_url},
        title: item.name[0],
      }}
    />
  )

  render() {
    return (
      <ScrollView style={{marginTop: BARHEIGHT}}>
        <TouchableHighlight underlayColor={'#666'} onPress={this.pressItem}>
          <ListItem
            chevron
            title={userInfo.name}
            subtitle={userInfo.subtitle}
            leftAvatar={{source: {uri: userInfo.avatar_url}}}
          />
        </TouchableHighlight>
        {
          list.map((l, i) => (
            <ListItem
              key={i}
              chevron
              badge={{value: 0, textStyle: {color: '#666'}, containerStyle: {backgroundColor: 'transparent'}}}
              leftAvatar={{source: {uri: l.avatar_url}}}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))
        }
        {
          list2.map((item, i) => (
            <TouchableHighlight key={i} underlayColor={'#666'} onPress={this.pressItem}>
              <View>
                <ListItem
                  key={i}
                  chevron
                  title={item.title}
                  leftIcon={{name: item.icon}}
                />
                {
                  i !== (list2.length - 1) ?
                    <Divider/> : null
                }

              </View>
            </TouchableHighlight>
          ))
        }
        {
          list2.map((item, i) => (
            <TouchableHighlight key={i} underlayColor={'#666'} onPress={this.pressItem}>
              <View>
                <ListItem
                  key={i}
                  chevron
                  title={item.title}
                  leftIcon={{name: item.icon}}
                />
                {
                  i !== (list2.length - 1) ?
                    <Divider/> : null
                }

              </View>
            </TouchableHighlight>
          ))
        }
        {
          list2.map((item, i) => (
            <TouchableHighlight key={i} underlayColor={'#666'} onPress={this.pressItem}>
              <View>
                <ListItem
                  key={i}
                  chevron
                  title={item.title}
                  leftIcon={{name: item.icon}}
                />
                {
                  i !== (list2.length - 1) ?
                    <Divider/> : null
                }

              </View>
            </TouchableHighlight>
          ))
        }
      </ScrollView>
    )
  }
}
