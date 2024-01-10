const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');
let currentPlayer;
let gameGrid;
const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let create funtion to initialise the game

function initGame(){
      currentPlayer ="X";
      gameGrid = ["","","","","","","","",""];
      boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        // kuchh missing hai

       //initialise boxes with initial propertise
       box.classList=`box box${index+1}`


      });
      newGameBtn.classList.remove("active");
      gameInfo.innerText =`Current Player - ${currentPlayer}`;
}
initGame();

function checkGameOver(){
    //
    let answer="";

    winningPositions.forEach((position)=>{
        //all bosex are not empty and exactly same value
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && (gameGrid[position[0]] === gameGrid[position[1]])&&(gameGrid[position[1]] === gameGrid[position[2]])){
            //check winner
            if(gameGrid[position[0]]==="X"){
                answer="X"
            }
            else{
                answer="O"
            }
            //disable the pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
             

            //now we know the winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
       
    });
    if(answer!==""){
        
        gameInfo.innerText =`Winner Player-${answer}`;

        newGameBtn.classList.add("active");
        return;
    }

    //when there is no winner{
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    });

    //board is filled game is Tie
    if(fillCount===9){
        gameInfo.innerText=`Game is Tie`;
        newGameBtn.classList.add("active");
    }
    

}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer ="O";
    }
    else{
        currentPlayer = "X";
    }
    //ui upadate

    gameInfo.innerText= `currentPlayer-${currentPlayer}`;
}


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap kro
        swapTurn();
        //check koi jeet to nhi gya
        checkGameOver();



    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);