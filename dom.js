document.getElementsByClassName("item")[0].innerText = "Textveränderung mittels js"; //Text verändern
document.getElementsByTagName("nav")[0].innerText = "Veränderte nav";
document.getElementsByTagName("li")[0].innerText += " Erledigt!";

document.getElementsByTagName("li")[1].style.color = "green"; //Stil verändern
document.getElementsByTagName("header")[0].style.Background = "orange";
document.getElementsByTagName("aside")[0].style.fontFamily = "Bitstream Vera Sans Bold";
document.getElementsByTagName("aside")[0].style.fontSize = "50px";
document.getElementsByTagName("li")[1].innerText += " Erledigt!"; //Text ergänzen

document.getElementsByTagName("div")[1].remove(); //Main Element löschen



document.getElementsByTagName("nav")[0].innerHTML = '<ul><li>Punkt1</li><li>Punkt2</li></ul>'; //Nav verändern, UL und li erstellen


const ClickLi = document.getElementsByTagName("li")[0];

function CheckIt() {
var x = document. createElement("IMG");
x.setAttribute("src", "file:///Back/itlabuser/git/Marx/mobs_test-master/images.jpeg");

var item = document.createElement("div");
item.classList.add("picture");

item.appendChild(x);

document.getElementsByTagName("main")[0].appendChild(item);

}
ClickLi.addEventListener("click",CheckIt);
document.getElementsByTagName("li")[4].innerHTML += " Erledigt!"; 
document.getElementsByTagName("li")[5].innerHTML += " Erledigt!"; 
document.getElementsByTagName("li")[6].innerHTML += " Erledigt!"; 