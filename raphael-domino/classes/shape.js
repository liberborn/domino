function Shape(paper){
    this.paper = paper;
    this.set = this.paper.group();
}

Shape.prototype.push = function(){
	for (var i = 0; i < arguments.length; i++) {
		this.set.push(arguments[i]);
    }
};

Shape.prototype.x = function(){
    return this.set.getBBox().x;
};
  
Shape.prototype.y = function(){
    return this.set.getBBox().y;
};

Shape.prototype.width = function(){
    return this.set.getBBox().width;
};

Shape.prototype.height = function(){
    return this.set.getBBox().height;
};

Shape.prototype.x2 = function(){
    return this.set.getBBox().x2;
};
  
Shape.prototype.y2 = function(){
    return this.set.getBBox().y2;
};

Shape.prototype.cx = function(){
    return this.set.getBBox().cx;
};

Shape.prototype.cy = function(){
    return this.set.getBBox().cy;
};

Shape.prototype.translate = function(x, y){
    this.set.transform('...T' + x + ',' + y);
};

Shape.prototype.rotate = function(degrees, cx, cy){
    this.set.transform('...R' + degrees + ',' + cx + ',' + cy);
};
  
Shape.prototype.rotate_right = function(){
    this.rotate(90, this.cx(), this.cy());
};

Shape.prototype.animate_rotation_left = function(){
    var animation = Raphael.animation({transform: '... R -90 ' + this.cx() + ' ' + this.cy()}, 400, 'bounce');
    this.set.animate(animation.repeat(1));
};

Shape.prototype.animate_rotation_right = function(){
    var animation = Raphael.animation({transform: '... R 90 ' + this.cx() + ' ' + this.cy()}, 400, 'bounce');
    this.set.animate(animation.repeat(1));
};

Shape.prototype.move_to = function(x, y){
    var delta_x = x - this.x();
    var delta_y = y - this.y();
    this.translate(delta_x, delta_y);
};
