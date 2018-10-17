import { observable, computed, action } from 'mobx'

class Link {
  @observable link = ''

  @action refresh() {
    this.link = 'link'
  }
}

export default new Link()
