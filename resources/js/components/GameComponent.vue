<template>
    <div class="container">
        <input type="button" class="btn btn-primary mx-auto boardRotate" value="Obróć szachownicę">
        <div class="boardContainer mx-auto">
        </div>
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
            let game = new Game(boardContainer);
            game.initializeSquares();
            game.initializePieces();
            game.initializeDependenciesToInject();
            game.initializeSquareInput();
            game.initializeValidatorAndInject();
        }
    }
</script>

<style scoped>
.boardContainer {
    width: 88vh;
    height: 88vh;
    outline: 3px solid #000;
}
.square {
    border: 1px solid #ddd;
}

.square:hover {
    cursour: pointer;
}

.boardRotate {
    display: block;
    margin: 2vh;
}
</style>
