/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */

class MediaFactory {
  static createMedia(data, callbacks) {
    if (!data || (!data.video && !data.image)) {
      throw new Error("Invalid data for media creation");
    } else if (data.video) {
      return MediaFactory.createVideo(data, callbacks);
    } else {
      return MediaFactory.createImage(data, callbacks);
    }
  }

  static createVideo(data, callbacks) {
    return new Video(data, callbacks);
  }

  static createImage(data, callbacks) {
    return new Image(data, callbacks);
  }
}
