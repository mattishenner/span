<script>
    export let size = "large";
    export let color = "8258ff";
</script>

<div class="load-container">
    {#if size === "small"}
        <div class="d1 small" style="background-color: {"#" + color};"></div>
        <div class="d2 small" style="background-color: {"#" + color};"></div>
    {:else if size === "medium"}
        <div class="d1 medium" style="background-color: {"#" + color};"></div>
        <div class="d2 medium" style="background-color: {"#" + color};"></div>
    {:else if size === "large"}
        <div class="d1" style="background-color: {"#" + color};"></div>
        <div class="d2" style="background-color: {"#" + color};"></div>
    {/if}
</div>


<style>
    .d1, .d2{
        border-radius: 50%;
        height: 20px;
        width: 20px;
    }

    .small{
        height: 8px;
        width: 8px;
    }
    .medium{
        height: 16px;
        width: 16px;
    }

    .load-container{
        height: 1.25em;
        display: flex;
        align-items: center;
        justify-content: center;
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