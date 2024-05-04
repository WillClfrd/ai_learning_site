const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

while(document.getElementById("reset_btn")==null){
    sleep(100);
    console.log("sleeping");
}

add_node_btn = document.getElementById("add_node_btn");
add_edge_btn = document.getElementById("add_edge_btn");
del_node_btn = document.getElementById("del_node_btn");
del_edge_btn = document.getElementById("del_edge_btn");
prev_step_btn = document.getElementById("prev_step_btn");
next_step_btn = document.getElementById("next_step_btn");
reset_btn = document.getElementById("reset_btn");

add_node_btn.addEventListener("click",(event)=>{
    console.log("add node");
});

add_edge_btn.addEventListener("click",(event)=>{
    console.log("add edge");
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