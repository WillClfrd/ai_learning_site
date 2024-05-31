var pages = ["uni_cost_search","a_star_search","minmax_adv_search","stoch_grad_desc","id3_dec_tree","gen_algo","wsid"];
var pageScripts = {"uni_cost_search":["uni_cost_search"], "a_star_search":["a_star_search"], "minmax_adv_search":["minmax_adv_search"], "stoch_grad_desc":["stoch_grad_desc"], "id3_dec_tree":["id3_dec_tree"], "gen_algo":["gen_algo"], "wsid":["wsid"]}

function set_page_content(content,pageScript){
    // console.log(content);
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
        currLink.classList.add("active");
    }
}

// function get_active_js(page){
//     if(pages.includes(page)){
//         scripts = document.getElementById("page_script");
//         scripts.type = "text/javascript";
//         scripts.src = "assets/js/" + page + ".js";
//     }
// }

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
    // scripts = document.getElementById("page_script");
    // scripts.src="";
    set_page_content(data.content,data.scripts);
})

var params = new URLSearchParams(window.location.search);
set_active_link(params.get("page"));
// get_active_js(params.get("page"));

var page = params.get("page");
if(!page){
    page = "home";
}