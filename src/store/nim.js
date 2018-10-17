import { observable, action } from 'mobx'

class Nim {
  @observable nim = ''

  @action refresh() {
    this.nim = 'nim'
  }
}

export default new Nim()
