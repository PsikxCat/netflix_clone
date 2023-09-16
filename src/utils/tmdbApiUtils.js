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

export const getMediaByGenre = async (mediaType, genreId) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/${mediaType}?with_genres=${genreId}&sort_by=popularity.desc&api_key=${TMDB_API_KEY}`,
      { method: 'GET' }
    )

    const mediaList = await response.json()
    return mediaList && mediaList.results
  } catch (error) {
    throw new Error(`Error fetching ${mediaType} media by genre ` + error)
  }
}

export const getMediaVideosById = async (mediaType, id) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/${mediaType}/${id}/videos?api_key=${TMDB_API_KEY}`,
      { method: 'GET' }
    )

    const mediaVideos = await response.json()
    return mediaVideos && mediaVideos.results
  } catch (error) {
    throw new Error('Error fetching media videos' + error)
  }
}

export const getSearchMedia = async (query) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/multi?query=${query}&api_key=${TMDB_API_KEY}`,
      { method: 'GET' }
    )
    const searchMedia = await response.json()

    return searchMedia
  } catch (error) {
    throw new Error('Error fetching media videos' + error)
  }
}

export const getMediaDetails = async (mediaType, id) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/${mediaType}/${id}?append_to_response=videos&api_key=${TMDB_API_KEY}`,
      { method: 'GET' }
    )

    const mediaDetails = await response.json()

    return mediaDetails && mediaDetails.videos?.results
  } catch (error) {
    throw new Error('Error fetching media videos' + error)
  }
}

export const getSimilarMedia = async (mediaType, id) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/${mediaType}/${id}/similar?api_key=${TMDB_API_KEY}`,
      { method: 'GET' }
    )

    const similarMedia = await response.json()
    return similarMedia && similarMedia.results
  } catch (error) {
    throw new Error('Error fetching media videos' + error)
  }
}

// const genresIds = [
//   { id: 28, name: 'Action' },
//   { id: 12, name: 'Adventure' },
//   { id: 16, name: 'Animation' },
//   { id: 35, name: 'Comedy' },
//   { id: 80, name: 'Crime' },
//   { id: 99, name: 'Documentary' },
//   { id: 18, name: 'Drama' },
//   { id: 10751, name: 'Family' },
//   { id: 14, name: 'Fantasy' },
//   { id: 36, name: 'History' },
//   { id: 27, name: 'Horror' },
//   { id: 10402, name: 'Music' },
//   { id: 9648, name: 'Mystery' },
//   { id: 10749, name: 'Romance' },
//   { id: 878, name: 'Science Fiction' },
//   { id: 10770, name: 'TV Movie' },
//   { id: 53, name: 'Thriller' },
//   { id: 10752, name: 'War' },
//   { id: 37, name: 'Western' },
//   { id: 10759, name: 'Action & Adventure' },
//   { id: 10762, name: 'Kids' },
//   { id: 10763, name: 'News' },
//   { id: 10764, name: 'Reality' },
//   { id: 10765, name: 'Sci-Fi & Fantasy' },
//   { id: 10766, name: 'Soap' },
//   { id: 10767, name: 'Talk' },
//   { id: 10768, name: 'War & Politics' }
// ]
