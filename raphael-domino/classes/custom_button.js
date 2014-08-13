function CustomButton(paper, text){
    this.parent.constructor.call(this, paper);
    this.text = text;
    this.draw();
}

CustomButton.prototype = Object.create(Shape.prototype);
CustomButton.prototype.constructor = CustomButton;
CustomButton.prototype.parent = Shape.prototype;

CustomButton.prototype.draw = function(){
    var b_width = 100;
    var b_height = 40;
    this.button = this.paper.rect(0, 0, b_width, b_height, 5);
    this.button.attr({fill: '#777777', 'fill-opacity': 1, stroke: 'black', 'stroke-width': 1});
    
    this.text_shape = new CustomText(this.paper, this.text);
    this.text_shape.move_to((b_width - this.text_shape.width())/2, (b_height - this.text_shape.height())/2);
    
    var shine = this.paper.rect(2, 2, b_width - 4, b_height / 2 , 3);
    shine.attr({fill: "270-#eeeeee-#eeeeee", 'fill-opacity': 0, stroke: 'none'});
    
    this.clickable = this.paper.rect(0, 0, b_width, b_height, 5);
    this.clickable.attr({fill: "white", 'fill-opacity': 0, stroke: 'none', cursor: 'pointer'});
    this.clickable.data({button: this});
    this.push(this.button, this.text_shape.set, shine, this.clickable);
    this.clickable.hover(this.highlight, this.fadeout);
};

CustomButton.prototype.click = function(handler){
	this.clickable.click(handler);
};

CustomButton.prototype.highlight = function(){
	this.data('button').button.attr({fill: '#777788', stroke: '#ccccff'});
	this.data('button').text_shape.attr({fill: '#eeeeee'});
};

CustomButton.prototype.fadeout = function(){
	this.data('button').button.attr({fill: '#777777', stroke: 'black'});
	this.data('button').text_shape.attr({fill: '#222222'});
};
