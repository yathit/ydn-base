/**
 * @fileoverview Extens for KineticJS
 */


/**
 * @type {Object}
 * @const
 */
var Kinetic = {};



/**
 * @param {{data: string, fill: string,
  * scale: (number|undefined),
  * x: (number|undefined),
   * y: (number|undefined)}=} params
 * @constructor
 */
Kinetic.Container = function(params) {};



/**
 * @param {{data: string, fill: string,
  * scale: (number|undefined),
  * x: (number|undefined),
   * y: (number|undefined)}=} params
 * @constructor
 * @extends {Kinetic.Container}
 */
Kinetic.Path = function(params) {};



/**
 * @param {{scale: number}} params
 * @constructor
 * @extends {Kinetic.Container}
 */
Kinetic.Group = function(params) {};


/**
 * @param {Kinetic.Path} path
 */
Kinetic.Group.prototype.add = function(path) {};



/**
 * @constructor
 */
Kinetic.Layer = function() {};


/**
 * @param {Kinetic.Container} g
 */
Kinetic.Layer.prototype.add = function(g) {};



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