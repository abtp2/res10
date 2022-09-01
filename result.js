function compile() { 
var code = document.getElementById("code").contentWindow.document; 

var h =localStorage.getItem("html");			
var c =localStorage.getItem("css");			
var j =localStorage.getItem("js");			
window.onload = function() { 
code.open(); code.writeln( h + "<style>" + c + "</style>" + "<script>" + j + "</script>" ); code.close(); }; } compile();

function clos(){
window.open('home.html');
}

