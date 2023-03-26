/* eslint-disable linebreak-style */
class MediaFactory {
  constructor() {
    this.createMedia = function (data) {
      let media;

      if (data.video) {
        media = new Video();
      } else if (data.image) {
        media = new Image();

        return media;
      }
    };
  }
}
