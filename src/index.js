import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { observer } from 'mobx-react'
import { PropTypes } from 'mobx-react'

@observer
class Bar extends Component {
  static propTypes = {
    queue: PropTypes.observableArray,
  }

  render() {
    const queue = this.props.queue
    return (
      <View>
        <Text>{queue.length}</Text>
      </View>
    )
  }
}


class Foo extends Component {
  static propTypes = {
    cache: PropTypes.observableObject,
  }

  render() {
    const cache = this.props.cache
    return (
      <View>
        <Bar queue={cache.queue}></Bar>
      </View>
    )
  }
}

export default Foo
