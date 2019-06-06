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
    splinePosition: 0,
    sounds: sounds,
    radar: null,
    displayCinematicObject: false
  },
  mutations: {
    setSplinePosition (state, pos) {
      state.splinePosition = pos
    },
    setCurrentSubtitle (state, str) {
      state.currentSubtitle = str
    },
    setCurrentPlace (state, str) {
      state.currentPlace = str
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
