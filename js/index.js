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

// Detect Key Events

$(window).keydown(function(event) {
  // USE THIS TO GET THE VAULE OF KEYS
  console.log("KEYVALUE: " + event.key + ":" + event.keyCode + "@" + event.timeStamp);
});

$(window).keydown(function(event) {
  code = (event.keyCode) ? event.keyCode : event.which;
  $("li[data-code='"+code+"']").addClass("active")
  var key = $("li[data-code='"+code+"']").data("key");
  var code = $("li[data-code='"+code+"']").data("code");
  console.log("KEYON:" + key + "/" + code + "@" + event.timeStamp);
});

$(window).keyup(function(event) {
  code = (event.keyCode) ? event.keyCode : event.which;
  $("li[data-code='"+code+"']").removeClass("active")
  var key = $("li[data-code='"+code+"']").data("key");
  var code = $("li[data-code='"+code+"']").data("code");
  console.log("KEYOFF:" + key + "/" + code + "@" + event.timeStamp);
});

// Detect Mouse Events
$("li").mousedown(function(event) {
  $(this).addClass("active");
  var key = $(this).data("key");
  var code = $(this).data("code");
  console.log("MOUSEON:" + key + "/" + code + "@" + event.timeStamp);
});

$("li").mouseup(function(event) {
  $(this).removeClass("active");
  var key = $(this).data("key");
  var code = $(this).data("code");
  console.log("MOUSEOFF:" + key + "/" + code + "@" + event.timeStamp);
});
