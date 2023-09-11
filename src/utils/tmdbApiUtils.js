const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_API_KEY = '9f0e021c2300a74384b94eee8a52c34e'

export const getTrendingMedia = async (mediaType, timeframe) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/${mediaType}/${timeframe}?api_key=${TMDB_API_KEY}`,
      { method: 'GET' }
    )

    const trendingMedia = await response.json()
    return trendingMedia && trendingMedia.results
  } catch (error) {
    throw new Error('Error fetching trending media ' + error)
  }
}

export const getMediaList = async (mediaType, list) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/${mediaType}/${list}?api_key=${TMDB_API_KEY}`,
      { method: 'GET' }
    )

    const mediaList = await response.json()
    return mediaList && mediaList.results
  } catch (error) {
    throw new Error(`Error fetching ${list} media ` + error)
  }
}
