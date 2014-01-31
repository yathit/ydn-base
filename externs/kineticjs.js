/**
 * @fileoverview Extens for KineticJS
 */


/**
 * @type {Object}
 * @const
 */
var Kinetic = {};


/**
 * @typedef {{
 *   data: (string|undefined),
 *   fill: (string|undefined),
 *   scale: (number|undefined),
 *   x: (number|undefined),
 *   y: (number|undefined)
 * }}
 */
Kinetic.Config;



/**
 * @param {Kinetic.Config=} params
 * @constructor
 */
Kinetic.Shape = function(params) {};


/**
 * get/set fill color
 * @param {string=} opt_color
 * @return {string}
 */
Kinetic.Shape.prototype.fill = function(opt_color) {};


/**
 * get/set fill green component
 * @param {number} opt_color
 * @return {number}
 */
Kinetic.Shape.prototype.fillGreen = function(opt_color) {};


/**
 * get/set fill red component
 * @param {number} opt_color
 * @return {number}
 */
Kinetic.Shape.prototype.fillRed = function(opt_color) {};


/**
 * get/set fill blue component
 * @param {number} opt_color
 * @return {number}
 */
Kinetic.Shape.prototype.fillBlue = function(opt_color) {};



/**
 * @param {Kinetic.Config=} params
 * @constructor
 * @extends {Kinetic.Shape}
 */
Kinetic.Container = function(params) {};



/**
 * @param {Kinetic.Config=} params
 * @constructor
 * @extends {Kinetic.Shape}
 */
Kinetic.Path = function(params) {};



/**
 * @param {Kinetic.Config=} params
 * @constructor
 * @extends {Kinetic.Shape}
 */
Kinetic.Circle = function(params) {};



/**
 * @param {Kinetic.Config=} params
 * @constructor
 * @extends {Kinetic.Shape}
 */
Kinetic.Rect = function(params) {};



/**
 * @param {Kinetic.Config=} params
 * @constructor
 * @extends {Kinetic.Shape}
 */
Kinetic.Text = function(params) {};



/**
 * @param {{scaleX: number, scaleY: number}=} params
 * @constructor
 * @extends {Kinetic.Container}
 */
Kinetic.Group = function(params) {};


/**
 * @param {Kinetic.Shape} path
 */
Kinetic.Group.prototype.add = function(path) {};


/**
 * @return {Array.<Kinetic.Shape>}
 */
Kinetic.Group.prototype.getChildren = function() {};



/**
 * @constructor
 */
Kinetic.Layer = function() {};


/**
 * @param {Kinetic.Container} g
 */
Kinetic.Layer.prototype.add = function(g) {};


/**
 * @return {Array.<Kinetic.Group>}
 */
Kinetic.Layer.prototype.getChildren = function() {};



/**
 * @param {{
 * container: (string|Element),
  * width: number,
  * height: number}=} params
 * @constructor
 */
Kinetic.Stage = function(params) {};


/**
 * @param {Kinetic.Layer} layer
 */
Kinetic.Stage.prototype.add = function(layer) {};



/**
 * @constructor
 */
Kinetic.AnimationFrame = function() {};


/**
 * @type {number}
 */
Kinetic.AnimationFrame.prototype.timeDiff;


/**
 * @type {number}
 */
Kinetic.AnimationFrame.prototype.lastTime;


/**
 * @type {number}
 */
Kinetic.AnimationFrame.prototype.time;


/**
 * @type {number}
 */
Kinetic.AnimationFrame.prototype.frameRate;



/**
 * @param {function(Kinetic.AnimationFrame)} frame
 * @param {Kinetic.Layer} layer
 * @constructor
 */
Kinetic.Animation = function(frame, layer) {};


/**
 */
Kinetic.Animation.prototype.start = function() {};


/**
 */
Kinetic.Animation.prototype.stop = function() {};

