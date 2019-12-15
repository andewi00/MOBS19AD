
//Get Python Service Data
//document.getElementById("locked").style.display = "block";
//document.getElementById("unlocked").style.display = "none";
fetch('http://192.168.0.164:5000/Status').then(function (response) {
    response.text().then(function (text) {
        // var e = document.getElementById("data").innerHTML = text;
        let actualValues = text.split(/,|:/);
        console.log(text);

        //function Music() {
        //    fetch('http://192.168.0.164:5000/music').then(function (response) {
        //        response.text().then(function (text) {

        //            console.log("Test Music");

        //        });
        //    });

        //}
        //document.getElementById("Title").addEventListener("click", Music);


        //Template BackScreen
        function ShowTemplate() {
            document.querySelector("main").innerHTML = "";
            // document.getElementById("Back").disabled = true; //Zurück kann nur einmal betätigt werden
            document.getElementsByTagName("main")[0].appendChild(
                document.getElementsByClassName("Back")[0].content.cloneNode(true));
            document.getElementById("button1").innerHTML += actualValues[5].substr(1, 6) + " kPa";

            //Consumption
            document.getElementById("button3").innerHTML += actualValues[1].substr(1, 6) + " Liter";

            //Current Speed
            document.getElementById("buttonSpeed").innerHTML += actualValues[7].substr(1, 6) + " km/h";

            document.getElementById("button1").addEventListener("click", ShowPressure);

            if (document.getElementById("button0").style.display = "block") {
                document.getElementById("button0").addEventListener("click", OpenLock);
            }
            else if (document.getElementById("button0.5").style.display = "block") {
                document.getElementById("button0.5").addEventListener("click", CloseLock);
            }

        }
        document.getElementById("Back").addEventListener("click", ShowTemplate);


        //Template Pressure
        function ShowPressure() {
            document.querySelector("main").innerHTML = "";
            document.getElementsByTagName("main")[0].appendChild(
                document.getElementsByClassName("Pr")[0].content.cloneNode(true));
            document.getElementById("frontLeft").innerHTML = actualValues[5].substr(1, 4) * 0.99 + " kPa";
            document.getElementById("frontRight").innerHTML = actualValues[5].substr(1, 3) * 0.99 + " kPa";
            document.getElementById("BackLeft").innerHTML = actualValues[5].substr(1, 6) + " kPa";
            document.getElementById("BackRight").innerHTML = actualValues[5].substr(1, 6) + " kPa";
        }
        document.getElementById("button1").addEventListener("click", ShowPressure);


        //Current Temperature
        document.getElementById("Temp").innerHTML = actualValues[9].substr(1, 4) + "°C / " + actualValues[3].substr(1, 5) + "%";

        //Current Pressure
        document.getElementById("button1").innerHTML += actualValues[5].substr(1, 6) + " kPa";

        //Current Humidity
        document.getElementById("button2").innerHTML += actualValues[3].substr(1, 6) + " %";

        //Consumption
        document.getElementById("button3").innerHTML += actualValues[1].substr(1, 6) + " Liter";

        //Current Speed
        document.getElementById("buttonSpeed").innerHTML += actualValues[7].substr(1, 6) + " km/h";


        //Fuction Lock
        //function OpenLock() {

        //    document.getElementById("button0.5").style.display = "block";
        //    document.getElementById("button0").style.display = "none";
        //}
        //document.getElementById("button0").addEventListener("click", OpenLock);


        //function CloseLock() {
        //    document.getElementById("button0.5").style.display = "none";
        //    document.getElementById("button0").style.display = "block";

        //}
        //document.getElementById("button0.5").addEventListener("click", CloseLock);

        //var hidden = false;

        //function hideOrShow()
        //{
        //  if(!hidden)
        //  {
        //    document.getElementById("myimg").style.display = "none";
        //  }
        //  else
        //  {
        //    document.getElementById("myimg").style.display = "block";
        //  }
        //  hidden = !hidden;
        //}
        //Open and close the lock
        function Lock() {
            if (fetch('http://192.168.0.164:5000/action/unlock').then(function (response) {
                response.text().then(function (text) {

                });
            })) {
                document.getElementById("locked").style.display = "none";
                document.getElementById("unlocked").style.display = "block"; document.getElementById("locked").style.display = "block"

            }
            else { };

            if (document.getElementById("unlocked").style.display = "block") {
                fetch('http://192.168.0.164:5000/action/lock').then(function (response) {
                    response.text().then(function (text) {
                        document.getElementById("unlocked").style.display = "none";
                        document.getElementById("locked").style.display = "block";
                    });
                });
            }
            else { };
        }
        document.getElementById("button0").addEventListener("click", Lock);





    });
});




//Current Time
function currentTime() {
    var Today = new date();
    var hoursGet = Today.getHours(); var minutesGet = Today.getMinutes(); var secondsGet = Today.getSeconds();
    var Hours, Minutes, Seconds
    Hours = hoursGet + ":";

    if (minutesGet < 10) { Minutes = '0' + minutesGet + ":"; }
    else { Minutes = minutesGet + ":"; }
    if (secondsGet < 10) { Seconds = '0' + secondsGet; }
    else { Seconds = secondsGet; }

    Time.innerHTML = Hours + Minutes + Seconds + " Uhr";

    window.setTimeout("currentTime();", 1000);

}
window.onload = currentTime;

//Current Date
function getToday() {
    var Today = new Date();

    var Day = Today.getDate(); // Day

    // Months start at 0!
    var Month = Today.getMonth() + 1; // Month

    var Year = Today.getFullYear(); // Year
    if (Day < 10) {
        Day = '0' + day;
    }
    if (Month < 10) {
        Month = '0' + month;
    }
    Today = Day + '.' + Month + '.' + Year;

    return Today;
}
document.getElementById("date").textContent = getToday();
