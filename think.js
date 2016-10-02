const mongoose = require('mongoose')
const shortid = require('shortid')
const moment = require('moment')
mongoose.connect('mongodb://jshom:jshom@ds047146.mlab.com:47146/jimmy-bot')
let db = mongoose.connection
db.on('open', function () {
  //console.log('mdb: connected')
})

const Task = mongoose.model('Task',
  {
    _id           : String,
    bearer        : String,
    description   : String,
    time_created  : Number,
    time_finished : Number,
    completion    : Boolean
  }
)

String.prototype.check = function (regex) {
  return this.search(regex) != -1
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function createTask (person, description) {
  //console.log({person, description})
  let tsk = new Task({
    _id           : shortid.generate(),
    bearer        : person,
    description   : description,
    time_created  : moment().unix(),
    time_finished : -1,
    completion    : false
  })
  tsk.save(err => {
    //if (err) console.log(err)
  })
}

let pros = function (txt, user_id, callback) {

  if (txt.check(/\b(hi|hello|hey|sup|how you doing|suh)\b/igm)) {
    callback('hey how are you doing?')
  } else if (txt.check(/^(help|what can you do|what are you)/)) {
    callback('save a task: tell <name> to <task>\nfinish a task: done with <task>\nsee completed tasks: list completed\nsee new tasks: tasks/list/assignments')
  } else if (txt.check(/\b(good|meh|ok|not much)\b/igm)) {
    callback('cool')
  } else if (txt.check(/(^(cool|damn|swag|awesome|amazing|wow|sweet))|(cool|amazing)$/)) {
    callback('ye, swagalicious!')
  } else if (txt.check(/bye|cya|l8r/igm)) {
    callback('cya later aligator')
  } else if (txt.check(/(clear|finish)\slast/igm)) {
    Task.update({completion : false}, { $set : { completion : true }}, function (err, tasks) {
      callback('you got it, last task cleared')
    })
  } else if (txt.check(/(clear all)|(delete all)/igm)) {
    Task.find({completion : false}, {_id : 1}).exec((err, res) => {
      res.forEach(task_id => {
        Task.findByIdAndUpdate(task_id, {completion : true}, {upsert : false}, (err, res) => {
          if (err) {
            //console.log(err)
          }
        })
      })
      callback('alright, all cleared')
    })
  } else if (txt.check(/^tell.*to/im)) {
    createTask(txt.split(' ')[1].capitalizeFirstLetter(), txt.replace(/tell\b.*?\bto/im, '').trim())
    callback('ok, telling ' + txt.split(' ')[1].capitalizeFirstLetter() + ' to ' + txt.replace(/tell\b.*?\bto/im, '').trim())
  } else if (txt.check(/list\s(finished|completed|done)/)) {
    Task.find({completion : true}).sort('-time_created').limit(10).exec(function (err, tasks) {
      callback(tasks.length != 0? tasks.map(task => task.bearer + ': ' + task.description).join('\n') : 'none, no finshed tasks')
    })
  } else if (txt.check(/tasks|assignments|list/im)) {
    Task.find({completion : false}).exec(function (err, tasks) {
      callback(tasks.length != 0? tasks.map(task => task.bearer + ': ' + task.description).join('\n') : 'no new tasks, ask away')
    })
  } else if (txt.check(/(remove.*)|(done with.*)|(finished the.*)/igm)) {
    let t_description = new RegExp(txt.replace(/remove|done with (the)?|finished the/, '').trim())
    Task.findOneAndUpdate({description : t_description, completion : false}, {completion : true, time_finished : moment().unix()}, {upsert : false}, function (err, doc) {
      //console.log(doc)
      if (doc) {
        callback('aight, said ' + doc.bearer + ' finished ' + doc.description)
      } else {
        callback('aight, doesn\'t look like that exists, use *list* to see tasks')
      }
    })
  } else {
    callback('sorry, not smart enough yet')
  }
}
module.exports = pros
