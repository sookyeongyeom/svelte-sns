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

function setAuthToken() {
    const token = localStorage.getItem('authToken');
    const { subscribe, set } = writable(token);

    const login = async (email, password) => {
        try {
            const options = {
                path: '/login',
                data: {
                    email,
                    password,
                },
            };

            const response = await postApi(options);
            const token = response.authToken;

            localStorage.setItem('authToken', token);
            set(token);
            router.goto('/articles');
        } catch (error) {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const logout = async () => {
        try {
            const options = {
                path: '/logout',
            };
            await postApi(options);
            authToken.resetAuthToken();
        } catch (error) {
            alert('오류가 발생했습니다. 다시 시도해주세요');
        }
    };

    const resetAuthToken = async () => {
        set('');
        localStorage.removeItem('authToken');
    };

    return {
        subscribe,
        login,
        logout,
        resetAuthToken,
    };
}

export const currentArticlesPage = setCurrentArticlesPage();
export const articles = setArticles();
export const loadingArticle = setLoadingArticle();
export const articlePageLock = writable(false);
export const articleContent = setArticleContent();
export const articlesMode = setArticleMode();
export const comments = setComments();
export const auth = setAuth();
export const authToken = setAuthToken();
