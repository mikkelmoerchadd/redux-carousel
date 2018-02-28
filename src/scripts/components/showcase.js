import { SectionElementById } from '../utils/moduleUtil'
import FeatureService from '../services/featureService'
import store from '../store'

export default class Showcase {
  constructor(id) {
    this.src = SectionElementById(id)

    if (this.src.querySelector('.carousel')) {
      FeatureService.get('carousel').then((module) => {
        this.carousel = new module.default({
          autoPlay: true,
          rotate: true,
          playSpeed: 3000
        }, 
        this.src.querySelector('.carousel'))
      })
    }
  }
}