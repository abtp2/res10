const x = document.getElementById("h-main");
const y = document.getElementById("c-main");
const z = document.getElementById("j-main");

const a = document.getElementById("html");
const b = document.getElementById("css");
const c = document.getElementById("js");


function one() {
x.style.display ="block";
x.focus();
y.style.display ="none";
z.style.display ="none";

a.style.background ="#7d839e";
b.style.background ="#2b303a";
c.style.background ="#2b303a";
}
function two() {
y.style.display ="block";
y.focus();
x.style.display ="none";
z.style.display ="none";

b.style.background ="#7d839e";
a.style.background ="#2b303a";
c.style.background ="#2b303a";
}
function three() {
z.style.display ="block";
z.focus();
y.style.display ="none";
x.style.display ="none";

c.style.background ="#7d839e";
b.style.background ="#2b303a";
a.style.background ="#2b303a";
}



function tog() {
var a =document.getElementById("toggle");
if(a.style.justifyContent === "flex-end") {
a.style.justifyContent ="flex-start";				
x.style.background ="#2b303a";
x.style.transition ="all 0.3s";
y.style.background ="#2b303a";
z.style.background ="#2b303a";

x.style.color ="#fff";
y.style.color ="#fff";
z.style.color ="#fff";

x.style.caretColor ="#fff";
y.style.caretColor ="#fff";
z.style.caretColor ="#fff";
}else {
a.style.justifyContent ="flex-end";				
x.style.background ="#fff";
x.style.transition ="all 0.3s";
y.style.background ="#fff";
z.style.background ="#fff";			

x.style.color ="#000";
y.style.color ="#000";
z.style.color ="#000";

x.style.caretColor ="#000";
y.style.caretColor ="#000";
z.style.caretColor ="#000";
}
}



function like() {
location.href ="color.html";
}

/*  function like() {
var x =document.getElementById("like");
if(x.innerText ==="❤") {
x.innerText ="🤍";
}else {
x.innerText ="❤";				
}				
} */





function check() {
var m = x.value;
var n = y.value;
var o = z.value;

var p = m.replace(/\s+/g, '').length;
var q = n.replace(/\s+/g, '').length;
var r = o.replace(/\s+/g, '').length;



if(x.style.display ==="none") {				
}
else {
document.getElementById("l-count").innerHTML =p;			
document.getElementById("c-lang").innerHTML ="HTML";			
}

if(y.style.display ==="block") {
document.getElementById("l-count").innerHTML =q;				
document.getElementById("c-lang").innerHTML ="CSS";								
}
 
if(z.style.display ==="block") {
document.getElementById("l-count").innerHTML =r;					
document.getElementById("c-lang").innerHTML ="JavaScript";			
}
}



 function stor(){ 
 var text = document.getElementById('h-main').value; 
 if (text.includes('Ashutosh') === true) { 
document.getElementById("hide-ashu").style.display ="block";
document.getElementById("hide-ashu").classList.add("hide-ashu");
 } 
 else { 
document.getElementById("hide-ashu").style.display ="none";
document.getElementById("hide-ashu").classList.remove("hide-ashu");
 } 
 };

