const Observer = require("./Observer");
const Publisher = require("./Publisher");
// [@jest/globals] Identifier 'jest' has already been declared
// https://github.com/facebook/jest/issues/9920
// A: --inject-globals false
const {
  describe,
  expect,
  it,
  jest,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} = require("@jest/globals");
describe("matching cities to foods", () => {
  let ob = new Observer();
  let pub = new Publisher();
  const spyUpdate = jest.spyOn(Observer.prototype, "update");

  beforeEach(() => {
    pub.removeObserver(ob);
    pub.clear();
    spyUpdate.mockClear();
  });
  afterEach(() => {});
  beforeAll(() => {});
  afterAll(() => {});

  it("observer update should be called once after notify", () => {
    pub.addObserver(ob);
    pub.notifyObservers("test message");

    expect(pub.observers.length).toEqual(1);
    expect(spyUpdate).toHaveBeenCalledTimes(1);
  });

  it("publisher can not add same observer twice", () => {
    pub.addObserver(ob);
    pub.addObserver(ob);
    expect(pub.observers.length).toEqual(1);
  });

  it("publisher only notify observer when data change", () => {
    pub.addObserver(ob);
    pub.notifyObservers("test message");
    pub.notifyObservers("test message");
    expect(spyUpdate).toHaveBeenCalledTimes(1);
  });

  it("publisher only notify observer when data change (using deep compare)", () => {
    pub.addObserver(ob);
    pub.notifyObservers({ a: 1 });
    pub.notifyObservers({ a: 1 });
    expect(spyUpdate).toHaveBeenCalledTimes(1);
  });
});
