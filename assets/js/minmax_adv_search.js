class Piece{
    constructor(name, image, x, y, color){
            this.name = name;
            this.image = image;
            this.x = x;
            this.y = y;
            this.isDragging = false;
            this.color = color;
    }
}

var isMouseDown = false;
var pW;
var pH;
var promBuffer = 10;

function drawPromotionOpts(ctx, color){
    ctx.fillStyle = "#363636";
    ctx.strokeStyle = "#000000";
    ctx.beginPath();
    ctx.roundRect((board.width / 2) - ((board.width / 2) + (promBuffer * 5)) / 2, (board.height / 2) - ((board.height / 8) + (promBuffer * 2)) / 2, (board.width / 2) + (promBuffer * 5), (board.height / 8) + (promBuffer * 2), 10);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "grey";
    ctx.strokeStyle = "#000000";
    for(i = 0; i < 4; ++i){
        ctx.beginPath();
        ctx.roundRect(promGrid[i][0], promGrid[i][1], pW, pH, 5);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    ctx.stroke();

    if(prom_color == 'w'){
        // console.log("pawn-x: " + promGrid[0][0] + " | pawn-y: " + promGrid[0][1]);
        ctx.drawImage(wknight, promGrid[0][0], promGrid[0][1], pW, pH);
        ctx.drawImage(wbish, promGrid[1][0], promGrid[1][1], pW, pH);
        ctx.drawImage(wrook, promGrid[2][0], promGrid[2][1], pW, pH);
        ctx.drawImage(wqueen, promGrid[3][0], promGrid[3][1], pW, pH);
    }
    else{
        ctx.drawImage(bknight, promGrid[0][0], promGrid[0][1], pW, pH);
        ctx.drawImage(bbish, promGrid[1][0], promGrid[1][1], pW, pH);
        ctx.drawImage(brook, promGrid[2][0], promGrid[2][1], pW, pH);
        ctx.drawImage(bqueen, promGrid[3][0], promGrid[3][1], pW, pH);
    }
}

function drawCheckmate(ctx){
    let buffer = 10;
    let radius = 10;

    ctx.fillStyle = "#363636";
    ctx.strokeStyle = "#000000";
    ctx.beginPath();
    ctx.roundRect((board.width / 2) - (((board.width / 2) + (buffer * 2)) / 2), (board.height / 2) - (((board.height / 4) + (buffer * 2)) / 2),(board.width / 2) + (buffer * 2),(board.height / 4) + (buffer * 2),radius);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "grey";
    ctx.strokeStyle = "#000000";
    ctx.beginPath();
    ctx.roundRect(((board.width / 2) - (board.width / 4)), ((board.height / 2) - (board.height / 4)),(board.width / 2),(board.height / 2),radius);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
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

    if(promoting){
        drawPromotionOpts(ctx);
    }

    if(isCheckmate){
        drawCheckmate(ctx);
    }
    //console.log(pieces);
}

var boardParent = document.getElementById("chessboardParent");
var board = document.getElementById("board");
board.height = boardParent.clientWidth;
board.width = boardParent.clientWidth;
var boardColors = ["#bd8f6a","#613511"];
var ctx = board.getContext("2d");
pW = board.width / 8;
pH = board.height / 8;
var promGrid = [[((board.width / 2) - ((board.width / 2) + (promBuffer * 5)) / 2) + promBuffer, ((board.height / 2) - ((board.height / 8) + (promBuffer * 2)) / 2) + promBuffer],[((board.width / 2) - ((board.width / 2) + (promBuffer * 5)) / 2) + (promBuffer * 2) + pW, ((board.height / 2) - ((board.height / 8) + (promBuffer * 2)) / 2) + promBuffer],[((board.width / 2) - ((board.width / 2) + (promBuffer * 5)) / 2) + (promBuffer * 3) + (2 * pW), ((board.height / 2) - ((board.height / 8) + (promBuffer * 2)) / 2) + promBuffer],[((board.width / 2) - ((board.width / 2) + (promBuffer * 5)) / 2) + (promBuffer * 4) + (3 * pW), ((board.height / 2) - ((board.height / 8) + (promBuffer * 2)) / 2) + promBuffer]];
console.log(promGrid);

console.log("Board Height: " + board.height + " | Board Width: " + board.width);

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

window.addEventListener('resize', function(event){
    console.log("resizing");
    board.width = boardParent.clientWidth;
    board.height = boardParent.clientWidth;
    pW = board.width / 8;
    pH = board.height / 8;

    for(i = 0; i < 8; ++i){
        for(j = 0; j < 8; ++j){
            if(pieces[i][j] != "."){
                pieces[i][j].x = j * pW;
                pieces[i][j].y = i * pH;
            }
        }
    }

    promGrid = [[((board.width / 2) - ((board.width / 2) + (promBuffer * 5)) / 2) + promBuffer, ((board.height / 2) - ((board.height / 8) + (promBuffer * 2)) / 2) + promBuffer],[((board.width / 2) - ((board.width / 2) + (promBuffer * 5)) / 2) + (promBuffer * 2) + pW, ((board.height / 2) - ((board.height / 8) + (promBuffer * 2)) / 2) + promBuffer],[((board.width / 2) - ((board.width / 2) + (promBuffer * 5)) / 2) + (promBuffer * 3) + (2 * pW), ((board.height / 2) - ((board.height / 8) + (promBuffer * 2)) / 2) + promBuffer],[((board.width / 2) - ((board.width / 2) + (promBuffer * 5)) / 2) + (promBuffer * 4) + (3 * pW), ((board.height / 2) - ((board.height / 8) + (promBuffer * 2)) / 2) + promBuffer]];

    drawBoard(ctx,pieces);
});

var currP;
var tempCoord;
var res;
var req;
var waiting = false;
var isCheckmate = false;
var message;
var mouseX;
var mouseY;
var player = "w";
var white_king = true;
var white_krook = true;
var white_qrook = true;
var black_king = true;
var black_krook =  true;
var black_qrook = true;
var en_passant = false;
var promoting = false;
var prom_color = 'w';
var promCoord;

const chessSocket = new WebSocket("ws://localhost:11111");
chessSocket.addEventListener("open", (event) => {
    console.log("Connection opened");
});

// set the position of the piece according to the result value in message
chessSocket.addEventListener("message", (event) => {
    console.log("message received:");
    console.log(event.data);
    res = JSON.parse(event.data);
    switch(res.method){
        case "ismovelegal":
            console.log(res.result);
            if(res.result && currP !== '.'){
                currP.isDragging = false;

                // en passant is on board
                if(Math.abs(tempCoord[0] - Math.floor(mouseY / pH)) == 2 && ((Math.floor(mouseX / pW) < 7 && ((pieces[Math.floor(mouseY / pH)][Math.floor(mouseX / pW) + 1].name == 'P' && currP.name == 'p') || (pieces[Math.floor(mouseY / pH)][Math.floor(mouseX / pW) + 1].name == 'p' && currP.name == 'P'))) || (Math.floor(mouseX / pW) > 0 && ((pieces[Math.floor(mouseY / pH)][Math.floor(mouseX / pW) - 1].name == 'P' && currP.name == 'p') || (pieces[Math.floor(mouseY / pH)][Math.floor(mouseX / pW) - 1].name == 'p' && currP.name == 'P'))))){
                    en_passant = true;
                }
                else{
                    en_passant = false;
                }

                // castling move made
                if((currP.name == 'K' && white_king) || (currP.name == 'k' && black_king)){
                    if(tempCoord[1] - Math.floor(mouseX / pW) == -2){
                        console.log("Moving king side rook");
                        pieces[tempCoord[0]][tempCoord[1] + 1] = pieces[tempCoord[0]][7];
                        pieces[tempCoord[0]][7] = '.';

                        pieces[tempCoord[0]][tempCoord[1] + 1].x = (tempCoord[1] + 1) * pW;
                        pieces[tempCoord[0]][tempCoord[1] + 1].y = tempCoord[0] * pH;
                    }
                    else if(tempCoord[1] - Math.floor(mouseX / pW) == 2){
                        console.log("Moving queen side rook");
                        pieces[tempCoord[0]][tempCoord[1] - 1] = pieces[tempCoord[0]][0];
                        pieces[tempCoord[0]][0] = '.';

                        pieces[tempCoord[0]][tempCoord[1] - 1].x = (tempCoord[1] - 1) * pW;
                        pieces[tempCoord[0]][tempCoord[1] - 1].y = tempCoord[0] * pH;
                    }
                }

                // en passant and castling
                if(currP.name == 'P' && res.ep_picked){
                    pieces[Math.floor(mouseY / pH) + 1][Math.floor(mouseX / pW)] = '.';
                }
                else if(currP.name == 'p' && res.ep_picked){
                    pieces[Math.floor(mouseY / pH) - 1][Math.floor(mouseX / pW)] = '.';
                }
                else if(currP.name == 'K'){
                    white_king = false;
                }
                else if(currP.name == 'k'){
                    black_king = false;
                }

                if(currP.name == 'P' && Math.floor(mouseY / pH) == 0){
                    promCoord = [Math.floor(mouseY / pH),Math.floor(mouseX / pW)];
                    prom_color = 'w';
                    promoting = true;
                }
                else if(currP.name == 'p' && Math.floor(mouseY / pH) == 7){
                    promCoord = [Math.floor(mouseY / pH),Math.floor(mouseX / pW)];
                    prom_color = 'b';
                    promoting = true;
                }
                
                currP.x = Math.floor((currP.x + (pW / 2)) / pW) * pW;
                currP.y = Math.floor((currP.y + (pH / 2)) / pH) * pH;

                pieces[Math.floor(mouseY / pH)][Math.floor(mouseX / pW)] = currP;

                if(res.checkmate){
                    isCheckmate == true;
                }
                if(black_qrook && pieces[0][0] == '.'){
                    black_qrook = false;
                }
                if(black_krook && pieces[0][7] == '.'){
                    black_krook = false;
                }
                if(white_qrook && pieces[7][0] == '.'){
                    white_qrook = false;
                }
                if(white_krook && pieces[7][7] == '.'){
                    white_krook = false;
                }

                player = (player == "w")?"b":"w";
                if(promoting){
                    waiting = true;
                }
                else{
                    waiting = false;
                }
            }
            else{
                currP.isDragging = false;
                currP.x = tempCoord[1] * pW;
                currP.y = tempCoord[0] * pH;
                pieces[tempCoord[0]][tempCoord[1]] = currP;
            }

            drawBoard(ctx,pieces);

            if(res.checkmate){
                isCheckmate = true;
            }

            break;
        case "getminimaxmove":
            console.log("res: " + res);
            console.log("res[move]: " + res.move);
            console.log("res[move][0][0]: " + res.move[0][0]);

            pieces[res.move[1][0]][res.move[1][1]] = pieces[res.move[0][0]][res.move[0][1]];
            pieces[res.move[1][0]][res.move[1][1]].y = res.move[1][0] * pH;
            pieces[res.move[1][0]][res.move[1][1]].x = res.move[1][1] * pW;
            pieces[res.move[0][0]][res.move[0][1]] = '.';

            if(res.checkmate){
                isCheckmate = true;
            }

            drawBoard(ctx,pieces);
            waiting = false;

            break;
        case "geteval":
            showEval(res);
            break;
    }
    console.log("waiting: " + waiting);
});

board.addEventListener('mousedown', function(event){
    console.log("mouse clicked");
    mouseX = event.clientX - board.getBoundingClientRect().left;
    mouseY = event.clientY - board.getBoundingClientRect().top;

    if(pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)] !== '.' && pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)].color == player){
        currP = pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)];
        pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)].isDragging = true;
        pieces[Math.floor(mouseY / pH)][Math.floor(mouseX/ pW)] = '.';
        tempCoord = [Math.floor(mouseY / pH),Math.floor(mouseX/ pW)];
    }
    else{
        console.log("failed to set currP");
        console.log("mouse x: " + mouseX + " | mouse y: " + mouseY);
        console.log("Board Height: " + board.height + " | Board Width: " + board.width);
    }
});

board.addEventListener('mouseup', async function(event){
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
            flags: [white_king, white_krook, white_qrook, black_king, black_krook, black_qrook, en_passant],
            en_passant_targets: [],
            player: player,
            opponent: (player == "w")?"b":"w"
        }
        if(en_passant && (currP.name == 'P' || currP.name == 'p')){
            req.en_passant_targets = [[tempCoord[0],tempCoord[1] - 1],[tempCoord[0],tempCoord[1] + 1]];
        }

        console.log(req);
        
        chessSocket.send(JSON.stringify(req))

        while(waiting){
            //console.log("in loop after send");
            await sleep(100);
        }

        drawBoard(ctx,pieces);
    }
});

board.addEventListener("click", (event) => {
    mouseX = event.clientX - board.getBoundingClientRect().left;
    mouseY = event.clientY - board.getBoundingClientRect().top;

    let promPiece;
    let promName;

    if(promoting){
        if((mouseX >= promGrid[0][0] && mouseX <= (promGrid[0][0] + pW)) && (mouseY >= promGrid[0][1] && mouseY <= (promGrid[0][1] + pH))){
            promPiece = (prom_color == 'w')?wknight:bknight;
            promName = (prom_color == 'w')?'T':'t';
        }
        else if((mouseX >= promGrid[1][0] && mouseX <= (promGrid[1][0] + pW)) && (mouseY >= promGrid[1][1] && mouseY <= (promGrid[1][1] + pH))){
            promPiece = (prom_color == 'w')?wbish:bbish;
            promName = (prom_color == 'w')?'B':'b';
        }
        else if((mouseX >= promGrid[2][0] && mouseX <= (promGrid[2][0] + pW)) && (mouseY >= promGrid[2][1] && mouseY <= (promGrid[2][1] + pH))){
            promPiece = (prom_color == 'w')?wrook:brook;
            promName = (prom_color == 'w')?'R':'r';
        }
        else if((mouseX >= promGrid[3][0] && mouseX <= (promGrid[3][0] + pW)) && (mouseY >= promGrid[3][1] && mouseY <= (promGrid[3][1] + pH))){
            promPiece = (prom_color == 'w')?wqueen:bqueen;
            promName = (prom_color == 'w')?'Q':'q';
        }

        pieces[promCoord[0]][promCoord[1]].image = promPiece;
        pieces[promCoord[0]][promCoord[1]].name = promName;
        promoting = false;
        drawBoard(ctx, pieces);
        waiting = false;
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
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

newGameButton.addEventListener("click", () => {
    choiceDiv.innerHTML = "<button id=\"whiteButton\" class=\"chess_white_btn\">white</button><br/><button id=\"blackButton\" class=\"chess_black_btn\">black</button>"
    whiteButton = document.getElementById("whiteButton");
    blackButton = document.getElementById("blackButton");
    //console.log(choiceDiv.innerHTML)
    whiteButton.addEventListener("click", async () => {
        var url = 'index.html?page=minmax_adv_search&playerColor=' + encodeURIComponent("w");
        window.location.href = url;
    });
    blackButton.addEventListener("click", async () => {
        var url = 'index.html?page=minmax_adv_search&playerColor=' + encodeURIComponent("b");
        window.location.href = url;
    });
});

url = new URL(window.location.href);

if (url.searchParams.has('playerColor') && url.searchParams.get('playerColor') == "w") {
    playGame("w");
}
else if(url.searchParams.has('playerColor') && url.searchParams.get('playerColor') == "b"){
    playGame("b");
}
else if(url.searchParams.has('playerColor')){
    console.log('found playerColor but not w or b');
}
else{
    console.log('all url checks failed');
}


async function playGame(color){
    await sleep(500);
    isCheckmate = false;
    let human = color;
    let ai = (color == "w")?"b":"w";

    choiceDiv.innerHTML = "";
    console.log("Player color: " + human + " | AI color: " + ai);
    if(color == "w"){
        player = human;
    }
    else{
        player = ai;
    }
    while(!isCheckmate){
        if(player == human){
            console.log("" + player + " turn");
            waiting = true;
            console.log("waiting on player: " + waiting);
            while(waiting){
                //console.log("waiting for player move");
                await sleep(100);
            }
            console.log("player move received");
            player = ai;
        }
        else{
            console.log("minimax turn");
            waiting = true;

            let tempBoard = getBoard();
            //tempBoard[tempCoord[0]][tempCoord[1]] = currP.name;
            
            let req = {
                method: "getminimaxmove",
                board: tempBoard,
                player: player,
                opponent: (player == "w")?"b":"w"
            }
            console.log(req);
            
            console.log("sending data for minimax move");
            chessSocket.send(JSON.stringify(req))

            while(waiting){
                await sleep(100);
            }
            player = human;
        }
    }

    let winner = (player == "w")?"b":"w"
    console.log("Game over: " + winner + " wins");
}