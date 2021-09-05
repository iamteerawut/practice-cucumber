const assert = require('assert')
const {Given, When, Then, AfterAll, BeforeAll} = require('@cucumber/cucumber')
const {Builder, By, Key} = require('selenium-webdriver')

const edge = require('selenium-webdriver/edge')
let service = new edge.ServiceBuilder(
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\MicrosoftWebDriver.exe'
)

const driver = new Builder()
  .setEdgeService(service)
  .forBrowser('MicrosoftEdge')
  .build()

BeforeAll(async function () {
  await driver.get('https://www.google.com/')
})

Given('I am on the Google search page', {timeout: 10000}, async function () {
  assert.equal(await driver.getTitle(), 'Google')
})

When('I search for {string}', async function (string) {
  const element = await driver.findElement(By.name('q'))
  element.sendKeys(string, Key.RETURN)
  await driver.sleep(1000)
})

Then('the page title should start with {string}', async function (string) {
  assert.equal(await driver.getTitle(), string)
})

AfterAll(async function () {
  await driver.quit()
})
