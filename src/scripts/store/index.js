import { createStore, compose } from 'redux'
import reducer from './reducers/'

// enables redux devtools if they are present in the browser
const enhancers = compose(process.env.NODE_ENV !== "production" ? window.devToolsExtension && window.devToolsExtension() : f => f)

const store = createStore(reducer, {}, enhancers)

export default store