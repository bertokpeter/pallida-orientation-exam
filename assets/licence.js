'use strict';

const ajax = new XMLHttpRequest();
const body = document.querySelector('body');
const seacrhBtn = document.querySelector('button');
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
    let query = 
});