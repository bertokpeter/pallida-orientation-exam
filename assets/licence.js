'use strict';

const ajax = new XMLHttpRequest();
const results = document.querySelector('.results');
const searchBtn = document.querySelector('button');
const inputField = document.querySelector('#searchbar');
const policeBtn = document.querySelector('#police');
const diplomatBtn = document.querySelector('#diplomat');
let url = "http://localhost:3000/search";

function xml(method, resource, callback){
    ajax.open(method, url + resource, true);
    ajax.onload = function(){
        callback(JSON.parse(ajax.response));
    }
    ajax.send();
}

searchBtn.addEventListener('click', function(){
    let query = '?q=' + inputField.value;
    if (policeBtn.checked && diplomatBtn.checked){
        createError();
    } else if (policeBtn.checked){
        query += '&police=1';
    } else if (diplomatBtn.checked){
        query += '&diplomat=1';
    } 
    xml('GET', query, createTable);
});

function createError(){
    results.innerHTML = '';
    let checkError = document.createElement('p');
    checkError.textContent = 'There no cars which are police cars and diplomat cars at the same time!';
    results.appendChild(checkError);
    policeBtn.checked = false;
    diplomatBtn.checked = false;
}

function createTable(json){
    console.log(json);
    let searchTable = document.createElement('table');
    let htmlString = `<thead>
                          <th>| Licence plate </th>
                          <th>| Brand </th>
                          <th>| Model </th>
                          <th>| Color </th>
                          <th>| Year |</th>
                       </thead>
                       <tbody>`;
    json.data.forEach(function(row){
        htmlString += `<tr>
                           <td>| ${row.licence} </td>
                           <td>| ${row.brand} </td>
                           <td>| ${row.model} </td>
                           <td>| ${row.year} </td>
                           <td>| ${row.color} |</td>
                       </tr>`
    });
    htmlString += '</tbody>';
    searchTable.innerHTML = htmlString;
    results.appendChild(searchTable);
}