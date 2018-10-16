import { observable, computed, action } from 'mobx'

class Link {
  cache = {queue: []}
}

export default new Link()
