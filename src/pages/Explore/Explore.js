import React, { PureComponent } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Find from './Find'
import Following from './Following'
import CustomTabBar from './CustomTabBar'

const BARHEIGHT = StatusBar.currentHeight
export default class Explore extends PureComponent {
  static navigationOptions = {
    title: 'Explore',
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle='dark-content'
          translucent={true}
          backgroundColor='transparent'
        />
        <ScrollableTabView
          style={{marginTop: BARHEIGHT}}
          renderTabBar={() => <CustomTabBar
            backgroundColor='#f4f4f4'
            tabUnderlineDefaultWidth={30}
            tabUnderlineScaleX={3}
            activeColor='#FFA200'
            inactiveColor='#333'
          />}
        >
          <Find tabLabel='发现'/>
          <Following tabLabel='关注'/>
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
