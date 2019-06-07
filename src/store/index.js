import config from '../data/inventory'
import sounds from '../data/sounds'
import subtitle from '../data/subtitle'
import didacticiels from '../data/didacticiels'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    assetsLoad: false,
    displayIntro: true,
    objectContainers: [],
    selectItemContainer: [],
    objects: config.objects,
    subtitle: subtitle.voice,
    currentPlace: '',
    currentSubtitle: 'subtitle',
    currentFoundObjectName: '',
    splinePosition: 0,
    sounds: sounds,
    didacticiels: didacticiels.array,
    radar: null,
    displayCinematicObject: false,
    cinematicObjectContainer: null,
    isPreviousCinematic: false
  },
  mutations: {
    isLoad (state) {
      state.assetsLoad = true
    },
    hideIntro (state) {
      state.displayIntro = false
    },
    setFoundObjectName (state, str) {
      state.currentFoundObjectName = str
    },
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
    setCinematicObject (state, bool) {
      state.displayCinematicObject = bool
    },
    objectFound (state, id) {
      state.objects.filter(item => item.id === id)[0].found = true
    },
    didacticielShowed (state, bool) {
      state.didacticiels.filter(item => item.name === bool)[0].active = true
    },
    sePreviousRoute (state, bool) {
      state.isPreviousCinematic = bool
    }
  }
})
