var React = require('react');
var TextInput = require('./TextInput.react');
var Actions = require('../actions/Actions');

var Header = React.createClass({

  render: function() {
    return (
      <header id="header">
        <div className="jumbotron">
          <h1>Today</h1>
          <p className="lead">A TODO app for the next 24hrs.</p>
          <TextInput
            id="new-todo"
            placeholder="What shall we do today?"
            onSave={this._onSave}
          />
        </div>
      </header>
    );
  },

  _onSave: function(text) {

    if (text.trim()) {
      Actions.create(text);
    }
  }
});

module.exports = Header;
