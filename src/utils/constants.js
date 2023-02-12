const GOOGLE_API_KEY = 'AIzaSyDx56ee1IvjP4exg8qUS0npc6Kx52O_Im4'
export const YOUTUBE_VIDEOS_API =
  'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=' +
  GOOGLE_API_KEY

export const YOUTUBE_SEARCH_API =
  'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='
