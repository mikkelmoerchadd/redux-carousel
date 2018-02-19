import {
  ADD_SLIDE,
  NEXT_SLIDE,
  PREV_SLIDE,
  START_LOOP,
  NEXT_LOOP_SLIDE,
  PAUSE_PLAYER,
  RESUME_PLAYER
} from '../actions'

const createOrUpdatePlayer = (state) => {
  if (state.playLoop === undefined) {
    state.playLoop = (playState) => {
      if (playState.timerHandle !== undefined) playState.playMethod()
      state = { ...playState, timerHandle: setTimeout(() => {
          playState.isPlaying ? state.playLoop(state) : null
      }, playState.playSpeed)}
    }
  }
  state.playLoop(state)
  return state
}

const resetTimer = (timer) => {
  clearTimeout(timer)
  timer = undefined
  return undefined
}

const changeIndex = (slides, acc) => {
  console.log(slides)
  return slides.map(slide => {
    const index = slide.index > 0 ? slide.index + acc : slide.rotate ? acc === 1 ? 0 : slides.length - 1 : slide.index
    index === 0 ? slide.src.classList.add('active') : slide.src.classList.remove('active')
    return { ...slide, index: index }
  })
}

const addToSlides = (slides = [], payload) => {
  const existingItem = slides.find(slide => slide.src === payload.src)
  if (!existingItem && payload !== undefined) {
    return [...slides, {index: slides.length, rotate: payload.rotate, src: payload.src}]
  }
  return slides
}

const carousel = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_SLIDE:
      return {...state, slides: addToSlides(state.slides, payload)}
    case NEXT_SLIDE:
      return {...state, slides: changeIndex(state.slides, -1)}
    case PREV_SLIDE:
      return {...state, slides: changeIndex(state.slides, 1)}
    case START_LOOP:
      return { ...state, isPlaying: payload.isPlaying }
    case NEXT_LOOP_SLIDE:
      console.log("NEXT LOOP", state)
      return { ...state, slides: state.isPlaying ? changeIndex(state.slides, -1) : state.slides }
    case PAUSE_PLAYER:
      return  {...state, isPlaying: false }
    case RESUME_PLAYER:
      return { ...state, isPlaying: true }
    default:
      return state
  }
}

export default carousel