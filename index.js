const canvas = document.querySelector("#battlefield")
const ctx = canvas.getContext("2d")

const game = new JeudelaVie()
game.gameSetUp()

window.onload = () => {

    document.querySelector("#start-random").addEventListener("click", () => {
        game.dispoAleatoire();
        game.fillArray();
        window.setInterval(() => {
            game.runGame();
        }, 50)
    })

    document.querySelector("#stop").addEventListener("click", () => {
        game.gameSetUp();
    })

}