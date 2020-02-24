var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

var ballRadius = 5;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status:1 };
    }
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1){
                var brickX = c*(brickWidth+brickPadding)+brickOffsetLeft;
                var brickY = r*(brickHeight+brickPadding)+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle="black";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    //공 방향전환 (x좌표)
    if(x+dx-ballRadius<0||x+dx+ballRadius>canvas.width){
        dx = -dx
    }
    
    //공 방향전환 (y좌표)
    if(y+dy-ballRadius<0){
        dy = -dy;
    }else if((x>=paddleX && x<=paddleX+paddleWidth)&&
    y+ballRadius>canvas.height-paddleHeight){
        dy = -dy;   //이부분은 직접 코딩함!!
    }else if(y+dy+ballRadius>canvas.height){
        alert('게임 오버');
    }

    //right 누르면 패들 옮기기
    if(rightPressed && paddleX+paddleWidth<canvas.width){
        paddleX += 7;
    }   
    
    //left 누르면 패들 옮기기
    if(leftPressed && paddleX>0){
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(event){
    if(event.keyCode == 39){
        rightPressed = true;
    }
    else if(event.keyCode == 37){
        leftPressed = true;
    }
}

function keyUpHandler(event){
    if(event.keyCode==39){
        rightPressed = false;
    }else if(event.keyCode == 37){
        leftPressed = false;
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1 ){
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
setInterval(draw,20);

