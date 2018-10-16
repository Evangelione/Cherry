import React, { Component } from 'react'
import Stack from './src'
import { observable } from 'mobx'

class Link {
  @observable cache = {queue: []}
}

const store = new Link()
export default class App extends Component<Props> {
  render() {
    return (
      <Stack cache={store.cache}/>
    )
  }
}
