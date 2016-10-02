const prompt = require('prompt')
const proccess = require('./proccess')

function test() {
  prompt.start()
  prompt.get(['input'], function (err, result) {
    proccess(result.input, 7618364891, function (res) {
      console.log(res)
      console.log('\n')
      test()
    })
  })
}
test()
