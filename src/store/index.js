import config from '../data/inventory'
import sounds from '../data/sounds'
export const store = {
  state: {
    objectContainers: [],
    selectItemContainer: [],
    objects: config.objects,
    sounds: sounds
  },
  setContainers (array) {
    this.state.objectContainers = array
  },
  setSelectedItemContainer (array) {
    this.state.selectItemContainer = array
  },
  objectFound (id) {
    this.state.objects.filter(item => item.id === id)[0].found = true
  }
}
