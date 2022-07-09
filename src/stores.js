import { writable, get } from 'svelte/store';
import { getApi, postApi, putApi, delApi } from './service/api';
import { router } from 'tinro';

function setCurrentArticlesPage() {
    const { subscribe, update, set } = writable(1); // 초기값 1페이지

    const resetPage = () => set(1);
    const increPage = () => {
        update((data) => ++data);
        articles.fetchArticles();
    };

    return {
        subscribe,
        resetPage,
        increPage,
    };
}

function setArticles() {
    let initValues = {
        articleList: [],
        totalPage: 0,
        menuPopup: '',
        editMode: '',
    };

    let values = { ...initValues };

    const { subscribe, update, set } = writable(values);

    const fetchArticles = async () => {
        const currentPage = get(currentArticlesPage);

        try {
            loadingArticle.turnOnLoading();

            let path = `/articles/${currentPage}`;

            const options = {
                path,
            };

            const getDatas = await getApi(options);

            const newData = {
                articleList: getDatas.articles, // 스키마 문서 오류
                totalPage: getDatas.totalPage,
            };

            update((datas) => {
                const newArticles = [
                    ...datas.articleList,
                    ...newData.articleList,
                ];

                if (currentPage === 1) {
                    datas.articleList = newData.articleList;
                    datas.totalPage = newData.totalPage;
                }

                datas.articleList = newArticles;
                datas.totalPage = newData.totalPage;
                return datas;
            });

            loadingArticle.turnOffLoading();
        } catch (error) {
            throw error;
        }
    };

    const resetArticles = () => {
        let resetValues = { ...initValues };
        set(resetValues);
        currentArticlesPage.resetPage();
        articlePageLock.set(false);
    };

    const addArticle = async (content) => {
        try {
            const options = {
                path: '/article',
                data: {
                    content,
                },
            };

            const newArticle = await postApi(options);

            update((datas) => {
                datas.articleList = [newArticle, ...datas.articleList];
                return datas;
            });

            // 만약 무조건적으로 새로운 글이 나타나야 한다면, update로 스토어를 업데이트하지 말고, 목록을 새로 불러오면 됨 (비효율적)
            // articles.resetArticles();
            // articles.fetchArticles();
        } catch (error) {
            throw error;
        }
    };

    return {
        subscribe,
        fetchArticles,
        resetArticles,
        addArticle,
    };
}

function setLoadingArticle() {
    const { subscribe, set } = writable(false);

    const turnOnLoading = () => {
        set(true);
        articlePageLock.set(true);
    };

    const turnOffLoading = () => {
        set(false);
        articlePageLock.set(false);
    };

    return {
        subscribe,
        turnOnLoading,
        turnOffLoading,
    };
}

function setArticleContent() {}
function setArticleMode() {}
function setComments() {}

function setAuth() {
    let initValues = {
        _id: '',
        email: '',
    };

    let values = { ...initValues };

    const { subscribe, set, update } = writable(values);

    const isLogin = async () => {
        try {
            const getUserInfo = await getApi({ path: '/user' });
            set(getUserInfo);
        } catch (error) {
            // 토큰이 비정상적이면 리셋
            auth.resetUserInfo();
            authToken.resetAuthToken();
        }
    };

    const resetUserInfo = () => {
        const newValues = { ...initValues };
        set(newValues);
    };

    const register = async (email, password) => {
        try {
            const options = {
                path: '/users',
                data: {
                    email,
                    password,
                },
            };

            await postApi(options);
            alert('가입이 완료되었습니다.');
            router.goto('/login');
        } catch (error) {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return {
        subscribe,
        isLogin,
        resetUserInfo,
        register,
    };
}

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
            alert('로그인되었습니다.');
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
            alert('로그아웃되었습니다.');
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
export const loadingArticle = setLoadingArticle(); // 데이터를 받아오는 동안 로딩 중임을 나타내는 역할
export const articlePageLock = writable(false); // 페이지 잠금 역할
export const articleContent = setArticleContent();
export const articlesMode = setArticleMode();
export const comments = setComments();
export const auth = setAuth();
export const authToken = setAuthToken();
