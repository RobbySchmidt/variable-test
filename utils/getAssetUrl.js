const getAssetUrl = () => {
  const config = useRuntimeConfig()
  return config.public.directusUrl + '/assets/'
}

export { getAssetUrl }