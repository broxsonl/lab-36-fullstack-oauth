'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl',
};

function SignupController($log, $location, authService) {
  $log.debug('init signupCtrl');
// Stefanie, when you grade this, why are there promises usable below? Is it because the authService Service is being injected with the $q module that we're able to use them?
  this.signup = function(user){
    $log.debug('signupCtrl.signup()');
    authService.signup(user)
    .then( () => {
      $location.url('/home');
    });
  };
}
