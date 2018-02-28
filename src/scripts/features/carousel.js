import store from '../store'

export default class Carousel {

  constructor(config, src) {
    store.dispatch({ type: 'SET_CONFIG', payload: config })
    store.dispatch({ type: 'ADD_SLIDES', payload: src })
    store.dispatch({ type: 'ADD_BULLETS', payload: {src, method: this.goToSlide} })

    // Init autoplay if enabled
    if (store.getState().carousel.autoPlay) {
      store.dispatch({ type: 'RESUME_PLAYER' })
      const loop = () => {
        setTimeout(() => {
          store.dispatch({ type: 'NEXT_LOOP_SLIDE' })
          loop()
        }, store.getState().carousel.playSpeed)
      }
      loop()
    }

    src.addEventListener('mouseenter', () => {
      console.log('enter')
      store.dispatch({ type: 'PAUSE_PLAYER'})
    })

    src.addEventListener('mouseleave', () => {
      console.log('leave')
      store.dispatch({ type: 'RESUME_PLAYER'})
    })
  }

  next = () => {
    store.dispatch({ type: 'NEXT_SLIDE' })
  }

  prev = () => {
    store.dispatch({ type: 'PREV_SLIDE' })
  }

  goToSlide = (i) => {
    store.dispatch({ type: 'GO_TO_SLIDE', payload: i})
  }
}