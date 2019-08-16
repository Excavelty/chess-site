<template>
    <div class="boardContainer mx-auto">
    </div>
</template>

<script>
    import {Game} from '../../../public/js/Game.js';
    export default {
        data() {
            return {
                color: this.$route.params.color,
            }
        },

        mounted() {
            let boardContainer = document.querySelector('.boardContainer');
            let game = new Game(boardContainer, this.color);
            game.initializePieces();
            game.initializeSquareInput();
            game.initializeValidatorAndInject();
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
