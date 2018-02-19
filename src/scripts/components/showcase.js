import { SectionElementById } from '../utils/moduleUtil'
import { OnElementViewEnter } from '../utils/browserUtil'
import FeatureService from '../services/featureService'
import store from '../store'

export default class Showcase {
  constructor(id) {
    this.src = SectionElementById(id)

    if (this.src.querySelector('.carousel')) {
      FeatureService.get('carousel').then((module) => {
        this.carousel = new module.default({
          autoplay: true,
          rotate: true,
          playSpeed: 3000
        }, 
        this.src.querySelector('.carousel'))
      })
    }

    document.querySelector('.showcase__featured').addEventListener('mouseenter', () => {
      console.log('enter')
      store.dispatch({ type: 'PAUSE_PLAYER'})
    })

    document.querySelector('.showcase__featured').addEventListener('mouseleave', () => {
      console.log('leave')
      store.dispatch({ type: 'RESUME_PLAYER'})
    })
  }
}