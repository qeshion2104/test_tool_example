// Define an observer object that will be notified of changes to the publisher
class Observer {
  // Method called by the publisher to notify the observer of a change
  /**
   * @type {any} data
   */
  update(data) {
    console.log("The observer has been updated!");
  }
}

module.exports = Observer;
