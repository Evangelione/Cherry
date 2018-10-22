import { observable, action } from 'mobx'

class Nim {
  @observable nim = ''
  @observable avatar = 'http://img2.touxiang.cn/file/20180302/de781e4f408909cfff0d7083ebcf72e6.jpg'

  @action refresh() {
    this.nim = 'nim'
  }

  @action updateAvatar(img) {
    this.avatar = img
  }
}

export default new Nim()
