/**
 * @fileoverview Channel loader.
 */

goog.provide('ydn.msg');
goog.require('ydn.msg.Pipe');
goog.require('ydn.msg.WorkerPipe');



/**
 * @type {ydn.msg.Pipe}
 * @private
 */
ydn.msg.main_ = null;

/**
 * Initialize pipe.
 * @param {exYdn.PipeInfo|string} info_or_name info or group name.
 * @return {!ydn.msg.Pipe}
 */
ydn.msg.initPipe = function(info_or_name) {
  goog.asserts.assert(!ydn.msg.main_, 'already initialize pipe.');
  var info = info_or_name;
  if (goog.isString(info_or_name)) {
    info = {
      'group': info_or_name,
      'name': info_or_name + '-' + goog.now()
    };
  }
  ydn.msg.main_ = new ydn.msg.Pipe(/** @type {exYdn.PipeInfo} */ (/** @type {Object} */ (info)));
  return ydn.msg.main_;
};


/**
 * Initialize pipe.
 * @param {string} fn
 * @return {!ydn.msg.Pipe}
 */
ydn.msg.initWorkerPipe = function(fn) {
  goog.asserts.assert(!ydn.msg.main_, 'already initialize pipe.');
  ydn.msg.main_ = new ydn.msg.WorkerPipe('background', fn);
  return ydn.msg.main_;
};


/**
 * @return {!ydn.msg.Pipe}
 */
ydn.msg.getMain = function() {
  if (!ydn.msg.main_) {
    var name = ydn.msg.Group.MAIN + '-' + goog.now();
    ydn.msg.main_ = new ydn.msg.Pipe(name);
  }
  return ydn.msg.main_;
};