function set_page_content(content){
    pageContent = getElementById("page_content");
    pageContent.innerHTML=content;
}

function set_active_link(page){
    if(page in pages){
        currLink = document.getElementById(page);
        currLink.classList.add("active");
    }
}

var pages = ["uni_cost_search","a_star_search","minmax_adv_search","stoch_grad_desc","id3_dec_tree","gen_algo"];
var params = new URLSearchParams(window.location.search);
set_active_link(params.get("page"));

var page = params.get("page");
if(!page){
    page = "home";
}

console.log(page);

const ws = new WebSocket("ws://localhost:11111");
ws.addEventListener("open", (event) => {
    let req = {
        method: "getpage",
        page: page
    }
    ws.send(JSON.stringify(req));
});

ws.addEventListener("message", (event) => {
    data = JSON.parse(event.data);
    set_page_content(data.content);
})