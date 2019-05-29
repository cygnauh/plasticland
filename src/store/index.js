import config from '../data/inventory'
export const store = {
  state: {
  	objectContainers: [],
    objects: config.objects,
    photographs: config.photographs
  },
  setContainers (array) {
  	this.state.objectContainers = array
  },

  objectFound (id) {
    this.state.objects.filter(item => item.id === id)[0].found = true
  },
  photographOpen (id) {
    this.state.photographs.filter(item => item.id === id)[0].open = true
  }
}
