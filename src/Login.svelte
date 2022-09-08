<script>
    import { arrayUnion } from "firebase/firestore";
    import { db, auth, googleProvider } from "./firebase";

    function login() {
        auth.signInWithPopup(googleProvider).then((u) => {
            const userDoc = db.collection("users").doc(u.user.uid)
                userDoc.get().then((doc) => {
                    if (doc.exists) {
                        db.collection("users")
                            .doc(u.user.uid)
                            .update({
                                groups: arrayUnion("default"),
                                uid: u.user.uid,
                            });
                    } else {
                        userDoc.set({
                            groups: ["default"],
                            uid: u.user.uid,
                        });
                    }
                });
        });
    }
</script>

<section class="section is-large column is-one-third is-offset-one-third">
    <div class="card ">
        <div class="card-header">
            <p class="card-header-title">Login</p>
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
