/**
 * @fileoverview Channel provider for web worker.
 */


goog.provide('ydn.msg.WorkerPipe');



/**
 * Channel provider for web worker.
 * @param {string} name
 * @constructor
 * @extends {ydn.msg.Pipe}
 */
ydn.msg.WorkerPipe = function(name) {
  ydn.msg.WorkerPipe.base(this, 'constructor', name);
  this.worker_ = null;
};
goog.inherits(ydn.msg.WorkerPipe, ydn.msg.Pipe);


/**
 * @type {Worker}
 * @private
 */
ydn.msg.WorkerPipe.prototype.worker_ = null;


/**
 * @return {Worker}
 * @protected
 */
ydn.msg.WorkerPipe.prototype.getWorker = function() {
  if (!this.worker_) {
    this.worker_ = new Worker('https://www.yathit.com/source-code/edge/ydn.crm.js');
    this.worker_.onmessage = this.defaultListener.bind(this);
  }
  return this.worker_;
};


/**
 * @override
 */
ydn.msg.WorkerPipe.prototype.postMessage = function(msg) {
  this.getWorker().postMessage(msg);
};
