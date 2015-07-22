# Learn 2 Beat Machine
#### An Operation Spark Lesson

See the Pen <a href='http://codepen.io/spencerthayer/pen/pJZGVx/'>Learn 2 Beat Machine </a>

<iframe height='401' scrolling='no' src='//codepen.io/spencerthayer/embed/pJZGVx/?height=401&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>

### How to detect Key Events

Now that we have the HTML setup it's time to start adding the keyCode data.
```javascript
$(window).keydown(function(event) {
  console.log("KEYVALUE: " + event.key + ":" + event.keyCode);
});
```

### Setup the first Key Listener
We need to create a variable named `osc` and give it a new empty object using `{}` as the value.
The curly brackets should not be confused with an Array but a simply a general Object, so `var myObject = {};` is equivalent to `var myObject = new Object();`.
```javascript
var osc = {};
```

Next we need to look for user interaction with the keyboard.
```javascript
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
```
```javascript
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
```
### Detecting Mouse Interaction with Screen Keys
```javascript
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
```
### Creating our First Random Sounds
```javascript
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
