import { observable, computed, action } from 'mobx'

class Min {
  @observable min = ''

  @action refresh() {
    this.min = 'min'
  }
}

export default new Min()
