var self;

function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
}

// console.log(Math.floor(Math.random() * 10));

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {
    self = this;
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.scoreField = document.querySelector('#score strong')
    //function index - takes two parameters index(x,y), and return position acording to the
    //board  array
    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.hideVisibleFurry = function () {
        // document.querySelector(".furry").classList.remove('furry'); //NOT WORKINN

        // board.forEach(function (field) {
        //     field.classList.remove('furry');
        // })

        for (var i = 0; i < board.length; i++) {
            board[i].classList.remove('furry');
        }

    };


    this.keyboardListener = function (event) {
        var pressedKey = event.which;
        switch (pressedKey) {
            case 37:
                self.furry.direction = "left";
                break;
            case 38:
                self.furry.direction = "up";
                break;
            case 39:
                self.furry.direction = "right";
                break;
            case 40:
                self.furry.direction = "down";
                break;
        }
    };

    this.moveFurry = function () {
        switch (self.furry.direction) {
            case "up":
                self.furry.y--;
                break;
            case "down":
                self.furry.y++;
                break;
            case "left":
                self.furry.x--;
                break;
            case "right":
                self.furry.x++;
                break;
        }
    };

    this.gameOver = function () {
        clearInterval(this.idSetInterval);
        document.querySelector("#board").classList.add("hide");
        document.querySelector("#over").classList.remove("hide");
    };


    this.checkCoinAndCollision = function () {

        // borders colisions
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            this.gameOver();
        }

        // if the position of furry is the same as the coin
        //add point to score, remove and rerender the coin
        var position = this.index(this.furry.x, this.furry.y);
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.score++;
            this.scoreField.innerHTML = this.score;
            this.board[position].classList.remove("coin");
            this.coin = new Coin();
        }
    };

    this.setNextMove = function () {
        this.hideVisibleFurry();
        this.showCoin();
        this.showFurry();
    };

    this.startGame = function () {
        self.checkCoinAndCollision();
        self.moveFurry();
        self.setNextMove();
    };


    this.idSetInterval = setInterval(this.startGame, 250);
    document.addEventListener("keydown", this.keyboardListener);
}

var game = new Game();
game.idSetInterval;