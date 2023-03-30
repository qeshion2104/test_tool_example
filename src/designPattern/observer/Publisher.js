const Observer = require("./Observer");

class Publisher {
  /**
   * @type { Observer[] }
   */
  observers;

  /**
   * @type {any}
   */
  data;

  /**
   * Description placeholder
   * @date 3/24/2023 - 3:41:52 PM
   *
   * @type {*}
   */
  compareMethodType;

  constructor() {
    this.observers = [];
  }

  /**
   * Register an observer to the subject
   * @param {Observer} observer
   */
  addObserver(observer) {
    if (this.observers.indexOf(observer) === -1) {
      this.observers.push(observer);
    }
  }

  /**
   * Unregister an observer from the subject
   * @param {Observer} observer
   */
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  /**
   * @param {any} data
   * Notify all observers when the subject changes
   */
  notifyObservers(data) {
    if (data === this.data) {
      return;
    }
    this.data = data;
    this.observers.forEach((observer) => observer.update(data));
  }

  clear() {
    this.data = null;
  }
}

module.exports = Publisher;
