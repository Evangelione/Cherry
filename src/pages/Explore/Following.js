import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'

const sourceData = [{id: '1', name: '宝姐姐', age: 19, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '2', name: '宝姐姐', age: 19, adress: '上海市', recent: '27分钟前在线', certification: true},
  {id: '3', name: '宝姐姐', age: 22, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '4', name: '宝姐姐', age: 23, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '5', name: '宝姐姐', age: 19, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '6', name: '宝姐姐', age: 25, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '7', name: '宝姐姐', age: 19, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '8', name: '宝姐姐', age: 19, adress: '重庆市', recent: '27分钟前在线', certification: false},
  {id: '9', name: '宝姐姐', age: 19, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '10', name: '宝姐姐', age: 19, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '11', name: '宝姐姐', age: 19, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '12', name: '宝姐姐', age: 19, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '13', name: '宝姐姐', age: 19, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '14', name: '宝姐姐', age: 19, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '15', name: '宝姐姐', age: 19, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '16', name: '宝姐姐', age: 19, adress: '重庆市', recent: '27分钟前在线', certification: true},
  {id: '17', name: '宝姐姐', age: 19, adress: '重庆市', recent: '27分钟前在线', certification: true}]

export default class Following extends Component {

  renderList = ({item}) => {
    return (
      <View style={styles.listItem}>
        <Image style={styles.avatar} source={require('../../res/images/7B5B42DF4253AD4FB87518DF47A17FA1.jpg')}></Image>
        <View style={styles.itemDetail}>
          <View style={styles.detailTop}>
            <Text>{item.name}</Text>
            <Text>{item.age}</Text>
            <Text>{item.certification ? '1' : '2'}</Text>
          </View>
          <View style={styles.detailBottom}>
            <Text>{item.adress}</Text>
            <Text>{item.recent}</Text>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this._onPressContent()} activeOpacity={0.7}>
            <View style={styles.attention}>
              <Text>关注</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  keyExtractor = (item, index) => {
    return item.id
  }

  renderSeparator = () => {
    return <View style={styles.separator}></View>
  }

  _onPressContent = () => {
    console.warn('关注成功')
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{padding: 5}}
          data={sourceData}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderList}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 3,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    borderWidth: 0.5,
    borderColor: '#ddd',
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  itemDetail: {
    flex: 1,
    paddingLeft: 10,
  },
  detailTop: {
    flexDirection: 'row',
  },
  detailBottom: {
    flexDirection: 'row',
  },
  attention: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#eee',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 50,
  },
})
