<template>
    <div class="boardContainer mx-auto">
    </div>
</template>

<script>
    import {Game} from '../../../public/js/Game.js';
    export default {
        mounted() {
            let boardContainer = document.querySelector('.boardContainer');
            let game = new Game(boardContainer, 'white');
            game.initializePieces();
            game.initializeSquareInput();
        }
    }
</script>

<style scoped>
.boardContainer {
    width: 72vh;
    height: 72vh;
}
.square {
    border: 1px solid #ddd;
}

.square:hover {
    cursour: pointer;
}
</style>
