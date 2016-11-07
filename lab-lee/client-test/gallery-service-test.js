'use strict';

let url = 'http://localhost:3000/api';

describe('testing gallery service', function() {
  // beforeEach mocks the demoApp module
  // beforeEach mocks the service

  beforeEach( () => {
    angular.mock.module('leeGram');
    angular.mock.inject((authService, galleryService, $httpBackend) => {
      this.authService = authService;
      authService.setToken('12345678901234');
      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('testing galleryService.createGallery', () => {

    it('should return a gallery', () => {

      let galleryData = {
        name: 'exampleGallery',
        desc: 'stuff',
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 12345678901234',
      };

      this.$httpBackend.expectPOST(`${url}/gallery`, galleryData, headers)
      .respond(200, {_id: '5678', username: 'slugbyte', name: galleryData.name, desc: galleryData.desc, pics: []});

      this.galleryService.createGallery(galleryData)
      .then(gallery => {
        expect(gallery._id).toBe('5678');
        expect(gallery.username).toBe('slugbyte');
        expect(gallery.name).toBe('exampleGallery');
        expect(gallery.desc).toBe('stuff');
        expect(Array.isArray(gallery.pics)).toBe(true);
      })
      .catch( err => {
        expect(err).toBe(null);
      });
      this.$httpBackend.flush();
    });

  });

  describe('testing galleryService.deleteGallery(galleryID)', () => {

    it('should succeed in deleting a gallery', () => {
      // mock the request
      let galleryID = 'helloworld';
      let headers = {
        Authorization: 'Bearer 12345678901234',
        Accept: 'application/json, text/plain, */*',
      };
      // mock the server route
      this.$httpBackend.expectDELETE(`${url}/gallery/helloworld`, headers)
      .respond(204);

      this.galleryService.deleteGallery(galleryID);

      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.updateGallery(galleryID)', () => {

    it('should succeed in updating a gallery', () => {
      // mock the request
      let galleryID = 'helloworld';

      let galleryData = {
        name: 'exampleGallery',
        desc: 'stuff',
      };

      let headers = {
        Accept: 'application/json',
        Authorization: 'Bearer 12345678901234',
        'Content-Type': 'application/json',
      };
      // mock the server route
      this.$httpBackend.expectPUT(`${url}/gallery/helloworld`, galleryData, headers)
      .respond(200, {_id: '5678', username: 'slugbyte', name: galleryData.name, desc: galleryData.desc, pics: []});

      this.galleryService.updateGallery(galleryID, galleryData)
      .then( gallery => {
        expect(gallery.name).toBe(galleryData.name);
        expect(gallery.username).toBe('slugbyte');
        expect(gallery.desc).toBe(galleryData.desc);
      });

      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.fetchGalleries()', () => {

    it('should succeed in fetching all galleries', () => {
      // mock the request
      let headers = {
        Accept: 'application/json',
        Authorization: 'Bearer 12345678901234',
      };

      let galleryArray = [];

      for (var i = 0; i < 50; i++) {
        galleryArray.push(
          {
            name: 'exampleGallery' + i,
            desc: 'stuff' + i,
          }
        );
      }
      // mock the server route
      this.$httpBackend.expectGET(`${url}/gallery/?sort=dsc`, headers)
      .respond(200, galleryArray);

      this.galleryService.fetchGalleries()
      .then( galleries => {
        expect(galleries.length).toBe(50);
        expect(Array.isArray(galleries)).toBe(true);
      })
      .catch( err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();
    });
  });

});
