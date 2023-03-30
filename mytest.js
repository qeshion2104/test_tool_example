// @ts-check
const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");
const chrome = require("selenium-webdriver/chrome");
const googleDriverConfig = require("./src/configs/googleDriver.config.json");
const { Helper } = require("./src/utils/Helper");

function getDriverPath(type) {
  const platform = process.platform;
  let driverPath = "";
  switch (type) {
    default:
      driverPath =
        googleDriverConfig[platform] || googleDriverConfig["default"];
      break;
  }

  return driverPath.replace(/\//g, path.sep);
}

function highLight(driver, element) {
  driver.executeScript("arguments[0].style.backgroundColor = 'red'", element);
}

async function waitUntilElementClickable(driver, element, timeout) {
  await driver.wait(until.elementIsVisible(element), timeout);
  await driver.wait(until.elementIsEnabled(element), timeout);
}

async function waitAndGetElement(driver, query, timeout) {
  await driver.wait(until.elementIsVisible(driver.findElement(query)), timeout);
  const element = await driver.findElement(query);
  return element;
}

// 1. Unsuccessful login using email
// 2. Successful login using email
// 3. Login and write a note followed by a logout
// 4. Login again and make sure you open the note create in step 3

async function testCase1(driver) {
  // login btn
  // <a href="https://www.evernote.com/Login.action" data-ga-navigation-location="header">Log In</a>

  // handle StaleElementReferenceError error....
  try {
    const loginBtns = await driver.findElements(
      By.xpath('//a[@href="https://www.evernote.com/Login.action"]')
    );
    const loginBtn = loginBtns[2];
    highLight(driver, loginBtn);
    await waitUntilElementClickable(driver, loginBtn, 5000);
    // go to login page
    await loginBtn.click();
  } catch (err) {
    if (err.toString().indexOf("StaleElementReferenceError") !== -1) {
      return;
    } else {
      console.error();
    }
  }

  //   div[@id="email-wrapper"]//input
  const yourEmail = "your email";
  const yourPass = "123";
  const emailInput = await waitAndGetElement(driver, By.id("username"), 5000);
  highLight(driver, emailInput);

  // input email
  await waitUntilElementClickable(driver, emailInput, 5000);
  await emailInput.sendKeys(yourEmail);

  // click login
  const loginBtn = await waitAndGetElement(driver, By.id("loginButton"), 5000);
  await loginBtn.click();

  // input pass
  const passwordInput = await waitAndGetElement(
    driver,
    By.id("password"),
    5000
  );
  await passwordInput.sendKeys(yourPass);

  // click sign in
  const signIn = await waitAndGetElement(driver, By.id("loginButton"), 5000);
  await signIn.click();

  // you failed do somthing here!!!
}

async function example() {
  console.warn(process.platform);

  // init driver
  const service = new chrome.ServiceBuilder(getDriverPath("chrome"));
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeService(service)
    .build();

  try {
    // Navigate to the website
    await driver.get("https://evernote.com/");
    await testCase1(driver);

    // leave time to debug, should be remove after finish debug
    await Helper.wait(100000);
  } finally {
    // leave time to debug, should be remove after finish debug
    await Helper.wait(100000);
    // Quit the driver
    await driver.quit();
  }
}

/**
 *
 * @param {any} obj
 * @returns {Array<string>}
 */
function props(obj) {
  var p = [];
  for (; obj != null; obj = Object.getPrototypeOf(obj)) {
    var op = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < op.length; i++)
      if (p.indexOf(op[i]) == -1) p.push(op[i]);
  }
  return p;
}

// example();

class InterfaceAnimal {
  /**
   * public param
   * @date 3/24/2023 - 1:41:09 PM
   *
   * @type {number}
   */
  publicParam = 2;

  /**
   * public param
   * @date 3/24/2023 - 1:41:06 PM
   *
   * @type {number}
   */
  #privateParam = 1;

  speak() {
    throw new Error("speak method must be implemented in derived classes");
  }
  showHidden() {
    const proto = Object.getPrototypeOf(this);
    console.log(props(this), this.publicParam, this.#privateParam);
  }
}

class A extends InterfaceAnimal {
  constructor() {
    super();
    this.publicParam = 11;
  }

  speak() {
    console.log(this.publicParam);
  }
}

class B extends A {
  constructor() {
    super();
    this.publicParam = 22;
  }
}

let a = new A();
let b = new B();

a.speak();
a.showHidden();
b.speak();
b.showHidden();

const boxPrototype = {
  getValue() {
    return this.value;
  },
};

const boxes = [
  { value: 1, __proto__: boxPrototype },
  { value: 2, __proto__: boxPrototype },
  { value: 3, __proto__: boxPrototype },
];
for (let i = 0; i < boxes.length; i++) {
  console.log(boxes[i].getValue());
}

class C {
  /**
   * @type {InterfaceAnimal}
   */
  test;

  /**
   *
   * @param {InterfaceAnimal} i
   */
  constructor(i) {
    this.test = i;
  }

  show() {
    this.test.speak();
  }

  static swww() {
    console.warn("Q");
  }
}

let c = new C(a);
c.show();
C.swww();
