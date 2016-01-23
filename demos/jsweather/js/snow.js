//Start Flake Class
var Flake = function(x, y, radius, xvel, yvel){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xvel = xvel;
    this.yvel = yvel;
    this.imageData = new ImageData(this.radius * 2, this.radius * 2);
    this.branch = new Path2D();
    this.color = 'rgba(255,255,255,0.1)';
    this.complexity = 8;

    this.generate();
}

Flake.prototype.draw = function() {
    bctx.resetTransform();

    buffer.width = this.radius*2;
    buffer.height = this.radius*2;
    //This way preserves the transparecy of the flake
    //Draw to the buffer
    bctx.putImageData(this.imageData, 0, 0);
    //Copy to the main canvas
    ctx.drawImage(buffer, this.x, this.y);

    this.x += this.xvel;
    this.y += this.yvel;

    if(this.y > c.height){
        this.y = -2 * this.radius;
        this.x = Math.random() * c.width;
    }
}

Flake.prototype.generate = function() {
    //Reset the translation and rotation of the buffer
    bctx.resetTransform();

    buffer.width = this.radius*2;
    buffer.height = this.radius*2;
    bctx.translate(buffer.height / 2, buffer.width / 2);

    //Clear the buffer
    bctx.clearRect(-buffer.width / 2, -buffer.height / 2, buffer.width, buffer.height);
    bctx.strokeStyle = this.color;
    //Save the transform and rotate of the buffer context

    //Generate a path2d that will represent a branch
    this.makeBranch();
    //Draw 6 uniformly spaced branches
    for(var i = 0; i < 6; i++){
        this.createBranchImage();
        this.drawBranch();
        bctx.rotate(60 * Math.PI / 180);
    }

    //After the full snowflake is rendered to the buffer, copy its image data
    this.imageData = bctx.getImageData(0, 0, buffer.width, buffer.height);
}

Flake.prototype.makeBranch = function(){
    //Generate an asymmetrical branch
    this.branch.strokeStyle = this.color;
    this.branch.moveTo(0,0);
    this.branch.lineTo(0, -this.radius);
    for(var i = 0; i < this.complexity; i++){
        var w = buffer.width;
        var h = buffer.height;
        this.branch.moveTo(0, ((h/2) * Math.random()) - h/2);
        this.branch.lineTo((w/2) * Math.random(), (h/2) * Math.random() - h/2);
    }
}

Flake.prototype.createBranchImage = function(){
    //Mirror the asymmetrical branch and store its image data
    var w = buffer.width;
    var h = buffer.height;
    bctx.stroke(this.branch);
    this.branch.imageData = bctx.getImageData(0,0,w,h);
    bctx.scale(-1, 1);
    bctx.stroke(this.branch);
    this.branch.mirrorData = bctx.getImageData(0,0,w,h);
    bctx.scale(-1, 1);
}

Flake.prototype.drawBranch = function(){
    //Draw the symmetrical branch
    bctx.putImageData(this.branch.mirrorData,0,0);
}
//End Flake Class

var flakes = [];
var flakeCount = 200;
var buffer = document.getElementById("buffer");
var bctx = buffer.getContext("2d");

var max = 20;
var min = 5;
var flakeSpacing = c.width / flakeCount;

for(var i = 0; i < flakeCount; i++){
    var radius = Math.round(min + ((max-min) * Math.random()));
    var x = i * flakeSpacing;
    var y = -radius - (Math.random() * c.height);
    var xvel = 0;
    var yvel = radius / 10;

    flakes.push(new Flake(x, y, radius, xvel, yvel));
}

function drawSnow(){
    for(var i = 0; i < flakes.length; i++){
        flakes[i].draw();
    }
}
