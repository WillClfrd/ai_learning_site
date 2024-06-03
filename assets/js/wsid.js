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
var moduleDelButtons = [];
var modulePurposeButtons = [];
var moduleAddMethodButtons = [];

for(let i = 0; i < modules.length; ++i){
    console.log("" + modules[i] + "_module_div");
    moduleEls.push(document.getElementById("" + modules[i] + "_module_div"));

    console.log("" + modules[i] + "_module_title");
    moduleTitles.push(document.getElementById("" + modules[i] + "_module_title"));

    console.log("" + modules[i] + "_del_btn");
    moduleDelButtons.push(document.getElementById("" + modules[i] + "_del_btn"));
    moduleDelButtons[i].addEventListener("click", (event) => {
        let req = {
            method: "remove_doc_div",
            id: moduleEls[i].id
        }

        modules.splice(i,1);
        moduleEls.splice(i,1);
        moduleTitles.splice(i,1);
        moduleDelButtons.splice(i,1);

        docSocket.send(JSON.stringify(req));

        location.reload();
    });

    modulePurposeButtons.push(document.getElementById("" + modules[i] + "_purpose_edit_btn"));
    modulePurposeButtons[i].addEventListener("click", (event) => {
        let module_name;
        for(let i = 0; i < modules.length; ++i){
            if(event.target.id.includes(modules[i])){
                module_name = modules[i];
            }
        }

        const editBlock = document.getElementById("" + module_name + "_purpose_description");
        const currentDesc = document.getElementById("" + module_name + "_purpose_description_text").textContent;
        editBlock.innerHTML = "";

        edit_text_form = document.getElementById("" + module_name + "_purpose_edit_form");
    
        const form = document.createElement('form');
        form.setAttribute('id', 'edit_text_form');

        const name_div = document.createElement('div');
        name_div.classList.add("form-group");

        const name = document.createElement('input');
        name.classList.add("form-control");
        name.setAttribute('type', 'text');
        name.setAttribute('name', 'purpose_description');
        name.setAttribute('id', 'purpose_description');
        name.setAttribute('value',currentDesc);

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
            let newText = data.get("purpose_description");
            if(!newText){
                newText = currentDesc;
            }

            let req = {
                method: "edit_doc_text",
                el_id: "" + module_name + "_purpose_description_text",
                new_text: newText
            }

            console.log(JSON.stringify(req));
            docSocket.send(JSON.stringify(req));

            edit_text_form.classList.remove("add-form");
            edit_text_form.innerHTML = "";

            location.reload();
        });

        edit_text_form.appendChild(form);
        edit_text_form.classList.add("add-form");
    });

    moduleAddMethodButtons.push(document.getElementById("" + modules[i] + "_methods_add_btn"));
    moduleAddMethodButtons[i].addEventListener("click", (event) => {
        let module_name;
        for(let i = 0; i < modules.length; ++i){
            if(event.target.id.includes(modules[i])){
                module_name = modules[i];
            }
        }

        add_method_form = document.getElementById("" + module_name + "_methods_add_form");
    
        const form = document.createElement('form');
        form.setAttribute('id', 'add_method_form');

        const name_div = document.createElement('div');
        name_div.classList.add("form-group");

        const name = document.createElement('input');
        name.classList.add("form-control");
        name.setAttribute('type', 'text');
        name.setAttribute('name', 'method_name');
        name.setAttribute('id', 'method_name');
        name.setAttribute('placeholder','Method Name');

        const func_div = document.createElement('div');
        func_div.classList.add("form-group");

        const func = document.createElement('input');
        func.classList.add("form-control");
        func.setAttribute('type', 'text');
        func.setAttribute('name', 'method_func');
        func.setAttribute('id', 'method_func');
        func.setAttribute('placeholder','Function');

        const returns_div = document.createElement('div');
        returns_div.classList.add("form-group");

        const returns = document.createElement('input');
        returns.classList.add("form-control");
        returns.setAttribute('type', 'text');
        returns.setAttribute('name', 'method_returns');
        returns.setAttribute('id', 'method_returns');
        returns.setAttribute('placeholder','Method Return Values');

        const req_format_div = document.createElement('div');
        req_format_div.classList.add("form-group");

        const req_format = document.createElement('input');
        req_format.classList.add("form-control");
        req_format.setAttribute('type', 'text');
        req_format.setAttribute('name', 'method_req_format');
        req_format.setAttribute('id', 'method_req_format');
        req_format.setAttribute('placeholder','Method Request Format');

        const req_params_div = document.createElement('div');
        req_params_div.classList.add("form-group");

        const req_params = document.createElement('input');
        req_params.classList.add("form-control");
        req_params.setAttribute('type', 'text');
        req_params.setAttribute('name', 'method_req_params');
        req_params.setAttribute('id', 'method_req_params');
        req_params.setAttribute('placeholder','Method Request Parameters');

        const res_format_div = document.createElement('div');
        res_format_div.classList.add("form-group");

        const res_format = document.createElement('input');
        res_format.classList.add("form-control");
        res_format.setAttribute('type', 'text');
        res_format.setAttribute('name', 'method_res_format');
        res_format.setAttribute('id', 'method_res_format');
        res_format.setAttribute('placeholder','Method Response Format');

        const res_params_div = document.createElement('div');
        res_params_div.classList.add("form-group");

        const res_params = document.createElement('input');
        res_params.classList.add("form-control");
        res_params.setAttribute('type', 'text');
        res_params.setAttribute('name', 'method_res_params');
        res_params.setAttribute('id', 'method_res_params');
        res_params.setAttribute('placeholder','Method Response Parameters');

        const submit_btn = document.createElement('button');
        submit_btn.setAttribute('type', 'submit');
        submit_btn.classList.add("btn");
        submit_btn.classList.add("btn-primary");
        submit_btn.textContent = 'add';

        name_div.appendChild(name);
        func_div.appendChild(func);
        returns_div.appendChild(returns);
        req_format_div.appendChild(req_format);
        req_params_div.appendChild(req_params);
        res_format_div.appendChild(res_format);
        res_params_div.appendChild(res_params);

        form.append(name_div);
        form.appendChild(document.createElement('br'));
        form.append(func_div);
        form.appendChild(document.createElement('br'));
        form.append(returns_div);
        form.appendChild(document.createElement('br'));
        form.append(req_format_div);
        form.appendChild(document.createElement('br'));
        form.append(req_params_div);
        form.appendChild(document.createElement('br'));
        form.append(res_format_div);
        form.appendChild(document.createElement('br'));
        form.append(res_params_div);
        form.appendChild(document.createElement('br'));
        form.appendChild(submit_btn);

        form.addEventListener('submit',(event)=>{
            event.preventDefault();
            
            const formEl = event.target;
            data = new FormData(formEl);
            let name = data.get("method_name");
            if(!name){
                name = "Empty";
            }
            let func = data.get("method_func");
            if(!func){
                func = "Empty";
            }
            let returns = data.get("method_returns");
            if(!returns){
                returns = "Empty";
            }
            let req_format = data.get("method_req_format");
            if(!req_format){
                req_format = "Empty";
            }
            let req_params = data.get("method_req_params");
            if(!req_params){
                req_params = "Empty";
            }
            let res_format = data.get("method_res_format");
            if(!res_format){
                res_format = "Empty";
            }
            let res_params = data.get("method_res_params");
            if(!res_params){
                res_params = "Empty";
            }

            let req = {
                method: "add_module_method",
                el_id: "" + module_name + "_methods_subcomponents",
                module_name: module_name,
                method_name: name,
                func: func,
                returns: returns,
                req_format: req_format,
                req_params: req_params,
                res_format: res_format,
                res_params: res_params
            }

            console.log(JSON.stringify(req));
            docSocket.send(JSON.stringify(req));

            add_method_form.classList.remove("add-form");
            add_method_form.innerHTML = "";

            // location.reload();
        });

        add_method_form.appendChild(form);
        add_method_form.classList.add("add-form");
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

        location.reload();
    });

    add_module_form.appendChild(form);
    add_module_form.classList.add("add-form");
});