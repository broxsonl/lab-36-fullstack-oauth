'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService) {
  $log.debug('init galleryService');

  let service = {};

  service.galleries = [];

  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery()');

    return authService.getToken()
    .then( token => {

      let url = `${__API_URL__}/api/gallery`;
      let config = {
        headers: {
          Accept: 'application/json', //What we expect to be sent back to us
          'Content-Type': 'application/json', //What we're sending
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.post(url, gallery, config);
    })
    .then( res => {
      $log.log('successful gallery creations');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery; //resolves the promise
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateGallery = function (galleryID, galleryData) {
    $log.debug('galleryService.updateGallery()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      return $http.put(url, galleryData, config);
    })
    .then( res => {
      let gallery = res.data;
      for (let i = 0; i< service.galleries.length; i++) {
        if(galleryID === service.galleries[i]._id) {
          service.galleries[i] = gallery;
          break;
        }
      }
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGallery = function (galleryID) {
    $log.debug('galleryService.deleteGallery()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then ( () => {
      $log.log(`succesful deletion of gallery ${galleryID}`);
      for(let i = 0; i < service.galleries.length; ++i) {
        if(galleryID === service.galleries[i]._id) {
          service.galleries.splice(i, 1);
          break;
        }
      }
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleries()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/?sort=dsc`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('successful fetch user galleries');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  return service;
}
