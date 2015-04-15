/* jshint -W040 */
'use strict';
var yeoman = require('yeoman-generator');

var config = {
  buildProject: buildProject,
  install: runNpm
};

module.exports = yeoman.generators.NamedBase.extend(config);

//Implementation ---
function runNpm(){
  var done = this.async();
  this.npmInstall("", function(){
    console.log("\nEverything Setup !!!\n");
    done();
  });
}

function buildProject() {
  var self = this;
  var name = self.name;
  var dest = self.destinationPath();

  // Save app name
  self.config.set('name', name);

  self.fs.copyTpl(self.templatePath('project/**/*.{js,scss,html,json,conf}'), dest, {name: name});
  self.fs.copy(self.templatePath('project/**/.[^D]*'), dest);
}
