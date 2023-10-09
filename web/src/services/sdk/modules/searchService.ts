import fetch from '../fetch'

const getHighlight = async () => {
  try {
    const res = await fetch({
      url: '/highlights',
      method: 'GET',
    })
    return Promise.resolve(res.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

const getSuggestion = async () => {
  try {
    const res = await fetch({
      url: '/suggestions',
      method: 'GET',
    })

    return Promise.resolve(res.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export { getHighlight, getSuggestion }
