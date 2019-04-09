<template>
    <div class="Stage">
        <canvas id="three_canvas"></canvas>
    </div>
</template>

<script>
    import { Scene } from '../three/Scene'

    new Scene();

    export default {
        name: 'Stage'
    }
</script>
