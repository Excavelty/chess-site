<template>
    <div class="boardContainer mx-auto">

    </div>
</template>

<script>
    import {Game} from '../../../public/js/Game.js';
    export default {
        mounted() {
            let boardContainer = document.querySelector('.boardContainer');
            let game = new Game(boardContainer);
            //while(game.status != false)
            //{
              //  game.updateLogic();
            //}
        }
    }
</script>

<style scoped>
.boardContainer {
    width: 48vw;
    height: 48vw;
}
.square {
    border: 1px solid #ddd;
}
</style>
