"use strict";

const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");
const circle = document.querySelector("circle");

const perimeter = parseFloat(circle.getAttribute("r") * 2 * Math.PI);
circle.setAttribute("stroke-dasharray", perimeter);

let duration;

const timer = new Timer(durationInput, startButton, pauseButton, resetButton, {
  onStart(totalDuration) {
    console.log("Timer started");
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
    // currentOffSet = currentOffSet - 1;
  },
  reset() {
    //  circle.getAttribute("r")=circle.setAttribute(perimeter)
  },
  pause() {
    // circle.setAttribute("stroke-dashoffset", perimeter);
  },
  onComplete() {
    console.log("Timer is completed");
  },
});
