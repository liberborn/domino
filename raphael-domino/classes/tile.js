function Tile(paper){
    this.parent.constructor.call(this, paper);
    this.draw();
}

Tile.prototype = Object.create(Shape.prototype);
Tile.prototype.constructor = Tile;
Tile.prototype.parent = Shape.prototype;

Tile.prototype.draw = function(){
    var tile = this.paper.rect(0, 0, 100, 100, 10);
    tile.attr({fill: "135-#999999-#ffffff", 'fill-opacity': 1, stroke: '#222222', 'stroke-width': 2});
    this.tile_number = new TileNumber(this.paper);
    this.push(tile, this.tile_number.set);
};

Tile.prototype.set_number = function(number){
    this.tile_number.set_number(number);
};