/**
 * @fileoverview require filename to match component name
 * @author Tom MacWright
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/filename-matches-component');
var RuleTester = require('eslint').RuleTester;

require('babel-eslint');

var parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('filename-matches-component', rule, {

  valid: [{
    code: [
      'var Hello = React.createClass({',
      '  displayName: \'Hello\',',
      '  render: function() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n'),
    filename: '<text>',
    parserOptions: parserOptions
  }, {
    code: [
      'var Hello2 = React.createClass({',
      '  render: function() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});',
      'var Hello = React.createClass({',
      '  displayName: \'Hello\',',
      '  render: function() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n'),
    filename: 'Hello.js',
    parserOptions: parserOptions
  }, {
    code: [
      'var Hello = React.createClass({',
      '  displayName: \'Hello\',',
      '  render: function() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n'),
    filename: 'Hello.js',
    parserOptions: parserOptions
  }, {
    code: [
      'class Hello extends React.Component {',
      '  render() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '}',
      'Hello.displayName = \'Hello\''
    ].join('\n'),
    filename: 'Hello.js',
    parserOptions: parserOptions
  }, {
    code: [
      'class Hello extends React.Component {',
      '  static get displayName() {',
      '    return \'Hello\';',
      '  }',
      '  render() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '}'
    ].join('\n'),
    filename: 'Hello.js',
    parserOptions: parserOptions
  }, {
    code: [
      'var BearsSpiders = () => (<div>Hello {this.props.name}</div>);'
    ].join('\n'),
    options: [{
    }],
    filename: 'BearsSpiders.js',
    parserOptions: parserOptions
  }, {
    code: [
      'function FolksWolves() { return (<div>Hello {this.props.name}</div>) };'
    ].join('\n'),
    options: [{
    }],
    filename: 'FolksWolves.js',
    parserOptions: parserOptions
  }, {
    code: [
      'var DontLook = function() { return (<div>Hello {this.props.name}</div>) };'
    ].join('\n'),
    options: [{
    }],
    filename: 'DontLook.js',
    parserOptions: parserOptions
  }, {
    code: [
      'module.exports.JohnSmith = function() { return (<div>Hello {this.props.name}</div>) };'
    ].join('\n'),
    options: [{
    }],
    filename: 'JohnSmith.js',
    parserOptions: parserOptions
  }, {
    code: [
      'var Hello = React.createClass({',
      '  render: function() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
    }],
    filename: 'Hello.js',
    parserOptions: parserOptions
  }],

  invalid: [{
    code: [
      'var Component = React.createClass({',
      '  displayName: "hello",',
      '  render: function() {',
      '    return React.createElement("div", {}, "text content");',
      '  }',
      '});'
    ].join('\n'),
    parserOptions: parserOptions,
    filename: 'Hi.js',
    errors: [{
      message: 'Component name Component does not match filename Hi'
    }]
  }, {
    code: [
      'var Hello = React.createClass({',
      '  render: function() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
    }],
    filename: 'Hi.js',
    parserOptions: parserOptions,
    errors: [{
      message: 'Component name Hello does not match filename Hi'
    }]
  }]
});
