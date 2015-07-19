// Define Global Variables
var SoundArray = [];
var SongArray = [];
var SongMap = {};
var SongLen = 1000;
var kit = "Default";
var record = false;
var play = false;
var startTime = 0;
var hours = 0;
var mins = 0;
var seconds = 0;
var millis = 0;

/* USE THIS TO GET THE VAULE OF KEYS * /
$(window).keydown(function(event) {
  console.log("KEYVALUE: " + event.key + ":" + event.keyCode + "@" + event.timeStamp);
});
/* END */

// Detect Key Events
// $(window).one("keydown", function(event){
$(window).keydown(function(event) {
  var code = (event.keyCode ? event.keyCode : event.which);
  $("li[data-code='"+code+"']").addClass("active")
  var key = $("li[data-code='"+code+"']").data("key");
  var code = $("li[data-code='"+code+"']").data("code");
  console.log("KEYON:" + key + "/" + code + "@" + event.timeStamp);
  startSound();
});

$(window).keyup(function(event) {
  var code = (event.keyCode ? event.keyCode : event.which);
  $("li[data-code='"+code+"']").removeClass("active")
  var key = $("li[data-code='"+code+"']").data("key");
  var code = $("li[data-code='"+code+"']").data("code");
  console.log("KEYOFF:" + key + "/" + code + "@" + event.timeStamp);
  stopSound();
});

// Detect Mouse Events
$("li").mousedown(function(event) {
  $(this).addClass("active");
  var key = $(this).data("key");
  var code = $(this).data("code");
  console.log("MOUSEON:" + key + "/" + code + "@" + event.timeStamp);
  startSound();
});

$("li").mouseup(function(event) {
  $(this).removeClass("active");
  var key = $(this).data("key");
  var code = $(this).data("code");
  console.log("MOUSEOFF:" + key + "/" + code + "@" + event.timeStamp);
  stopSound();
});

// Synthesis
function startSound() {
    ran = Math.floor((Math.random()*2000)+1);
    osc = new Tone.Oscillator(ran, "triangle")
    env = new Tone.AmplitudeEnvelope();
        osc.connect(env);
        env.toMaster();
        // osc.toMaster();
        osc.start();
        env.triggerAttack();
}
function stopSound() {
    env.triggerRelease();
    osc.stop();
}
