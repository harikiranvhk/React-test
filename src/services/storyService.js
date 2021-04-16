import { $axios } from '../utils/axios'

export function fetchTopStories() {
  return $axios.get('topstories.json')
}

export function fetchItemById(storyId) {
  return $axios.get(`item/${storyId}.json`)
}
