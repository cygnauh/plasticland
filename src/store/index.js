import config from '../data/inventory'
import sounds from '../data/sounds'
import subtitle from '../data/subtitle'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    objectContainers: [],
    selectItemContainer: [],
    objects: config.objects,
    subtitle: subtitle.voice,
    currentPlace: '',
    currentSubtitle: 'subtitle',
    sounds: sounds,
    radar: null,
    displayCinematicObject: false
  },
  mutations: {
    setCurrentSubtitle (state, ref) {
      state.currentSubtitle = ref
    },
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
    setCinematicObject (state) {
      state.displayCinematicObject = true
    },
    objectFound (state, id) {
      state.objects.filter(item => item.id === id)[0].found = true
    }
  }
})
