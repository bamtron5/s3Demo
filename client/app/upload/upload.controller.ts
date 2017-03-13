/// <reference types="angular" />
/// <reference types="ng-file-upload" />

namespace app.controllers {
  export class UploadController {
    public file;
    public title;
    public username = 'curUser';
    public uploadForm;
    public preview;
    constructor (
      private Upload,
      private SignService: app.services.SignService,
      private $http
    ) {

    };

    public submit () {
      if (this.uploadForm.file.$valid && this.file) {
        this.sign({fileName: this.file.name, fileType: this.file.type});
      }
    };

    public sign (config: {'fileName': string, 'fileType': string}) {
      this.SignService.sign(config)
        .then((response) => {
          console.log(response);
          this.preview = response.data.url;
          this.upload(response.data);
        }).catch((err) => {
          console.log(err);
          alert('unsigned');
        });
    };

    // SIGN AND VALIDATE FIRST
    public upload (signature) {
      var req = {
        method: 'PUT',
        url: signature.signedRequest,
        headers: {
         'Content-Type': this.file.type
        },
        data: this.file
      };

      this.$http(req)
        .then((response) => {
          console.log(response);
          alert('upload success');
        }).catch((err) => {
          console.log(err);
          alert('upload fail');
        });
    };
  }

  UploadController.$inject = ['Upload', 'SignService', '$http'];
}
