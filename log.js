const EventEmitter = require('events');
const util = require('util');

class Logger {
  log = msg => {
    console.log(msg);
    this.emit('some_event', { id: 1, text: 'Hello!' });
  };
}

// This line is equivalent to "class Logger extends EventEmitter" in ES6 class syntax.
// Inheriting EventEmitter properties and methods into Logger class
util.inherits(Logger, EventEmitter);

module.exports = Logger;
