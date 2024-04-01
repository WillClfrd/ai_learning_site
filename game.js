var isMouseDown = false;
var pW;
var pH;

function Piece(name, image, x, y){
    this.name = name;
    this.image = image;
    this.x = x;
    this.y = y;
}

function drawBoard(ctx, pieces){
    for(var i = 0; i < pieces.length; ++i){
        ctx.drawImage(pieces[i].image, pieces[i].x, pieces[i].y, pW, pH);
    }
}

var board = document.getElementById("board");
board.height = board.width;
var boardColors = ["#bd8f6a","#613511"]
var ctx = board.getContext("2d");

pW = board.width;
pH = board.height;

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
        pieces[6][j] = Piece('wpawn',wpawn,j * (board.width / 8),6 * (board.height / 8));
        ctx.drawImage(wpawn,j * (board.width / 8),6 * (board.height / 8),board.width / 8, board.height / 8);
    }
};
wpawn.src = "images/wP.svg";

var wrook = new Image();
wrook.onload = function() {
    pieces[7][0] = Piece('wrook',wrook);
    ctx.drawImage(wrook,0 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[7][7] = Piece('wrook',wrook);
    ctx.drawImage(wrook,7 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
};
wrook.src = "images/wR.svg";

var wknight = new Image();
wknight.onload = function() {
    pieces[7][1] = Piece('wknight',wknight);
    ctx.drawImage(wknight,1 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[7][6] = Piece('wknight',wknight);
    ctx.drawImage(wknight,6 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
};
wknight.src = "images/wN.svg";

var wbish = new Image();
wbish.onload = function() {
    pieces[7][2] = Piece('wbish',wbish);
    ctx.drawImage(wbish,2 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[7][5] = Piece('wbish',wbish);
    ctx.drawImage(wbish,5 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
};
wbish.src = "images/wB.svg";

var wqueen = new Image();
wqueen.onload = function () {
    pieces[7][3] = Piece('wqueen',wqueen);
    ctx.drawImage(wqueen,3 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
}
wqueen.src = "images/wQ.svg";

var wking = new Image();
wking.onload = function () {
    pieces[7][4] = Piece('wking',wking);
    ctx.drawImage(wking,4 * (board.width / 8),7 * (board.height / 8),board.width / 8, board.height / 8);
}
wking.src = "images/wK.svg";

//Black pieces
var bpawn = new Image();
bpawn.onload = function () {
    for (var j = 0; j < 8; j++) {
        pieces[1][j] = Piece('bpawn',bpawn);
        ctx.drawImage(bpawn,j * (board.width / 8),1 * (board.height / 8),board.width / 8, board.height / 8);
    }
};
bpawn.src = "images/bP.svg";

var brook = new Image();
brook.onload = function() {
    pieces[0][0] = Piece('brook',brook);
    ctx.drawImage(brook,0 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[0][7] = Piece('brook',brook);
    ctx.drawImage(brook,7 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
};
brook.src = "images/bR.svg";

var bknight = new Image();
bknight.onload = function() {
    pieces[0][1] = Piece('bknight',bknight);
    ctx.drawImage(bknight,1 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[0][6] = Piece('bknight',bknight);
    ctx.drawImage(bknight,6 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
};
bknight.src = "images/bN.svg";

var bbish = new Image();
bbish.onload = function() {
    pieces[0][2] = Piece('bbish',bbish);
    ctx.drawImage(bbish,2 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
    pieces[0][5] = Piece('bbish',bbish);
    ctx.drawImage(bbish,5 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
};
bbish.src = "images/bB.svg";

var bqueen = new Image();
bqueen.onload = function () {
    pieces[0][3] = Piece('bqueen',bqueen);
    ctx.drawImage(bqueen,3 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
}
bqueen.src = "images/bQ.svg";

var bking = new Image();
bking.onload = function () {
    pieces[0][4] = Piece('bking',bking);
    ctx.drawImage(bking,4 * (board.width / 8),0 * (board.height / 8),board.width / 8, board.height / 8);
}
bking.src = "images/bK.svg";

console.log(pieces);

document.addEventListener('mousedown', function(event){
    isMouseDown = true;
    console.log("mouse down");

});
document.addEventListener('mouseup', function(event){
    isMouseDown = false;
    console.log("mouse up");
});

document.addEventListener('mousemove', function(event){
    ctx.drawImage(bking,4 * (board.width / 8),4 * (board.height),board.width / 8, board.height / 8);
    // console.log(".");
});