export default {
  'array': [
    {
      id: 0,
      name: 'scroll',
      path: require('@/assets/img/svg/didacticiel-scroll.svg'),
      position: '0.005',
      seekPosition: 12.0,
      message: 'Scrollez pour explorer PLASTICLAND',
      active: false
    }, {
      id: 1,
      name: 'radar',
      path: require('@/assets/img/svg/didacticiel-radar.svg'),
      position: '0.1',
      seekPosition: 28.21,
      message: 'SUIVEZ le radar POUR VOIR LES OBJETS à collecter',
      active: false
    }, {
      id: 2,
      name: 'collection',
      path: require('@/assets/img/svg/didacticiel-bottle.svg'),
      position: '0.15',
      message: 'Cliquez pour voir votre collection',
      active: false,
      show: false
    }
  ]
}
