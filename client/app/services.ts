namespace app.services {
  export class SignService {
    constructor (private $http) {}

    public sign (config) {
      return this.$http.get(`/api/sign?file-name=${config.fileName}&file-type=${config.fileType  }`);
    }
  }
  SignService.$inject = ['$http'];

  angular.module('app.SignService', [])
    .service('SignService', app.services.SignService);
}
