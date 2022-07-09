<script>
    import { articlesMode } from '../stores';

    export let article;
</script>

<!-- start article box-->
<div class="box mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
    <div class="mdl-card mdl-cell mdl-cell--12-col">
        <div class="mdl-card__supporting-text ">
            <div class="info-box">
                <div class="info">
                    <p class="user-id">{article.userName}</p>
                    <p class="post-day">{article.createdAt}</p>
                </div>
            </div>
        </div>
        <div class="mdl-card__supporting-text ">
            <p class="pre">
                {article.content}
            </p>
        </div>
        <div class="mdl-card__actions mdl-card--border">
            <!-- <a href="#null" class="mdl-button">Read our features</a> -->
            <div class="icon-box">
                <i class="bx bx-heart" />
                <p>{article.likeCount}</p>
            </div>
            <div class="icon-box-comment">
                <p>{article.commentCount}</p>
                <i class="bx bx-comment" />
            </div>
        </div>
    </div>
    <button
        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
    >
        <!-- <i class="material-icons">more_vert</i> -->
        <i class="bx bx-dots-vertical-rounded material-icons" />
    </button>
    <ul class="list-menu is-show">
        <li class="onCursur">Edit</li>
        <li class="onCursur">Delete</li>
    </ul>
</div>
<!-- end article box-->
