var isMouseDown = false;
var pW;
var pH;

function drawBoard(ctx, pieces){
    ctx.clearRect(0, 0, board.width, board.height);

    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++){
            ctx.fillStyle = boardColors[(i + j) % 2];
            ctx.fillRect((board.width / 8) * j, (board.height / 8) * i, (board.width / 8), (board.height / 8));
        }
    }

    for(var i = 0; i < pieces.length; ++i){
        for(var j = 0; j < 8; j++){
            if(pieces[i][j] == '.'){
                continue;
            }
            else if(pieces[i][j].name === "P"){
                ctx.drawImage(wpawn, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "R"){
                ctx.drawImage(wrook, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "T"){
                ctx.drawImage(wknight, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "B"){
                ctx.drawImage(wbish, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "Q"){
                ctx.drawImage(wqueen, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "K"){
                ctx.drawImage(wking, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "p"){
                ctx.drawImage(bpawn, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "r"){
                ctx.drawImage(brook, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "t"){
                ctx.drawImage(bknight, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "b"){
                ctx.drawImage(bbish, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "q"){
                ctx.drawImage(bqueen, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "k"){
                ctx.drawImage(bking, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else{
                console.log("in else | piece: " + pieces[i][j].name);
                continue;
            }
        }
        // ctx.drawImage(pieces[i].image, pieces[i].x, pieces[i].y, pW, pH);
    }
    //console.log(pieces);
}

var board = document.getElementById("board");
board.height = board.width;
var boardColors = ["#bd8f6a","#613511"]
var ctx = board.getContext("2d");

console.log("Board Height: " + board.height + " | Board Width: " + board.width);

pW = board.width / 8;
pH = board.height / 8;

ctx.fillStyle = "#363636";
ctx.fillRect(0,0,board.width,board.height);

for(var i = 0; i < 8; i++){
    for(var j = 0; j < 8; j++){
        ctx.fillStyle = boardColors[(i + j) % 2];
        ctx.fillRect((board.width / 8) * j, (board.height / 8) * i, (board.width / 8), (board.height / 8));
    }
}

var pieces = [];

for(var i = 0; i < 8; i++){
    pieces[i] = [];
    for(var j = 0; j < 8; j++){
        pieces[i][j] = '.';
        // console.log("piece[" + i + "][" + j + "]: " + pieces[i][j]);
    }
}

// White pieces
var wpawn = new Image();
wpawn.onload = function () {
    for (var j = 0; j < 8; j++) {
        pieces[6][j] = new Piece('P',wpawn,j * (board.width / 8),6 * (board.height / 8),'w');
        ctx.drawImage(wpawn,j * (board.width / 8),6 * (board.height / 8),board.width / 8, board.height / 8);
    }
};
wpawn.src = "images/wP.svg";

var wrook = new Image();
wrook.onload = function() {
    pieces[7][0] = new Piece('R',wrook, 0 * (board.width / 8), 7 * (board.height / 8),'w');
    //console.log(pieces[7][0].name);
    ctx.drawImage(wrook,0 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[7][7] = new Piece('R',wrook, 7 * (board.width / 8),7 * (board.height / 8),'w');
    ctx.drawImage(wrook,7 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
};
wrook.src = "images/wR.svg";

var wknight = new Image();
wknight.onload = function() {
    pieces[7][1] = new Piece('T',wknight, 1 * (board.width / 8), 7 * (board.height / 8),'w');
    ctx.drawImage(wknight,1 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[7][6] = new Piece('T',wknight, 6 * (board.width / 8), 7 * (board.height / 8),'w');
    ctx.drawImage(wknight,6 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
};
wknight.src = "images/wN.svg";

var wbish = new Image();
wbish.onload = function() {
    pieces[7][2] = new Piece('B',wbish,2 * (board.width / 8),7 * (board.height / 8),'w');
    ctx.drawImage(wbish,2 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[7][5] = new Piece('B',wbish,5 * (board.width / 8),7 * (board.height / 8),'w');
    ctx.drawImage(wbish,5 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
};
wbish.src = "images/wB.svg";

var wqueen = new Image();
wqueen.onload = function () {
    pieces[7][3] = new Piece('Q',wqueen,3 * (board.width / 8),7 * (board.height / 8),'w');
    ctx.drawImage(wqueen,3 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
}
wqueen.src = "images/wQ.svg";

var wking = new Image();
wking.onload = function () {
    pieces[7][4] = new Piece('K',wking,4 * (board.width / 8),7 * (board.height / 8),'w');
    ctx.drawImage(wking,4 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
}
wking.src = "images/wK.svg";

//Black pieces
var bpawn = new Image();
bpawn.onload = function () {
    for (var j = 0; j < 8; j++) {
        pieces[1][j] = new Piece('p',bpawn,j * (board.width / 8),1 * (board.height / 8),'b');
        ctx.drawImage(bpawn,j * (board.width / 8),1 * (board.height / 8),board.width / 8, board.height / 8);
    }
};
bpawn.src = "images/bP.svg";

var brook = new Image();
brook.onload = function() {
    pieces[0][0] = new Piece('r',brook,0 * (board.width / 8),0 * (board.height / 8),'b');
    ctx.drawImage(brook,0 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[0][7] = new Piece('r',brook,7 * (board.width / 8),0 * (board.height / 8),'b');
    ctx.drawImage(brook,7 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
};
brook.src = "images/bR.svg";

var bknight = new Image();
bknight.onload = function() {
    pieces[0][1] = new Piece('t',bknight,1 * (board.width / 8),0 * (board.height / 8),'b');
    ctx.drawImage(bknight,1 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[0][6] = new Piece('t',bknight,6 * (board.width / 8),0 * (board.height / 8),'b');
    ctx.drawImage(bknight,6 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
};
bknight.src = "images/bN.svg";

var bbish = new Image();
bbish.onload = function() {
    pieces[0][2] = new Piece('b',bbish,2 * (board.width / 8),0 * (board.height / 8),'b');
    ctx.drawImage(bbish,2 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[0][5] = new Piece('b',bbish,5 * (board.width / 8),0 * (board.height / 8),'b');
    ctx.drawImage(bbish,5 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
};
bbish.src = "images/bB.svg";

var bqueen = new Image();
bqueen.onload = function () {
    pieces[0][3] = new Piece('q',bqueen,3 * (board.width / 8),0 * (board.height / 8),'b');
    ctx.drawImage(bqueen,3 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
}
bqueen.src = "images/bQ.svg";

var bking = new Image();
bking.onload = function () {
    pieces[0][4] = new Piece('k',bking,4 * (board.width / 8),0 * (board.height / 8),'b');
    ctx.drawImage(bking,4 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
}
bking.src = "images/bK.svg";

//console.log(pieces);

// THIS IS A MESS
    //This whole thing should be rebuilt later on to make it better to read
// NEED TO FIGURE OUT PROCESS FLOW
// ASYNCHRONOUS NATURE OF EVENT HANDLERS MAKES IT DIFFICULT
// I don't think the semaphore method will work correctly since the code might be arbitrarily executed
var currP;
var tempCoord; // use to track square that clicked piece currently occupies
var res;
var req;
var waiting = false;
var isCheckmate = false;
var message;
var mouseX;
var mouseY;
var player = "w";

const ws = new WebSocket("ws://localhost:11111");
ws.addEventListener("open", (event) => {
    console.log("Connection opened");
});

// set the position of the piece according to the result value in message
ws.addEventListener("message", (event) => {
    console.log("message received:");
    console.log(event.data);
    res = JSON.parse(event.data);

    switch(res.method){
        case "ismovelegal":
            console.log(res.result);
            if(res.result && currP !== '.'){
                currP.isDragging = false;

                currP.x = Math.floor((currP.x + (pW / 2)) / pW) * pW;
                currP.y = Math.floor((currP.y + (pH / 2)) / pH) * pH;

                pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)] = currP;
                
                if(res.checkmate){
                    isCheckmate == true;
                }

                player = (player == "w")?"b":"w";
            }
            else{
                currP.isDragging = false;
                currP.x = tempCoord[1] * pW;
                //console.log("currP.x: " + currP.x + " | pW: " + pW);
                currP.y = tempCoord[0] * pH;
                //console.log("currP.y: " + currP.y + " | pH: " + pH);
                //console.log("y: " + tempCoord[0] + " | x: " + tempCoord[1]);
                pieces[tempCoord[0]][tempCoord[1]] = currP;
                //console.log(pieces);
            }

            drawBoard(ctx,pieces);
            break;
        case "getminimaxmove":
            minimaxMove(res);
            break;
        case "geteval":
            showEval(res);
            break;
    }
    
    waiting = false;
});

board.addEventListener('mousedown', function(event){
    mouseX = event.clientX - board.getBoundingClientRect().left;
    mouseY = event.clientY - board.getBoundingClientRect().top;

    if(pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)] !== '.' && pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)].color == player){
        //console.log(pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)].name + " clicked");
        currP = pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)];
        pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)].isDragging = true;
        pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)] = '.';
        tempCoord = [Math.floor(mouseY / pH),Math.floor(mouseX/ pW)];
        // console.log("tempCoord: " + tempCoord);
    }
});

board.addEventListener('mouseup', function(event){
    mouseX = event.clientX - board.getBoundingClientRect().left;
    mouseY = event.clientY - board.getBoundingClientRect().top;

    if(currP != null && currP.isDragging){
        let tempBoard = getBoard();
        tempBoard[tempCoord[0]][tempCoord[1]] = currP.name;
        
        let req = {
            method: "ismovelegal",
            board: tempBoard,
            move: {
                from: [tempCoord[0], tempCoord[1]],
                to: [Math.floor(mouseY / pH), Math.floor(mouseX / pW)]
            },
            player: player,
            opponent: (player == "w")?"b":"w"
        }
        console.log(req);
        
        ws.send(JSON.stringify(req))

        while(waiting){
            sleep(10);
        }

        drawBoard(ctx,pieces);
    }
});

document.addEventListener('mousemove', function(event){
    var mouseX = event.clientX - board.getBoundingClientRect().left;
    var mouseY = event.clientY - board.getBoundingClientRect().top;

    if(mouseX >= 0 && mouseX <= board.width && mouseY >= 0 && mouseY <= board.height){
        if(currP != null && currP !== '.' && currP.isDragging == true){
            //console.log("mouseX: " + mouseX + " | mouseY: " + mouseY + " | globalX: " + event.clientX + " | globalY: " + event.clientY);
            currP.x = mouseX - (pW / 2);
            currP.y = mouseY - (pH / 2);

            drawBoard(ctx,pieces);
            ctx.drawImage(currP.image, currP.x, currP.y, pW, pH);
        }
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getBoard(){
    let pieceArray = [[],[],[],[],[],[],[],[]];
    for(let i = 0; i < 8; ++i){
        for(let j = 0; j < 8; ++j){
            if(pieces[i][j] != '.'){
                pieceArray[i][j] = pieces[i][j].name;
            }
            else{
                pieceArray[i][j] = '.';
            }
        }
    }
    return pieceArray;
}

drawBoard(ctx,pieces);

newGameButton = document.getElementById("newGameButton");
choiceDiv = document.getElementById("colorChoiceDiv");

newGameButton.addEventListener("click", () => {
    choiceDiv.innerHTML = "<button id=\"whiteButton\">white</button><button id=\"blackButton\">black</button>"
    whiteButton = document.getElementById("whiteButton");
    blackButton = document.getElementById("blackButton");
    //console.log(choiceDiv.innerHTML)
    whiteButton.addEventListener("click", () => {
        console.log("white button clicked");
        isCheckmate = false;
        let human = 'w';
        let ai = 'b';

        choiceDiv.innerHTML = "";
        console.log(choiceDiv.innerHTML);
        //this seems to work but right now it crashes the server, probably because the server is permanently waiting for a return response on the websocket

        player = human;
        while(!isCheckmate){
            if(player == human){
                //ws.send();
                waiting = true;
                while(waiting){
                    sleep(10);
                }
                player = ai;
            }
            else{
                waiting = true;
                while(waiting){
                    sleep(10);
                }
                player = human;
            }
        }
    });
    blackButton.addEventListener("click", () => {
        console.log("black button clicked");
        isCheckmate = false;
        let human = 'b';
        let ai = 'w';

        choiceDiv.innerHTML = "";
        console.log(choiceDiv.innerHTML);
        //this seems to work but right now it crashes the server, probably because the server is permanently waiting for a return response on the websocket

        player = ai;
        while(!isCheckmate){
            if(player == human){
                waiting = true;
                //ws.send();
                while(waiting){
                    sleep(10);
                }
                player = ai;
            }
            else{
                waiting = true;
                //send minimax move
                ws.send(); //add format here
                //wait for minimax move
                while(waiting){
                    sleep(10);
                }
                player = human;
            }
        }
    });
});
//make this into an event handler for a button on the page