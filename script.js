const board=document.querySelector('.board');
const blockHeight=10;
const blockWidth=10;
const cols=Math.floor(board.clientWidth/blockWidth);
const rows=Math.floor(board.clientHeight/blockHeight);
const startBTN=document.querySelector(".btn-start");
const modal=document.querySelector(".modal");
const startGameModal=document.querySelector(".start-game");
const gameOverModal=document.querySelector(".game-over");
const restartbutton=document.querySelector(".btn-restart");

const highScoreElement=document.getElementById("high-score");      
const scoreElement=document.getElementById("score");      
const timeElement=document.getElementById("time");      

highScoreElement.innerText=localStorage.getItem("highScore")||0;

let highScore=localStorage.getItem("highScore") ||0;
let score=0;
scoreElement.innerText=0;
let time="00-00";

 const blocks=[];
 interval=null;
timerIntervalId=null;

 let food= {
    x:Math.floor(Math.random()*rows),
    y:Math.floor(Math.random()*cols)  
 }
 let direction='right';

 let snake=[{x:1,y:2}];
for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
 const block=document.createElement('div');
    block.classList.add('block');
    board.appendChild(block);
    blocks[`${i}-${j}`]=block;
    }
} 

function render(){
      let head=null;
      blocks[`${food.x}-${food.y}`].classList.add("food");
    if(direction=="left"){
        head={x:snake[0].x,y:snake[0].y-1}
    }
    else if(direction=="right"){
head={x:snake[0].x,y:snake[0].y+1}
    }
    else if(direction=="down"){
head={x:snake[0].x+1,y:snake[0].y}
    }
    else if(direction=="up"){
        head={x:snake[0].x-1,y:snake[0].y}
    }
    //food consume
if(head.x==food.x && head.y==food.y){
      blocks[`${food.x}-${food.y}`].classList.remove("food");
     
      food= {
    x:Math.floor(Math.random()*rows),
    y:Math.floor(Math.random()*cols)  }
  blocks[`${food.x}-${food.y}`].classList.add("food");
 snake.unshift(head);
score+=10;
scoreElement.innerText=score ;
highScoreElement.innerText=highScore;

if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore.toString());
}
}

if(head.x<0 || head.x>=rows ||head.y<0||head.y>=cols){
   
 clearInterval(interval);
 modal.style.display="flex";
 startGameModal.style.display="none";
 gameOverModal.style.display="flex";
 return;
};
snake.forEach((elem)=>{
   blocks[`${elem.x}-${elem.y}`].classList.remove("fill");
})
    snake.unshift(head);
    snake.pop();
snake.forEach((elem)=>{
   blocks[`${elem.x}-${elem.y}`].classList.add("fill");
})
console.log();
}
// function start(){
//     
//     interval=setInterval(()=>{
//     render();
// },300);
// }

startBTN.addEventListener("click",()=>{
modal.style.display="none";
direction="right";
    interval=setInterval(()=>{
        render();
    },10);
    timerIntervalId=setInterval(()=>{
        let [min,sec]=time.split("-").map(Number);
        if(sec==59){
            min+=1;
            sec=0;
        }
        else{
            sec+=1;
        }
        time=`${min}-${sec}`
        timeElement.innerText=time;
    },50)
});

restartbutton.addEventListener("click",()=>{restartGame();});

function restartGame(){
    
    score=0;
    time="00-00";
    
    scoreElement.innerText=score;
    timeElement.innerText=time;
    highScoreElement.innerText=highScore;
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })
modal.style.display="none";
snake=[{
    x:1,y:3
}]
food= {
    x:Math.floor(Math.random()*rows),
    y:Math.floor(Math.random()*cols)  
 };
 direction="right"
interval=setInterval(()=>{
        render();
    },100);

}

addEventListener("keydown",(event)=>{
    if(event.key=="ArrowUp"){
        direction="up";
    }
   else if(event.key=="ArrowRight"){
        direction="right";
    }
   else if(event.key=="ArrowLeft"){
        direction="left";
    }
   else if(event.key=="ArrowDown"){
        direction="down";
    }
})
function restart(){

}
function up(){
  direction="up";
}
function down(){
  direction="down";
}
function left(){
 direction="left";
}
function rigth(){
 direction="right";
}
