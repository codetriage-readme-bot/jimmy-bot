const prompt = require('prompt')
const think = require('./think')

function test() {
  prompt.start()
  prompt.get(['input'], function (err, result) {
    think(result.input, 7618364891, function (res) {
      console.log(res)
      console.log('\n')
      test()
    })
  })
}
test()
