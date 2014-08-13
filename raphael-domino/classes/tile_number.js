function TileNumber(paper){
    this.parent.constructor.call(this, paper);
    var dummy = this.paper.rect(0, 0, 1, 1);
    dummy.attr({fill: 'white', 'fill-opacity': 0, stroke: 'none'});
    this.push(dummy);
    this.dots = {};
    this.num_dots_mapping = {
        0: [],
        1: [5],
        2: [3, 7],
        3: [3, 5, 7],
        4: [1, 3, 7, 9],
        5: [1, 3, 5, 7, 9],
        6: [1, 3, 4, 6, 7, 9]
    };
    this.draw();
}

TileNumber.prototype = Object.create(Shape.prototype);
TileNumber.prototype.constructor = TileNumber;
TileNumber.prototype.parent = Shape.prototype;

TileNumber.prototype.draw = function(){
    var xy_positions = [25, 50, 75];
    for (var yi = 0; yi < xy_positions.length; yi++){
        for (var xi = 0; xi < xy_positions.length; xi++){
            var dot = this.paper.circle(xy_positions[xi], xy_positions[yi], 10);
            dot.attr({fill: '135-#ffffff-#000000', 'fill-opacity': 1, stroke: '#666666', 'stroke-width': 1});
            this.push(dot);
            this.dots[(yi * 3) + xi + 1] = dot;
        }
    }
};

TileNumber.prototype.display_number = function(){
    var visible_dots = this.num_dots_mapping[this.number];
    for (var key in this.dots) {
        if (this.dots.hasOwnProperty(key)) {
            this.dots[key].hide();
        }
    }
    for (var i = 0; i < visible_dots.length; i++) {
        this.dots[visible_dots[i]].show();
    }
};

TileNumber.prototype.set_number = function(number){
    this.number = number;
    this.display_number();
};
