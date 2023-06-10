<script>
    import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
    import { authHandlers } from "../store/store";
    import LoadAnimation from "./LoadAnimation.svelte";

    let email = "";
    let password = "";
    let confirmPass = "";
    let error = false;
    let register = false;
    let authenticating = false;
    let errMessage = "";

    async function handleAuthenticate() {
        if (authenticating) return;
        if (!email || !password || (register && !confirmPass)) {
            error = true;
            return;
        }
        authenticating = true;

        try {
            if (!register) {
                await authHandlers.login(email, password);
            } else {
                await authHandlers.signup(email, password);
            }
        } catch (err) {
            console.log("Auth error", err);
            error = true;
            authenticating = false;
        }
    }

    async function loginWithGoogle() {
        if (authenticating) return;
        authenticating = true;
        try {
            await authHandlers.googleLogin();
        } catch (err) {
            console.log("Auth error", err);
            errMessage = err.message;
            error = true;
            authenticating = false;
        }
    };

    function handleRegister() {
        register = !register;
    }
</script>

<div class="auth-container">
    <form>
        {#if errMessage}
            <p class="error">{errMessage}</p>
        {/if}
        <h1>{register ? "Register" : "Login"}</h1>
        {#if error}
            <p class="error">
                There's a problem with the information you've entered. Please
                double check it.
            </p>
        {/if}
        <label for="">
            <p class={email ? "active" : "inactive"}>Email</p>
            <input bind:value={email} type="email" placeholder="Email" />
        </label>
        <label for="">
            <p class={password ? "active" : "inactive"}>Password</p>
            <input
                bind:value={password}
                type="password"
                placeholder="Password"
            />
        </label>
        {#if register}
            <label for="">
                <p class={confirmPass ? "active" : "inactive"}>
                    Confirm Password
                </p>
                <input
                    bind:value={confirmPass}
                    type="password"
                    placeholder="Confirm Password"
                />
            </label>
        {/if}
        <button on:click={handleAuthenticate} type="button">
            {#if authenticating}
                <LoadAnimation size="small" color="25232b"/>
            {:else}
                {register ? "Register" : "Login"}
            {/if}
        </button>
        <button on:click={loginWithGoogle} class="secondary">Login with Google</button>
    </form>
    <div class="options">
        {#if register}
            <div>
                <p class="question">Already have an account?</p>
                <p on:click={handleRegister} on:keydown={() => {}}>Login</p>
            </div>
        {:else}
            <div>
                <p class="question">Don't have an account?</p>
                <p on:click={handleRegister} on:keydown={() => {}}>Register</p>
            </div>
        {/if}
    </div>
</div>

<style>
    h1{
        margin: 0;
        line-height: 1;
        font-weight: 600;
        text-align: center;
        margin-bottom: 1rem;
    }
    .error {
        color: rgb(218, 78, 57);
        margin: 0;
        font-size: .875em;
        text-align: center;
        line-height: 1.2;
        margin-bottom: 1rem;
    }

    /* Text pop ups */
    .active,
    .inactive {
        position: absolute;
        margin: 0;
        top: 0;
        left: 0;
        font-size: 16px;
        color: #999;
        transition: all 0.3s ease;
        font-size: 0.75em;
    }
    .inactive {
        transform: translateY(0px);
        opacity: 0;
    }
    .active {
        transform: translate(-10px, -12px);
        opacity: 1;
        background-color: var(--theme);
        color: var(--text);
        padding: 2px;
        border-radius: 3px;
    }



    label {
        position: relative;
        width: 100%;
    }

    .auth-container {
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        width: 100%;
        padding: var(--margin);
        box-sizing: border-box;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
    }

    form input:focus {
        outline: none;
        border-color: var(--theme);
    }

    .options{
        text-align: center;
        font-weight: 600;
    }

    .options div{
        display: flex;
    }
    .options .question{
        opacity: .5;
        margin-right: .25em;
        font-weight: 400;
    }
</style>
