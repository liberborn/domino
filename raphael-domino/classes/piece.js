function Piece(paper){
    this.parent.constructor.call(this, paper);
    this.draw();
}

Piece.prototype = Object.create(Shape.prototype);
Piece.prototype.constructor = Piece;
Piece.prototype.parent = Shape.prototype;

Piece.prototype.draw = function(){
    var piece_base_1 = this.paper.rect(0, 0, 100, 205, 10);
    piece_base_1.attr({fill: '#bbbbbb', 'fill-opacity': 1, stroke: 'none'});
    
    var top_piece_side = this.paper.path('m 10,0 l 85,0 l 15,15 l -85,0 z');
    top_piece_side.attr({fill: '90-#333333-#aaaaaa', 'fill-opacity': 1, stroke: 'none'});
    
    var left_piece_side = this.paper.path('m 0,10 l 15,15 l 0,190 l -15,-15 z');
    left_piece_side.attr({fill: '180-#333333-#aaaaaa', 'fill-opacity': 1, stroke: 'none'});
    
    var piece_base_2 = this.paper.rect(10, 10, 100, 205, 10);
    piece_base_2.attr({fill: '#222222', 'fill-opacity': 1, stroke: 'black', 'stroke-width': 0});
    
    this.top_tile = new Tile(this.paper);
    this.top_tile.move_to(10, 10);
    
    this.bottom_tile = new Tile(this.paper);
    this.bottom_tile.move_to(10, 115);
    
    this.push(piece_base_1, top_piece_side, left_piece_side, piece_base_2, this.top_tile.set, this.bottom_tile.set);
    this.reset();
};

Piece.prototype.reset = function(){
    var top_number = Math.floor((Math.random() * 7));
    var bottom_number = Math.floor((Math.random() * 7));
    this.top_tile.set_number(top_number);
    this.bottom_tile.set_number(bottom_number);
};
