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
    let query = '?q=' + encodeURIComponent(inputField.value);
    if (policeBtn.checked){
        query += '&police=1';
    } else if (diplomatBtn.checked){
        query += '&diplomat=1';
    } 
    xml('GET', query, createTable);
});

function createTable(json){
    results.innerHTML = '';
    policeBtn.checked = false;
    diplomatBtn.checked = false;
    if (json.result === 'ok' && json.data.length > 0){
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
            <td>| [<span class="brand">${row.brand}</span>] </td>
            <td>| ${row.model} </td>
            <td>| ${row.year} </td>
            <td>| ${row.color} |</td>
            </tr>`
        });
        htmlString += '</tbody>';
        searchTable.innerHTML = htmlString;
        results.appendChild(searchTable);
        addBrandEvents();
    } else if (json.result === 'ok'){
        createError('ok');
    } else if (json.result === 'error'){
        createError('error');
    }
}

function addBrandEvents(){
    let brands = results.querySelectorAll('.brand');
    brands.forEach(function(element){
        element.addEventListener('click', function(){
            let query = '/' + element.innerHTML;
            xml('GET', query, createTable);
        });
    });
}

function createError(value){
    let errorMessage = document.createElement('p');
    if (value === 'ok'){
        errorMessage.textContent = 'Sorry, no matches';
    } else {
        errorMessage.textContent = 'Sorry, the submitted licence plate is not valid';
    }
    results.appendChild(errorMessage);
}