console.log("wsid")

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