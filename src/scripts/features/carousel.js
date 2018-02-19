import store from '../store'

export default class Carousel {
  config = {
    autoplay: false,
    playSpeed: 3000,
    rotate: false
  }

  constructor(config, src) {
    this.config = { ...this.config, ...config }
    console.log(this.config)
    this.addSlides(src)

    if (this.config.autoplay) {
      store.dispatch({ type: 'START_LOOP', payload: { isPlaying: true } })
      const loop = () => {
        setTimeout(() => { 
          store.dispatch({ type: 'NEXT_LOOP_SLIDE' })
          loop()
        }, this.config.playSpeed)
      }
      loop()
    }
  }

  addSlides = (src) => {
    for (let child in src.children) {
      store.dispatch({ type: 'ADD_SLIDE', payload: { rotate: this.config.rotate, src: src.children.item(child) }})
    }

    if (this.config.autoplay) {
      store.dispatch({ type: 'ADD_PLAYER', payload: {playSpeed: this.config.playSpeed, playMethod: this.next}})
    }
  }

  next = () => {
    store.dispatch({ type: 'NEXT_SLIDE' })
  }
}

