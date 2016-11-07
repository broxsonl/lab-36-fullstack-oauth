'use strict';

let url = 'http://localhost:3000/api';

describe('testing loginCtrl', function() {

  beforeEach( () => {
    angular.mock.module('leeGram');
    angular.mock.inject( ($rootScope, $componentController, authService, $httpBackend, $location, $window) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
      this.$location = $location;
      this.$window = $window;
    });
  });

  afterEach( () => {
    this.authService.logout();
    this.$httpBackend.verifyNoOutstandingRequest();
    this.$httpBackend.verifyNoOutstandingExpectation();
  });

  describe('testing #loginCtrl.login()', () => {

    it('with valid url and headers', () => {

      let user = {
        username: 'jimbobguy',
        password: 'secretword',
      };

      let base64 = this.$window.btoa(`${user.username}:${user.password}`);
      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      };

      this.$httpBackend.expectGET(`${url}/login`, headers)
      .respond(200, 'mockToken');

      let loginCtrl = this.$componentController('login');
      loginCtrl.user = user;
      loginCtrl.login();

      this.$httpBackend.flush();

      expect(this.$location.path()).toBe('/home');

      this.$rootScope.$apply();

    });
  });
});
