import Engine from './Engine'
import Water from './components/WaterOld'

export default class App extends Engine {
  constructor (props) {
    super(props)

    this.addGeometry()
  }

  addGeometry () {
    this.water = new Water(this.scene)
  }

  animate () {
    // update water
    // this.water.update(this.timeElapsed, this.mouse)
  }
}
