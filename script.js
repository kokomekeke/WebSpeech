var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var door = [ 'open' , 'close' , 'turn on' , 'turn off' , 'exit'];
var grammar = '#JSGF V1.0; grammar door; public <door> = ' + door.join(' | ') + ' ;'
var isDoorOpen = false;
var isRecStarted = false;
var end = false;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.start();
isRecStarted = true;

document.getElementById("light").style.visibility = "hidden";
document.getElementById("greenon").style.visibility = "hidden";

recognition.onresult = function(event) {
    var door = event.results[0][0].transcript;
    console.log(door);

    if ( door == "open" || door == "Open.") {
        document.getElementById("door").src = "img/opened.png";
        document.getElementById("log").innerHTML += "<br>" + door;
        console.log(door);
        //recognition.start();
    } else if ( door == "close" || door == "Close.") {
        document.getElementById("door").src = "img/closed.png";
        document.getElementById("log").innerHTML += "<br>" + door;
        console.log(door);
        //recognition.start();
    } else if ( door == "turn on" || door == "Turn on.") {
        document.getElementById("light").style.visibility = "visible";
        document.getElementById("log").innerHTML += "<br>" + door;
        console.log(door);
        //recognition.start();
    } else if (door == "turn off" || door == "Turn off.") {
        document.getElementById("light").style.visibility = "hidden";
        document.getElementById("log").innerHTML += "<br>" + door;
        console.log(door);
        //recognition.start();
    } else if (door == "exit" || door == "Exit.") {
        document.getElementById("log").innerHTML += "<br>" + door;
        document.getElementById("greenon").style.visibility = "hidden";
        console.log(door);
        recognition.stop();
        end = true;
    } else {
        document.getElementById("log").innerHTML += "<br>" + door;
        //recognition.stop();
        console.log(door);
    }
    
  }


recognition.onaudiostart = function(event) {
    document.getElementById("greenon").style.visibility = "visible";
}

/*recognition.onaudiostart = function(event) {
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        console.log('You let me use your mic!')
      })
      .catch(function(err) {
        console.log('No mic for you!')
      });
}*/

recognition.onspeechend = function(event) {
  recognition.stop();
  document.getElementById("greenon").style.visibility = "hidden";
}

recognition.onnomatch = function(event) {
  document.head.textContent = "I didn't recognise that.";
}

recognition.onerror = function(event) {
  document.head.textContent = 'Error occurred in recognition: ' + event.error;
}


recognition.onend = function() {
    if (!end)
    recognition.start();
    /*
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        console.log('You let me use your mic!')
      })
      .catch(function(err) {
        console.log('No mic for you!')
      });*/
}

var j = 1;
function change() {
    
    if (j % 2 == 0) {
        document.getElementById("door").src="img/closed.png";
        j ++;
    } else {
        document.getElementById("door").src="img/opened.png";
        j ++;
    }
}

var k = 0;
function changeLamp() {
    if (k % 2 == 0) {
        document.getElementById("light").style.visibility = "visible";
        k ++;
    } else {
        document.getElementById("light").style.visibility = "hidden";
        k ++;
    }
}

document.body.onclick = function() {
    //if (!isRecStarted)



   end = false;
    recognition.start();
}

function detectBrowser() { 
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
        return 'Opera';
    } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
        return 'Chrome';
    } else if(navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if(navigator.userAgent.indexOf("Firefox") != -1 ){
        return 'Firefox';
    } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
        return 'IE';//crap
    } else {
        return 'Unknown';
    }
} 

function detect() {
    
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (isChrome) {
        return true;
    } return false;
}

function chromeCheck() {
    var isChromium = window.chrome;
    var winNav = window.navigator;
    var vendorName = winNav.vendor;
    var isOpera = typeof window.opr !== "undefined";
    var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
    var isIOSChrome = winNav.userAgent.match("CriOS");

    if (isIOSChrome) {
    // is Google Chrome on IOS
    } else if(
    isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false
    ) {
        return true;
    } else { 
        return false;
    }
}

/*
function enableAudio() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        console.log('You let me use your mic!')
      })
      .catch(function(err) {
        console.log('No mic for you!')
      });

}
*/
/*navigator.mediaDevices.getUserMedia({ audio: true, video: true })
.then(function(stream) {
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  microphone = audioContext.createMediaStreamSource(stream);
  javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

  analyser.smoothingTimeConstant = 0.8;
  analyser.fftSize = 1024;

  microphone.connect(analyser);
  analyser.connect(javascriptNode);
  javascriptNode.connect(audioContext.destination);
  javascriptNode.onaudioprocess = function() {
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      var values = 0;

      var length = array.length;
      for (var i = 0; i < length; i++) {
        values += (array[i]);
      }

      var average = values / length;

    console.log(Math.round(average));
    // colorPids(average);
  }
  })
  .catch(function(err) {
    /* handle the error */
//});*/
