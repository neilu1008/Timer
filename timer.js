class Timer {
  constructor(durationInput, startButton, pauseButton, resetButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.resetButton = resetButton;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
      this.onReset = callbacks.onReset;
      this.onResume = callbacks.onResume;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
    this.resetButton.addEventListener("click", this.reset);

    this.start.isStarted = false; // Prevents error when user double clicks start button
    //false runs the function. True doesnt
  }
  start = () => {
    if (!this.start.isStarted) {
      if (this.onStart) {
        this.onStart(this.timeRemaining);
      }
      if (this.pause) {
        this.onStart(this.timeRemaining);
      }
      this.tick();
      this.interval = setInterval(this.tick, 50);
      this.start.isStarted = true;

      // clearInterval(timer);
      const circle = document.querySelector("circle");
    } ///////
  };
  pause = () => {
    clearInterval(this.interval);

    this.start.isStarted = false;
  };

  resume = () => {
    if (this.onResume) {
      this.onResume(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 20);
  };
  reset = () => {
    //resets the input back to zero and then replaces the perimeter
    //back to orginal length
    const currValue = document.getElementById("#duration");

    this.durationInput.value = currValue;
    const circle = document.querySelector("circle");
    circle.setAttribute("stroke-dashoffset", 0);
    // this.pause();
    // if (this.resetButton === "clicked") {
    //   return this.onReset(this.durationInput.value);
    // } else if (!this.resetButton) {
    //   this.start();
    // }
  };
  tick = () => {
    // const timeRemaining = this.timeRemaining;
    // this.durationInput.value = timeRemaining - 1;
    if (this.timeRemaining <= 0) {
      this.pause();
      //If commented out code below is activated perimeter will
      //return back to original length after time has ended
      // this.reset();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.05;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };
  //get retrives a variable and calls the function
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
