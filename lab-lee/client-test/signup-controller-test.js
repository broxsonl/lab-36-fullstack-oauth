'use strict';

let url = 'http://localhost:3000/api';

describe('testing signupCtrl', function() {

  beforeEach( () => {
    angular.mock.module('leeGram');
    angular.mock.inject( ($rootScope, $location, authService, $httpBackend, $componentController) => {
      this.$rootScope = $rootScope;
      this.$location = $location;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
      this.$componentController = $componentController;
    });
  });

  afterEach( () => {
    this.authService.logout();
    this.$httpBackend.verifyNoOutstandingRequest;
    this.$httpBackend.verifyNoOutstandingExpectation;
  });

  describe('testing signupCtrl.signup()', () => {

    it('with valid url and headers', () => {

      let mockUser = {
        username: 'SolidSnake',
        email: 'pliskin@snake.com',
        password: 'sneaking',
      };

      let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      this.$httpBackend.expectPOST(`${url}/signup`, mockUser, headers)
      .respond(200, 'mockToken');

      let signupCtrl = this.$componentController('signup');

      signupCtrl.signup(mockUser);


      this.$httpBackend.flush();

      expect(this.$location.url()).toEqual('/home');

      this.$rootScope.$apply();

    });
  });
});
