'use strict';

require('./_search-bar.scss');

module.exports = {
  template: require('./search-bar.html'),
  controllerAs: 'searchBarCtrl',
  bindings: {
    term: '=',
  },
};
