
const SnakeGame = function() {
    let snakePosition;
    let mousePosition;
    
    let snakeSpeed = 500;
    let snakeSize;

    let move;

    var snake = {
        x: 10, 
        y: 10, 
        direction: 2, //0: up, 1: down, 2: left, 3: right
        clean: function () {
            let snakeCells = document.querySelectorAll('.snake');
            snakeCells.forEach(e => {
                e.classList.remove('snake');
            })
        },
        update: function() {
            switch (snake.direction) {
                case 0: snake.y = snake.y === 1 ? 20 : this.y - 1; break;
                case 1: snake.y = snake.y === 20 ? 1 : this.y + 1; break;
                case 2: snake.x = snake.x === 1 ? 20: this.x - 1; break;
                case 3: snake.x = snake.x === 20 ? 1: this.x + 1; break;
            }
            

        },
        draw: function() {
            snakePosition = document.querySelector(`.row${snake.y} .col${snake.x}`)
            snakePosition.classList.add('snake')
        },
        
        eatMouse: function () {
            if(snake.x === mouse.x && snake.y === mouse.y) {
                mousePosition.classList.remove('mouse');
                snake.update();
                mouse.update();
                board.speedUp();
                console.log(mouse.x)
                console.log(snakeSpeed)
                
            }      

        },
        
        move: function() {
            snake.clean();
            snake.update();
            snake.eatMouse();
            snake.draw();
        }
    }
    
    var mouse = {
        x: 5, 
        y: 5,
        update: function() {
            mouse.x = Math.ceil(Math.random() * 20);
            mouse.y = Math.ceil(Math.random() * 20);
            mousePosition = document.querySelector(`.row${mouse.y} .col${mouse.x}`)
            mousePosition.classList.add('mouse')
        }
    }
    
    var board = {
        draw: function() {
            snakePosition = document.querySelector(`.row${snake.y} .col${snake.x}`)
            snakePosition.classList.add('snake')
            
            mousePosition = document.querySelector(`.row${mouse.y} .col${mouse.x}`)
            mousePosition.classList.add('mouse')
        },
        speedUp: function() {
            clearInterval(move);

            if (snakeSpeed <= 100 ) snakeSpeed = 100; else snakeSpeed = 399 / 500 * snakeSpeed;
            move = setInterval(snake.move,snakeSpeed)
        }
    }
                        
                    
    this.start = function() {
        board.draw();
        move = setInterval(snake.move,snakeSpeed)
        window.addEventListener('keydown', e => {
        switch(e.key) {
            case 'ArrowUp': snake.direction = 0; break;
            case 'ArrowDown': snake.direction = 1; break;
            case 'ArrowLeft': snake.direction = 2; break;
            case 'ArrowRight': snake.direction = 3; break;
        }
        })
    }
}
                
var game = new SnakeGame();

game.start();