import {
  SET_CONFIG,
  ADD_SLIDES,
  NEXT_SLIDE,
  PREV_SLIDE,
  NEXT_LOOP_SLIDE,
  PAUSE_PLAYER,
  RESUME_PLAYER,
  ADD_BULLETS,
  GO_TO_SLIDE
} from './'

export const setConfig = payload => { type: SET_CONFIG, payload }
export const addSlides = payload => { type: ADD_SLIDES, payload }
export const next = () => { type: NEXT_SLIDE }
export const prev = () => { type: PREV_SLIDE }
export const nextLoopSlide = () => { type: NEXT_LOOP_SLIDE }
export const pausePlayer = () => { type: PAUSE_PLAYER }
export const resumePlayer = () => { type: RESUME_PLAYER }
export const addBullets = payload => { type: ADD_BULLETS, payload }
export const goToSlide = payload => { type: GO_TO_SLIDE }