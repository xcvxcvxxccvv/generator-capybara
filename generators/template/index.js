'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs'),
path = require('path');

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();
    var prompts = [{
      type: 'input',
      name: 'objname',
      message: 'What is the template name?',
      default: function () {
        return 'templateCapy';
      },
    }];
    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.features = props.features || [];

      this.props.features.forEach(function (feature) {
        this.props[feature] = true;
      }.bind(this));
      done();
    }.bind(this));
  },
  writing: function () {
    var folders = getDirectories(process.cwd());
    var isStyl  = folders.some(function(e){
      return e === 'styl';
    });
    var folderStyl = isStyl ? '': 'src/'
    this.fs.copy(
      this.templatePath('../../basestyl/obj.styl'),
      this.destinationPath(folderStyl+'styl/patterns/06-templates/_'+this.props.objname+'.styl')
    );
  }
});
