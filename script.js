//HTML Elements
const statusDiv = document.querySelector('.status');
const xstatus = document.querySelector('.x-status');
const ostatus = document.querySelector('.o-status');
const gamestatus = document.querySelector('.games-played');
const resetDiv = document.querySelector('.reset');
const playagainDiv = document.querySelector('.play-again');
const cellDivs = document.querySelectorAll('.game-cell');

//game consonants
const xSymbol = 'x';//×';
const oSymbol = 'o';//○';

//Game Variables
let gameIsLive = true;
let xIsNext = true;
let winner = null;
let xwins = 0;
let owins = 0;
let gamesplayed = 0;

//functions 
const letterToSymbol = (letter) => 
{
    if(letter == "x")
    {
        return xSymbol;
    }
    else
    {
        return oSymbol;
    }

}

const handleWin = (letter) =>
{
    gameIsLive = false;
    winner = letter;
    if(winner == "x") {
        xwins = xwins + 1;
        document.getElementById('x_wins').innerHTML = xwins

        gamesplayed = gamesplayed + 1;
        document.getElementById('games_played').innerHTML = gamesplayed
    } else {
        owins = owins + 1;
        document.getElementById('o_wins').innerHTML = owins

        gamesplayed = gamesplayed + 1;
        document.getElementById('games_played').innerHTML = gamesplayed
    }
}

const checkGameStatus = () =>
{
    const one = cellDivs[0].classList[1];
    const two = cellDivs[1].classList[1];
    const three = cellDivs[2].classList[1];
    const four = cellDivs[3].classList[1];
    const five = cellDivs[4].classList[1];
    const six = cellDivs[5].classList[1];
    const seven = cellDivs[6].classList[1];
    const eight = cellDivs[7].classList[1];
    const nine = cellDivs[8].classList[1];

    //check winner
    if(one && one == two && one == three)
    {
        console.log("1");
        handleWin(one);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
    } 
    else if(four && four == five && four == six)
    {
        console.log("2");
        handleWin(four);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
    }
    else if(seven && seven == eight && seven == nine)
    {
        console.log("3");
        handleWin(seven);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(one && one == four && one == seven)
    {
        console.log("4");
        handleWin(one);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
    } 
    else if(two && two == five &&  two == eight)
    {
        console.log("5");
        handleWin(two);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
    }
    else if(three && three == six && three == nine)
    {
        console.log("6");
        handleWin(three);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(one && one == five && one == nine)
    {
        console.log("7");
        handleWin(one);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(three && three == five && three == seven)
    {
        console.log("8");
        handleWin(three);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if(one && two && three && four && five && six && seven && eight && nine)
    { 
        console.log("9");
        gameIsLive = false;
        statusDiv.innerHTML = "Game is Tied";

        gamesplayed = gamesplayed + 1;
        gamestatus.innerHTML = `Games Played: ${gamesplayed}`;
    }
    else
    {
        xIsNext = !xIsNext;
        if(xIsNext)
        {
            //statusDiv.innerHTML = `${xSymbol} is next`;
        }
        else
        {
            //statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
        }
    }
};

//event Handlers
const handleReset = (e) => 
{
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    winner = null;
    gameIsLive = true;
    for(const cellDiv of cellDivs)
    {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
        
        xstatus.innerHTML = `Player x:`;
        ostatus.innerHTML = `Player o:`;
        gamestatus.innerHTML = `Games Played:`;
        xwins = 0
        owins = 0;
        gamesplayed = 0;
    }
};

const handlePlayAgain = (e) => 
{
    xIsNext = true;
    winner = null;
    gameIsLive = true;
    for(const cellDiv of cellDivs)
    {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
};

const handleCellClick = (e) =>
{
    const classList = e.target.classList;
    //const location = e.target.classList[1];

    if(!gameIsLive || classList[1] == "x" || classList[1] == "o")
    {
        return;
    }

    if(xIsNext)
    {
        classList.add('x');
        checkGameStatus();
    }
    else
    {
        classList.add('o');
        checkGameStatus();
    }
};

//event Listeners
resetDiv.addEventListener('click', handleReset);
for(const cellDiv of cellDivs)
{
    cellDiv.addEventListener('click', handleCellClick);
}

playagainDiv.addEventListener('click', handlePlayAgain);
for(const cellDiv of cellDivs)
{
    cellDiv.addEventListener('click', handleCellClick);
}