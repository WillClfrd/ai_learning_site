var modules = [];
var moduleComponents = {};
console.log("wsid");

let allElements = document.querySelectorAll('*');
allElements.forEach(element => {
    if(element.id){
        if(element.id.includes("_module_div")){
            modules.push(element.id.slice(0,element.id.indexOf('_')));
        }
    }
});

console.log(modules);

const docSocket = new WebSocket("ws://localhost:11111");
docSocket.addEventListener("open", (event) => {
    console.log("Connection opened");
});

docSocket.addEventListener("message", (event) => {
    res = JSON.parse(event.data);
    console.log(res.error);
});

module_div = document.getElementById("")
add_module_btn = document.getElementById("add_module_btn");
var moduleEls = [];
var moduleTitles = [];

for(let i = 0; i < modules.length; ++i){
    moduleEls[i] = document.getElementById("" + modules[i] + "_module_div");
    moduleTitles[i] = document.getElementById("" + modules[i] + "_module_title");
    console.log(moduleTitles)
    console.log(modules[i]);
    console.log(moduleTitles[i].innerHTML);
    moduleTitles[i].addEventListener("click", (event)=>{
        if(moduleTitles[i].style.color == "orange"){
            let req = {
                method: "remove_doc_div",
                id: moduleEls[i].id
            }

            removed = modules.splice(i,1);
            moduleEls.splice(i,1);
            moduleTitles.splice(i,1);

            docSocket.send(JSON.stringify(req));

            location.reload();
        }
    });
}

add_module_btn.addEventListener("click", (event)=>{
    add_module_form = document.getElementById("module_form");
    
    const form = document.createElement('form');
    form.setAttribute('id', 'add_module_form');

    const name_div = document.createElement('div');
    name_div.classList.add("form-group");

    const name = document.createElement('input');
    name.classList.add("form-control");
    name.setAttribute('type', 'text');
    name.setAttribute('name', 'module_name');
    name.setAttribute('id', 'module_name');
    name.setAttribute('placeholder','Module Name');

    const submit_btn = document.createElement('button');
    submit_btn.setAttribute('type', 'submit');
    submit_btn.classList.add("btn");
    submit_btn.classList.add("btn-primary");
    submit_btn.textContent = 'add';

    name_div.appendChild(name);
    form.append(name_div);
    form.appendChild(document.createElement('br'));
    form.appendChild(submit_btn);

    form.addEventListener('submit',(event)=>{
        event.preventDefault();
        
        const formEl = event.target;
        data = new FormData(formEl);
        console.log(data.get("name"));

        let req = {
            method: "add_doc_module",
            module_name: data.get("module_name")
        }

        console.log(JSON.stringify(req));
        docSocket.send(JSON.stringify(req));

        add_module_form.classList.remove("add-form");
        add_module_form.innerHTML = "";
    });

    add_module_form.appendChild(form);
    add_module_form.classList.add("add-form");
});

function deleteButtonHandler(id){
    let req = {
        method: "remove_doc_div",
        id: id
    }

    for(let i = 0; i < modules.length; ++i){

    }

    docSocket.send(JSON.stringify(req));

    location.reload();
}