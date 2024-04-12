var isMouseDown = false;
var pW;
var pH;

function Piece(name, image, x, y){
    this.name = name;
    this.image = image;
    this.x = x;
    this.y = y;
    this.isDragging = false;
}

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
            else if(pieces[i][j].name === "wpawn"){
                ctx.drawImage(wpawn, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "wrook"){
                ctx.drawImage(wrook, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "wknight"){
                ctx.drawImage(wknight, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "wbish"){
                ctx.drawImage(wbish, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "wqueen"){
                ctx.drawImage(wqueen, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "wking"){
                ctx.drawImage(wking, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "bpawn"){
                ctx.drawImage(bpawn, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "brook"){
                ctx.drawImage(brook, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "bknight"){
                ctx.drawImage(bknight, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "bbish"){
                ctx.drawImage(bbish, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "bqueen"){
                ctx.drawImage(bqueen, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else if(pieces[i][j].name == "bking"){
                ctx.drawImage(bking, pieces[i][j].x, pieces[i][j].y, pW, pH);
            }
            else{
                console.log("in else | piece: " + pieces[i][j].name);
                continue;
            }
        }
        // ctx.drawImage(pieces[i].image, pieces[i].x, pieces[i].y, pW, pH);
    }
    console.log(pieces);
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
        pieces[6][j] = new Piece('wpawn',wpawn,j * (board.width / 8),6 * (board.height / 8));
        ctx.drawImage(wpawn,j * (board.width / 8),6 * (board.height / 8),board.width / 8, board.height / 8);
    }
};
wpawn.src = "images/wP.svg";

var wrook = new Image();
wrook.onload = function() {
    pieces[7][0] = new Piece('wrook',wrook, 0 * (board.width / 8), 7 * (board.height / 8));
    ctx.drawImage(wrook,0 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[7][7] = new Piece('wrook',wrook, 7 * (board.width / 8),7 * (board.height / 8));
    ctx.drawImage(wrook,7 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
};
wrook.src = "images/wR.svg";

var wknight = new Image();
wknight.onload = function() {
    pieces[7][1] = new Piece('wknight',wknight, 1 * (board.width / 8), 7 * (board.height / 8));
    ctx.drawImage(wknight,1 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[7][6] = new Piece('wknight',wknight, 6 * (board.width / 8), 7 * (board.height / 8));
    ctx.drawImage(wknight,6 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
};
wknight.src = "images/wN.svg";

var wbish = new Image();
wbish.onload = function() {
    pieces[7][2] = new Piece('wbish',wbish,2 * (board.width / 8),7 * (board.height / 8));
    ctx.drawImage(wbish,2 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[7][5] = new Piece('wbish',wbish,5 * (board.width / 8),7 * (board.height / 8));
    ctx.drawImage(wbish,5 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
};
wbish.src = "images/wB.svg";

var wqueen = new Image();
wqueen.onload = function () {
    pieces[7][3] = new Piece('wqueen',wqueen,3 * (board.width / 8),7 * (board.height / 8));
    ctx.drawImage(wqueen,3 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
}
wqueen.src = "images/wQ.svg";

var wking = new Image();
wking.onload = function () {
    pieces[7][4] = new Piece('wking',wking,4 * (board.width / 8),7 * (board.height / 8));
    ctx.drawImage(wking,4 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
}
wking.src = "images/wK.svg";

//Black pieces
var bpawn = new Image();
bpawn.onload = function () {
    for (var j = 0; j < 8; j++) {
        pieces[1][j] = new Piece('bpawn',bpawn,j * (board.width / 8),1 * (board.height / 8));
        ctx.drawImage(bpawn,j * (board.width / 8),1 * (board.height / 8),board.width / 8, board.height / 8);
    }
};
bpawn.src = "images/bP.svg";

var brook = new Image();
brook.onload = function() {
    pieces[0][0] = new Piece('brook',brook,0 * (board.width / 8),0 * (board.height / 8));
    ctx.drawImage(brook,0 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[0][7] = new Piece('brook',brook,7 * (board.width / 8),0 * (board.height / 8));
    ctx.drawImage(brook,7 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
};
brook.src = "images/bR.svg";

var bknight = new Image();
bknight.onload = function() {
    pieces[0][1] = new Piece('bknight',bknight,1 * (board.width / 8),0 * (board.height / 8));
    ctx.drawImage(bknight,1 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[0][6] = new Piece('bknight',bknight,6 * (board.width / 8),0 * (board.height / 8));
    ctx.drawImage(bknight,6 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
};
bknight.src = "images/bN.svg";

var bbish = new Image();
bbish.onload = function() {
    pieces[0][2] = new Piece('bbish',bbish,2 * (board.width / 8),0 * (board.height / 8));
    ctx.drawImage(bbish,2 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[0][5] = new Piece('bbish',bbish,5 * (board.width / 8),0 * (board.height / 8));
    ctx.drawImage(bbish,5 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
};
bbish.src = "images/bB.svg";

var bqueen = new Image();
bqueen.onload = function () {
    pieces[0][3] = new Piece('bqueen',bqueen,3 * (board.width / 8),0 * (board.height / 8));
    ctx.drawImage(bqueen,3 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
}
bqueen.src = "images/bQ.svg";

var bking = new Image();
bking.onload = function () {
    pieces[0][4] = new Piece('bking',bking,4 * (board.width / 8),0 * (board.height / 8));
    ctx.drawImage(bking,4 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
}
bking.src = "images/bK.svg";

//console.log(pieces);

var currP;
var tempCoord; // use to track square that clicked piece currently occupies
const ws = new WebSocket("ws://localhost:11111");
ws.addEventListener("open", (event) => {
    console.log("Connection opened");
});

ws.addEventListener("message", (event) => {
    console.log("message received:")
    console.log()
});

board.addEventListener('mousedown', function(event){
    var mouseX = event.clientX - board.getBoundingClientRect().left;
    var mouseY = event.clientY - board.getBoundingClientRect().top;

    if(pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)] !== '.'){
        //console.log(pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)].name + " clicked");
        currP = pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)];
        pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)].isDragging = true;
        pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)] = '.';
    }
});

board.addEventListener('mouseup', function(event){
    var mouseX = event.clientX - board.getBoundingClientRect().left;
    var mouseY = event.clientY - board.getBoundingClientRect().top;

    if(currP !== '.'){
        currP.isDragging = false;
        //console.log(pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)].name + " unclicked");

        currP.x = Math.floor((currP.x + (pW / 2)) / pW) * pW;
        currP.y = Math.floor((currP.y + (pH / 2)) / pH) * pH;

        //console.log("GridX: " + Math.floor(currP.x + (pW / 2) / pW) + " | GridY: " + Math.floor(currP.y / pH));
        
        pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)] = currP;
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

function isMovePossible(){
    // check move for low level validity
    // check move for being on same color piece
    
    // if move would capture own piece return false
    // else 
        // make call to server to check move for deeper validity
        // return value of call
}