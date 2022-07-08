<script>
    import AuthHeader from '../components/AuthHeader.svelte';
    import AuthLogin from '../components/AuthLogin.svelte';
    import AuthRegister from '../components/AuthRegister.svelte';
</script>

<!-- start auth -->
<div
    class="auth mdl-color--grey-100 mdl-layout mdl-js-layout mdl-layout--fixed-header"
>
    <AuthHeader />
    <AuthRegister />
</div>
<!-- end auth -->
