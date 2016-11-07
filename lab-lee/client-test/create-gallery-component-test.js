'use strict';

let url = 'http://localhost:3000/api';

describe('testing createGalleryCtrl', function() {

  beforeEach( () => {
    angular.mock.module('leeGram');
    angular.mock.inject( ($rootScope, $componentController, galleryService, authService, $httpBackend) => {
      authService.setToken('atoken');
      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach( () => {
    this.authService.logout();
    this.$httpBackend.verifyNoOutstandingRequest();
    this.$httpBackend.verifyNoOutstandingExpectation();
  });

  describe('testing #galleryService.createGallery()', () => {

    it('should return a gallery', () => {

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer atoken',
      };

      let gallery = {
        name: 'galleryStuff',
        desc: 'galleryDesc',
      };

      let createGalleryCtrl = this.$componentController('createGallery');

      this.$httpBackend.expectPOST(`${url}/gallery`, gallery, headers)
      .respond(200);

      createGalleryCtrl.gallery = {
        name: 'galleryStuff',
        desc: 'galleryDesc',
      };

      createGalleryCtrl.createGallery();

      this.$httpBackend.flush();

      expect(createGalleryCtrl.gallery.name).toEqual(null);
      expect(createGalleryCtrl.gallery.desc).toEqual(null);
      this.$rootScope.$apply();
    });
  });

});
