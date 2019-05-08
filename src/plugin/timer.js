class Timer {
  constructor() {
    this.count = 0;
    this.start = setInterval(() => {
      this.count++;
    }, 1);
    this.stop = () => {
      clearInterval(this.start);
      this.count /= 1000;
    };
  }
}

module.exports = Timer;
