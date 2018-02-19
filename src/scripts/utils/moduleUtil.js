/**
 * Get the sections component
 * @param {*} id 
 */
export const SectionElementById = (id) => document.querySelector(`#${id}`).firstElementChild

const moduleUtil = () => (
  {
    sectionElementById: SectionElementById
  }
)

export default moduleUtil()
