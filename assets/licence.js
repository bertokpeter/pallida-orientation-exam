'use strict';

const ajax = new XMLHttpRequest();
const body = document.querySelector('body');
const searchBtn = document.querySelector('button');
const inputField = document.querySelector('#searchbar');
const policeBtn = document.querySelector('#police');
const diplomatBtn = document.querySelector('#diplomat');
let url = "http://localhost:3000";

function xml(method, resource, callback){
    ajax.open(method, url + resource, true);
    ajax.onload = function(){
        callback(ajax.response);
    }
    ajax.send();
}

searchBtn.addEventListener('click', function(){
    let query = '?q=' + inputField.value;
    if (policeBtn.checked && diplomatBtn.checked){
        createError();
    }
    if (policeBtn.checked){
        query += '&police=1';
    }
});

function createError(){
    let checkError = document.createElement('p');
    checkError.textContent = 'There no cars which are police cars and diplomat cars at the same time!';
    body.appendChild(checkError);
}