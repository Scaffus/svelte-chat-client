<script>
    import { auth, googleProvider } from "./firebase";

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<section class="column is-two-fifths is-offset-one-third">
    <div class="card ">
        <div class="card-header">
            <p class="card-header-title">Login</p>
            <span class="card-header-icon"> 👤 </span>
        </div>
        <div class="card-content">
            <div class="column is-half is-offset-one-quarter">
                <button class="button is-white p-0" on:click={login}>
                    <img
                        src="https://developers.google.com/static/identity/images/btn_google_signin_dark_normal_web.png"
                        alt="google signin"
                    />
                </button>
            </div>
        </div>
    </div>
</section>
