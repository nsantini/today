var $ = require('jquery');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Dispatcher = require('../dispatcher/Dispatcher');

var Store = assign({}, EventEmitter.prototype, {

  getAllTodos: function() {
    var objects = _.map(_.values(localStorage), function(todo) {
      try {
        return JSON.parse(todo);
      } catch (err) {
        return false;
      }
    });
    var todos = _.filter(objects, function(todo) {
      return todo && todo.id && todo.id.startsWith('today_');
    });

    var split = _.partition(todos, function(todo) {
      return Date.now() - todo.added < 24 * 60 * 60 * 1000;
    });

    _.each(split[1], function(todo) {
      localStorage.removeItem(todo.id);
    });

    return split[0];
  },

  emitChange: function() {
    this.emit('changed');
  },

  addListener: function(callback) {
    this.on('changed', callback);
  },

  removeListener: function(callback) {
    this.removeListener('changed', callback);
  },

  create: function(text) {
    var id = 'today_' + Date.now();
    localStorage.setItem(id, JSON.stringify({
      id: id,
      text: text,
      completed: false,
      added: Date.now()
    }));
  },

  toggle: function(id) {
    var todo = JSON.parse(localStorage.getItem(id));
    todo.completed = !todo.completed;
    localStorage.setItem(id, JSON.stringify(todo));
  },

  toggleAll: function() {
    _.each(_.filter(_.keys(localStorage), function(key) {
      return key.startsWith('today_');
    }), this.toggle);
  },

  delete: function(id) {
    localStorage.removeItem(id);
  },

  deleteAll: function() {
    _.each(_.filter(_.keys(localStorage), function(key) {
      return key.startsWith('today_');
    }), this.delete);
  }
});

Dispatcher.register(function(action) {
  switch (action.action) {
    case 'LOAD':
      Store.emitChange();
      break;

    case 'CREATE':
      Store.create(action.text);
      Store.emitChange();
      break;

    case 'TOGGLE':
      Store.toggle(action.id);
      Store.emitChange();
      break;

    case 'TOGGLEALL':
      Store.toggleAll();
      Store.emitChange();
      break;

    case 'DELETE':
      Store.delete(action.id);
      Store.emitChange();
      break;

    case 'DELETEALL':
      Store.deleteAll();
      Store.emitChange();
      break;
  }
});

module.exports = Store;
