console.log("id3 dec tree script");

//Declare the var
var tableInfo = document.getElementById('input_option');

var id3_data_table = document.getElementById("id3_data_table");
var numAttr = document.querySelector("input[value=attribute]");
var numRow = document.querySelector("input[value=row]");

let valueOutput = document.getElementById("input_value_form");
let valueForm = document.getElementById("input_value");

let attributeForm = document.querySelector("form#input_attribute");
let attributeOutput = document.getElementById("input_attribute_output");

var tableData = [];
var instructions = ``;

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
    console.log(dynamicContent)
    unitsContainer.appendChild(dynamicContent);
}

function updateTable(col, row, value){
   const numAttrValue = numAttr.value.trim();
   const numRowValue = numRow.value.trim();

   if (row >= 0 && row < numRowValue && col >= 0 && col < numAttrValue) {
      tableData[row][col] = value;
      console.log(`Updated tableData[${row}][${col}] to ${value}`);
  } else {
      console.error(`Invalid row or column index: row=${row}, col=${col}`);
  }
}

//Declare the important button
let create_empty_table_btn = document.getElementById("create_empty_table_btn");

let create_table_btn = document.getElementById("create_table_btn");
let gen_data_btn = document.getElementById("gen_data_btn");
let upload_data_btn = document.getElementById("upload_data_btn");
let build_tree_btn = document.getElementById("build_tree_btn");

tableInfo.addEventListener("submit", function (event) {
    event.preventDefault();

    const numAttrValue = numAttr.value.trim();
    const numRowValue = numRow.value.trim();

    console.log(`# of attribute: ` + numAttrValue);
    console.log(`# of Row: ` + numRowValue);
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
                 <button type="button" onclick="Input_unit(${i}, event)">Submit</button><br>
                <output id="unit_output_${i}"></output>
                </div>
    `;
        }
        attr_input_form += `<button type="submit" value="unit_types">Submit units</button>`
        attributeOutput.innerHTML = attr_input_form;

});

attributeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let unit_submitter = document.querySelector('button[value=unit_types]');
    const numAttrValue = numAttr.value.trim();
    const numRowValue = numRow.value.trim();
    var value_input_form = ``;

    const unitData = new FormData(attributeForm, unit_submitter);

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
                    value_input_form += `
                        <option value='${value}'>${value}</option>
                        `
                }
            }
            value_input_form += `</select>`;
        }
    }
    value_input_form += `<button class="submit_btn" type="submit" value="submit_value_btn">Submit All</button>`;
    valueOutput.innerHTML = value_input_form;
})

valueForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    let submit_value = document.querySelector("button[value=submit_value_btn]");
    if (!submit_value) {
        console.error("submit_value is not defined or not found in the DOM.");
        return;
    }
    try {
        const valueData = new FormData(valueForm);
        console.log("valueData object created successfully.");
        console.log(valueData)
        for (let [key, value] of valueData.entries()) {
            var arr = key.split("_");
            var col = parseInt(arr[0].charAt(1)) - 1;
            var row = parseInt(arr[1].charAt(1)) - 1 ;
            updateTable(col, row, value);         
            
            const ws = new WebSocket("ws://localhost:11111");
            ws.open = function(){
                console.log("WebSocket connection opened.");
                ws.send(JSON.stringify(Object.fromEntries(valueData.entries())));
                console.log(Object.fromEntries(valueData.entries()))
            }
            ws.onmessage = function(event) {
                console.log("Message from server: ", event.data);
            };
    
            ws.onerror = function(error) {
                console.error("WebSocket error: ", error);
            };
    
            ws.onclose = function() {
                console.log("WebSocket connection closed.");
            };
        }
    } catch (error) {
        console.error("Error creating FormData object:", error);
    }
})
//Dynamically create table with user input
create_table_btn.addEventListener("click", event => {
   const numAttrValue = numAttr.value.trim();
   const numRowValue = numRow.value.trim();

   //Clear existing table
   while(id3_data_table.firstChild){
      id3_data_table.removeChild(id3_data_table.firstChild);
   }

   //Create table header
   var headerRow = document.createElement("tr");
   for(let i = 0; i <= numAttrValue; ++i){
      var th = document.createElement("th");
      if (i==0){
        th.innerHTML += `Value`;
      }
      else
        th.innerHTML +=  `Attribute ${i}`
      headerRow.append(th);
   }
   id3_data_table.appendChild(headerRow)

   //create table row
   for (let  i = 0; i < numRowValue; ++i){
        var row = document.createElement("tr");
        
    for(let j = 0; j <= numAttrValue; ++j){
        var cell = document.createElement("td");
        if (j == 0){
            cell.innerHTML +=  `${i+1}`;
        }
        else
            cell.innerHTML +=  `${tableData[i][j-1]}`;
        row.appendChild(cell);
    }
    id3_data_table.appendChild(row);
   }
 });

create_empty_table_btn.addEventListener("click", function ha() {
   let table = ``; 
   for (let i = 0; i < 5; ++i) {
        table += `
        <style>
        td.table_data, tr.table_row{
            color:black;
            border: 1px solid black;
            text-align: center;
            padding:10px;
        }
        </style>
        <tr class="table_row">
        `;
        for (let j = 0; j < 5; ++j) {
            let eachId = `i=${i},j=${j}`;
            table += `<td  class ="table_data" id="${i}_${j}"></td>`;
        }
        table += `</tr>`;
    }
    id3_data_table.innerHTML = table;
})
