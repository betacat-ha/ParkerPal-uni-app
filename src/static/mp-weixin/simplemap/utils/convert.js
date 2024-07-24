let screenWidth = null;
const getScreenWidth = function () {
  if (screenWidth == null) {
    const info = wx.getSystemInfoSync();
    screenWidth = info.screenWidth;
  }
  return screenWidth;
};
const rpxToPx = function (rpx) {
  return rpx * getScreenWidth() / 750;
};
const pxToRpx = function (px) {
  return px / getScreenWidth() * 750;
};

const URL_PATTERN = new RegExp('(https)://[-\\w+&@#/%?=~|!:,.;]+[-\\w+&@#/%=~|]');
const isUrl = function (url) {
  return URL_PATTERN.test(url);
};

let measureCtx = null;
const measureTextWidth = function (text, size) {
  if (measureCtx == null) {
    measureCtx = wx.createCanvasContext('simplemap-measure');
  }
  measureCtx.save();
  measureCtx.setFontSize(size);
  let textWidth = 0;
  if (measureCtx.measureText) {
    textWidth = measureCtx.measureText(text).width;
  }
  else {
    textWidth = text.length * size * 0.8;
  }
  measureCtx.restore();
  return textWidth;
};

module.exports = {
  rpxToPx,
  pxToRpx,
  isUrl,
  measureTextWidth,
};
