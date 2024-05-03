class game{
        constructor(board, pieces, currplayer){
                this.board = board;
                this.pieces = pieces;
                this.player = currplayer;
        }
}

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