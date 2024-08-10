console.log("id3 dec tree script");

const id3_table_socket = new WebSocket("ws://localhost:11111");

id3_table_socket.addEventListener("open", (event) => {
    console.log("ID3 TABLE SOCKET HAHA CONNECTED");
})

id3_table_socket.addEventListener("message", (event) => {
    console.log('Message from server: ', event.data);
});

id3_table_socket.addEventListener('error', function (event) {
    console.error('WebSocket error observed:', event);
});

id3_table_socket.addEventListener('close', function (event) {
    console.log('WebSocket connection closed:', event.code, event.reason);
});

//Declare the var
var tableInfo = document.getElementById('input_option');

var id3_data_table = document.getElementById("id3_data_table");
const numAttr = document.querySelector("input[value=attribute]");
const numRow = document.querySelector("input[value=row]");

let valueOutput = document.getElementById("input_value_form");
let valueForm = document.getElementById("input_value");

let attributeForm = document.querySelector("form#input_attribute");
let attributeOutput = document.getElementById("input_attribute_output");

var tableData = [];
var AttrData = [];
var gtlData = [];

// var instructions = ``;

// Functions
function Input_unit(i, event) {
    event.preventDefault();
    const numUnit = document.getElementById(`attribute${i}_unitNum`).value.trim();
    let unitsContainer = document.getElementById(`unit_output_${i}`);
    let dynamicContent = document.createElement('div');
    dynamicContent.className = 'dynamic_content';
    let content = '';

    //Clear the UnitForm
    while (unitsContainer.firstChild) {
        unitsContainer.removeChild(unitsContainer.firstChild);
    }

    //making the UnitForm
    for (let a = 1; a <= numUnit; ++a) {
        content += `
        <div class="input_field">
        <label for="A${i}_type">U${a}: </label>
        <input type="text" id="U${a}" name="A${i}_type" REQUIRED><br>   
        </div>
        `;
    }
    dynamicContent.innerHTML += content;
    unitsContainer.appendChild(dynamicContent);
}

function uploadTable(col, row, value) {
    const numAttrValue = parseInt(numAttr.value.trim(), 10);
    const numRowValue = parseInt(numRow.value.trim(), 10)

    //Add the editable gtl into numAttrValue
    if (row >= 0 && row < numRowValue && col >= 0 && col <= numAttrValue + 1 ) {
        tableData[row][col] = value;
        console.log(`Updated tableData[${row}][${col}] to ${value}`);
    } else {
        console.error(`Invalid row or column index: row=${row}, col=${col}`);
    }
}

function updateCell(x, event){
    var col = event.target.parentNode.rowIndex - 1;
    var row = event.target.cellIndex - 1;
    var val = event.target.textContent.trim();
    var option = val.toLowerCase();
    console.log(`updateCell col:` + col);
    console.log(`updateCell row:` + row);
    console.log(`updateCell val:` + val);
    var ans;
    if(x == "class"){
        if (option == "yes"){
            gtlData[col] = 1; 
            ans = 1;
        }
        else if (option == "no"){
            gtlData[col] = 0;
            ans = 0;
        }
    }
    else if (x == "attr") {
        uploadTable(col, row, option)
    }
    else{
        console.log(`Unable to update a cell`)
    }
}

//Declare the important button
let create_empty_table_btn = document.getElementById("create_empty_table_btn");

let create_table_btn = document.getElementById("create_table_btn");
let gen_data_btn = document.getElementById("gen_data_btn");
let upload_data_btn = document.getElementById("upload_data_btn");
let build_tree_btn = document.getElementById("build_tree_btn");

document.addEventListener('readystatechange', event=> {
    console.log(`yea`)
    const id3TablePage = document.querySelector('#id3_table_page');

    if (!id3TablePage) {
        console.error('Element with ID "id3_table_page" not found.');
       
    }

    id3TablePage.onload = function() {
        console.log('onload event triggered for id3_table_page');
        console.log('Current window location:', window.location);

        // Redirect to the specified page
        window.location.href = '/?page=id3_dec_tree';
    };

    // Manually trigger the onload event for debugging purposes
    id3TablePage.onload();
});

tableInfo.addEventListener("submit",  (event) => {
    event.preventDefault();

    const numAttrValue = parseInt(numAttr.value.trim(), 10)
    const numRowValue = parseInt(numRow.value.trim(), 10)

    var attr_input_form = ``;

    // Initialize the 2D array
    tableData = new Array(numRowValue);
    for (let i = 0; i < numRowValue; i++) {
        tableData[i] = new Array(numAttrValue).fill(null);
    }

    for (let i = 1; i <= numAttrValue; ++i) {
        attr_input_form += `<div id="input_attribute${i}" > `;
        if (i > 1) {
            attr_input_form += `<hr style="height:2px;border-width:0;color:gray;background-color:gray"> `;
        }
        attr_input_form += `
                <div class="input_text">
                    <label for="attribute${i}_name">A${i} name: </label>
                    <input type="text" name="attribute${i}_name" REQUIRED><br>
                </div>
                <div class="input_field">
                    <label for="attribute${i}_unitNum">Number of A${i}'s unit= </label>
                    <input type="number" id="attribute${i}_unitNum" name="attribute${i}_unitNum" max=5 REQUIRED>
                </div>
                 <button class="submit_btn" type="button" onclick="Input_unit(${i}, event)">Submit</button><br>
                <output id="unit_output_${i}"></output>
                </div>
    `;
    }
    attr_input_form += `<button class="submit_btn" type="submit" value="unit_types">Submit units</button>`
    attributeOutput.innerHTML = attr_input_form;
});

attributeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let unit_submitter = document.querySelector('button[value=unit_types]');
    const numAttrValue = parseInt(numAttr.value.trim(), 10)
    const numRowValue = parseInt(numRow.value.trim(), 10)
    var value_input_form = ``;

    const unitData = new FormData(attributeForm, unit_submitter);
    let index = 1;
    for (let [key, value] of unitData.entries()) {
        if (key ==  `attribute${index}_name`){
            AttrData[index-1] = value;
            ++index ;
        }
    }
    console.log('AttributeName Arr: ', AttrData)

    for (let i = 1; i <= numAttrValue; ++i) {
        if (i > 1) {
            value_input_form += `<hr style="border:2px dashed black;">`;
        }
        for (let j = 1; j <= numRowValue; ++j) {
            value_input_form += `
                <label for="Value">A${i}_V${j}</label>
                <select name="A${i}_V${j}">
                `;
            for (let [key, value] of unitData.entries()) {
                if (key == `A${i}_type`) {
                    value_input_form += `<option value='${value}'>${value}</option>`
                }
            }
            value_input_form += `</select>`;
        }
    }
    value_input_form += `<button class="submit_btn" type="submit" value="submit_value_btn">Submit All</button>`;
    valueOutput.innerHTML = value_input_form;
})

valueForm.addEventListener("submit", event => {
    event.preventDefault();

    let submit_value = document.querySelector("button[value=submit_value_btn]");
    if (!submit_value) {
        console.error("submit_value is not defined or not found in the DOM.");
        return;
    }
    try {
        const valueData = new FormData(valueForm);
        console.log("valueData object created successfully.");

        for (let [key, value] of valueData.entries()) {
            var arr = key.split("_");
            var col = parseInt(arr[0].charAt(1)) - 1;
            var row = parseInt(arr[1].charAt(1)) - 1;
            uploadTable(col, row, value);
        }
        console.log(tableData)

    } catch (error) {
        console.error("Error creating FormData object:", error);
    }
})
//Dynamically create table with user input
create_table_btn.addEventListener("click", event => {
    const numAttrValue = parseInt(numAttr.value.trim(), 10);
    const numRowValue = parseInt(numRow.value.trim(), 10);
    if (!numAttrValue || !numRowValue){
        alert("Unable to make the graph. Please fill in and submit the numbers of rows and attributes")
    }

    //Clear existing table
    while (id3_data_table.firstChild) {
        id3_data_table.removeChild(id3_data_table.firstChild);
    }

    //Create table header
    var headerRow = document.createElement("tr");
    for (let i = 0; i <= numAttrValue + 1; ++i) {
        var th = document.createElement("th");
        var input = document.createElement("input");
        if (i == 0) {
            th.innerHTML += `Value`;
        }
        else if (i == numAttrValue + 1){
            input.setAttribute("type", "text");
            input.setAttribute("class", "header_input")
            input.setAttribute("placeholder", "CLASS")
            th.append(input);
        }
        else{    
            input.setAttribute("type", "text");
            input.setAttribute("class", "header_input")
            input.setAttribute("placeholder", `Attribute ${i}`)
            th.append(input);
        }
        headerRow.append(th);
    }
    id3_data_table.appendChild(headerRow)
    console.log(id3_data_table)

    //create table row
    for (let i = 0; i < numRowValue; ++i) {
        console.log(`i: `, i)
            var row = document.createElement("tr");
            for (let j = 0; j <= numAttrValue + 1; ++j) {
                var cell = document.createElement("td");
                if (j == 0) {
                    cell.innerHTML += `${i + 1}`;
                }
                else if (j == numAttrValue + 1 ) {
                    cell.setAttribute("contenteditable", "true");
                    // cell.setAttribute("class", "gtl-cell");
                    cell.addEventListener("input", updateCell("class", event))
                }
                else{
                    console.log(`j after: `, j)
                    cell.setAttribute("contenteditable", "true");
                    // cell.setAttribute("class", "");
                    cell.addEventListener("input", updateCell("attr", event))
                    // cell.innerHTML += `${tableData[i][j - 1]}`;
                }
                row.appendChild(cell);
                console.log(`j: `, j)
            }
            id3_data_table.appendChild(row);
    }
    console.log(`TableData: `, tableData)
    console.log(`gtlData `, gtlData)
});

// create_empty_table_btn.addEventListener("click", function ha() {
//    let table = ``;
//    for (let i = 0; i < 5; ++i) {
//         table += `
//         <style>
//         td.table_data, tr.table_row{
//             color:black;
//             border: 1px solid black;
//             text-align: center;
//             padding:10px;
//         }
//         </style>
//         <tr class="table_row">
//         `;
//         for (let j = 0; j < 5; ++j) {
//             let eachId = `i=${i},j=${j}`;
//             table += `<td  class ="table_data" id="${i}_${j}"></td>`;
//         }
//         table += `</tr>`;
//     }
//     id3_data_table.innerHTML = table;
// })

build_tree_btn.addEventListener("click", event =>{

        const req = {
            method: "id3",
            attributes: AttrData,
            vals: tableData,
            gtl: gtlData,
        }
        console.log("Sending req:", req);

        id3_table_socket.send(JSON.stringify(req));

    window.location.href = "index.html?page=id3_graph";
})

upload_data_btn.addEventListener("click", event =>{
    // event.preventDefault();
    // // Submit the form programmatically
    // valueForm.submit();
})

