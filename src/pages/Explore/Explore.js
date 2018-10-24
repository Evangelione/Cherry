import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import Find from './Find'
import Following from './Following'
import CustomTabBar from './CustomTabBar'

const BARHEIGHT = StatusBar.currentHeight
export default class Explore extends Component {
  state = {
    index: 0,
    routes: [
      {key: 'Find', title: '发现'},
      {key: 'Following', title: '关注'},
    ],
  }
  static navigationOptions = {
    title: 'Explore',
  }

  renderTabBar = (props) => {
    console.log(props)
    return <CustomTabBar
      {...props}
      backgroundColor='#f4f4f4'
      tabUnderlineDefaultWidth={30}
      tabUnderlineScaleX={3}
      activeColor='#FFA200'
      inactiveColor='#333'
    />
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' translucent={true} backgroundColor='transparent'/>
        <TabView
          style={{marginTop: BARHEIGHT}}
          navigationState={this.state}
          onIndexChange={index => this.setState({index})}
          renderScene={SceneMap({Find, Following})}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
