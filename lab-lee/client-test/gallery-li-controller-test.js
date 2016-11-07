'use strict';

let url = 'http://localhost:3000/api';

describe('testing gallery-li-controller', function() {

  beforeEach( () => {

    angular.mock.module('leeGram');
    angular.mock.inject( ($rootScope, $componentController, authService, $httpBackend) => {
      authService.setToken('thetoken');
      this.$httpBackend = $httpBackend;
      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
    });
  });

  afterEach( () => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
    this.authService.logout();
  });

  describe('testing #deleteDone', () => {

    it('should call deleteDone', () => {

      let mockBindings = {
        gallery: {
          _id: '65432ONE',
          name: 'stuff',
          desc: 'information',
          pics: [],
        },
        deleteDone: function(data) {
          expect(data.galleryData._id).toEqual(mockBindings.gallery._id);
          expect(data.galleryData.name).toEqual(mockBindings.gallery.name);
          expect(data.galleryData.desc).toEqual(mockBindings.gallery.desc);
          expect(Array.isArray(data.galleryData.pics)).toBe(true);
        },
      };

      let galleryLICtrl = this.$componentController('galleryLi', null, mockBindings);

      galleryLICtrl.deleteDone({galleryData: galleryLICtrl.gallery});

      this.$rootScope.$apply();

    });
  });

  it('should call deleteDone with gallery after galleryDelete', () => {

    let headers = {
      Authorization: 'Bearer thetoken',
      Accept: 'application/json, text/plain, */*',
    };

    let mockBindings = {
      gallery: {
        _id: '65432ONE',
        name: 'stuff',
        desc: 'information',
        pics: [],
      },
      deleteDone: function(data) {
        expect(data.galleryData._id).toEqual(mockBindings.gallery._id);
        expect(data.galleryData.name).toEqual(mockBindings.gallery.name);
        expect(data.galleryData.desc).toEqual(mockBindings.gallery.desc);
        expect(Array.isArray(data.galleryData.pics)).toBe(true);
      },
    };

    this.$httpBackend.expectDELETE(`${url}/gallery/65432ONE`, headers)
    .respond(204);

    let galleryLICtrl = this.$componentController('galleryLi', null, mockBindings);
    galleryLICtrl.deleteGallery();

    this.$httpBackend.flush();
    this.$rootScope.$apply();

  });


});
