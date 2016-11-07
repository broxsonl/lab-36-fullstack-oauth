'use strict';

// build sass
require('./scss/main.scss');

// require node modules
const path = require('path');

// require npm modules
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');

// require angualr modules
// below libraries are angular modules to be injected into our modules to let us take advantage of routing, bootstrap, etc
const ngTouch = require('angular-touch'); // dependency of uiBootstrap
const ngAnimate = require('angular-animate'); // dependency of uiBootstrap
const uiRouter = require('angular-ui-router');
const ngFileUpload = require('ng-file-upload');
const uiBootstrap = require('angular-ui-bootstrap'); // allows angular to work with bootstrap

// create angular module
const leeGram = angular.module('leeGram', [ngTouch, ngAnimate,  uiRouter, uiBootstrap, ngFileUpload]);

// load config
let context = require.context('./config/', true, /.js$/);
context.keys().forEach( key => {
  leeGram.config(context(key));
});

// load view controllers
context = require.context('./view/', true, /.js$/); // true allows us to recursively look through a directory.
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js')); // name controller based on file name
  let module = context(key); // value of module.exports
  leeGram.controller(name, module);
});

// load services
context = require.context('./service/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key); // value of module.exports
  leeGram.service(name, module);
});

// load components
context = require.context('./component/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key); // value of module.exports
  leeGram.component(name, module);
});

// load directives
context = require.context('./directive/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key); // value of module.exports
  leeGram.directive(name, module);
});

// load filters
context = require.context('./filter/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key); // value of module.exports
  leeGram.filter(name, module);
});
