function ClickLD() { //welche Funktion soll ausgeführt werden
  document.getElementsByTagName("button")[0].remove();
  var x = document.createElement("div"); //was wird erzeugt
  x.innerHTML = "Aktueller Luftdruck: 2,6 bar";// was wird angezeigt
  
  document.getElementsByTagName("main")[0].appendChild(x); //wohin wird was kommen
}
function Back() {
  var x = document.createElement("button");
    x.innerHTML = "<<"

  document.getElementsByTagName("header")[0].appendChild(x);
}

document.getElementsByTagName("button")[0].addEventListener("click", ClickLD);
document.getElementsByTagName("button")[0].addEventListener("click", Back);
       // function GoBack() {
        //    document.getElementsByTagName("button")[0].remove();
        // document.getElementsByTagName("div")[0].remove();
        //}
document.getElementsByTagName("button")[0].addEventListener("click", GoBack);
//Funktion als klick einfügen auf den Button //welcher Button soll angesprochen werden?

