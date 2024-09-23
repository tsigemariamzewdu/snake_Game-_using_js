// when space bar clicked i want it to start the game 


// define html elements
const board=document.getElementById('game-board');
const instructiontext=document.getElementById("instruction");
const logo=document.getElementById('logo');
const score=document.getElementById('score') ;
const highscoretext=document.getElementById('highscore');
// define game varibles
const gridsize=20;
let snake=[{x:10, y:10}];
let food=generatefood();
let direction='right';
let gameInterval;
let Gamedelay=200;
let gameStarted=false;
let highscore=0;

// draw game map snake and food

function draw(){
board.innerHTML='';
drawsnake();
drawFood();
updateScore();

}   
function drawsnake(){
snake.forEach((segment)=>{
const snakeelement=createGameElement('div','snake');

setPosition(snakeelement,segment);
board.appendChild(snakeelement)
});}
//create  a snake or food cube/ div
function createGameElement(tag,className){
    const element=document.createElement(tag);
    element.className=className;
    return element;


}
//set the postion of snake or food
function setPosition(element,position){
    element.style.gridColumn=position.x;
    element.style.gridRow=position.y;
}
function drawFood(){
    if (gameStarted){
    const foodElement=createGameElement('div','food');
        setPosition(foodElement,food);
        board.appendChild(foodElement);}

            
        
 }
 //generate the food
 function generatefood(){
    const x = Math.floor(Math.random() * gridsize)+1;
    const y = Math.floor(Math.random() * gridsize)+1;
    return {x,y}
 }
//moving the snake
function move(){
    const head={...snake[0]};
    switch(direction){
        case 'right':
            head.x ++;
            break;
        case 'up':
            head.y --;
            break;
        case 'down':
            head.y ++;
            break;
        case 'left':
                head.x --;
                break;

    }
snake.unshift(head);
if (head.x===food.x && head.y===food.y){
    food=generatefood();
    increaseSpeed();
    clearInterval(gameInterval);// clear the past interval
    gameInterval=setInterval(() => {
        move();
        checkCollison();
        draw();
    },Gamedelay);

    }
    else{
        snake.pop();
    }
}

// start the game
function startGame(){
    gameStarted=true;
    instructiontext.style.display='none';
    logo.style.display='none';
    gameInterval=setInterval(()=> {
       move();
       checkCollison();
       draw();


    },Gamedelay);

}

// key press event listener
 function handlekeypress(event){
    if (!gameStarted && (event.code==='Space'|| event.code===' ')){
        startGame();
    }else{
        switch(event.key){
            case 'ArrowUp':
                direction='up';
                break;
            case 'ArrowDown':
                    direction='down';
                    break;
                   
            case 'ArrowRight':
                        direction='right';
                        break;
            case 'ArrowLeft':
                            direction='left';
                            break;
        }
    }

 }
 document.addEventListener('keydown',handlekeypress);
 function increaseSpeed(){
    // console.log(Gamedelay);
    if (Gamedelay> 150){
        Gamedelay -= 5;
    }else if(Gamedelay > 100){
            Gamedelay -= 3;

        }else if(Gamedelay > 50){
            Gamedelay -= 2;

        }
        else if(Gamedelay > 25){
            Gamedelay -= 1;

        }
    
    }
 function checkCollison(){
    const head= snake[0];
    if (head.x <1 || head.x > gridsize || head.y <1 || head.y > gridsize){
    resetGame();}
 for (let i =1; i<snake.length; i++){
    if (head.x===snake[i].x && head.y===snake[i].y){
      resetGame();  
    }
 }


 }
 function resetGame(){
    updateHighscore();
    stopGame();
snake=[{x:10, y:10}];
food=generatefood();
direction='right';
Gamedelay=200;
updateScore();

 }
 function updateScore(){
    const currentScore=snake.length-1;
    score.textContent=currentScore.toString().padStart(3,"0");
 }
 function stopGame(){
    clearInterval(gameInterval);
    gameStarted=false;
    instructiontext.style.display='block';
    logo.style.display='block';

 }
 function updateHighscore(){
 const currentScore=snake.length-1;
 highscore=currentScore;
 highscoretext.textContent=highscore.toString().padStart(3,'0');
 highscoretext.style.display="block";


 }
