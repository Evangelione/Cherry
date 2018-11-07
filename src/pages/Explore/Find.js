import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import MasonryList from '@appandflow/masonry-list'
import { secToTime } from '../../utils/secToTime'

import { width } from '../../utils/device'

const itemWidth = width / 2

const COLORS = ['#E1B168', '#FFA177', '#D4CAA0']
const IMAGES = ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537353581481&di=2ba5d064d84fd8bdbdb26da4d356bef2&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171219%2Feae9fc495b8542cfa426d40b43e67c1e.jpeg',
  'https://b-ssl.duitang.com/uploads/item/201502/17/20150217161549_C4K8L.jpeg',
  'https://b-ssl.duitang.com/uploads/item/201512/10/20151210135838_Y2SvK.jpeg',
  'https://img5.duitang.com/uploads/item/201407/23/20140723175802_LHCJU.jpeg',
  'http://www.96weixin.com/upload/allimg/20170608/utslofrwz2g0838424859.jpg',
  'http://pic.qqtn.com/up/2017-12/2017122209545713952.jpg',
  'http://life.southmoney.com/tuwen/UploadFiles_6871/201805/20180510091418594.jpg',
  'http://imgtu.5011.net/uploads/content/20170706/7544851499320881.jpg',
  'http://uploads.5068.com/allimg/1801/82-1P115193S3-50.jpg',
  'http://life.southmoney.com/tuwen/UploadFiles_6871/201805/20180510091418991.jpg',
  'http://life.southmoney.com/tuwen/UploadFiles_6871/201805/20180510091419866.jpg',
  'http://imgtu.5011.net/uploads/content/20170428/5865941493372153.jpg',
  'http://www.ld12.com/upimg358/20160130/22240398993450.jpg',
  'http://img2.touxiang.cn/file/20180125/0092f3dd7c61704870298c7ba9c67055.jpg',
  'http://img2.touxiang.cn/file/20170208/1701d49b7e6e4d26f742399009109b30.jpg']
const DATA = Array.from({length: 20}).map((_, i) => ({
  id: `item_${i}`,
  height: Math.round(Math.random() * 100 + 200),
  image: IMAGES[i % IMAGES.length],
  color: COLORS[i % COLORS.length],
  duration: parseInt(Math.random() * 100),
  comment: parseInt(Math.random() * 100),
}))


export default class Find extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      endLoading: false,
      data: DATA,
      np: 0,
      len: 20,
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
        endLoading: true,
      })
      setTimeout(() => {
        this.setState({
          len: this.state.len + 20,
        })
        const DATA = Array.from({length: 20}).map((_, i) => ({
          id: `item_${i + this.state.len}`,
          height: Math.round(Math.random() * 100 + 200),
          image: IMAGES[i % IMAGES.length],
          color: COLORS[i % COLORS.length],
          duration: parseInt(Math.random() * 100),
          comment: parseInt(Math.random() * 100),
        }))
        this.setState({
          data: [...this.state.data, ...DATA],
          endLoading: false,
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

class Cell extends Component {
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
        activeOpacity={0.6}
        onPress={() => this._onPressContent(item)}
        style={styles.cell}>
        <Image
          // defaultSource={require('../../asset/images/avatar.png')}
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
    borderBottomRightRadius: 6,
  },
  cell: {
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
