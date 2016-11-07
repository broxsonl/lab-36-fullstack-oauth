'use strict';

let url = 'http://localhost:3000/api';

describe('testing edit-gallery controller', function() {

  beforeEach( () => {

    angular.mock.module('leeGram');
    angular.mock.inject( ($rootScope, $componentController, $httpBackend, authService) => {
      authService.setToken('1234');
      this.authService = authService;
      this.$httpBackend = $httpBackend;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
    });
  });

  afterEach( () => {
    this.authService.logout();
  });

  it('testing component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'stuff',
        desc: 'cool stuff',
      },
    };

    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);

    expect(editGalleryCtrl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(editGalleryCtrl.gallery.desc).toEqual(mockBindings.gallery.desc);

    this.$rootScope.$apply();
  });

  describe('testing #updateGallery', () => {

    it('should make a valid PUT request', () => {

      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'stuff',
          desc: 'cool stuff',
        },
      };

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPUT(`${url}/gallery/12345`, {_id: '12345', name: 'new stuff', desc: 'cool stuff'}, headers)
      .respond(200);

      editGalleryCtrl.gallery.name = 'new stuff';

      editGalleryCtrl.updateGallery();

      this.$httpBackend.flush();
      this.$rootScope.$apply();

    });

  });
});
