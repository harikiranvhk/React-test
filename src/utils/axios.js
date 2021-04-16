import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
  timeout: 0
})

export const $axios = instance