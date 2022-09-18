



//module - gdy potrzebujemy coś raz
const GameBoard = (() => {

    const board = ["","","","","","","","",""];

    for(let i = 0; i < board.length; i++) {
        document.querySelector("#gameboard").innerHTML += `<div class="field" data-position="${i}"></div>`
    }

    const getFieldVal = (x) => document.querySelector(`[data-position = "${x}"]`).innerHTML;

    return {
  
        getFieldVal
    };

})();

//module - gdy potrzebujemy coś raz
const DisplayController = (() => {

    const checkPlayer = () => {
        // if (document.getElementById('turn').innerHTML == "X") {
        //     return "O";
        // } else {
        //     return "X"
        // }
    }

    const fields = document.querySelectorAll(".field");

    fields.forEach((element, index) => 
        element.addEventListener("click", () => {
            
            if(GameBoard.getFieldVal(index) == "") {
                // check which player
                if(document.getElementById('turn').innerHTML == player1.getName) {
                    GameBoard.getFieldVal(index) = player1.getSign;
                    playerTurn(player2);
                } else {
                    GameBoard.getFieldVal(index) = player2.getSign;
                    playerTurn(player1);
                }
                
   
            }
        })
    );

    const reset = () => {
        // fields.forEach((field) =>  field.innerHTML = "");
        window.location.reload();
    }

    const startGame = () => {
        let p1 = document.querySelector("#player1").value;
        let p2 = document.querySelector("#player2").value;
        const player1 = Player(p1, "X");
        const player2 = Player(p2, "O")
    
        document.querySelector(".h2").classList.toggle('active');
     
        toggleForm();
    
        playerTurn(player1);
    
        return {player1, player2};
    
    }

    return {
        reset, startGame
    }

})();

document.querySelector("#reset").addEventListener("click", DisplayController.reset);

//factory  - gdy potrzebujemy coś wielokrotnie np. dwóch graczy
const Player = (name, sign) => {

    const getName = () => name;
    const getSign = () => sign

    return {name, sign, getName, getSign};

}

const playerTurn = (player) => {
    document.getElementById('turn').innerHTML = player.name;
}


const toggleForm = () => {
    document.querySelector(".form").classList.toggle('active');
}

const GameFlow = (() => {
    //game state - win, lose, drwa, continue
})();


//funckja Zmiana gracza (toggle X O)

//funkcja przycisk START ->  losowanie gracza zaczynającego

//funkcja wyświetl kto wygrał