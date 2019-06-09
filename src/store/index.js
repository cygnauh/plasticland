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
    displayIntroText: true,
    currentVoiceOverSeek: false,
    objectContainers: [],
    selectItemContainer: [],
    objects: config.objects,
    sounds: sounds,
    subtitle: subtitle.voice,
    currentPlace: '',
    currentSubtitle: 'subtitle',
    currentFoundObjectName: '',
    currentRoute: '',
    splinePosition: 0,
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
    hideIntroText (state) {
      state.displayIntroText = false
    },
    setVoiceOver (state, num) {
      state.currentVoiceOverSeek = num
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
    setCurrentRoute (state, route) {
      state.currentRoute = route
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
