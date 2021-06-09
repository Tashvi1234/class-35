var ball;
var database,pos; 

function setup(){
    createCanvas(500,500);
    database = firebase.database(); // connect to DB
    var dbNode = database.ref ("ball/position"); // refer to location in DB
    dbNode.on ("value", readPosition, showError); // listen to DB changes

    ball = createSprite(250,250,10,10); 
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        //changePosition(-1,0);
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);

    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
function readPosition(data){
    pos = data.val (); // get value
    ball.x = pos.x;  // assign position to ball
    ball.y = pos.y;
}
function showError(){
    console.log("Error Occurred");
}
function writePosition(x,y){
    var dbNode = database.ref ("ball/position"); // refer to location in DB
    // write to DB
    dbNode.set ({
        x:ball.x+x,
        y:ball.y+y
    });
}
