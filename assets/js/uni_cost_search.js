class Circle{
    constructor(x,y,radius,id){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAng = 0;
        this.endAng = 2 * Math.PI;
        this.id = id;
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
        this.parStart = null;
        this.parEnd = null;
    }
}

var nodes = [];
var lines = [];
var id = 0;
var panel = document.getElementById("drawing_panel");
var ctx = panel.getContext("2d");
var currNode = null;
var currLine = null;
var delMode = false;
console.log(panel.clientWidth);
console.log(panel.clientHeight);

function drawShapes(ctx){
    ctx.clearRect(0, 0, panel.width, panel.height);

    for(i = 0; i < lines.length; ++i){
        if(delMode){
            ctx.beginPath();
            ctx.arc((lines[i].startX + lines[i].endX) / 2,(lines[i].startY + lines[i].endY) / 2,5,0,2 * Math.PI);
            ctx.fillStyle = "black";
            ctx.fill();
        }

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

        ctx.moveTo(lines[i].startX, lines[i].startY);
        ctx.lineTo(lines[i].endX, lines[i].endY);
        ctx.stroke();
    }

    for(i = 0; i < nodes.length; ++i){
        ctx.beginPath();
        ctx.arc(nodes[i].x,nodes[i].y,nodes[i].radius,nodes[i].startAng,nodes[i].endAng);       
        if(delMode){
            ctx.fillStyle = "black";
        }
        else{
            ctx.fillStyle = "red";
        }
        ctx.fill();
    }
}

add_node_btn = document.getElementById("add_node_btn");
add_edge_btn = document.getElementById("add_edge_btn");
del_mode_btn = document.getElementById("del_mode_btn");
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

        for(i = 0; i < lines.length; ++i){
            if(lines[i].parStart != null){
                lines[i].startX = lines[i].parStart.x;
                lines[i].startY = lines[i].parStart.y;
            }
            if(lines[i].parEnd != null){
                lines[i].endX = lines[i].parEnd.x;
                lines[i].endY = lines[i].parEnd.y;
            }
        }

        drawShapes(ctx);
        ctx.beginPath();
        ctx.arc(currNode.x,currNode.y,currNode.radius,currNode.startAng,currNode.endAng);
        if(delMode){
            ctx.fillStyle = "black";
        }
        else{
            ctx.fillStyle = "red";
        }
        ctx.fill();
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

        if(delMode){
            ctx.beginPath();
            ctx.arc((currLine.startX + currLine.endX) / 2,(currLine.startY + currLine.endY) / 2,5,0,2 * Math.PI);
            ctx.fillStyle = "black";
            ctx.fill();
        }

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
        mouseX = event.clientX - panel.getBoundingClientRect().left;
        mouseY = event.clientY - panel.getBoundingClientRect().top;

        for(i = 0; i < nodes.length; ++i){
            if((mouseX >= (nodes[i].x - nodes[i].radius) && mouseX <= (nodes[i].x + nodes[i].radius)) && (mouseY >= (nodes[i].y - nodes[i].radius) && mouseY <= (nodes[i].y + nodes[i].radius))){
                if(currLine.movePoint == "start"){
                    currLine.parStart = nodes[i];
                    currLine.startX = nodes[i].x;
                    currLine.startY = nodes[i].y;
                }
                else{
                    currLine.parEnd = nodes[i];
                    currLine.endX = nodes[i].x;
                    currLine.endY = nodes[i].y;
                }
            }
        }

        lines.push(currLine);
        currLine = null;
        drawShapes(ctx);
    }
});

panel.addEventListener("click",(event)=>{
    mouseX = event.clientX - panel.getBoundingClientRect().left;
    mouseY = event.clientY - panel.getBoundingClientRect().top;

    if(delMode){
        for(i = 0; i < nodes.length; ++i){
            if((mouseX >= (nodes[i].x - nodes[i].radius) && mouseX <= (nodes[i].x + nodes[i].radius)) && (mouseY >= (nodes[i].y - nodes[i].radius) && mouseY <= (nodes[i].y + nodes[i].radius))){
                for(j = 0; j < lines.length; ++j){
                    if(lines[j].parStart.id == nodes[i].id){
                        lines[j].parStart = null;
                    }
                    if(lines[j].parEnd.id == nodes[i].id){
                        lines[j].parEnd = null;
                    }
                }
                nodes.splice(i,1);
                currNode = null;
                drawShapes(ctx);
            }
        }

        for(i = 0; i < lines.length; ++i){
            if((mouseX >= (((lines[i].startX + lines[i].endX) / 2) - 5) && mouseX <= (((lines[i].startX + lines[i].endX) / 2) + 5)) && (mouseY >= (((lines[i].startY + lines[i].endY) / 2) - 5) && mouseY <= (((lines[i].startY + lines[i].endY) / 2) + 5))){
                console.log("Deleting line: " + lines[i]);
                lines.splice(i,1);
                drawShapes(ctx);
            }
        }
    }
});

add_node_btn.addEventListener("click",(event)=>{
    nodes.push(new Circle(panel.clientWidth / 2, panel.clientHeight / 2, 30, id++));
    drawShapes(ctx);
    console.log(nodes);
});

add_edge_btn.addEventListener("click",(event)=>{
    lines.push(new Line((panel.clientWidth / 2) - 100,panel.clientHeight / 2,(panel.clientWidth / 2) + 100,panel.clientHeight / 2));
    drawShapes(ctx);
    console.log(lines);
});

del_mode_btn.addEventListener("click",(event)=>{
    if(delMode){
        delMode = !delMode;
        drawShapes(ctx);
        console.log("Exiting delete mode");
    }
    else{
        delMode = !delMode;
        drawShapes(ctx);
        console.log("Entering delete mode");
    }
});

prev_step_btn.addEventListener("click",(event)=>{
    console.log("prev step");
});

next_step_btn.addEventListener("click",(event)=>{
    console.log("next step");
});

reset_btn.addEventListener("click",(event)=>{
    nodes = [];
    lines = [];
    drawShapes(ctx);
    console.log("resetting");
});