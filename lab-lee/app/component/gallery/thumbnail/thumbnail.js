'use strict';
require('./_thumbnail.scss');

module.exports = {
  template: require('./thumbnail.html'),
  controllerAs: 'thumbnailCtrl',
  controller: ['$log', 'picService', ThumbnailController],
  bindings: {
    pic: '<',
    gallery: '<',
  },
};

function ThumbnailController($log, picService) {
  $log.debug('init picService');

  this.deletePic = function() {
    $log.debug('ThumbnailCtrl.deletePic()');
    picService.deleteGalleryPic(this.gallery, this.pic);
  };
}
