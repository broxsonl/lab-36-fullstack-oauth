'use strict';

module.exports = ['$logProvider', logConfig];

function logConfig($logProvider){
  $logProvider.debugEnabled(__DEBUG__); //DEBUG variable created by webpack
}
