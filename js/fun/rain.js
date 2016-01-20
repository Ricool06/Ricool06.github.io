var Sploosh = function(x, y){
  this.x = x;
  this.y = y;
  this.length = 1;
  this.thickness = 4;
  this.xvel = (Math.random() - 0.5);
  this.yvel = Math.random() * 4;
  this.color = 'rgba(0,140,255,0.5)';
}

Sploosh.prototype.draw = function(){
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineCap = "round";
  ctx.lineWidth = this.thickness;
  ctx.moveTo(this.x,this.y);
  ctx.lineTo(this.x + (this.length * this.xvel),this.y - (this.length * this.yvel));
  ctx.stroke();
  ctx.closePath();
  
  this.x -= this.xvel;
  this.y -= this.yvel;
  
  this.yvel -= 0.2;
  
  this.thickness -= 0.1;
  if(this.length > 0){
  	this.length -= 0.1;
  }
}

var Drop = function(x, y, vel, acc, id){
  this.length = 10;
  this.x = x;
  this.y = y;
  this.vel = vel;
  this.acc = acc;
  this.id = id;
  this.color = 'rgba(0,140,255,0.5)';
}

Drop.prototype.draw = function(){
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineCap = "round";
  ctx.lineWidth = 3;
  ctx.moveTo(this.x,this.y);
  ctx.lineTo(this.x,this.y + this.length);
  ctx.stroke();
  ctx.closePath();
  
  this.y += this.vel;
  this.vel += this.acc;
  
  if(this.y > c.height - 4){
  	splooshes[this.id] = new Sploosh(this.x, this.y);
    splooshes[drops.length + this.id] = new Sploosh(this.x, this.y);
    this.y = -this.length;
    this.x = Math.floor(Math.random() * (max - min + 1)) + min;
    this.vel = 10;
  }
}
//End classes
//Start
var c = document.getElementById("c");
var ctx = c.getContext("2d");
var drops = [];
var splooshes = [];

for(var i = 0; i < 20; i++){
	var max = c.width;
  var min = 0;
	var x = Math.floor(Math.random() * (max - min + 1)) + min;
  var y = Math.floor(Math.random() * (max - min + 1)) + min;
  drops.push(new Drop(x, y, 0.2, 0.2, i));
}

setInterval(draw, 20);

function draw() {
  ctx.beginPath();
  ctx.clearRect(0,0,c.width,c.height);
  ctx.closePath();
  
  for(var i = 0; i < drops.length; i++){
    drops[i].draw();
  }
  for(var i = 0; i < splooshes.length; i++){
    splooshes[i].draw();
  }
}