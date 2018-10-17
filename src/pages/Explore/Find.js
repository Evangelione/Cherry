import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import MasonryList from '@appandflow/masonry-list'

import { width } from '../../utils/device'

const itemWidth = width / 2

const COLORS = ['#E1B168', '#FFA177', '#D4CAA0']
const IMAGES = ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537353581481&di=2ba5d064d84fd8bdbdb26da4d356bef2&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171219%2Feae9fc495b8542cfa426d40b43e67c1e.jpeg",
  "http://wimg.spriteapp.cn/picture/2018/0816/28490200_774.jpg",
  "http://wimg.spriteapp.cn/picture/2018/0816/5b74bc51752a6_wpd.jpg",
  "http://wimg.spriteapp.cn/picture/2018/0814/5b7264c9c02a8__b.jpg",
  "http://wimg.spriteapp.cn/picture/2018/0815/5b73d96d11464_wpd.jpg",
  "http://wimg.spriteapp.cn/picture/2018/0815/5b7402c2b270b__b.jpg",
  "http://wimg.spriteapp.cn/picture/2018/0816/9b8a3898a0fb11e8b438842b2b4c75ab_wpd.jpg",
  "http://wimg.spriteapp.cn/picture/2018/0815/7936a088a07e11e89cbf842b2b4c75ab_wpd.jpg",
  "http://wimg.spriteapp.cn/picture/2018/0815/c211bcd6a04a11e8b438842b2b4c75abcut_wpd.jpg",
  "http://wimg.spriteapp.cn/picture/2018/0815/bdbbed9ea05b11e8b438842b2b4c75ab_wpd.jpg",
  "http://wimg.spriteapp.cn/picture/2018/0815/28487563_225.jpg",
  "http://wimg.spriteapp.cn/picture/2018/0816/fe6a562ca10111e891ab842b2b4c75ab_wpd.jpg",
  "http://wimg.spriteapp.cn/picture/2018/0815/7ec3b5c6a06b11e88d9b842b2b4c75ab_wpd.jpg",
  "http://wimg.spriteapp.cn/picture/2018/0815/04889484a07a11e89828842b2b4c75ab_wpd.jpg",
  "http://wimg.spriteapp.cn/picture/2018/0815/5b73aae820292__b.jpg",]
const DATA = Array.from({length: 20}).map((_, i) => ({
  id: `item_${i}`,
  height: Math.round(Math.random() * 100 + 200),
  image: IMAGES[i % IMAGES.length],
  color: COLORS[i % COLORS.length],
  duration: parseInt(Math.random() * 100),
  comment: parseInt(Math.random() * 100)
}))


// 时间
const secToTime = (s) => {
  let h = 0, m = 0
  if (s > 60) {
    m = parseInt(s / 60)
    s = parseInt(s % 60)
    if (m > 60) {
      h = parseInt(i / 60)
      m = parseInt(i % 60)
    }
  }
  // 补零
  const zero = (v) => {
    return (v >> 0) < 10 ? ("0" + v) : v
  }
  return (h == 0 ? [zero(m), zero(s)].join(":") : [zero(h), zero(m), zero(s)].join(":"))
}

export default class Find extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      endLoading: false,
      data: DATA,
      np: 0,
      len: 20
    }
  }

  static navigationOptions = {
    title: 'Find',
  }

  // 底部加载逻辑
  _onEndReached = () => {
    // const {api} = `http://d.api.budejie.com/topic/list/jingxuan/41/bs0315-android-4.5.9/${this.state.np}-20.json`
    // fetch(api)
    //   .then((response) => response.json())
    //   .then((jsonData) => {
    //     this.setState({
    //       data: [...this.state.data, ...jsonData.list],
    //       np: jsonData.info.np,
    //     })
    //   })
    if (!this.state.endLoading) {
      this.setState({
        endLoading: true
      })
      setTimeout(() => {
        this.setState({
          len: this.state.len + 20
        })
        const DATA = Array.from({length: 20}).map((_, i) => ({
          id: `item_${i + this.state.len}`,
          height: Math.round(Math.random() * 100 + 200),
          image: IMAGES[i % IMAGES.length],
          color: COLORS[i % COLORS.length],
          duration: parseInt(Math.random() * 100),
          comment: parseInt(Math.random() * 100)
        }))
        this.setState({
          data: [...this.state.data, ...DATA],
          endLoading: false
        })
      }, 500)
    }
  }

  // 设置每项key
  _keyExtractor = (item, index) => {
    return item.id + index
  }

  // 获取每项高度以展示瀑布流
  _getHeightForItem = ({item}) => {
    // return Math.max(itemWidth, itemWidth / item.video.width * item.video.height)
    return item.height + 2
  }

  // 假的下拉刷新逻辑
  _refreshRequest = () => {
    this.setState({isRefreshing: true})
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, 1000)
  }

  // 真的下拉刷新逻辑
  onRefreshing = () => {
    this.setState({
      isRefreshing: true,
    })
    const api = `http://d.api.budejie.com/topic/list/jingxuan/41/bs0315-android-4.5.9/0-20.json`
    fetch(api)
      .then((response) => response.json())
      .then((jsonData) => {
        this.setState({
          isRefreshing: false,
          data: jsonData.list,
          np: jsonData.info.np || 0,
        })
      })
      .catch(err => {
        console.warn(err)
      })
  }

  render() {
    return (
      <View>
        <MasonryList
          numColumns={2}
          data={this.state.data}
          renderItem={({item}) => <Cell item={item}/>}
          getHeightForItem={this._getHeightForItem}
          keyExtractor={this._keyExtractor}
          onEndReached={this._onEndReached}
          onRefresh={this._refreshRequest}
          refreshing={this.state.isRefreshing}
        />
      </View>
    )
  }
}

class Cell extends PureComponent {
  componentDidMount() {
    // console.warn('mount cell')
  }

  componentWillUnmount() {
    // console.warn('unmount cell')
  }

  _onPressContent = (item) => {
    // this.props.navigation.navigate('ContentDetail', {item})
    console.warn('press')
  }

  render() {
    const {item} = this.props
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this._onPressContent(item)}
        style={styles.cell}>
        <Image
          source={{uri: item.image}}
          resizeMode='cover'
          style={{width: itemWidth - 2, height: item.height, borderRadius: 6}}
        />
        {/*不如用上面的原生image，fast-image也卡*/}
        {/*<PlacehoderImage*/}
        {/*source={{uri: item.image}}*/}
        {/*placeholder={require('../../res/images/7B5B42DF4253AD4FB87518DF47A17FA1.jpg')}*/}
        {/*style={{width: itemWidth, height: item.height, borderRadius: 6}}*/}
        {/*/>*/}
        <View style={styles.itemText}>
          <Text style={{color: '#fff'}}>{secToTime(item.duration)}</Text>
          <Text style={{color: '#fff'}}>{item.comment}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 30,
    backgroundColor: '#0002',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
  cell: {
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
