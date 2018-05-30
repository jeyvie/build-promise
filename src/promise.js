module.exports = class Promise {

  constructor (init) {

    init(this.resolve.bind(this))

  }

  then (callback) {
    callback(this.value)
  }

  resolve (value) {
    this.value = value
  }

}