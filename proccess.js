const mongoose = require('mongoose')
mongoose.connect('mongodb://jshom:jshom@ds047146.mlab.com:47146/jimmy-bot')
let db = mongoose.connection
db.on('open', function () {
  console.log('mdb: connected')
})

let Person = mongoose.model()

String.prototype.check = function (regex) {
  return this.search(regex) != -1
}

let tasks = []

function createTask (person, description) {
  tasks.push({
    person,
    description,
    completion : false
  })
}

let pros = function (txt) {

  if (txt.check(/hi|hey|sup|how you doing|suh/igm)) return 'hey how you doing'

  if (txt.check(/good|meh|ok|not much| sweet/igm)) return 'cool'

  if (txt.check(/bye|cya|l8r/igm)) return 'cya later aligator'

  if (txt.check(/clear|delete all/igm)) {
    tasks.length = 0
    return 'you got it! All cleared'
  }

  if (txt.check(/tell.*to/im)) {
    createTask(txt.split(' ')[1], txt.split('to')[1].trim())
    return 'ok, telling ' + txt.split(' ')[1] + ' to ' + txt.split('to')[1].trim()
  }

  if (txt.check(/tasks|assignments|list/im)) {
    return tasks.length != 0? tasks.map(task => task.person + ': ' + task.description).join('\n') : 'none, ask away'
  }

  if (txt.check(/(remove.*)|(done with.*)|(finished the.*)/igm)) {
    task.find(task => task.description.check(txt.replace(/remove|done with|finished the/)[1].trim())).completion = true
    return 'ok, I\' trust you, saying that you finished this: ' + task.find(task => task.description.check(txt.replace(/remove|done with|finished the/)[1].trim())).description
  }

  return 'sorry, not smart enough yet'
}
module.exports = pros
