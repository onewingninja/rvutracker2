const { EventEmitter } = require('stream');

const EventEmmiter = import('events');

module.exports = class AppEventEmmiter extends EventEmitter{
    appEmit(message) {this.emit(message)}
}