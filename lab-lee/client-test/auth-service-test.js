'use strict';

let url = 'http://localhost:3000/api';

describe('testing authorization service', function() {
  // beforeEach mocks the leeGram module
  // beforeEach mocks the service

  beforeEach( () => {
    angular.mock.module('leeGram');
    angular.mock.inject((authService, $httpBackend, $rootScope, $window) => {
      this.authService = authService;
      authService.setToken('12345678901234');
      this.$httpBackend = $httpBackend;
      this.$window = $window;
      this.$rootScope = $rootScope;
    });
  });

  afterEach( () => {
    this.authService.token = null;
    this.$window.localStorage.clear();
  });

  describe('testing #getToken()', () => {

    it('should return a token', () => {

      this.authService.token = 'the token';

      this.authService.getToken()
      .then( token => {
        expect(token).toEqual('the token');
      });
      this.$rootScope.$apply();
    });
  });

  // describe('testing #getToken()', () => {
  //
  //   it('should return a token on localStorage', () => {
  //
  //     this.$window.localStorage.setItem('token', 'the token');
  //
  //     this.authService.getToken()
  //     .then( token => {
  //       expect(token).toEqual('the token');
  //     })
  //     .catch( err => {
  //       expect(err);
  //     });
  //     this.$rootScope.$apply();
  //   });
  // });

  describe('testing authService.signup(user)', () => {

    it('should return a status 200 and a token', () => {

      let user = {
        username: 'Jimbobguy',
        email: 'stuff1234',
        password: 'secretstuff',
      };

      let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      this.$httpBackend.expectPOST(`${url}/signup`, user, headers)
      .respond(200, 'token1234');
      this.authService.signup(user)
      .then(token => {
        expect(token).toBe('token1234');
      })
      .catch( err => {
        expect(err).toBe(null);
      });
      this.$httpBackend.flush();
    });
  });

  describe('testing authService.login(user)', () => {

    it('should return a status 200 and a token', () => {

      let user = {
        username: 'Jimbobguy',
        password: 'secretstuff',
      };

      let base64 = this.$window.btoa(`${user.username}:${user.password}`);

      let headers = {
        'Accept': 'application/json',
        'Authorization': `Basic ${base64}`,
      };

      this.$httpBackend.expectGET(`${url}/login`, headers)
      .respond(200, 'token1234');

      this.authService.login(user)
      .then( token => {
        expect(token).toBe('token1234');
      })
      .catch( err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();

    });
  });

});
