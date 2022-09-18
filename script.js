
// let P1;
// let P2;

//plansza
class GameBoard {

    boardArr = ["","","","","","","","",""];

    constructor() {
        this.renderBoard(this.boardArr);
    }
    
    // render planszy w html
    renderBoard(x) {
        for(let i = 0; i < x.length; i++) {
            document.querySelector("#gameboard").innerHTML += `<div class="field" data-position="${i}"></div>`
        }
    }

   getFieldVal(x) {
        return document.querySelector(`[data-position = "${x}"]`).innerText;
   }

   setField(x, val) {
        document.querySelector(`[data-position = "${x}"]`).innerText = val;
   }
};

const gameBoard = new GameBoard();

//kontrola
class DisplayController {
    
    round = 1;

    constructor(P1, P2, board) {
        this.P1 = P1;
        this.P2 = P2;
        this.board = board;
        this.checkField();
        this.gameFlow(this.board, this.player);
    }

    // moim zdaniem nie bardzo bo powoduje to reload strony więc i pobieranie danych itp, można to zrobić w programie w inny sposób a nie za pomocą przeglądarki.


    // metoda może odwoływać do zmiennych w ciele klasy jako this.P1
    checkField() {

        document.querySelectorAll(".field").forEach((element, index) => 

        element.addEventListener("click", () => {
            if(this.board.getFieldVal(index) == "") {
                            
                if(document.getElementById('turn').innerHTML == this.P1.name) {
                    this.board.boardArr[index] = this.P1.sign;
                    this.board.setField(index, this.board.boardArr[index]);
                    // this.board.getFieldVal(index) = this.board.board[index];
                    this.P2.playerTurn();
                    this.round++;
                    document.getElementById("turnNo").innerText = this.round;
                    
                    setTimeout(() => {
                        this.gameFlow(this.board.boardArr, this.P1.name);
                      }, "100")
                } else {
                    this.board.boardArr[index] = this.P2.sign;
                    this.board.setField(index, this.board.boardArr[index]);
                    this.P1.playerTurn();
                    this.round++;
                    document.getElementById("turnNo").innerText = this.round;

                    setTimeout(() => {
                        this.gameFlow(this.board.boardArr, this.P2.name);
                      }, "100")
                }
            }
           
        })
    );
    }

    gameFlow = (board, player) => {    

        let turnNo = document.querySelector("#turnNo");

        if(parseInt(turnNo.innerText) > 4) {

            let termArr = [];
            termArr[0] = board[0] === board[1] && board[1] === board[2] && board[0] !== "";
            termArr[1] = board[3] === board[4] && board[4] === board[5] && board[3] !== "";
            termArr[2] = board[6] === board[7] && board[7] === board[8] && board[6] !== "";
            termArr[3] = board[0] === board[3] && board[3] === board[6] && board[0] !== "";
            termArr[4] = board[1] === board[4] && board[4] === board[7] && board[1] !== "";
            termArr[5] = board[2] === board[5] && board[5] === board[8] && board[2] !== "";
            termArr[6] = board[0] === board[4] && board[4] === board[8] && board[0] !== "";
            termArr[7] = board[2] === board[4] && board[4] === board[6] && board[2] !== "";

        

            for(let i = 0; i < termArr.length; i++) {
                // console.log(board[i]);
                if(termArr[i]) {
                    document.querySelector(".game__result").classList.toggle('active');
                    document.querySelector("#winner").innerText = player;
                    document.querySelector(".win").style.display = 'block';
                    document.querySelector(".draw").style.display = 'none';
                    // wyswietlene planszy na z index 99 o koncu gry info kto wygrał i przyciskem zagraj ponowanie
                    this.round = 1;
                    break;
                }

                if(i == (termArr.length - 1) && turnNo.innerText >= 10) {
                    document.querySelector(".game__result").classList.toggle('active');
                    document.querySelector(".win").style.display = 'none';
                    document.querySelector(".draw").style.display = 'block';
                    this.round = 1;
                    break;
                }
            }
        }
    };
    
};


//gracze
class Player {

    constructor(name, sign) {
        this.name = name;
        this.sign = sign;
    }

    // ** funkcja żeby wyświetlać, którego gracza jest teraz tura. Ma to sens w takiej formie? Używane w checkField()
    // no moze byc, tylko zamiast zmieniac innerhtml po prostu, lepiej by bylo zrobic metode w GameBoard która by odswiezala widok
    // a tutaj zmieniac tylko zmienną turn w GameBoard
    playerTurn() {
        document.getElementById('turn').innerHTML = this.name;
        // gameControl.switchTurn(this.name) na przyklad przekazac do tej zmiennej this.name, a w niej ustawiac zmienną na name gracza
    }

}

document.querySelector("#reset").addEventListener("click", function() {
    reset(gameBoard);
})

const reset = (board) =>  {
    for(let i = 0; i < board.boardArr.length; i++) {
        board.boardArr[i] = "";
    }

    document.querySelectorAll(".field").forEach((element) => 
        element.innerText = ""
    );

    document.querySelector(".h2").classList.toggle('active');
    document.querySelector(".h2-turn").classList.toggle('active');
    document.getElementById('turnNo').innerHTML = 1;
    document.querySelector(".game__result").classList.toggle('active');
    toggleForm();
    document.querySelector("#winner").innerText = "";
    document.querySelector("#player1").value = "";
    document.querySelector("#player2").value = "";
}


const toggleForm = () => {
    document.querySelector(".form").classList.toggle('active');
}

const startGame = () => {

    let p1 = document.querySelector("#player1").value;
    let p2 = document.querySelector("#player2").value;

    const P1 = new Player(p1, "X");
    const P2 = new Player(p2, "O");
    const gameControl = new DisplayController(P1, P2, gameBoard);
    document.querySelector(".h2").classList.toggle('active');
    document.querySelector(".h2-turn").classList.toggle('active');
    
    toggleForm();

    P1.playerTurn();

    return {P1, P2, gameControl};

}

// ** to działa połowicznie, jak gracze wpiszą imiona to odpala info o tym czyja tura
document.querySelector("#nameForm").addEventListener('submit', function(event) {
    event.preventDefault();
    startGame();
    return false;
})

