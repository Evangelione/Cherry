import { observable, action } from 'mobx'

class User {
  @observable id = '5201314'
  @observable avatar = 'http://img2.touxiang.cn/file/20180302/de781e4f408909cfff0d7083ebcf72e6.jpg'
  @observable nickname = '你的太阳啊'
  @observable gender = '女'
  @observable birthday = '1998-01-01'
  @observable area = '浙江 杭州'
  @observable phone = '18080808080'
  @observable signature = '个性签名，个性签名，个性签名，个性签名，个性签名，个性签名，个性签名。。个性签名。。。'
  @observable balance = '12800'
  @observable income = '8000'
  @observable certifications = false
  @observable invitebadge = true
  @observable fans = '63930'
  @observable follow = '70'
  @observable discovery = '130'

  @action.bound update(key, date) {
    this[key] = date
  }
}

export default new User()
