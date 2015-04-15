'use strict';
var _ = require('lodash');
var generators = require('yeoman-generator');

var config = {
  writing: BuildModule
};

module.exports = generators.NamedBase.extend(config);

//Implementation ---

function BuildModule() {
  var self = this;
  var name = self.name;
  var mod = self.config.get('name');
  var dest = self.destinationPath('client/src/' + name + '/');

  self.fs.copyTpl(self.templatePath('module.js'), dest + name + '.module.js', {module: mod, name: name});
  self.fs.copyTpl(self.templatePath('ctrl.js'), dest + name + '.ctrl.js', {module: mod, name: name, Name: _.capitalize(name)});
  self.fs.copy(self.templatePath('tpl.scss'), dest + name + '.scss');
  self.fs.copy(self.templatePath('tpl.html'), dest + name + '.html');
}
