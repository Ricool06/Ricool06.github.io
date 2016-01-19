var mainCanvas = document.getElementById('mainCanvas');
mainCanvas.width = 1280;
mainCanvas.height = 720;
var ctx = mainCanvas.getContext("2d");
var loveText = document.getElementById('loveText');

console.log(ctx);
//Class: Player
var Player = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.maxRunVel = 4;
    this.acc = 0.2;
    this.currentRunVel = 0;
    this.jumpVel = 0;
    this.moving = false;
    this.direction;
    this.jumping = true;
    this.colliding = false;
    this.enabled = true;
    this.img = sprite2;
};

Player.prototype.draw = function() {
    ctx.beginPath();
    ctx.drawImage(this.img, this.x, this.y);
    ctx.closePath();

    if(this.enabled){
        this.handleMove();
    }
    this.handleJump();
    this.collide();
};

Player.prototype.handleMove = function() {
    if(this.moving){
        if(Math.abs(this.currentRunVel) < Math.abs(this.maxRunVel)){
            this.currentRunVel += 2 * this.direction * this.acc;
        }

        this.x += this.currentRunVel;

        imgCount++;
        if(imgCount > 10){
            this.img = imgs[imgSwitch];
            imgSwitch++;
            if(imgSwitch > 3){
                imgSwitch = 0;
            }
            imgCount = 0;
        }
    }
    else{
        if(Math.abs(this.currentRunVel) > this.acc){
            this.x += this.currentRunVel;
            if(this.currentRunVel > 0){
                this.currentRunVel -= this.acc;
            }
            if(this.currentRunVel < 0){
                this.currentRunVel += this.acc;
            }
        }
    }
};

Player.prototype.handleJump = function() {
    if(this.jumping){
        if(this.jumpVel > 8){
            this.jumpVel = 8;
        }
        this.y += this.jumpVel;
        this.jumpVel += 0.5;
        this.img = sprite1;
    }
};

Player.prototype.handleYCollision = function(ent) {
    this.y = ent.y - this.height + 1;
    this.jumping = false;
    if(ent == button){
        button.press();
    }
};

Player.prototype.handleXCollision = function(ent) {
    this.x = moving = false;
};

Player.prototype.collide = function() {
    this.colliding = false;
    this.jumping = true;
    for(i = 1; i < ents.length; i++){
        if((this.y + this.height) > ents[i].y && (this.x + this.width) > ents[i].x && this.x < (ents[i].x + ents[i].width)){
            this.colliding = true;
            this.jumping = false;
            this.handleYCollision(ents[i]);
        }
    }
};
//end Class

//Class: Floor
var Floor = function() {
    this.x = -100;
    this.y = 600;
    this.width = 1480;
    this.height = 220;
    this.colliding = false;
};

Floor.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 160, 0, 1)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
};
//end Class

//Class: Button
var Button = function() {
    this.x = 600;
    this.y = 560;
    this.width = 80;
    this.height = 80;
    this.colliding = false;
    this.pressing = false;
};

Button.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = "rgba(160, 0, 0, 1)";;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();

    if(this.y > 590){
        this.pressing = false;
    }
    if(this.pressing){
        console.log("pressing");
        this.y += 1;
    }

};

Button.prototype.press = function() {
    ply.enabled = false;
    this.pressing = true;
    heart.show = true;
}
//end Class

//Class: Heart
var Heart = function() {
    this.x = 640 - 300;
    this.y = 740;
    this.width = 600;
    this.height = 600;
    this.show = false;
    this.red = 0;
    this.drawText = false;
};

Heart.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = "rgba("+ this.red + ", 60, 60, 1)";
    for(i = 0; i < this.width / 40; i++){
        ctx.fillRect(this.x + (i*20),this.y + (i*20),this.width - (i*40),20);
    }
    for(i = 0; i < this.width / 80; i++){
        ctx.fillRect(this.x + (i*20),this.y - (i*20),this.width/4 - (i*20),20);
    }
    for(i = 0; i < this.width / 80; i++){
        ctx.fillRect((this.x + this.width/2) + (i*20),this.y - (i*20),this.width/4 - (i*20),20);
    }
    for(i = 0; i < this.width / 80; i++){
        ctx.fillRect((this.x +  this.width/4),this.y - (i*20),this.width/4 - (i*20),20);
    }
    for(i = 0; i < this.width / 80; i++){
        ctx.fillRect((this.x + (3 *this.width / 4)),this.y - (i*20),this.width/4 - (i*20),20);
    }
    ctx.fill();
    ctx.closePath();
    if(this.drawText){
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 10, 10, 1)";
        ctx.font = "40px Fipps";
        ctx.fillText("I Love You",this.x + 140,this.y + 80);
        ctx.fillText("Georgina",this.x + 160,this.y + 140);
        ctx.closePath();

        setTimeout(fadeInText, 500);
    }

    if(this.show){
        if(this.y > 250){
            this.y--;
        }
        else{
            this.drawText = true;
        }
        if(this.red < 250){
            this.red++;
        }
    }

}
//end Class

//MAIN
var sprite1 = new Image();
var sprite2 = new Image();
var sprite3 = new Image();
var sprite4 = new Image();

sprite1.src = "imgs/sprite1.png";
sprite2.src = "imgs/sprite2.png";
sprite3.src = "imgs/sprite3.png";
sprite4.src = "imgs/sprite4.png";

var imgCount = 0;
var imgSwitch = 1;

var imgs = [sprite1, sprite2, sprite3, sprite4];

var ply;
var floor;
var button;
var heart;
var ents;
var glow = 0;
var alpha = 0;

init();

function init() {
    ply = new Player(1, 1, 24, 40);
    floor = new Floor();
    button = new Button();
    heart = new Heart();

    ents = [ply, button, floor];

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    setInterval(draw, 16);
};

function fadeInText() {
    alpha += 0.02;
    loveText.style.color = "rgba(240,240,240,"+ alpha +")";
    if(alpha < 1){
        setTimeout(fadeInText, 100);
    }
}

function draw() {
    clear();

    for(j = 0; j < 10; j++){
        for(i = 0; i < 10; i++){
            ctx.beginPath();
            glow = 0.1 +  (Math.random() * 0.5)

            var offset = i * 140;
            var yoffset = j * 60
            ctx.rect(offset + 20,yoffset +  20, 2, 2);
            ctx.fillStyle = "rgba(255, 255, 255, " + glow +")";


            ctx.rect(offset + 70,yoffset +  40, 2, 2);
            ctx.fillStyle = "rgba(255, 255, 255, " + glow +")";


            ctx.rect(offset + 40,yoffset +  120, 2, 2);
            ctx.fillStyle = "rgba(255, 255, 255, " + glow +")";


            ctx.rect(offset + 100,yoffset +  130, 2, 2);
            ctx.fillStyle = "rgba(255, 255, 255, " + glow +")";

            ctx.fill();
            ctx.closePath();

        }
    }

    heart.draw();
    ply.draw();
    button.draw();
    floor.draw();

};

function clear() {
    ctx.beginPath();
    ctx.rect(0, 0, mainCanvas.width, mainCanvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fill();
    ctx.closePath();
};

function keyDownHandler(e) {
    if(e.keyCode == 65){
        ply.moving = true;
        ply.direction = -1;
    }
    if(e.keyCode == 68){
        ply.moving = true;
        ply.direction = 1;
    }
    if(e.keyCode == 87 && !ply.jumping){
        ply.jumpVel = -12;
        ply.jumping = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 65){
        ply.moving = false;
        ply.img = sprite2;
    }
    if(e.keyCode == 68){
        ply.moving = false;
        ply.img = sprite2;
    }
}

function showText() {

}
//MAIN
