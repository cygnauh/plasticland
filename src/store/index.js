import config from '../data/inventory'
export const store = {
  state: {
    objects: config.objects
  },
  objectFound (id) {
    this.state.objects.filter(item => item.id === id)[0].found = true
  }
}
