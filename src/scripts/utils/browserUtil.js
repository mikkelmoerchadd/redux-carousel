export const CreateElement = (tag, classList) => {
  const newEl = document.createElement(tag)
  classList = classList.filter(e => e != '')
  newEl.classList.add(...classList)
  return newEl
}