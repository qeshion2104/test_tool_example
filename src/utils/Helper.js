class Helper {
  static wait(duration) {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, duration);
    });
  }
}

module.exports = { Helper };
