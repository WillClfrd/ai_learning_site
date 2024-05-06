class Circle{
    constructor(x,y,radius,id){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAng = 0;
        this.endAng = 2 * Math.PI;
        this.id = id;
        this.start = false;
        this.end = false;
    }
}

class Line{
    constructor(id,startX,startY,endX,endY){
        this.id = id;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.connStart = false;
        this.connEnd = false;
        this.movePoint = "none";
        this.parStart = null;
        this.parEnd = null;
        this.weight = Math.sqrt(Math.pow(this.endX - this.startX,2) + Math.pow(this.endY - this.startY,2));
        // console.log(this.weight);
    }
}

var nodes = [];
var lines = [];
var id = 0;
var lineID = 0;
var panel = document.getElementById("drawing_panel");
var panelParent = document.getElementById("drawing_panel_parent")
let parentPadding = 5;
panel.width = panelParent.clientWidth - (parentPadding * 2);
panel.height = panelParent.clientHeight - (parentPadding * 2);
var ctx = panel.getContext("2d");
var currNode = null;
var currLine = null;
var delMode = false;
var startNode = null;
var endNode = null;
var selStart = false;
var selEnd = false;

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
        } //update startNode and endNode to be null on
        else if(nodes[i].start){
            ctx.fillStyle = "green";
        }
        else if(nodes[i].end){
            ctx.fillStyle = "red";
        }
        else{
            ctx.fillStyle = "blue";
        }
        ctx.fill();
    }
}

function genInt(upper){
    return Math.floor(Math.random() * upper);
}

function genGraph(){
    let nodesNum = Math.floor(Math.random() * 20) + 11;

    console.log(panel.width);
    console.log(panel.height);
    for(i = 0; i < nodesNum; ++i){
        randX = Math.floor(genInt(panel.width - 60)) + 30;
        randY = Math.floor(genInt(panel.height - 60)) + 30;
        
        while(checkBoundary(randX,randY)){
            randX = Math.floor(genInt(panel.width - 60)) + 30;
            randY = Math.floor(genInt(panel.height - 60)) + 30;
        }

        nodes.push(new Circle(randX,randY,30,id++));
    }

    for(i = 0; i < nodes.length; ++i){
        let numEdges = genInt(3) + 1;
        
        for(j = 0; j < numEdges; ++j){
            let randNode = nodes[genInt(nodes.length)];
            while(randNode == nodes[i]){
                randNode = nodes[genInt(nodes.length)];
            }
            let tempLine = new Line(lineID++, nodes[i].x, nodes[i].y, randNode.x, randNode.y);
            tempLine.parStart = nodes[i];
            tempLine.parEnd = randNode;
            lines.push(tempLine);
            tempLine = null;
        }
    }

    console.log(nodes);
    drawShapes(ctx);
}

function checkBoundary(x,y){
    for(i = 0; i < nodes.length; ++i){
        if(((x >= (nodes[i].x - 60)) && (x <= (nodes[i].x + 60))) && ((y >= (nodes[i].y - 60)) && (y <= (nodes[i].y + 60)))){
            return true;
        }
    }
    return false;
}

add_node_btn = document.getElementById("add_node_btn");
add_edge_btn = document.getElementById("add_edge_btn");
del_mode_btn = document.getElementById("del_mode_btn");
sel_start_btn = document.getElementById("sel_start_btn");
sel_end_btn = document.getElementById("sel_end_btn");
gen_graph_btn = document.getElementById("gen_graph_btn");
prev_step_btn = document.getElementById("prev_step_btn");
next_step_btn = document.getElementById("next_step_btn");
reset_btn = document.getElementById("reset_btn");

window.addEventListener("resize",(event)=>{
    panel.width = panelParent.clientWidth - (parentPadding * 2);
    panel.height = panelParent.clientHeight - (parentPadding * 2);

    drawShapes(ctx);
});

panel.addEventListener("mousedown",(event)=>{
    mouseX = event.clientX - panel.getBoundingClientRect().left;
    mouseY = event.clientY - panel.getBoundingClientRect().top;

    for(i = 0; i < nodes.length; ++i){
        if((mouseX >= (nodes[i].x - nodes[i].radius) && mouseX <= (nodes[i].x + nodes[i].radius)) && (mouseY >= (nodes[i].y - nodes[i].radius) && mouseY <= (nodes[i].y + nodes[i].radius))){
            currNode = nodes[i];
            //console.log("Set current node");
            nodes.splice(i,1);
            //console.log(currNode);
            //console.log(nodes);
        }
    }

    if(currNode == null){
        for(i = 0; i < lines.length; ++i){
            if((mouseX >= (lines[i].startX - 5) && mouseX <= (lines[i].startX + 5)) && (mouseY >= (lines[i].startY - 5) && mouseY <= (lines[i].startY + 5))){
                currLine = lines[i];
                currLine.movePoint = "start";
                //console.log("Set current line for start point");
                lines.splice(i,1);
                //console.log(currLine);
                //console.log(lines);
            }
            else if((mouseX >= (lines[i].endX - 5) && mouseX <= (lines[i].endX + 5)) && (mouseY >= (lines[i].endY - 5) && mouseY <= (lines[i].endY + 5))){
                currLine = lines[i];
                currLine.movePoint = "end";
                //console.log("Set current line for end point");
                lines.splice(i,1);
                //console.log(currLine);
                //console.log(lines);
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
                lines[i].weight = Math.sqrt(Math.pow(lines[i].endX - lines[i].startX,2) + Math.pow(lines[i].endY - lines[i].startY,2));
                // console.log(lines[i].weight);
            }
            if(lines[i].parEnd != null){
                lines[i].endX = lines[i].parEnd.x;
                lines[i].endY = lines[i].parEnd.y;
                lines[i].weight = Math.sqrt(Math.pow(lines[i].endX - lines[i].startX,2) + Math.pow(lines[i].endY - lines[i].startY,2));
                // console.log(lines[i].weight);
            }
        }

        drawShapes(ctx);
        ctx.beginPath();
        ctx.arc(currNode.x,currNode.y,currNode.radius,currNode.startAng,currNode.endAng);
        if(delMode){
            ctx.fillStyle = "black";
        }
        else if(currNode.start){
            ctx.fillStyle = "green";
        }
        else if(currNode.end){
            ctx.fillStyle = "red";
        }
        else{
            ctx.fillStyle = "blue";
        }
        ctx.fill();
    }
    else if(currLine != null){
        mouseX = event.clientX - panel.getBoundingClientRect().left;
        mouseY = event.clientY - panel.getBoundingClientRect().top;

        if(currLine.movePoint == "start"){
            currLine.startX = mouseX;
            currLine.startY = mouseY;
            currLine.weight = Math.sqrt(Math.pow(currLine.endX - currLine.startX,2) + Math.pow(currLine.endY - currLine.startY,2));
            // console.log(currLine.weight);
        }
        else if(currLine.movePoint == "end"){
            currLine.endX = mouseX;
            currLine.endY = mouseY;
            currLine.weight = Math.sqrt(Math.pow(currLine.endX - currLine.startX,2) + Math.pow(currLine.endY - currLine.startY,2));
            // console.log(currLine.weight);
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
                    currLine.weight = Math.sqrt(Math.pow(currLine.endX - currLine.startX,2) + Math.pow(currLine.endY - currLine.startY,2));
                    // console.log(currLine.weight);
                }
                else{
                    currLine.parEnd = nodes[i];
                    currLine.endX = nodes[i].x;
                    currLine.endY = nodes[i].y;
                    currLine.weight = Math.sqrt(Math.pow(currLine.endX - currLine.startX,2) + Math.pow(currLine.endY - currLine.startY,2));
                    // console.log(currLine.weight);
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

    console.log("x: " + mouseX + " | y: " + mouseY);

    if(delMode){
        for(i = 0; i < nodes.length; ++i){
            if((mouseX >= (nodes[i].x - nodes[i].radius) && mouseX <= (nodes[i].x + nodes[i].radius)) && (mouseY >= (nodes[i].y - nodes[i].radius) && mouseY <= (nodes[i].y + nodes[i].radius))){
                for(j = 0; j < lines.length; ++j){
                    if(lines[j].parStart != null && lines[j].parStart.id == nodes[i].id){
                        lines[j].parStart = null;
                        lines[j].startX = lines[j].startX + (((lines[j].endX - lines[j].startX) / Math.abs(lines[j].endX - lines[j].startX)) * (Math.abs(lines[j].endX - lines[j].startX) * 0.2));
                        lines[j].startY = lines[j].startY + (((lines[j].endY - lines[j].startY) / Math.abs(lines[j].endY - lines[j].startY)) * (Math.abs(lines[j].endY - lines[j].startY) * 0.2));
                    }
                    if(lines[j].parEnd != null && lines[j].parEnd.id == nodes[i].id){
                        lines[j].parEnd = null;
                        lines[j].endX = lines[j].endX + (((lines[j].startX - lines[j].endX) / Math.abs(lines[j].startX - lines[j].endX)) * (Math.abs(lines[j].startX - lines[j].endX) * 0.2));
                        lines[j].endY = lines[j].endY + (((lines[j].startY - lines[j].endY) / Math.abs(lines[j].startY - lines[j].endY)) * (Math.abs(lines[j].startY - lines[j].endY) * 0.2));
                    }
                }
                if(nodes[i].start){
                    startNode = null;
                }
                if(nodes[i].end){
                    endNode = null;
                }
                nodes.splice(i,1);
                currNode = null;
                drawShapes(ctx);
            }
        }

        for(i = 0; i < lines.length; ++i){
            if((mouseX >= (((lines[i].startX + lines[i].endX) / 2) - 5) && mouseX <= (((lines[i].startX + lines[i].endX) / 2) + 5)) && (mouseY >= (((lines[i].startY + lines[i].endY) / 2) - 5) && mouseY <= (((lines[i].startY + lines[i].endY) / 2) + 5))){
                //console.log("Deleting line: " + lines[i]);
                lines.splice(i,1);
                drawShapes(ctx);
            }
        }
    }
    else if(selStart){
        for(i = 0; i < nodes.length; ++i){
            if((mouseX >= (nodes[i].x - nodes[i].radius) && mouseX <= (nodes[i].x + nodes[i].radius)) && (mouseY >= (nodes[i].y - nodes[i].radius) && mouseY <= (nodes[i].y + nodes[i].radius)) && !nodes[i].end){
                if(startNode != null){
                    startNode.start = false;
                }
                startNode = nodes[i];
                nodes[i].start = true;
                drawShapes(ctx);
            }
        }
    }
    else if(selEnd){
        for(i = 0; i < nodes.length; ++i){
            if((mouseX >= (nodes[i].x - nodes[i].radius) && mouseX <= (nodes[i].x + nodes[i].radius)) && (mouseY >= (nodes[i].y - nodes[i].radius) && mouseY <= (nodes[i].y + nodes[i].radius)) && !nodes[i].start){
                if(endNode != null){
                    endNode.end = false;
                }
                endNode = nodes[i];
                nodes[i].end = true;
                drawShapes(ctx);
            }
        }
    }
});

add_node_btn.addEventListener("click",(event)=>{
    nodes.push(new Circle(((id * 60) % (panel.width - (panel.width % 60))) + 30, (Math.floor((id * 60) / (panel.width - (panel.width % 60))) * 60) + 30, 30, id++));
    drawShapes(ctx);
    console.log(nodes);
});

add_edge_btn.addEventListener("click",(event)=>{
    lines.push(new Line(lineID++,((lineID * 100) % (panel.width - (panel.width % 100))) + 5,(Math.floor((lineID * 100) / (panel.width - (panel.width % 100))) * 100) + 5,((lineID * 100) % (panel.width - (panel.width % 100))) + 95,(Math.floor((lineID * 100) / (panel.width - (panel.width % 100))) * 100) + 95));
    drawShapes(ctx);
    console.log(lines);
});

del_mode_btn.addEventListener("click",(event)=>{
    if(!delMode){
        delMode = true;
        selStart = false;
        selEnd = false;
        drawShapes(ctx);
        console.log("Entering delete mode");
    }
    else{
        delMode = false;
        drawShapes(ctx);
        console.log("Exiting delete mode");
    }
});

sel_start_btn.addEventListener("click",(event)=>{
    if(!selStart){
        selStart = true;
        selEnd = false;
        delMode = false;
        drawShapes(ctx);
        console.log("Entering Select Start Mode");
    }
    else{
        selStart = false;
        drawShapes(ctx);
        console.log("Exiting Select Start Mode");
    }
});

sel_end_btn.addEventListener("click",(event)=>{
    if(!selEnd){
        selEnd = true;
        selStart = false;
        delMode = false;
        drawShapes(ctx);
        console.log("Entering Select End Mode");
    }
    else{
        selEnd = false;
        drawShapes(ctx);
        console.log("Exiting Select End Mode");
    }
});

gen_graph_btn.addEventListener("click",(event)=>{
    genGraph();
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
    id = 0;
    lineID = 0;
    drawShapes(ctx);
    console.log("resetting");
});