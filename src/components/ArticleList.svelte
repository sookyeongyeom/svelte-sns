<script>
    import { onMount } from 'svelte';
    // prettier-ignore
    import { articles, currentArticlesPage, loadingArticle, articlePageLock } from '../stores';
    import Article from './Article.svelte';

    let component;
    let elementScroll;

    onMount(() => {
        articles.resetArticles();
        articles.fetchArticles();
    });

    $: {
        if (component || elementScroll) {
            const element = elementScroll
                ? elementScroll
                : component.parentNode;
            element.addEventListener('scroll', onScroll);
            element.addEventListener('resize', onScroll);
        }
    }

    const onScroll = (e) => {
        const scrollHeight = e.target.scrollHeight; // 브라우저의 스크롤 높이
        const clientHeight = e.target.clientHeight; // 브라우저의 화면 높이
        const scrollTop = e.target.scrollTop; // 브라우저의 현재 스크롤 위치
        const realHeight = scrollHeight - clientHeight;
        const triggerHeight = realHeight * 0.7;

        const triggerComputed = () => {
            return scrollTop > triggerHeight;
        };

        const countCheck = () => {
            const check = $articles.totalPage <= $currentArticlesPage;
            return check;
        };

        // 페이지 증가를 방지
        if (countCheck()) {
            articlePageLock.set(true); // 얘는 구독이 아니라 set이라 $가 붙지 않아야함
        }

        // triggerComputed가 true이고 articlePageLock이 false일 때 true 리턴
        const scrollTrigger = () => {
            return triggerComputed() && !$articlePageLock; // 얘는 구독 개념이라 $가 붙어야함 (상태값 변화 추적)
        };

        if (scrollTrigger()) {
            currentArticlesPage.increPage();
        }
    };
</script>

<!-- start article-wrap -->
<div class="articles-wrap" bind:this={component}>
    {#each $articles.articleList as article, index}
        <Article {article} />
    {/each}
    {#if $loadingArticle}
        <div class="box mdl-grid mdl-grid--no-spacing">
            <p>Loading...</p>
        </div>
    {/if}
</div>
<!-- end article-wrap -->
