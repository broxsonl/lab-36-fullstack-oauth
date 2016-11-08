'use strict';

require('./_landing.scss');

module.exports = ['$log', '$rootScope', '$location', 'authService', LandingController];

//export rootScope above but not injecting it into the LandingController?
function LandingController($log, $rootScope, $location, authService) {
  $log.debug('init landingCtrl');
  let url = $location.url();
  let query = $location.search();
  this.showSignup = url === '/landing#signup' || url === '/landing';

  if(query.token) {
    authService.setToken(query.token)
    .then( () => {
      $location.path('/#/landing');
    });
  }

  $rootScope.$on('locationChangeSuccess', () => {
    let query = $location.search();
    if(query.token) {
      authService.setToken(query.token)
      .then( () => {
        $location.path('/#/landing');
      });
    }
  });

  // OAuth below
  let googleAuthBase = 'https://accounts.google.com/o/oauth2/v2/auth';
  let googleAuthResponseType = 'response_type=code';
  let googleAuthClientID = `client_id=${__GOOGLE_CLIENT_ID__}`;
  let googleAuthScope = 'scope=profile%20email%20openid';
  let googleAuthRedirectURI = 'redirect_uri=http://localhost:3000/api/auth/oauth_callback';
  let googleAuthAccessType = 'access_type=offline'; // allows us to get a refresh token
  let googleAuthPrompt = 'prompt=consent';

  this.googleAuthURL = `${googleAuthBase}?${googleAuthResponseType}&${googleAuthClientID}&${googleAuthScope}&${googleAuthRedirectURI}&${googleAuthAccessType}&${googleAuthPrompt}`;
}
