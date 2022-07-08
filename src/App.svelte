<script>
    import Router from './router.svelte';
    import { auth, authToken } from './stores';

    $: {
        if ($authToken) {
            // authToken의 변화 감지
            auth.isLogin(); // authToken에서 변화 감지 후 토큰이 있을 때 실행
        } else {
            auth.resetUserInfo(); // authToken에서 변화 감지 후 토큰이 사라졌을 때 실행
        }
    }
</script>

<div class="mdl-layout__container">
    <Router />
</div>
