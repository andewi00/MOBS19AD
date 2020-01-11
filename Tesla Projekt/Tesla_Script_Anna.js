// ######################################################
//
// Initialisation
//
// ######################################################

// flags
var flagHome = false;
var flagPressure = false;
var flagAir = false;
var flagWindow = false;
var flagMusic = false;
// car states
var windowLeftClosed = false;
var windowRightClosed = false;
var carLocked = false;
// music
var currentTitle = 0;
var playlistLength = 0;

startSystem();

// initialise
function startSystem() {
    // set template
    flagHome = true;
    // windows are closed
    windowLeftClosed = true;
    windowRightClosed = true;
    // car is open
    carLocked = false;
    unlockCar();
    // get music
    currentTitle = 0;
    fetchMusic();
}

// ######################################################
//
// Music
//
// ######################################################

function fetchMusic() {
    fetch('http://192.168.0.164:5000/music')
        .then(response => response.json())
        .then(function (musicList) {
            document.getElementById("title").innerHTML = musicList[currentTitle].title;
            playlistLength = musicList.length;
        });
}

function templateMusic() {
    let mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
    mainElement.appendChild(document.getElementsByClassName("templateMusic")[0].content.cloneNode(true));
    flagPressure = false;
    flagHome = false;
    flagAir = false;
    flagWindow = false;
    flagMusic = false;
    musicList();
}

function musicList() {
    fetch('http://192.168.0.164:5000/music')
        .then(response => response.json())
        .then(function (musicList) {

            // create list and append to html element (div)
            var ul = document.createElement("ul");
            ul.setAttribute("id", "musicPlaylist");
            document.getElementById("musicPlaylist").appendChild(ul);

            // create list elements and append to list
            for (i = 0; i < musicList.length; i++) {
                var li = document.createElement("li");
                ul.appendChild(li);
                li.innerHTML = musicList[i].title + " by " + musicList[i].artist;
            }
        });
};

function previousSong() {
    if (currentTitle == 0) {
        currentTitle = playlistLength - 1;
    }
    else {
        currentTitle--;
    }
    fetchMusic();

}

function nextSong() {
    if (currentTitle < playlistLength - 1) {
        currentTitle++;
    }
    else {
        currentTitle = 0;
    }
    fetchMusic();
}

// ######################################################
//
// Interval
//
// ######################################################

window.setInterval(function () {
    fetchData();
    listenEvents();
}, 1000);

// ######################################################
//
//Get python data - Status information
//
// ######################################################
function fetchData() {
    fetch('http://192.168.0.164:5000/status').then(function (response) {
        response.text().then(function (text) {
            let actualValues = text.split(/,|:/);

            // always shown in header
            document.getElementById("statusTemperature").innerHTML = actualValues[9].substr(1, 4) + "&degC / " + actualValues[3].substr(1, 5) + "%";
            document.getElementById("date").innerHTML = getToday();

            // shown in home template
            if (flagHome == true) {
                // console.log(text);
                // name buttons
                document.getElementById("buttonWindow").innerHTML = "Fenstereinstellungen";
                document.getElementById("buttonPressure").innerHTML = "Luftdruck";
                document.getElementById("buttonAir").innerHTML = "Klimaanlage";
                // get status
                document.getElementById("statusConsumption").innerHTML = "Verbrauch: " + actualValues[1].substr(1, 3) + " Liter";
                document.getElementById("statusSpeed").innerHTML = "Geschwindigkeit: " + actualValues[7].substr(1, 6) + " km/h";
            }

            // shown in pressure template
            if (flagPressure == true) {
                // get status
                document.getElementById("frontLeft").innerHTML = Math.round(actualValues[5].substr(1, 4) * 0.99) + " kPa";
                document.getElementById("frontRight").innerHTML = Math.round(actualValues[5].substr(1, 4) * 0.99) + " kPa";
                document.getElementById("backLeft").innerHTML = actualValues[5].substr(1, 6) + " kPa";
                document.getElementById("backRight").innerHTML = actualValues[5].substr(1, 6) + " kPa";
            }
        });
    });
}

function listenEvents() {

    // event listener in header
    document.getElementById("buttonHome").addEventListener("click", templateHomeScreen);

    // event listener in home template
    if (flagHome == true) {
        // states
        document.getElementById("buttonPressure").addEventListener("click", templatePressure);
        document.getElementById("buttonAir").addEventListener("click", templateAir);
        document.getElementById("buttonWindow").addEventListener("click", templateWindow);
        // music
        document.getElementById("buttonPlaylist").addEventListener("click", templateMusic);
        document.getElementById("buttonPreviousSong").addEventListener("click", previousSong);
        document.getElementById("buttonNextSong").addEventListener("click", nextSong);
        // lock
        document.getElementById("buttonLock").addEventListener("click", lockUnlockCar);
    }
}

// ######################################################
//
// Templates
//
// ######################################################

// Template HomeScreen
function templateHomeScreen() {
    let mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
    mainElement.appendChild(document.getElementsByClassName("templateHome")[0].content.cloneNode(true)); //Clone and open template
    flagPressure = false;
    flagHome = true;
    flagAir = false;
    flagWindow = false;
    flagMusic = false;
    unlockCar();
}

// Template Pressure
function templatePressure() {
    let mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
    mainElement.appendChild(document.getElementsByClassName("templatePressure")[0].content.cloneNode(true));
    flagPressure = true;
    flagHome = false;
    flagAir = false;
    flagWindow = false;
    flagMusic = false;
}

// Template Air
function templateAir() {
    let mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
    mainElement.appendChild(document.getElementsByClassName("templateAir")[0].content.cloneNode(true));
    flagPressure = false;
    flagHome = false;
    flagAir = true;
    flagWindow = false;
    flagMusic = false;
    if (flagAir == true) {
        showSlider();
    }
}

function showSlider() {
    var rangeslider = document.getElementById("sliderRange");
    var output = document.getElementById("demo");
    output.innerHTML = rangeslider.value;
    rangeslider.oninput = function () {
        output.innerHTML = this.value;
    }
}

// Template Window
function templateWindow() {
    let mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
    mainElement.appendChild(document.getElementsByClassName("templateWindow")[0].content.cloneNode(true));
    flagPressure = false;
    flagHome = false;
    flagAir = false;
    flagWindow = true;
    flagMusic = false;
    if (flagWindow == true) {
        document.getElementById("buttonWindowLeft").addEventListener("click", closeOpenLeftWindow);
        document.getElementById("buttonWindowRight").addEventListener("click", closeOpenRightWindow);
        document.getElementById("buttonWindowAll").addEventListener("click", closeOpenAllWindows);
    }
}

// ######################################################
//
// Close and open window
//
// ######################################################

// left window
function closeOpenLeftWindow() {
    if (windowLeftClosed) {
        openWindow("left");
        document.getElementById("buttonWindowLeft").innerHTML = "Fenster Links auf";
    }
    else {
        closeWindow("left");
        document.getElementById("buttonWindowLeft").innerHTML = "Fenster Links zu";
    }
    windowLeftClosed = !windowLeftClosed;
}

// right window
function closeOpenRightWindow() {
    if (windowRightClosed) {
        openWindow("right");
        document.getElementById("buttonWindowRight").innerHTML = "Fenster Rechts auf";
    }
    else {
        closeWindow("right");
        document.getElementById("buttonWindowRight").innerHTML = "Fenster Rechts zu";
    }
    windowRightClosed = !windowRightClosed;
}

function closeWindow(window) {
    if (window == "left" || "right") {
        fetch("http://192.168.0.164:5000/window/close");
    }
}

function openWindow(window) {
    if (window == "left" || "right") {
        fetch("http://192.168.0.164:5000/window/open");
    }
}

// ######################################################
//
// Lock and unlock car
//
// ######################################################

function lockUnlockCar() {
    //console.log("lockunlock");
    if (carLocked == false) {
        document.getElementById("locked").style.display = "block";
        document.getElementById("unlocked").style.display = "none";
        //console.log("if true");
        lockCar();
    }
    else if (carLocked == true) {
        document.getElementById("locked").style.display = "none";
        document.getElementById("unlocked").style.display = "block";
        //console.log("if false");
        unlockCar();
    }
    carLocked = !carLocked;
}

function lockCar() {
    fetch("http://192.168.0.164:5000/action/lock");
}

function unlockCar() {
    fetch("http://192.168.0.164:5000/action/unlock");
}

// ######################################################
//
// Time
//
// ######################################################

function getTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    
    time.innerHTML = hours + ":" + minutes + ":" + seconds + " Uhr";
    window.setTimeout("getTime();", 1000);
}
window.onload = getTime;

// ######################################################
//
// Date
//
// ######################################################

function getToday() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1; // Months start at 0!
    var year = today.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    today = day + '.' + month + '.' + year;
    return today;
}

//1920 1080px