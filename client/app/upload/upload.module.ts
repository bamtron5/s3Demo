namespace app.modules {
  const name = 'upload';
  angular.module('app.upload', [])
    .component(name, {
      templateUrl: '/client/app/upload/upload.html',
      controller: app.controllers.UploadController,
      controllerAs: 'vm'
    });
}
