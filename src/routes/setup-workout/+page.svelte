<script>
    import { goto } from "$app/navigation";
    import { workoutData } from "../../store.js";

    const totalSteps = 4;
    let currentStep = 1;
    let main;

    // User input variables
    let workoutDuration = 15;
    let bodyPartFocus = "fullbody";
    let workoutDifficulty = 3;
    let workoutGoal = "strength";

    // Button functions
    function handleNextClick() {
        currentStep = Math.min(currentStep + 1, totalSteps);
        main.style.transform = `translateX(-${(currentStep - 1) * 100}vw)`;
    }

    function handlePreviousClick() {
        currentStep = Math.max(currentStep - 1, 1);
        main.style.transform = `translateX(-${(currentStep - 1) * 100}vw)`;
    }

    function handleFinishClick() {
        console.log("finish");
        // Set the workout data
        workoutData.set({
            workoutLength: workoutDuration,
            bodyPartFocus: bodyPartFocus,
            workoutDifficulty: workoutDifficulty,
            workoutGoal: workoutGoal,
        });
        // go to the load page
        goto("/load");
    }
</script>

<div class="container">
    <p class="center faded small">{currentStep} / {totalSteps}</p>
    <main bind:this={main}>
        <!-- First slide -->
        <section>
            <p class="question">How long do you approximately want to workout today?</p>
            <div class="range-div content">
                <div>
                    <p class="center big">{workoutDuration}</p>
                    <p class="center mt-0">minutes</p>
                </div>
                <input type="range" class="range" bind:value={workoutDuration} min="5" max="30" step="5">
            </div>
        </section>

        <!-- Second slide -->
        <section>
            <p class="question">What body part focus do you have for todays workout?</p>
            <div class="content">
                <form action="">
                    <input type="radio" name="bodypart" id="fullbody" bind:group={bodyPartFocus} value="fullbody">
                    <label for="fullbody">Fullbody 🤸‍♂️</label> <br>
                    <input type="radio" name="bodypart" id="lowerbody" bind:group={bodyPartFocus} value="lowerbody">
                    <label for="lowerbody">Lower body 🦵</label> <br>
                    <input type="radio" name="bodypart" id="upperbody" bind:group={bodyPartFocus} value="upperbody">
                    <label for="upperbody">Upper body 💪</label>
                </form>
            </div>
        </section>

        <!-- Third slide -->
        <section>
            <p class="question">How tough do you want todays workout to be?</p>
            <div class="range-div content">
                <p class="center big difficulty-number">{workoutDifficulty}<span class="of-five">/5</span></p>
                <input type="range" class="range" bind:value={workoutDifficulty} min="1" max="5">
            </div>
        </section>

        <!-- Fourth slide -->
        <section>
            <p class="question">What is  your primary goal today?</p>
            <div class="content">
                <form action="">
                    <input type="radio" name="goal" id="strength" bind:group={workoutGoal} value="strength">
                    <label for="strength">Strength 💪</label> <br>
                    <input type="radio" name="goal" id="conditioning" bind:group={workoutGoal} value="conditioning">
                    <label for="conditioning">Conditioning 🏃‍♂️</label>
                </form>
            </div>
        </section>
    </main>
    <div class="button-div">
        {#if currentStep !== 1}
            <button on:click={handlePreviousClick} class="back-btn">Back</button>
        {:else}
            <button class="back-btn placeholder">Back</button>
        {/if}


        {#if currentStep === totalSteps}
            <button on:click={handleFinishClick}>Generate Workout</button>
        {:else}
            <button on:click={handleNextClick}>Next</button>
        {/if}
    </div>
</div>

<style>
    .container {
        overflow: hidden;
    }
    main {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        /* overflow: hidden; */
        transition: transform 0.3s ease-in-out;
    }
    section {
        padding: var(--margin);
        box-sizing: border-box;
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        place-items: center;
        align-items: start;
        width: 100dvw;
        height: 72dvh;
    }
    .question {
        opacity: .7;
        text-align: center;
        max-width: 60%;
    }
    .center{    
        text-align: center;
    }
    .big{
        font-size: 3em;
        font-weight: 700;
        margin-bottom: 0;
    }
    .mt-0{
        margin-top: 0;
    }
    .faded{
        opacity: .3;
    }
    .small{
        font-size: .8em;
    }

    .of-five{
        font-size: .5em;
        font-weight: 400;
        opacity: .2;
    }
    .difficulty-number{
        margin-bottom: 30px;
    }
    
    button{
        border: none;
        color: var(--background);
        background-color: var(--theme);
        font-size: 1em;
        padding: 12px 0;
        width: 100%;
        border-radius: 4px;
        margin-top: 10px;
    }
    .button-div{
        box-sizing: border-box;
        width: 100%;
        align-self: end;
        padding-left: var(--margin);
        padding-right: var(--margin);
    }

    .range-div{
        width: 100%;
    }
    .content{
        align-self: start;
    }

    input[type="range"].range {
        appearance: none;
        width: 100%;
        height: 5px; 
        background: #d3d3d3;
        outline: none; 
        opacity: 0.7;
    }
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        width: 30px;
        height:30px;
        background: var(--theme);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: none;
    }

    .back-btn {
        border: none;
        background-color: transparent;
        color: var(--theme);
    }
    .placeholder {
        visibility: hidden;
    }


    /* Radio inputs */
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input[type="radio"] {
        display: none;
    }
    input[type="radio"] + label {
        display: inline-block;
        cursor: pointer;
        padding: 10px 0 10px 10px;
        width: 220px;
        text-align: center;
        border-radius: 4px;
        transition: background-color 0.3s ease-in-out;
        opacity: .3;
        font-size: 1.25em;
    }
    input[type="radio"]:checked + label {
        background-color: var(--theme);
        color: var(--background);
        opacity: 1;
    }
</style>
