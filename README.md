Example: http://codepen.io/spencerthayer/pen/pJZGVx

## How to detect Key Events

```javascript
$(window).on("keydown", function(event){
```

```javascript
var osc = {};

$(window).keydown(function(event) {
  var code = (event.keyCode ? event.keyCode : event.which);
  if(osc[code])
    return;
  $("li[data-code='"+code+"']").addClass("active")
  var key = $("li[data-code='"+code+"']").data("key");
  var code = $("li[data-code='"+code+"']").data("code");
  console.log("KEYON:" + key + "/" + code + "@" + event.timeStamp);
  startSound(code);
});

$(window).keyup(function(event) {
  var code = (event.keyCode ? event.keyCode : event.which);
  $("li[data-code='"+code+"']").removeClass("active")
  var key = $("li[data-code='"+code+"']").data("key");
  var code = $("li[data-code='"+code+"']").data("code");
  console.log("KEYOFF:" + key + "/" + code + "@" + event.timeStamp);
  if(!osc[code])
    return;
  stopSound(code);
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
function startSound(key) {
    ran = Math.floor((Math.random()*500)+10);
    var o = osc[key] = new Tone.Oscillator(ran, "triangle")
    env = new Tone.AmplitudeEnvelope();
        o.connect(env);
        env.toMaster();
        o.start();
        env.triggerAttack();
}
function stopSound(key) {
    env.triggerRelease();
    osc[key].stop();
    osc[key] = 0;
}
```
