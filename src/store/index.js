import config from '../data/inventory'
import sounds from '../data/sounds'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    objectContainers: [],
    selectItemContainer: [],
    objects: config.objects,
    currentPlace: '',
    currentSubtitle: '',
    sounds: sounds,
    radar: null
  },
  mutations: {
    setCurrentPlace (state, ref) {
      state.currentPlace = ref
    },
    setRadar (state, ref) {
      state.radar = ref
    },
    setContainers (state, array) {
      state.objectContainers = array
    },
    setSelectedItemContainer (state, array) {
      state.selectItemContainer = array
    },
    objectFound (state, id) {
      state.objects.filter(item => item.id === id)[0].found = true
    }
  }
})
