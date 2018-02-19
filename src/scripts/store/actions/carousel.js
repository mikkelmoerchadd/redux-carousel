import {
  ADD_SLIDE,
  NEXT_SLIDE,
  PREV_SLIDE,
  START_LOOP,
  NEXT_LOOP_SLIDE,
  PAUSE_PLAYER,
  RESUME_PLAYER
} from './'

export const addSlide = payload => { type: ADD_SLIDE, payload }
export const next = () => { type: NEXT_SLIDE }
export const prev = () => { type: PREV_SLIDE }
export const startLoop = payload => { type: START_LOOP, payload }
export const nextLoopSlide = () => { type: NEXT_LOOP_SLIDE }
export const pausePlayer = () => { type: PAUSE_PLAYER }
export const resumePlayer = () => { type: RESUME_PLAYER }