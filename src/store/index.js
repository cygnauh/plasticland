import config from '../data/inventory'
import sounds from '../data/sounds'
export const store = {
  state: {
    objectContainers: [],
    selectItemContainer: [],
    objects: config.objects,
    sounds: sounds,
    currrentSubtitle: '',
    radar: null
  },
  setRadar (ref) {
    this.state.radar = ref
  },
  setCurrrentSubtitle (string) {
    this.state.currrentSubtitle = string
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
