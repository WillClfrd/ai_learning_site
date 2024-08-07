const id3Socket = new WebSocket('ws://localhost:11111');

class Circle {
    constructor(x, y, radius, id) {
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

class Line {
    constructor(id, startX, startY, endX, endY) {
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
        this.weight = Math.sqrt(Math.pow(this.endX - this.startX, 2) + Math.pow(this.endY - this.startY, 2));
        // console.log(this.weight);
    }
}


id3Socket.addEventListener("open", (event) => {
    console.log("ID3 SOCKET HAHA CONNECTED");
})

id3Socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.type == "id3")
    console.log(msg)
})

id3Socket.addEventListener('error', function (event) {
    console.error('WebSocket error observed:', event);
});

id3Socket.addEventListener('close', function (event) {
    console.log('WebSocket connection closed:', event.code, event.reason);
});

// var nodes = [];
// var lines = [];
// var id = 0;
// var lineID = 0;
// var panel = document.getElementById("drawing_panel");
// var panelParent = document.getElementById("drawing_panel_parent");

// var details = document.getElementById("ucs_details");
// details.innerHTML = `
// <style>
//     h1{font-size: 20px; font-weight: oblique;}
// </style>
// <h1>LETS START THE UCS ALGORITHM</h1>
// <span style="color: yellow; font-style: italic">Uniform Cost Search (UCS) algorithm - a pathfinding method that explores nodes in order of their cumulative cost from the start node, guaranteeing the shortest path in weighted graphs.</span>
// `;

// let parentPadding = 5;
// panel.width = panelParent.clientWidth - (parentPadding * 2);
// panel.height = panelParent.clientHeight - (parentPadding * 2);
// var ctx = panel.getContext("2d");
// var currNode = null;
// var currLine = null;
// var delMode = false;
// var startNode = null;
// var endNode = null;
// var selStart = false;
// var selEnd = false;
// var searchingmode = false;
// var numStep = 0;
// var instructions = ``;
// var totalStep;


// function endNodechecking() {
//     return (!endNode) ? '-1' : String(endNode.id);
// }
// function printInstruction(res, mode) {
//     const step = res.steps[numStep];
//     let content = '';

//     if (mode == 0) {
//         const x = step.path;
//         if (Array.isArray(x.nodes)) {
//             if (endNode != null) {
//                 for (let i = 0; i < x.nodes.length; ++i) {
//                     content += `[${x.nodes[i]}], `;
//                 }
//                 content = content.trimEnd().slice(0, -1) + '\n';
//             }
//             else {
//                 content += `[${x.nodes[0]},${x.nodes[1]}] `;
//             }
//         }
//         else {
//             content = "isnt arr";
//         }
//     }
//     else if (mode == 1) {
//         const x = step.path;
//         if (x && x.cost != undefined) {
//             content += Math.ceil(x.cost * 100) / 100 + '\n';
//         }
//         else {
//             content = "cost doesnt exist";
//         }
//     }
//     else if (mode == 2) {
//         for (var key in step.frontier) {
//             const y = step.frontier[key];
//             content += `<li>`
//             if (endNode != null) {
//                 for (let i = 0; i < y.nodes.length; ++i) {
//                     content += `[${y.nodes[i]}], `;
//                 }
//             } else {
//                 content += `[${y.nodes[0]},${y.nodes[1]}], `;
//             }
//             content = content.trimEnd().slice(0, -1) + ' - ';

//             content += `Cost: ${Math.ceil(y.cost * 100) / 100}</li>`;
//         }
//     }
//     else if (mode == 3) {
//         let arr = [];
//         if (endNode != null) {
//             const x = step.path;
//             for (let i = 0; i < x.nodes.length; ++i) {
//                 for (let j = 0; j < 2; ++j) {
//                     if (!arr.includes(x.nodes[i][j])) {
//                         arr.push(x.nodes[i][j]);
//                     }
//                 }
//             }
//         }
//         else {
//             const y = step.total_path;
//             for (let i = 0; i < y.nodes.length; ++i) {
//                 for (let j = 0; j < 2; ++j) {
//                     if (!arr.includes(y.nodes[i][j])) {
//                         arr.push(y.nodes[i][j]);
//                     }
//                 }
//             }
//         }
//         var lastNode = arr[arr.length - 1];

//         content = `
//             <li><p2>Remove the node ${lastNode} from the priority queue and add it to the visited set</p2></li>
//             Visited set: {${arr}}
//         `;
//     }
//     else if (mode == 4) {
//         const x = step.total_path;
//         if (Array.isArray(x.nodes)) {
//             for (let i = 0; i < x.nodes.length; ++i) {
//                 content += `[${x.nodes[i]}], `;
//             }
//             content = content.trimEnd().slice(0, -1) + '\n';
//         }
//         else {
//             content = "isnt arr";
//         }
//     }
//     return content.trim();
// }

// function sendMessage() {
//     nod = { "0": { "x": 0, "y": 0 }, "1": { "x": 20, "y": 0 }, "2": { "x": 20, "y": 20 }, "3": { "x": 30, "y": 0 }, "4": { "x": 30, "y": 5 }, "5": { "x": 30, "y": 20 }, "6": { "x": 30, "y": 30 } }
//     edg = { "0": { "weight": 20, "par1": "0", "par2": "1" }, "1": { "weight": 20, "par1": "1", "par2": "2" }, "2": { "weight": 28.28, "par1": "2", "par2": "0" }, "3": { "weight": 10, "par1": "1", "par2": "3" }, "4": { "weight": 5, "par1": "3", "par2": "4" }, "5": { "weight": 18.03, "par1": "4", "par2": "2" }, "6": { "weight": 10, "par1": "5", "par2": "2" }, "7": { "weight": 10, "par1": "5", "par2": "6" } };

//     for (let i = 0; i < nodes.length; ++i) {
//         nod[nodes[i].id] = { "x": nodes[i].x, "y": nodes[i].y };
//     }

//     for (let i = 0; i < lines.length; ++i) {
//         if (lines[i].parStart) {
//             var id1 = String(lines[i].parStart.id);
//         }

//         if (lines[i].parEnd) {
//             var id2 = String(lines[i].parEnd.id);
//         }
//         edg[lines[i].id] = { "weight": lines[i].weight, "par1": id1, "par2": id2 };
//     }

//     const req = {
//         method: "ucs",
//         nodes: nod,
//         edges: edg,
//         start: String(startNode.id),
//         end: endNodechecking(),
//     };

//     console.log(req);
//     id3Socket.send(JSON.stringify(req));
// }

// function colorFrontier(res, ctx) {
//     console.log("coloring Frontier processing");

//     if (res == undefined) {
//         console.error("the parameter res is undefined");
//         return;
//     }

//     const step = res.steps[numStep];
//     if (!step || !step.frontier || !step.path) {
//         console.error("step or step.frontier or step.path is not defined");
//         return;
//     }

//     // //Coloring the path line
//     const y = step.path;
//     //And the total_path for thr case without a goal node
//     const z = step.total_path;

//     if (numStep != 0) {
//         ctx.clearRect(0, 0, panel.width, panel.height);
//     }
//     //Set the case of endNode
//     if (endNode != null) {
//         for (let i = 0; i < y.nodes.length; ++i) {
//             //Coloring the line
//             if (y.nodes[i][0] != y.nodes[i][1]) {
//                 let node1 = y.nodes[i][0];
//                 let node2 = y.nodes[i][1];

//                 for (let j = 0; j < lines.length; ++j) {
//                     let isPath = (lines[j].parStart.id == node1 || lines[j].parStart.id == node2) && (lines[j].parEnd.id == node1 || lines[j].parEnd.id == node2);
//                     if (isPath) {
//                         ctx.beginPath();
//                         if (numStep == res.steps.length - 1) {
//                             ctx.strokeStyle = "red";
//                             ctx.lineWidth = 5;
//                         } else {
//                             ctx.strokeStyle = "purple";
//                             ctx.lineWidth = 3;
//                         }
//                     }
//                     else {
//                         ctx.beginPath();
//                         ctx.strokeStyle = "black";
//                         ctx.lineWidth = 1;
//                     }
//                         ctx.moveTo(lines[j].startX, lines[j].startY);
//                         ctx.lineTo(lines[j].endX, lines[j].endY);
//                         ctx.stroke();

//                          //Calculate the midpoint
//                         let midX = (lines[j].startX + lines[j].endX) / 2;
//                         let midY = (lines[j].startY + lines[j].endY) / 2;

//                         //Calculate the angle of the line
//                         let angle = Math.atan2(lines[j].endY - lines[j].startY, lines[j].endX - lines[j].startX);
//                         if (angle > Math.PI /2 || angle < -Math.PI / 2 ){
//                             angle += Math.PI;
//                         }
                        
//                         //Make the rotation for the info
//                         ctx.save();
//                         ctx.translate(midX, midY);
//                         ctx.rotate(angle);

//                         ctx.font = "bold 15px sans-serif";
//                         ctx.fillStyle = "orange";
//                         ctx.fillText(Math.ceil(lines[j].weight * 100) / 100, 0, -5);
//                         ctx.closePath;
                        
//                         //Restore the context state
//                         ctx.restore();
//                 }
//             }
//         }
//         reverseColor(ctx);
//         //Coloring the frontier node
//         console.log(`Frontier of step: `, step.frontier);
//         for (const key in step.frontier) {
//             const x = step.frontier[key];
//             if (!x || !Array.isArray(x.nodes)) {
//                 console.error("Invalid frontier data");
//                 continue;
//             }

//             for (let i = 0; i < x.nodes.length; ++i) {
//                 for (let j = 0; j < 2; ++j) {
//                     const a = parseInt(x.nodes[i][j], 10);
//                     if (isNaN(a) || !nodes[a]) {
//                         console.error(`Invalid node index: ${x.nodes[i][j]} at x.nodes[${i}][${j}]`);
//                         continue;
//                     }
//                     if (a == startNode.id || a == endNode.id) {
//                         console.log(`Same with the targeted node: ${a}`);
//                         continue;
//                     }

//                     ctx.beginPath();
//                     ctx.arc(nodes[a].x, nodes[a].y, nodes[a].radius, nodes[a].startAng, nodes[a].endAng);
//                     ctx.fillStyle = "pink";
//                     ctx.fill();

//                     ctx.font = "bold 24px sans-serif";
//                     ctx.textAlign = "center";
//                     ctx.fillStyle = "white";
//                     ctx.fillText(nodes[a].id, nodes[a].x, nodes[a].y);
//                 }
//             }
//         }

//         //Coloring the path node
//         for (let i = 0; i < y.nodes.length; ++i) {
//             for (let j = 0; j < 2; ++j) {
//                 console.log(`In the progress of coloring the path node`);
//                 const b = parseInt(y.nodes[i][j], 10);
//                 if (isNaN(b) || !nodes[b]) {
//                     console.error(`Invalid node index: ${y.nodes[i][j]} at y.nodes[${i}][${j}]`);
//                     continue;
//                 }
//                 if (b == startNode.id || b == endNode.id) {
//                     console.log(`Coloring the path, Same with the targeted node: ${b}`);
//                     continue;
//                 }

//                 ctx.beginPath();
//                 ctx.arc(nodes[b].x, nodes[b].y, nodes[b].radius, nodes[b].startAng, nodes[b].endAng);
//                 ctx.fillStyle = "purple";
//                 ctx.fill();

//                 ctx.font = "bold 24px sans-serif";
//                 ctx.textAlign = "center";
//                 ctx.fillStyle = "white";
//                 ctx.fillText(nodes[b].id, nodes[b].x, nodes[b].y);
//             }
//         }
//     }
//     //Set the case without endNode
//     else {
//         //Color the lines
//         for (let i = 0; i < z.nodes.length; i++) {
//             if (z.nodes[i][0] != z.nodes[i][1]) {
//                 let node1 = z.nodes[i][0];
//                 let node2 = z.nodes[i][1];

//                 for (let j = 0; j < lines.length; ++j) {
//                     let isPath = (lines[j].parStart.id == node1 || lines[j].parStart.id == node2) && (lines[j].parEnd.id == node1 || lines[j].parEnd.id == node2);
//                     if (isPath) {
//                         ctx.beginPath();
//                         if (numStep == res.steps.length - 1) {
//                             ctx.strokeStyle = "red";
//                             ctx.lineWidth = 5;
//                         } else {
//                             ctx.strokeStyle = "purple";
//                             ctx.lineWidth = 3;
//                         }
//                     }
//                     else {
//                         ctx.beginPath();
//                         ctx.strokeStyle = "black";
//                         ctx.lineWidth = 1;
//                     }
//                         ctx.moveTo(lines[j].startX, lines[j].startY);
//                         ctx.lineTo(lines[j].endX, lines[j].endY);
//                         ctx.stroke();
                    
//                          //Calculate the midpoint
//                         let midX = (lines[j].startX + lines[j].endX) / 2;
//                         let midY = (lines[j].startY + lines[j].endY) / 2;

//                         //Calculate the angle of the line
//                         let angle = Math.atan2(lines[j].endY - lines[j].startY, lines[j].endX - lines[j].startX);
//                         if (angle > Math.PI /2 || angle < -Math.PI / 2 ){
//                             angle += Math.PI;
//                         }
                        
//                         //Make the rotation for the info
//                         ctx.save();
//                         ctx.translate(midX, midY);
//                         ctx.rotate(angle);

//                         ctx.font = "bold 15px sans-serif";
//                         ctx.fillStyle = "orange";
//                         ctx.fillText(Math.ceil(lines[j].weight * 100) / 100, 0, -5);
//                         ctx.closePath;
                        
//                         //Restore the context state
//                         ctx.restore();
//                 }
//             }
//         }
//         reverseColor(ctx);
//         //Coloring the frontier node
//         for (const key in step.frontier) {
//             const x = step.frontier[key];

//             if (!x || !Array.isArray(x.nodes)) {
//                 console.error("Invalid frontier data");
//                 continue;
//             }
//             for (let j = 0; j < 2; ++j) {
//                 const a = parseInt(x.nodes[j], 10);
//                 if (isNaN(a) || !nodes[a]) {
//                     console.error(`Invalid node index: ${x.nodes[j]} at x.nodes[${j}]`);
//                     continue;
//                 }
//                 if (a == startNode.id) {
//                     console.log(`Same with the targeted node: ${a}`);
//                     continue;
//                 }

//                 ctx.beginPath();
//                 ctx.arc(nodes[a].x, nodes[a].y, nodes[a].radius, nodes[a].startAng, nodes[a].endAng);
//                 ctx.fillStyle = "pink";
//                 ctx.fill();

//                 ctx.font = "bold 24px sans-serif";
//                 ctx.textAlign = "center";
//                 ctx.fillStyle = "white";
//                 ctx.fillText(nodes[a].id, nodes[a].x, nodes[a].y);
//             }
//         }

//         //Coloring the path node
//         for (let i = 0; i < z.nodes.length; ++i) {
//             for (let j = 0; j < 2; ++j) {
//                 console.log(`In the progress of coloring the path node`);
//                 const b = parseInt(z.nodes[i][j], 10);
//                 if (isNaN(b) || !nodes[b]) {
//                     console.error(`Invalid node index: ${y.nodes[i][j]} at y.nodes[${i}][${j}]`);
//                     continue;
//                 }
//                 if (b == startNode.id) {
//                     continue;
//                 }

//                 ctx.beginPath();
//                 if (i == numStep && j == 1) {
//                     ctx.fillStyle = "orange";
//                 }
//                 else {
//                     ctx.fillStyle = "purple";
//                 }
//                 ctx.arc(nodes[b].x, nodes[b].y, nodes[b].radius, nodes[b].startAng, nodes[b].endAng);
//                 ctx.fill();

//                 ctx.font = "bold 24px sans-serif";
//                 ctx.textAlign = "center";
//                 ctx.fillStyle = "white";
//                 ctx.fillText(nodes[b].id, nodes[b].x, nodes[b].y);
//             }
//         }

//     }
// }

// function reverseColor(ctx) {
//     for (i = 0; i < nodes.length; ++i) {
//         ctx.beginPath();
//         ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, nodes[i].startAng, nodes[i].endAng);
//         if (nodes[i] == startNode) {
//             ctx.fillStyle = "green";
//         }
//         else if (nodes[i] == endNode) {
//             ctx.fillStyle = "red";
//         }
//         else {
//             ctx.fillStyle = "blue";
//         }
//         ctx.fill();
//         ctx.strokeStyle = "black";
//         ctx.font = "bold 24px sans-serif";
//         ctx.textAlign = "center";
//         ctx.fillStyle = "black";
//         ctx.fillText(nodes[i].id, nodes[i].x, nodes[i].y);
//     }
// }

// function drawShapes(ctx) {
//     ctx.clearRect(0, 0, panel.width, panel.height);

//     for (i = 0; i < lines.length; ++i) {
//         if (delMode) {
//             ctx.beginPath();
//             ctx.arc((lines[i].startX + lines[i].endX) / 2, (lines[i].startY + lines[i].endY) / 2, 5, 0, 2 * Math.PI);
//             ctx.fillStyle = "black";
//             ctx.fill();
//         }

//         if (lines[i].connStart == false) {
//             ctx.beginPath();
//             ctx.arc(lines[i].startX, lines[i].startY, 5, 0, 2 * Math.PI);
//             ctx.fillStyle = "blue";
//             ctx.fill();
//         }
//         if (lines[i].connEnd == false) {
//             ctx.beginPath();
//             ctx.arc(lines[i].endX, lines[i].endY, 5, 0, 2 * Math.PI);
//             ctx.fillStyle = "blue";
//             ctx.fill();
//         }

//         ctx.moveTo(lines[i].startX, lines[i].startY);
//         ctx.lineTo(lines[i].endX, lines[i].endY);
//         ctx.stroke();

//         //Calculate the midpoint
//         let midX = (lines[i].startX + lines[i].endX) / 2;
//         let midY = (lines[i].startY + lines[i].endY) / 2;

//         //Calculate the angle of the line
//         let angle = Math.atan2(lines[i].endY - lines[i].startY, lines[i].endX - lines[i].startX);
//         if (angle > Math.PI /2 || angle < -Math.PI / 2 ){
//             angle += Math.PI;
//         }
        
//         //Make the rotation for the info
//         ctx.save();
//         ctx.translate(midX, midY);
//         ctx.rotate(angle);

//         ctx.font = "bold 15px sans-serif";
//         ctx.fillStyle = "orange";
//         ctx.fillText(Math.ceil(lines[i].weight * 100) / 100, 0, -5);
//         ctx.closePath;

//         //Restore the context state
//         ctx.restore();
//     }

//     for (i = 0; i < nodes.length; ++i) {
//         ctx.beginPath();
//         ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, nodes[i].startAng, nodes[i].endAng);
//         if (delMode) {
//             ctx.fillStyle = "black";
//         } //update startNode and endNode to be null on
//         else if (nodes[i].start == true) {
//             ctx.fillStyle = "green";
//         }
//         else if (nodes[i].end == true) {
//             ctx.fillStyle = "red";
//         }
//         else if (selStart || selEnd) {
//             ctx.fillStyle = "grey";
//         }
//         else {
//             ctx.fillStyle = "blue";
//         }

//         if (selStart == false) {
//             if (nodes[i].start == true)
//                 ctx.fillStyle = "green";
//         }
//         if (selEnd == false) {
//             if (nodes[i].end == true)
//                 ctx.fillStyle = "red";
//         }
//         ctx.fill();

//         ctx.strokeStyle = "black";
//         ctx.font = "bold 24px sans-serif";
//         ctx.textAlign = "center";
//         ctx.fillStyle = "black";
//         ctx.fillText(nodes[i].id, nodes[i].x, nodes[i].y);
//     }
// }

// function genInt(upper) {
//     return Math.floor(Math.random() * upper);
// }

// function genGraph() {
//     let nodesNum = Math.floor(Math.random() * 20) + 11;

//     console.log(panel.width);
//     console.log(panel.height);
//     for (i = 0; i < nodesNum; ++i) {
//         randX = Math.floor(genInt(panel.width - 60)) + 30;
//         randY = Math.floor(genInt(panel.height - 60)) + 30;

//         while (checkBoundary(randX, randY)) {
//             randX = Math.floor(genInt(panel.width - 60)) + 30;
//             randY = Math.floor(genInt(panel.height - 60)) + 30;
//         }

//         nodes.push(new Circle(randX, randY, 30, id++));
//         // console.log("x: " + nodes[i].x + " | y: " + nodes[i].y + " | i: " + i + " | id:" + nodes[i].id );
//     }

//     console.log(nodes);
//     console.log(lines);

//     for (i = 0; i < nodes.length; ++i) {
//         let numEdges = genInt(3) + 1;

//         for (j = 0; j < numEdges; ++j) {
//             let randNode = nodes[genInt(nodes.length)];

//             if (checkEdgeseachCir(nodes[i].x, nodes[i].y) >= 4) {
//                 break;
//             }

//             while (randNode == nodes[i] || checkEdgeseachCir(randNode.x, randNode.y) >= 4) {
//                 randNode = nodes[genInt(nodes.length)];
//             }
//             let tempLine = new Line(lineID++, nodes[i].x, nodes[i].y, randNode.x, randNode.y);
//             tempLine.parStart = nodes[i];
//             tempLine.parEnd = randNode;
//             lines.push(tempLine);
//             tempLine = null;
//         }
//     }
//     drawShapes(ctx);
// }

// function checkEdgeseachCir(x, y) {
//     let count = 0;
//     for (z = 0; z < lines.length; ++z) {
//         if ((x == lines[z].startX && y == lines[z].startY) || (x == lines[z].endX && y == lines[z].endY))
//             ++count;
//     }
//     return count;
// }

// function checkBoundary(x, y) {
//     for (i = 0; i < nodes.length; ++i) {
//         if (((x >= (nodes[i].x - 60)) && (x <= (nodes[i].x + 60))) && ((y >= (nodes[i].y - 60)) && (y <= (nodes[i].y + 60)))) {
//             return true;
//         }
//     }
//     return false;
// }

// add_node_btn = document.getElementById("add_node_btn");
// add_edge_btn = document.getElementById("add_edge_btn");
// del_mode_btn = document.getElementById("del_mode_btn");
// sel_start_btn = document.getElementById("sel_start_btn");
// sel_end_btn = document.getElementById("sel_end_btn");
// gen_graph_btn = document.getElementById("gen_graph_btn");
// prev_step_btn = document.getElementById("prev_step_btn");
// next_step_btn = document.getElementById("next_step_btn");
// reset_btn = document.getElementById("reset_btn");
// search_btn = document.getElementById("search_btn");

// window.addEventListener("resize", (event) => {
//     panel.width = panelParent.clientWidth - (parentPadding * 2);
//     panel.height = panelParent.clientHeight - (parentPadding * 2);

//     drawShapes(ctx);
// });

// panel.addEventListener("mousedown", (event) => {
//     mouseX = event.clientX - panel.getBoundingClientRect().left;
//     mouseY = event.clientY - panel.getBoundingClientRect().top;

//     for (i = 0; i < nodes.length; ++i) {
//         if ((mouseX >= (nodes[i].x - nodes[i].radius) && mouseX <= (nodes[i].x + nodes[i].radius)) && (mouseY >= (nodes[i].y - nodes[i].radius) && mouseY <= (nodes[i].y + nodes[i].radius))) {
//             currNode = nodes[i];
//             console.log("node.id: " + nodes[i].id + " with index " + i);
//             //nodes.splice(i,1);
//             console.log("node.id: " + nodes[i].id + " with index " + i);
//         }
//     }

//     if (currNode == null) {
//         for (i = 0; i < lines.length; ++i) {
//             if ((mouseX >= (lines[i].startX - 5) && mouseX <= (lines[i].startX + 5)) && (mouseY >= (lines[i].startY - 5) && mouseY <= (lines[i].startY + 5))) {
//                 currLine = lines[i];
//                 currLine.movePoint = "start";
//                 //console.log("Set current line for start point");
//                 lines.splice(i, 1);
//             }
//             else if ((mouseX >= (lines[i].endX - 5) && mouseX <= (lines[i].endX + 5)) && (mouseY >= (lines[i].endY - 5) && mouseY <= (lines[i].endY + 5))) {
//                 currLine = lines[i];
//                 currLine.movePoint = "end";
//                 //console.log("Set current line for end point");
//                 lines.splice(i, 1);
//             }
//         }
//     }
// });

// panel.addEventListener("mousemove", (event) => {
//     if (currNode != null) {
//         mouseX = event.clientX - panel.getBoundingClientRect().left;
//         mouseY = event.clientY - panel.getBoundingClientRect().top;

//         currNode.x = mouseX;
//         currNode.y = mouseY;

//         for (i = 0; i < lines.length; ++i) {
//             if (lines[i].parStart != null) {
//                 lines[i].startX = lines[i].parStart.x;
//                 lines[i].startY = lines[i].parStart.y;
//                 lines[i].weight = Math.sqrt(Math.pow(lines[i].endX - lines[i].startX, 2) + Math.pow(lines[i].endY - lines[i].startY, 2));
//             }
//             if (lines[i].parEnd != null) {
//                 lines[i].endX = lines[i].parEnd.x;
//                 lines[i].endY = lines[i].parEnd.y;
//                 lines[i].weight = Math.sqrt(Math.pow(lines[i].endX - lines[i].startX, 2) + Math.pow(lines[i].endY - lines[i].startY, 2));
//             }
//         }

//         drawShapes(ctx);
//         ctx.beginPath();
//         ctx.arc(currNode.x, currNode.y, currNode.radius, currNode.startAng, currNode.endAng);
//         if (delMode) {
//             ctx.fillStyle = "black";
//         }
//         else if (currNode.start) {
//             if (selStart)
//                 ctx.fillStyle = "green";
//         }
//         else if (currNode.end) {
//             if (selEnd)
//                 ctx.fillStyle = "red";
//         }
//         else {
//             ctx.fillStyle = "blue";
//         }
//         ctx.fill();
//     }
//     else if (currLine != null) {
//         mouseX = event.clientX - panel.getBoundingClientRect().left;
//         mouseY = event.clientY - panel.getBoundingClientRect().top;

//         if (currLine.movePoint == "start") {
//             currLine.startX = mouseX;
//             currLine.startY = mouseY;
//             currLine.weight = Math.sqrt(Math.pow(currLine.endX - currLine.startX, 2) + Math.pow(currLine.endY - currLine.startY, 2));
//         }
//         else if (currLine.movePoint == "end") {
//             currLine.endX = mouseX;
//             currLine.endY = mouseY;
//             currLine.weight = Math.sqrt(Math.pow(currLine.endX - currLine.startX, 2) + Math.pow(currLine.endY - currLine.startY, 2));
//         }

//         drawShapes(ctx);
//         ctx.moveTo(currLine.startX, currLine.startY);
//         ctx.lineTo(currLine.endX, currLine.endY);
//         ctx.stroke();

//         if (delMode) {
//             ctx.beginPath();
//             ctx.arc((currLine.startX + currLine.endX) / 2, (currLine.startY + currLine.endY) / 2, 5, 0, 2 * Math.PI);
//             ctx.fillStyle = "black";
//             ctx.fill();
//         }

//         if (currLine.connStart == false) {
//             ctx.beginPath();
//             ctx.arc(currLine.startX, currLine.startY, 5, 0, 2 * Math.PI);
//             ctx.fillStyle = "blue";
//             ctx.fill();
//         }
//         if (currLine.connEnd == false) {
//             ctx.beginPath();
//             ctx.arc(currLine.endX, currLine.endY, 5, 0, 2 * Math.PI);
//             ctx.fillStyle = "blue";
//             ctx.fill();
//         }
//     }
// });

// panel.addEventListener("mouseup", (event) => {
//     if (currNode != null) {
//         //nodes.push(currNode);
//         currNode = null;
//         drawShapes(ctx);
//     }
//     else if (currLine != null) {
//         mouseX = event.clientX - panel.getBoundingClientRect().left;
//         mouseY = event.clientY - panel.getBoundingClientRect().top;

//         for (i = 0; i < nodes.length; ++i) {
//             if ((mouseX >= (nodes[i].x - nodes[i].radius) && mouseX <= (nodes[i].x + nodes[i].radius)) && (mouseY >= (nodes[i].y - nodes[i].radius) && mouseY <= (nodes[i].y + nodes[i].radius))) {
//                 if (currLine.movePoint == "start") {
//                     currLine.parStart = nodes[i];
//                     currLine.startX = nodes[i].x;
//                     currLine.startY = nodes[i].y;
//                     currLine.weight = Math.sqrt(Math.pow(currLine.endX - currLine.startX, 2) + Math.pow(currLine.endY - currLine.startY, 2));
//                 }
//                 else {
//                     currLine.parEnd = nodes[i];
//                     currLine.endX = nodes[i].x;
//                     currLine.endY = nodes[i].y;
//                     currLine.weight = Math.sqrt(Math.pow(currLine.endX - currLine.startX, 2) + Math.pow(currLine.endY - currLine.startY, 2));
//                 }
//             }
//         }

//         lines.push(currLine);
//         currLine = null;
//         drawShapes(ctx);
//     }
// });

// panel.addEventListener("click", (event) => {
//     mouseX = event.clientX - panel.getBoundingClientRect().left;
//     mouseY = event.clientY - panel.getBoundingClientRect().top;

//     for (let i = 0; i < nodes.length; ++i) {
//         if ((mouseX >= (nodes[i].x - nodes[i].radius) && mouseX <= (nodes[i].x + nodes[i].radius)) && (mouseY >= (nodes[i].y - nodes[i].radius) && mouseY <= (nodes[i].y + nodes[i].radius))) {
//             console.log("x: " + mouseX + " | y: " + mouseY + " | i: " + i + " | id:" + nodes[i].id);
//             break;
//         }
//     }

//     if (delMode) {
//         for (i = 0; i < nodes.length; ++i) {
//             if ((mouseX >= (nodes[i].x - nodes[i].radius) && mouseX <= (nodes[i].x + nodes[i].radius)) && (mouseY >= (nodes[i].y - nodes[i].radius) && mouseY <= (nodes[i].y + nodes[i].radius))) {
//                 for (j = 0; j < lines.length; ++j) {
//                     if (lines[j].parStart != null && lines[j].parStart.id == nodes[i].id) {
//                         lines[j].parStart = null;
//                         lines[j].startX = lines[j].startX + (((lines[j].endX - lines[j].startX) / Math.abs(lines[j].endX - lines[j].startX)) * (Math.abs(lines[j].endX - lines[j].startX) * 0.2));
//                         lines[j].startY = lines[j].startY + (((lines[j].endY - lines[j].startY) / Math.abs(lines[j].endY - lines[j].startY)) * (Math.abs(lines[j].endY - lines[j].startY) * 0.2));
//                     }
//                     if (lines[j].parEnd != null && lines[j].parEnd.id == nodes[i].id) {
//                         lines[j].parEnd = null;
//                         lines[j].endX = lines[j].endX + (((lines[j].startX - lines[j].endX) / Math.abs(lines[j].startX - lines[j].endX)) * (Math.abs(lines[j].startX - lines[j].endX) * 0.2));
//                         lines[j].endY = lines[j].endY + (((lines[j].startY - lines[j].endY) / Math.abs(lines[j].startY - lines[j].endY)) * (Math.abs(lines[j].startY - lines[j].endY) * 0.2));
//                     }
//                 }
//                 if (nodes[i].start) {
//                     startNode = null;
//                 }
//                 if (nodes[i].end) {
//                     endNode = null;
//                 }
//                 nodes.splice(i, 1);
//                 currNode = null;
//                 drawShapes(ctx);
//             }
//         }

//         for (i = 0; i < lines.length; ++i) {
//             if ((mouseX >= (((lines[i].startX + lines[i].endX) / 2) - 5) && mouseX <= (((lines[i].startX + lines[i].endX) / 2) + 5)) && (mouseY >= (((lines[i].startY + lines[i].endY) / 2) - 5) && mouseY <= (((lines[i].startY + lines[i].endY) / 2) + 5))) {
//                 //console.log("Deleting line: " + lines[i]);
//                 lines.splice(i, 1);
//                 drawShapes(ctx);
//             }
//         }
//     }
//     else if (selStart) {
//         for (i = 0; i < nodes.length; ++i) {
//             if ((mouseX >= (nodes[i].x - nodes[i].radius) && mouseX <= (nodes[i].x + nodes[i].radius)) && (mouseY >= (nodes[i].y - nodes[i].radius) && mouseY <= (nodes[i].y + nodes[i].radius)) && !nodes[i].end) {
//                 if (startNode != null) {
//                     startNode.start = false;
//                 }
//                 startNode = nodes[i];
//                 nodes[i].start = true;
//                 drawShapes(ctx);
//                 break;
//             }
//         }
//     }
//     else if (selEnd) {
//         for (i = 0; i < nodes.length; ++i) {
//             if ((mouseX >= (nodes[i].x - nodes[i].radius) && mouseX <= (nodes[i].x + nodes[i].radius)) && (mouseY >= (nodes[i].y - nodes[i].radius) && mouseY <= (nodes[i].y + nodes[i].radius)) && !nodes[i].start) {
//                 if (endNode != null) {
//                     endNode.end = false;
//                 }
//                 endNode = nodes[i];
//                 nodes[i].end = true;
//                 console.log("end node is " + endNode.id);
//                 drawShapes(ctx);
//             }
//         }
//     }
// });

// add_node_btn.addEventListener("click", (event) => {
//     nodes.push(new Circle(((id * 60) % (panel.width - (panel.width % 60))) + 30, (Math.floor((id * 60) / (panel.width - (panel.width % 60))) * 60) + 30, 30, id++));
//     drawShapes(ctx);
//     console.log(nodes);
// });

// add_edge_btn.addEventListener("click", (event) => {
//     lines.push(new Line(lineID++, ((lineID * 100) % (panel.width - (panel.width % 100))) + 5, (Math.floor((lineID * 100) / (panel.width - (panel.width % 100))) * 100) + 5, ((lineID * 100) % (panel.width - (panel.width % 100))) + 95, (Math.floor((lineID * 100) / (panel.width - (panel.width % 100))) * 100) + 95));
//     drawShapes(ctx);
//     console.log(lines);
// });

// del_mode_btn.addEventListener("click", (event) => {
//     if (!delMode) {
//         delMode = true;
//         selStart = false;
//         selEnd = false;
//         drawShapes(ctx);
//         console.log("Entering delete mode");
//     }
//     else {
//         delMode = false;
//         drawShapes(ctx);
//         console.log("Exiting delete mode");
//     }
// });

// sel_start_btn.addEventListener("click", (event) => {
//     if (!selStart) {
//         selStart = true;
//         selEnd = false;
//         delMode = false;
//         drawShapes(ctx);
//         console.log("Entering Select Start Mode");
//     }
//     else {
//         selStart = false;
//         reverseColor(ctx);
//         console.log("Exiting Select Start Mode");
//     }
// });

// sel_end_btn.addEventListener("click", (event) => {
//     if (!selEnd) {
//         selEnd = true;
//         selStart = false;
//         delMode = false;
//         drawShapes(ctx);
//         console.log("Entering Select End Mode");
//     }
//     else {
//         selEnd = false;
//         reverseColor(ctx);
//         console.log("Exiting Select End Mode");
//     }
// });

// gen_graph_btn.addEventListener("click", (event) => {
//     genGraph();
//     console.log("Generated a random graph successfully");
// });

// prev_step_btn.addEventListener("click", (event) => {
//     if (numStep == 0){
//         alert(`You can't go to the previous step`);
//     }
//     //NEED TO CHECK IF WE'RE IN THE SEARCHING MODE
//     if (searchingmode) {
//         if (!startNode) {
//             console.log("There is no start node to execute the algorithm");
//             alert("You have to pick the start node");
//         }
//         else {
//             numStep--;
//             console.log("prev step");
//             console.log(`Step: `,numStep);
//             sendMessage();
//         }
//     }
//     else {
//         console.log("Cant execute. We're not in the searching mode");
//         alert("Need to be in the searching mode");
//     }
// });

// next_step_btn.addEventListener("click", (event) => {
//     if (numStep == totalStep - 1) {
//         alert(`Invalid step. You can't go to the next step`);
//     }
//     else {
//         numStep++;
//         console.log("next step");
//         console.log(`Step: `, numStep);

//         sendMessage();
//     }
// });

// reset_btn.addEventListener("click", (event) => {
//     nodes = [];
//     lines = [];
//     id = 0;
//     lineID = 0;
//     startNode = null;
//     endNode = null;
//     selStart = false;
//     selEnd = false;
//     numStep = 0;
//     searchingmode = false;
//     drawShapes(ctx);
//     console.log("resetting");
//     details.textContent = `DO THE SEARCHING AGAIN`;
// });

// search_btn.addEventListener("click", (event) => {
//     selEnd = false;
//     selStart = false;
//     sendMessage();
//     searchingmode = true;
// });