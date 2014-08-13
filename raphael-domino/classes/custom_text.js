function CustomText(paper, text){
    this.parent.constructor.call(this, paper);
    this.text = text;
    this.draw();
}

CustomText.prototype = Object.create(Shape.prototype);
CustomText.prototype.constructor = CustomText;
CustomText.prototype.parent = Shape.prototype;

CustomText.prototype.draw = function(){
    this.text_shape = this.paper.text(0, 0, this.text);
    this.text_shape.attr({fill: '#222222', "font-family": "arial, serif", "font-weight": 700, "font-size": 14, stroke: "none", "text-anchor": "start"});
    this.push(this.text_shape);
};

CustomText.prototype.attr = function(attr_obj){
	this.text_shape.attr(attr_obj);
};