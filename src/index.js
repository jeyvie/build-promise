const Promise = require('./promise')


function doSomething() {
  return new Promise((resolve) => {
    resolve(42);
  })
}

doSomething().then((value) => {
  console.log(value);
})