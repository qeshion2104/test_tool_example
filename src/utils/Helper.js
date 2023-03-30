class Helper {
  /**
   * used to manually delay process for duration times.
   * @param {number} duration
   * @returns {Promise<null>}
   */
  static wait(duration) {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, duration);
    });
  }

  /**
   * get all prototype of one object as string[].
   * @param {any} obj
   * @returns {Array<string>}
   */
  static props(obj) {
    var p = [];
    for (; obj != null; obj = Object.getPrototypeOf(obj)) {
      var op = Object.getOwnPropertyNames(obj);
      for (var i = 0; i < op.length; i++)
        if (p.indexOf(op[i]) == -1) p.push(op[i]);
    }
    return p;
  }
}

module.exports = { Helper };
