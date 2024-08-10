var pages = ["uni_cost_search","a_star_search", "id3_dec_tree","id3_graph", "minmax_adv_search","stoch_grad_desc","id3_main_page","gen_algo","wsid","chess_test","test"];
var pageScripts = {"uni_cost_search":["uni_cost_search"], "a_star_search":["a_star_search"], "id3_dec_tree":["id3_main_page"], "id3_graph":["id3_main_page"], "id3_main_page":["id3_main_page"], "minmax_adv_search":["minmax_adv_search"], "stoch_grad_desc":["stoch_grad_desc"], "gen_algo":["gen_algo"], "wsid":["wsid"], "chess_test":["chess_test"],"test":["test"]}

function set_page_content(content,pageScript){
    pageContent = document.getElementById("page_content");
    pageContent.innerHTML=content;
    for(num in pageScript){
        const script = document.createElement('script');
        script.src = pageScript[num];
        document.body.appendChild(script);
    }
}

function set_active_link(page){
    if(pages.includes(page)){
        currLink = document.getElementById(page);
        if (currLink){
        currLink.classList.add("active");

        console.log(currLink)
        }
        else{
            console.error(`Element with id${page} not found`)
        }
    }
}

const ws = new WebSocket("ws://localhost:11111");
ws.addEventListener("open", (event) => {
    let req = {
        method: "getpage",
        page: page,
        scripts: pageScripts[page]
    }
    ws.send(JSON.stringify(req));
});

ws.addEventListener("message", (event) => {
    data = JSON.parse(event.data);
    set_page_content(data.content,data.scripts);
})

var params = new URLSearchParams(window.location.search);
set_active_link(params.get(page));

var page = params.get("page");
if(!page){
    page = "home";
}