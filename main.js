
const SnakeGame = function() {
    let move; //to save the interval.

    var snake = {
        pos: [{x: 10, y: 10}],
        speed: 500,
        grow: false,
        direction: 2, //0: up, 1: down, 2: left, 3: right

        update: function() {
            //move in direction
            switch (snake.direction) {
                case 0: 
                    snake.pos.unshift({
                        x: snake.pos[0].x,
                        y: snake.pos[0].y === 1 ? 20 : snake.pos[0].y - 1});
                    break;
                case 1: 
                    snake.pos.unshift({
                        x: snake.pos[0].x,
                        y: snake.pos[0].y === 20 ? 1 : snake.pos[0].y + 1});
                     break;
                case 2: 
                    snake.pos.unshift({
                        x: snake.pos[0].x === 1 ? 20: snake.pos[0].x - 1,
                        y: snake.pos[0].y});
                    break;
                case 3: 
                    snake.pos.unshift({
                        x: snake.pos[0].x === 20 ? 1: snake.pos[0].x + 1,
                        y: snake.pos[0].y});
                    break;
            }
            //check if grows
            if (snake.grow == true) {
                snake.grow = false;
            } else {
                snake.pos.pop()
            }
        },

        draw: function() {
            snake.pos.forEach(p => {
                const cell = document.querySelector(`.row${p.y} .col${p.x}`)
                cell.classList.add('snake')
            })
        },

        eatMouse: function () {
            if(snake.pos[0].x === mouse.pos[0].x && snake.pos[0].y === mouse.pos[0].y) {
                mouse.update();
                snake.grow=true;
                snake.update();
                board.speedUp();
                console.log(snake.pos)
            }      

        },
        
        move: function() {
            board.clean();
            snake.update();
            snake.eatMouse();
            board.draw();
            board.collision();
        },

        grow: function() {
            let currentPos = snake.pos[0]
            snake.pos.push(currentPos)
        }
    }
    
    var mouse = {
        pos: [{x: 5, y: 5}],
        update: function() {
            mouse.pos[0].x = Math.ceil(Math.random() * 20);
            mouse.pos[0].y = Math.ceil(Math.random() * 20);
            mouse.pos.forEach(p => {
                const celm = document.querySelector(`.row${mouse.pos[0].y} .col${mouse.pos[0].x}`)
                celm.classList.add('mouse')})
        }
    }
    
    var board = {
        clean() {
            const snakePos = document.querySelectorAll('.snake')
            snakePos.forEach(elem => { elem.classList.remove('snake') })
            const mousePos = document.querySelectorAll('.mouse')
            mousePos.forEach(elem => { elem.classList.remove('mouse') })
          },

        draw: function() {
            snake.pos.forEach(p => {
                const cels = document.querySelector(`.row${p.y} .col${p.x}`)
                cels.classList.add('snake')
            })
            mouse.pos.forEach(m => {
                const celm = document.querySelector(`.row${m.y} .col${m.x}`)
                celm.classList.add('mouse')
            })
        },

        speedUp: function() {
            clearInterval(move);

            if (snake.speed <= 100 ) 
                snake.speed = 100; 
            else 
                snake.speed = 399 / 500 * snake.speed;

            move = setInterval(snake.move,snake.speed)
        },

        collision: function() {
            let head = snake.pos[0]
            //check collission with self.
            for(var i = 1; i < snake.pos.length; i++) {
                if (head.x === snake.pos[i].x && head.y === snake.pos[i].y) {
                    board.gameIsOver();
                    window.location.reload();
                }
            }
        },

        gameIsOver: function() {
            window.alert('This is Game Over');
            window.location.reload()
        }
    }
                        
                    
    this.start = function() {
        board.draw();
        move = setInterval(snake.move,snake.speed)
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