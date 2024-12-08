export const APP_TITLE: string = import.meta.env.VITE_APP_NAME;

export const ARTICLE_API_DOMAIN = import.meta.env.VITE_ARTICLE_API_DOMAIN;
export const RANDOM_ARTICLES_ENDPOINT =  ARTICLE_API_DOMAIN+ '/articles';
export const ARTICLE_ENDPOINT =  ARTICLE_API_DOMAIN+ '/article';

export const PROFILE_API_DOMAIN = import.meta.env.VITE_PROFILE_API_DOMAIN;
export const PROFILE_ENDPOINT =  PROFILE_API_DOMAIN+ '/profile';

export const LOGIN_PATH = '/login';
export const SIGNUP_PATH = '/signup';
export const FEED_PATH = '/feed';
export const ARTICLE_BY_ID_PATH = '/articles/:id';

export const ARTICLE_STALE_TIME = 5000;
export const PIXEL_OFFSET = 100;
