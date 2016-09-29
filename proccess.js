String.prototype.check = function (regex) {
  return this.search(regex) != -1
}

let tasks = []

function createTask (person, description) {
  tasks.push({
    person,
    description
  })
}

let pros = function (txt) {

  if (txt.check(/hi|hey|sup|how you doing|suh/igm)) return 'hey wasap!'

  if (txt.check(/good|meh|ok|not much/igm)) return 'cool'

  if (txt.check(/bye|cya|l8r/igm)) return 'cya later aligator'

  if (txt.check(/tell.*to/im)) {
    createTask(txt.split(' ')[1], txt.split('to')[1].trim())
    return 'ok, telling ' + txt.split(' ')[1] + ' to ' + txt.split('to')[1].trim()
  }

  if (txt.check(/tasks|assignments/im)) return tasks.map(task => task.person + ': ' + task.description).join('\n')

  return 'sorry, not smart enough yet'
}
module.exports = pros
