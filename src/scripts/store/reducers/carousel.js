import {
  SET_CONFIG,
  ADD_SLIDES,
  NEXT_SLIDE,
  PREV_SLIDE,
  START_LOOP,
  NEXT_LOOP_SLIDE,
  PAUSE_PLAYER,
  RESUME_PLAYER,
  ADD_BULLETS,
  GO_TO_SLIDE
} from '../actions'
import { CreateElement } from '../../utils/browserUtil'

const defaultState = {
  autoPlay: false,
  playSpeed: 3000,
  rotate: false,
  bullets: true
}

const resetTimer = (timer) => {
  clearTimeout(timer)
  timer = undefined
  return undefined
}

const addToSlides = (payload) => {
  const slides = []
  Array.from(payload.children).forEach(slide => slides.push(slide))
  return slides
}

const setActive = (acc, state, fixedIndex) => {
  const index = fixedIndex !== undefined ? fixedIndex : updateIndex(acc, state)
  const setActive = (el, i) => {
    index === i ? el.classList.add('active') : el.classList.remove('active')
    return el
  }
  return {
    slides: state.slides.map(setActive),
    bullets: state.bullets.map(setActive),
    currentIndex: index
  }
}

const updateIndex = (acc, state) => {
  let index
  if (acc === 1) {
    index = state.currentIndex < state.slides.length - 1 ? state.currentIndex + acc : state.rotate ? 0 : state.currentIndex
  } else {
    index = state.currentIndex > 0 ? state.currentIndex + acc : state.rotate ? state.slides.length - 1 : state.currentIndex
  }
  return index
}

const addToBullets = (state, payload) => {
  const div = CreateElement('div', ['carousel__bullets'])
  const bullets = []
  state.slides.forEach((_, i) => {
    const bullet = CreateElement('div', ['carousel__bullet', i === 0 ? 'active' : ''])
    bullet.addEventListener('click', () => payload.method(i))
    div.appendChild(bullet)
    bullets.push(bullet)
  })
  payload.src.parentNode.insertBefore(div, payload.src.nextSibling)
  return bullets
}

const carousel = (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_CONFIG:
      return { ...state, ...payload }
    case ADD_SLIDES:
      return { ...state, slides: addToSlides(payload) }
    case NEXT_SLIDE:
      return { ...state, ...setActive(1, state) }
    case PREV_SLIDE:
      return { ...state, ...setActive(-1, state) }
    case NEXT_LOOP_SLIDE:
      return state.isPlaying ? { ...state, ...setActive(1, state) } : state
    case PAUSE_PLAYER:
      return  {...state, isPlaying: false }
    case RESUME_PLAYER:
      return { ...state, isPlaying: true }
    case ADD_BULLETS:
      return state.bullets ? { ...state, bullets: addToBullets(state, payload) } : state
    case GO_TO_SLIDE:
      return { ...state, ...setActive(undefined, state, payload)}
    default:
      return state
  }
}

export default carousel