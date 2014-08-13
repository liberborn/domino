Raphael.fn.group = function() {
    var paper = this;

    function Group() {
        var el = paper.raphael.vml ? 
                document.createElement('group') : 
                document.createElementNS('http://www.w3.org/2000/svg', 'g');
        paper.canvas.appendChild(el);
        this.parent.constructor.call(this, el, paper);
        this.attrs = {x: 0, y: 0, width: 1, height: 1, r: 0, rx: 0, ry: 0, fill: 'none', stroke: 'none'};
        this.type = 'rect';
        this.set = paper.set();
    }
    
    Group.prototype = Object.create(paper.raphael.el);
    Group.prototype.constructor = Group;
    Group.prototype.parent = paper.raphael.el;
    
    Group.prototype.push = function() {
    	var group = this;
        function pushOne(item) {
            if (item.type === 'set') {
                item.forEach(pushOne);
            } else {
                group.node.appendChild(item.node);
                group.set.push(item);
            }
        }
        for (var i = 0; i < arguments.length; i++) {
        	pushOne(arguments[i]);
        }
        var bbox = this.set.getBBox();
        this.attrs = {x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height, r: 0, rx: 0, ry: 0, fill: 'none', stroke: 'none'};
        return this;
    };
    
    return new Group();
};
