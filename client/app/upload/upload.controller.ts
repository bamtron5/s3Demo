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
      private SignService: app.services.SignService
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
      // `http://s3.amazonaws.com/s3demo-cc/${this.title}`
      let payload = {
        url: signature.signedRequest,
        audio: {file: this.file, username: this.username}
      };
      this.Upload.upload(payload).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
        console.log('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = (100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };
  }

  UploadController.$inject = ['Upload', 'SignService'];
}
