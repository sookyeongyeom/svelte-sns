import { writable, get } from 'svelte/store';
import { getApi, postApi, putApi, delApi } from './service/api';
import { router } from 'tinro';

function setCurrentArticlesPage() {}
function setArticles() {}
function setLoadingArticle() {}
function setArticleContent() {}
function setArticleMode() {}
function setComments() {}
function setAuth() {}
function setAuthToken() {}

export const currentArticlesPage = setCurrentArticlesPage();
export const articles = setArticles();
export const loadingArticle = setLoadingArticle();
export const articlePageLock = writable(false);
export const articleContent = setArticleContent();
export const articlesMode = setArticleMode();
export const comments = setComments();
export const auth = setAuth();
export const authToken = setAuthToken();
