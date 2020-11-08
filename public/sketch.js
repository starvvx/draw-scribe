var socket;
var lineThickness;
var lineColor;
var cursorX;
var cursorY;


function setup() {
    var canv = createCanvas(windowWidth, windowHeight);
    canv.parent('canvas');
    background(255,255,255);

    lineColor = [random(1,255), random(1,255), random(1,255)];

    document.getElementById("r").value = lineColor[0].toString(); 
    document.getElementById("g").value = lineColor[1].toString(); 
    document.getElementById("b").value = lineColor[2].toString();

    socket = io.connect('http://localhost:3000');

    lineThickness = parseInt(document.getElementById("thickness").value);
    var data = {
        thickness: lineThickness,
        color: lineColor
    };
    socket.emit('changeSlider', data);
    // console.log("Pressing");
    socket.on('mouse', newDrawing);
}

function newDrawing(data) {
    noStroke();
    fill(data.color[0], data.color[1], data.color[2]);
    ellipse(data.x, data.y, data.thickness, data.thickness);
}

function mousePressed() {
    cursorX = mouseX;
    cursorY = mouseY;
}

function mouseDragged() {
    var mousex = mouseX;
    var mousey = mouseY;
    // console.log("Pressing");

    cursorX = 0.90*cursorX+0.10*mousex;
    cursorY = 0.90*cursorY+0.10*mousey;
    var data = {
        x: cursorX,
        y: cursorY,
    };
    socket.emit('mouse', data);

    noStroke();
    var eraser = document.getElementById("isChecked");
    if(eraser.checked)
    {
     fill(255,255,255);
     lineThickness = parseInt(document.getElementById("eraser").value);
    }   
    else
        fill(lineColor[0], lineColor[1], lineColor[2]);
    ellipse(cursorX, cursorY, lineThickness, lineThickness);
}

function draw() {
    // var eraser = document.getElementById("isChecked");
    // if(eraser.checked)
    // {
    //     console.log("Selected!!");
    // }
    // else
    // {
    //     document.getElementById("brush-color").style.backgroundColor = "rgb("+lineColor[0]+","+lineColor[1]+","+lineColor[2]+")";
    //     if (mouseIsPressed) {
    //         mouseDragged();
    //     }
    // }
        document.getElementById("brush-color").style.backgroundColor = "rgb("+lineColor[0]+","+lineColor[1]+","+lineColor[2]+")";
        if (mouseIsPressed) {
            mouseDragged();
        }
}

function changeSlider() {
    lineThickness = parseInt(document.getElementById("thickness").value);
    lineColor = [
        parseInt(document.getElementById("r").value), 
        parseInt(document.getElementById("g").value), 
        parseInt(document.getElementById("b").value)
    ];

    var data = {
        thickness: lineThickness,
        color: lineColor
    };
    socket.emit('changeSlider', data);
}
