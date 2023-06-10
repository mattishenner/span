<script>
    import { getDoc, doc, setDoc } from "firebase/firestore"
    import { authHandlers, authStore } from "../../store/store";
    import { auth, db} from '../../lib/firebase/firebase.js'


    let favoriteWorkouts = [];

    let newFav = "";

    authStore.subscribe(curr => {
        favoriteWorkouts = curr.data.favoriteWorkouts;
    })

    function addFavorite(){
        favoriteWorkouts = [...favoriteWorkouts, newFav];
        newFav = "";
    }

    async function saveData() {
        try {
            const userRef = doc(db, "users", $authStore.user.uid);
            await setDoc(userRef, {   
                favoriteWorkouts
            }, { merge: true });
        } catch (err) {
            console.log("Error saving data", err);
        }
    }
</script>

{#if !$authStore.loading}

    <main>
        <h1 class="center">Welcome you lil Bob</h1>
        <button on:click={authHandlers.logout}>Log out</button>
        <section class="favorite-workouts">
            <h2 class="center">Favorite Workouts</h2>
            {#if favoriteWorkouts !== []}
                {#each favoriteWorkouts as workout}
                <div class="workout-card">
                    <p>{workout}</p>
                    <button class="btn btn-primary">Start</button>
                </div>
                {/each}
            {:else}
            <div class="workout-card">
                <p>Your favorite workouts will be shown here!</p>
            </div>
            {/if}
        </section>

        <section>
            <h2>Add favorite workout</h2>
            <input bind:value={newFav} type="text">
            <button on:click={() => {addFavorite(); saveData();}}>Add</button>
            <!-- <button on:click={saveData}>Save</button> -->
        </section>
    </main>

{/if}


<style>
    .workout-card{
        background-color: rgba(255, 255, 255, 0.079);
        padding: 8px;
        margin: 8px;
        border-radius: var(--border-radius);
    }
</style>
