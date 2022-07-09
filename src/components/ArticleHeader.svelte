<script>
    import { router } from 'tinro';
    import { auth, authToken } from '../stores';

    const goLogin = () => router.goto('/login');
    const onLogout = () => authToken.logout();
</script>

<!-- start header -->
<header class="mdl-layout__header mdl-layout__header--waterfall">
    <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">SLogs</span>
        <nav class="mdl-navigation">
            <a class="mdl-navigation__link selected" href="#null">모두 보기</a>
            <a class="mdl-navigation__link blocked" href="#null">좋아요 보기</a>
            <a class="mdl-navigation__link blocked" href="#null">내글 보기</a>
        </nav>

        {#if $authToken}
            <i class="bx bx-log-out" on:click={onLogout} />
        {:else}
            <i class="bx bx-log-in" on:click={goLogin} />
        {/if}
    </div>
</header>
<!-- end header -->
