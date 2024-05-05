class Circle{
    constructor(x,y,radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAng = 0;
        this.endAng = 2 * Math.PI;
    }
}

class Line{
    constructor(startX,startY,endX,endY){
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.connStart = false;
        this.connEnd = false;
        this.movePoint = "none";
    }
}

var nodes = [];
var lines = [];
var panel = document.getElementById("drawing_panel");
var ctx = panel.getContext("2d");
var currNode = null;
var currLine = null;
console.log(panel.clientWidth);
console.log(panel.clientHeight);

function drawShapes(ctx){
    ctx.clearRect(0, 0, panel.width, panel.height);
    
    for(i = 0; i < nodes.length; ++i){
        ctx.beginPath();
        ctx.arc(nodes[i].x,nodes[i].y,nodes[i].radius,nodes[i].startAng,nodes[i].endAng);
        ctx.fillStyle = "red";
        ctx.fill();
        // ctx.stroke();
    }

    for(i = 0; i < lines.length; ++i){
        //console.log(lines[i].startX)
        ctx.moveTo(lines[i].startX, lines[i].startY);
        ctx.lineTo(lines[i].endX, lines[i].endY);
        ctx.stroke();

        if(lines[i].connStart == false){
            ctx.beginPath();
            ctx.arc(lines[i].startX,lines[i].startY,5,0,2 * Math.PI);
            ctx.fillStyle = "blue";
            ctx.fill();
        }
        if(lines[i].connEnd == false){
            ctx.beginPath();
            ctx.arc(lines[i].endX,lines[i].endY,5,0,2 * Math.PI);
            ctx.fillStyle = "blue";
            ctx.fill();
        }

        // ctx.moveTo((100 * i), i * 100);
        // ctx.lineTo(200 + (100 * i), i * 100);
    }
    // ctx.fill();
}

add_node_btn = document.getElementById("add_node_btn");
add_edge_btn = document.getElementById("add_edge_btn");
del_node_btn = document.getElementById("del_node_btn");
del_edge_btn = document.getElementById("del_edge_btn");
prev_step_btn = document.getElementById("prev_step_btn");
next_step_btn = document.getElementById("next_step_btn");
reset_btn = document.getElementById("reset_btn");

panel.addEventListener("mousedown",(event)=>{
    mouseX = event.clientX - panel.getBoundingClientRect().left;
    mouseY = event.clientY - panel.getBoundingClientRect().top;

    for(i = 0; i < nodes.length; ++i){
        if((mouseX >= (nodes[i].x - nodes[i].radius) && mouseX <= (nodes[i].x + nodes[i].radius)) && (mouseY >= (nodes[i].y - nodes[i].radius) && mouseY <= (nodes[i].y + nodes[i].radius))){
            currNode = nodes[i];
            console.log("Set current node");
            nodes.splice(i,1);
            console.log(currNode);
            console.log(nodes);
        }
    }

    if(currNode == null){
        for(i = 0; i < lines.length; ++i){
            if((mouseX >= (lines[i].startX - 5) && mouseX <= (lines[i].startX + 5)) && (mouseY >= (lines[i].startY - 5) && mouseY <= (lines[i].startY + 5))){
                currLine = lines[i];
                currLine.movePoint = "start";
                console.log("Set current line for start point");
                lines.splice(i,1);
                console.log(currLine);
                console.log(lines);
            }
            else if((mouseX >= (lines[i].endX - 5) && mouseX <= (lines[i].endX + 5)) && (mouseY >= (lines[i].endY - 5) && mouseY <= (lines[i].endY + 5))){
                currLine = lines[i];
                currLine.movePoint = "end";
                console.log("Set current line for end point");
                lines.splice(i,1);
                console.log(currLine);
                console.log(lines);
            }
        }
    }
});

panel.addEventListener("mousemove",(event)=>{
    if(currNode != null){
        mouseX = event.clientX - panel.getBoundingClientRect().left;
        mouseY = event.clientY - panel.getBoundingClientRect().top;

        currNode.x = mouseX;
        currNode.y = mouseY;

        drawShapes(ctx);
        ctx.beginPath();
        ctx.arc(currNode.x,currNode.y,currNode.radius,currNode.startAng,currNode.endAng);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }
    else if(currLine != null){
        mouseX = event.clientX - panel.getBoundingClientRect().left;
        mouseY = event.clientY - panel.getBoundingClientRect().top;

        if(currLine.movePoint == "start"){
            currLine.startX = mouseX;
            currLine.startY = mouseY;
        }
        else if(currLine.movePoint == "end"){
            currLine.endX = mouseX;
            currLine.endY = mouseY;
        }

        drawShapes(ctx);
        ctx.moveTo(currLine.startX, currLine.startY);
        ctx.lineTo(currLine.endX, currLine.endY);
        ctx.stroke();

        if(currLine.connStart == false){
            ctx.beginPath();
            ctx.arc(currLine.startX,currLine.startY,5,0,2 * Math.PI);
            ctx.fillStyle = "blue";
            ctx.fill();
        }
        if(currLine.connEnd == false){
            ctx.beginPath();
            ctx.arc(currLine.endX,currLine.endY,5,0,2 * Math.PI);
            ctx.fillStyle = "blue";
            ctx.fill();
        }
    }
});

panel.addEventListener("mouseup",(event)=>{
    if(currNode != null){
        nodes.push(currNode);
        currNode = null;
        drawShapes(ctx);
    }
    else if(currLine != null){
        lines.push(currLine);
        currLine = null;
        drawShapes(ctx);
    }
});

add_node_btn.addEventListener("click",(event)=>{
    nodes.push(new Circle(panel.clientWidth / 2, panel.clientHeight / 2, 30));
    drawShapes(ctx);
    console.log(nodes);
});

add_edge_btn.addEventListener("click",(event)=>{
    lines.push(new Line((panel.clientWidth / 2) - 100,panel.clientHeight / 2,(panel.clientWidth / 2) + 100,panel.clientHeight / 2));
    drawShapes(ctx);
    console.log(lines);
});

del_node_btn.addEventListener("click",(event)=>{
    console.log("del node");
});

del_edge_btn.addEventListener("click",(event)=>{
    console.log("del edge");
});

prev_step_btn.addEventListener("click",(event)=>{
    console.log("prev step");
});

next_step_btn.addEventListener("click",(event)=>{
    console.log("next step");
});

reset_btn.addEventListener("click",(event)=>{
    console.log("reset");
});