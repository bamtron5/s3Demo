///<reference types="angular" />

namespace app.modules {
  const name = 'home';

  angular.module('app.home', ['app.upload'])
    .component(name, {
      templateUrl: '/client/app/home/home.html',
      controller: app.controllers.Home,
      controllerAs: 'vm'
    });

}
