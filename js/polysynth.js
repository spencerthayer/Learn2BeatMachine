"use strict";
var octave = 2;
var keys = [];
var prevKeyCode = 0;
var keyCodeToFrequency = function() {
var notes = {
    53: "Al",
    54: "Bl",
    55: "Cl",
    56: "Dl",
    57: "El",
    48: "Fl",
    173: "Gl"
  };
  var noteToFrequency = Tone.prototype.noteToFrequency;
  return function(keyCode) {
    var note = notes[keyCode];
    if (!note) {
      return;
    }
    return noteToFrequency(note.replace("l", octave).replace("u", octave + 1));
  };
}();
var onKeyDown = function() {
  var listener = undefined;
  return function(synth) {
    document.removeEventListener("keydown", listener);
    listener = function(event) {
      var keyCode = event.keyCode;
      if (!keys[keyCode]) {
        keys[keyCode] = true;
        var frequency = keyCodeToFrequency(keyCode);
        if (frequency) {
          synth.triggerAttack(frequency);
          prevKeyCode = keyCode;
        }
      }
    };
    document.addEventListener("keydown", listener);
  };
}();
var onKeyUp = function() {
  var listener = undefined;
  var prev = undefined;
  return function(synth) {
    if (prev) {
      prev.triggerRelease();
    }
    document.removeEventListener("keyup", listener);
    prev = synth;
    listener = function(event) {
      var keyCode = event.keyCode;
      if (keys[keyCode]) {
        keys[keyCode] = false;
        var frequency = keyCodeToFrequency(keyCode);
        if (synth instanceof Tone.PolySynth) {
          synth.triggerRelease(frequency);
        } else if (frequency && keyCode === prevKeyCode) {
          synth.triggerRelease();
        }
      }
    };
    document.addEventListener("keyup", listener);
  };
}();
// document.addEventListener("keydown", function(event) {
//   if (event.keyCode === 90) {
//     octave = Math.max(octave - 1, 0);
//   }
//   if (event.keyCode === 88) {
//     octave = Math.min(octave + 1, 9);
//   }
// });
(function() {
    var synth = new Tone.PolySynth(6, Tone.MonoSynth);
    synth.toMaster();
    synth.volume.value = -10;
    onKeyDown(synth);
    onKeyUp(synth);
  }
  ()
);
