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
  setInitialMatarial (name, material) {
    let obj = this.state.objects.filter(element => element.name === name)
    obj[0].material = material.material
  },
  objectFound (id) {
    this.state.objects.filter(item => item.id === id)[0].found = true
  }
}
