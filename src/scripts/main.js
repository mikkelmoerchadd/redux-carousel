import '../styles/main.scss'

class Main {
  constructor() {
    this.loadComponents()
    console.log("hi")
  }

  loadComponents = () => {
    document.querySelectorAll('section').forEach((element, i) => {
      const componentName = element.getAttribute('name').valueOf();
      const componentId = componentName + '_' + i
      element.setAttribute('id', componentId)
      this.importComponent(componentName, componentId)
    })
  }

  importComponent = (name, id) => (
    import(/* webpackChunkName: "module" */ './components/' + name)
    .then(module => {
      new module.default(id);
    })
    .catch(reason => {
      console.warn('Failed to load module ' + name + '. \nMessage:', reason);
    })
  )
}

new Main()
