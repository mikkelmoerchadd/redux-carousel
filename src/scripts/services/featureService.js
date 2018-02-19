const FeatureService = () => {
  const get = async (featureName) => await import(/* webpackChunkName: "feature" */ '../features/' + featureName)

  return {
    get: get
  }
}

export default FeatureService()