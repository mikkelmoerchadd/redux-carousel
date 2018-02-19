import { Observable } from 'rxjs/Observable'

/**
 * Get current window position in given direction. Defaults to Y direction
 * @param {*} direction A direction either y or x
 */
export const WindowPos = (direction = 'y') => direction == 'y' ? window.scrollY : window.scrollX

/**
 * Check if given element is in the current viewport
 * @param {*} element A Html Element
 */
export const ElementOutOfView = (element) => element.scrollHeight - window.scrollY < 0

/**
 * Add new scroll eventlistener
 */
export const OnScroll = new Observable(observer => window.addEventListener('scroll', () => observer.next()))

/**
 * Emits when element is within the viewport
 * @param {*} element the element in reference to
 * @param {*} offset specify offset
 */
export const OnElementViewEnter = (element, offset = 0, delay = 300) => new Observable(observer => {
  OnScroll.subscribe(() => {
    if (element.offsetTop - WindowPos() + offset < 0) {
      observer.next()
    }
  })

  setTimeout(() => {
    if (element.offsetTop - WindowPos() + offset <= 0) { observer.next() }
  }, delay)
})

const browserUtil = () => (
  {
    windowPos: WindowPos,
    elementOutOfView: ElementOutOfView,
    onScroll: OnScroll,
    onElementViewEnter: OnElementViewEnter
  }
)

export default browserUtil()



