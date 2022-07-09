<script>
    import { onMount } from 'svelte';
    import { articles, currentArticlesPage } from '../stores';
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

        const scrollTrigger = () => {
            return triggerComputed();
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
</div>
<!-- end article-wrap -->
