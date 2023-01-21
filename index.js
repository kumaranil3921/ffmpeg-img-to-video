const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const IMG_PREFIX = 'frame';
const INPUT_FPS = 1;
const OUTPUT_FPS = 30;
const VIDEO_CODEC = 'libx264';
const VIDEO_BIT_RATE = 1024;
const LOOP = 4.5;
const OUTPUT_PATH = './output';
const VIDEO_NAME = `VIDEO-${new Date().getTime()}.mp4`;


run();
async function run() {
  try {
    const isExist = await isFileOrDirectoryExist({ path: './output' });
    if (!isExist) {
      createDirectory({ path: '.', directory_name: 'output' });
    }
    await imageToVideo();
  } catch (error) {
    console.error('Error', error);
  }
}
async function imageToVideo() {
  try {
    ffmpeg.setFfmpegPath(ffmpegPath)
    const command = ffmpeg(`./public/${IMG_PREFIX}%d.jpg`);
    command
      .inputFPS(INPUT_FPS)
      .outputFPS(OUTPUT_FPS)
      .videoCodec(VIDEO_CODEC)
      .videoBitrate(VIDEO_BIT_RATE)
      .size('640x?')
      // .loop(LOOP)
      .noAudio()
      .save(`${OUTPUT_PATH}/${VIDEO_NAME}`);
  } catch (error) {
    console.error('Error', error);
  }
}
async function isFileOrDirectoryExist(options) {
  try {
    return fs.existsSync(options.path);
  } catch (error) {
    throw error;
  }
}
async function createDirectory(options) {
  const path = `${options.path}/${options.directory_name}`;
  fs.mkdirSync(path);
  return path;
}