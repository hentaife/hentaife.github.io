/**
 * Created by Administrator on 2015/7/17.
 */
var can;
var ctx;

var w;
var h;

var deltaTime;
var lastTime;

var starPic = new Image();

var stars = [];
var num = 120;
var dpr = window.devicePixelRatio || 1

function init(){
    can = document.getElementById('canvas');
    ctx = can.getContext('2d');

    w = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
    h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    can.width = w;
    can.height =h;

    starPic.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAHBAMAAABTkbifAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURQAAAP///8/Pz9LS0tzc3Ojo6OXl5fr6+ubm5u3t7fv7+/7+/vLy8vj4+PT09Ozs7M/J6VwAAAAFdFJOUwBU6Oz38OfEAwAAAFtJREFUCNdjYIACZiBOgFDIACjEysDA+BFMgXhgwAQUSmRgiHVgkK8XYPANYGCcCBZkYNBQYMhdk2B6e6vZ2bpjpruvGuSsTQAJQvRMBOuRgepJhOrBbQ8utwEA8eIThYQBb8AAAAAASUVORK5CYII=';

    for(var i = 0;i < num;i++){
        stars[i] = new starObj();
        stars[i].init();
    }

    lastTime = Date.now();
    gameLoop();
}

function gameLoop(){
    window.requestAnimationFrame(gameLoop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    fillCanvas();
    drawStars();
}

function fillCanvas(){
    ctx.fillStyle = '#393550';
    ctx.fillRect(0,0,w,h);
}

function drawStars(){
    for(var i = 0; i < num; i++){
        stars[i].update();
        stars[i].draw();
    }
}

var starObj = function() {
    this.x;
    this.y;

    this.picNo;

    this.xSpd;
    this.ySpd;
}

starObj.prototype.init = function() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;

    this.xSpd = Math.random() * 0.2 - 0.1;
    this.ySpd = Math.random() * 0.6 - 0.3;

    this.picNo = Math.floor(Math.random() * 7);

    this.timer = 0;

};

starObj.prototype.update = function() {
    this.x += this.xSpd;
    this.y += this.ySpd;

    if(this.x > w || this.x < 0)
        this.init();
    else if(this.y > h || this.y < 0)
        this.init();

    this.timer += deltaTime;

    if(this.timer > 50) {
        this.picNo += 1;
        this.picNo %= 7;
        this.timer = 0;
    }
};
starObj.prototype.draw = function () {
      ctx.drawImage(starPic,this.picNo * 7,0,7,7,this.x,this.y,7/dpr,7/dpr);
};

document.body.onload = init;
