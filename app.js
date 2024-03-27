//genrating variable for game started flag
var gameStarted = false;
//Array for genearting computer move array
let seqArray = new Array();
//Array for genearting the my Moves array
let myArray = new Array();


//for gerenrating the sound

const playSound = (boxName) => {
    let myAudio = new Audio();
    switch (boxName) {
        case 'box1':
            myAudio = new Audio('./Audios/red.mp3');
            myAudio.play();
            break;
        case 'box2':
            myAudio = new Audio('./Audios/blue.mp3');
            myAudio.play();
            break;
        case 'box3':
            myAudio = new Audio('./Audios/yellow.mp3');
            myAudio.play();
            break;
        case 'box4':
            myAudio = new Audio('./Audios/green.mp3');
            myAudio.play();
            break;
        case 'win':
            myAudio = new Audio('./Audios/win.mp3');
            myAudio.play();
            break;
        case 'loose':
            myAudio = new Audio('./Audios/loose.mp3');
            myAudio.play();
            break;
        case 'clap':
            myAudio = new Audio('./Audios/clap.wav');
            myAudio.play();
            break;

        default:
            console.log(boxName + 'Error in detecting the box to genearte the audio');
            break;
    }

}




//check function 
const compareArrays = () => {
    if (JSON.stringify(myArray) === JSON.stringify(seqArray)) {
        if (seqArray.length < 5) {
            setTimeout(() => {
                computerMove();
            }, 2000);
        } else {
            setTimeout(() => {
                gameWon();
            }, 2000);
            
        }
    } else {
        setTimeout(() => {
            gameOver();
        }, 1000);
    }

}

//Game Over Function
const gameOver = () => {
    $('#msg').text('Game is Over ! You Lost the Game');
    playSound('loose');
    setTimeout(() => {
        location.reload();
    }, 5000);
}

//Game Won Function 
const gameWon = () => {
    $('#msg').text('Congrats You Won the Game!');
    playSound('win');
    playSound('clap');
    setTimeout(() => {
        location.reload();
    }, 8000);
}

//make my Array null
const makeMyMoveNull = () => {
    while (myArray.length > 0) {
        myArray.pop();
    }
};

//for genearting the Computer move
const computerMove = async () => {
    //for generating the random number
    let randomNum = Math.floor(Math.random() * 4) + 1;
    await seqArray.push(randomNum);
    await $('#msg').text('Level ' + seqArray.length);
    await $('#box' + seqArray[seqArray.length - 1]).addClass('pressed');
    //for playing sound
    await playSound('box' + seqArray[seqArray.length - 1]);
    await makeMyMoveNull();
    await setTimeout(() => {
        $('#box' + seqArray[seqArray.length - 1]).removeClass('pressed')
        $('#msg').text('Level ' + seqArray.length + ' :Play Your Move');
    }, 1000);


}

//for the starting event
$(document).keyup(async () => {
    //this is written to stop the further press of any key and further starting the game
    if (gameStarted == false) {
        gameStarted = true;
        await computerMove();
    } else {
        alert('game is already started');
    }
})

const startGame = async ()=>{
    //this is written to stop the further press of any key and further starting the game
    if (gameStarted == false) {
        gameStarted = true;
        await computerMove();
    } else {
        alert('game is already started');
    }
}


//for mouse click event on the box
$('.box').click(async (evt) => {
    if (seqArray.length != 0) {
        let myChoiceBoxId = evt.target.id;
        let myChioceArrayVal = parseInt(myChoiceBoxId.slice(myChoiceBoxId.length - 1));
        await myArray.push(myChioceArrayVal);
        await $('#' + myChoiceBoxId).addClass('pressed');
        //for playing sound
        await playSound('box' + myArray[myArray.length - 1]);
        await setTimeout(() => {
            $('#box' + myArray[myArray.length - 1]).removeClass('pressed')
        }, 1000);
        let compMoveCount = seqArray.length;
        let myMoveCount = myArray.length;
        if (compMoveCount === myMoveCount) {
            await compareArrays();
        }



    }
});








