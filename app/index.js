/**
 * Created by Rahul on 21/1/15.
 */

var generators = require('yeoman-generator');

var config = {
  writing: BuildProject
};

module.exports = generators.NamedBase.extend(config);

//Implementation ---

function BuildProject() {
  'use strict';
  var self = this;
  var name = self.name;
  var dest = self.destinationPath(name);

  self.fs.copyTpl(self.templatePath('project/**/*.{js,scss,html,json,conf}'), dest, {name: name});
  self.fs.copy(self.templatePath('project/**/.[^D]*'), dest);
}
