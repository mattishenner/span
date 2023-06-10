<script>
    import { workoutData } from "../../store.js";

// Access the user data from the store
let workout;
workoutData.subscribe(value => { workout = value; });
</script>



<div class="container">
    <div class="load-container">
        <div class="d1"></div>
        <div class="d2"></div>
    </div>
    <h3>
        Hold on.. <br>
        Generating workout
    </h3>
</div>

<!-- <p>
    {workout.workoutLength}
    {workout.bodyPartFocus}
    {workout.workoutDifficulty}
    {workout.workoutGoal}
</p> -->

<style>
    .container{
        height: 100dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    h3{
        text-align: center;
        font-weight: 400;
        animation: pulse 1400ms infinite ease-in-out;
        opacity: .5;
    }

    .d1, .d2{
        border-radius: 50%;
        height: 20px;
        width: 20px;
        background-color: var(--theme);
    }

    .load-container{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 50dvh;
    }

    .d1{
        transform-origin: 150% 50%;
        animation: d1 1400ms infinite ease-in-out;
    }
    .d2{
        transform-origin: -50% 50%;
        animation: d2 1400ms infinite ease-in-out;
    }

    @keyframes d1 {
        0% {
            transform: rotate(0deg)
        }
        50% {
            transform: rotate(360deg)
        }
        100% {
            transform: rotate(360deg)
        }
    }

    @keyframes d2 {
        0% {
            transform: rotate(0deg)
        }
        50% {
            transform: rotate(0deg)
        }
        100% {
            transform: rotate(360deg)
        }
    }

    @keyframes pulse {
        0% {
            opacity: .5;
        }
        50% {
            opacity: .05;
        }
    }
</style>