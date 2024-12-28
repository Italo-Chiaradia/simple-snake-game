let directionSnake = 'right';
const gridSize = 20;
const snake = [{x: 0, y: 0}]; 
let apple = generateApple(gridSize, snake);

startGame(snake);

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            if (directionSnake === 'top' || directionSnake === 'bottom')
                directionSnake = 'right';
            break;
        case 'a':
            if (directionSnake === 'top' || directionSnake === 'bottom')
                directionSnake = 'left';
            break;
        case 'w':
            if (directionSnake === 'right' || directionSnake === 'left')
                directionSnake = 'top';
            break;
        case 's':
            if (directionSnake === 'right' || directionSnake === 'left')
                directionSnake = 'bottom';
            break;
    }
})


function startGame(snake) {
    moveSnake()
    if (checkCollision(gridSize, snake)) {
        alert('Game Over');
        return;
    }
    if (checkAppleCollision(snake, apple)) {
        let tail = snake[snake.length - 1];
        let newSegment = {...tail};
        snake.push(newSegment);
        apple = generateApple(gridSize, snake);
    }
    
    renderBoard(snake, apple);
    setTimeout(() => {
        startGame(snake);
    }, 200);
}

function checkAppleCollision(snake, apple) {
    const [head] = snake;
    return head.x === apple.x && head.y === apple.y;
}

function checkCollision(gridSize, snake) {
    const [snakeHead, ...snakeBody] = snake;
    
    if (snakeHead.x >= gridSize || snakeHead.y >= gridSize || snakeHead.x < 0 || snakeHead.y < 0)
        return true;

    if (snakeBody.some(element => element.x === snakeHead.x && element.y === snakeHead.y))
        return true;
    return false;
}

function generateApple(gridSize, snake) {
    let apple = {};
    do {
        apple.x = Math.floor(Math.random() * gridSize);
        apple.y = Math.floor(Math.random() * gridSize);
    } while(snake.some(element => element.x === apple.x && element.y === apple.y));
    return apple;
}

function moveSnake() {
    const snakeHead = {...snake[0]};

    switch (directionSnake) {
        case 'right':
            snakeHead.x++;
            break;
        case 'left':
            snakeHead.x--;
            break;
        case 'top':
            snakeHead.y--;
            break;
        case 'bottom':
            snakeHead.y++;
            break;

    }
    snake.unshift(snakeHead);
    snake.pop();
}

function renderBoard(snake, apple) {
    const board = document.querySelector('.board');
    board.innerHTML = '';
    snake.forEach((element) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = element.x + 1;
        snakeElement.style.gridRowStart = element.y + 1;
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });
    const appleElement = document.createElement('div');
    appleElement.style.gridColumnStart = apple.x + 1;
    appleElement.style.gridRowStart = apple.y + 1;
    appleElement.classList.add('apple');
    board.appendChild(appleElement);
}

