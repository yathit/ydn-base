/**
 * @fileoverview About this file.
 * User: mbikt
 * Date: 4/24/12
 * @externs
 */


/**
* Socket IO
* @constructor
*/
function Socket() {}

/**
* @param {string} channel
* @param {Function} listener
*/
Socket.prototype.on = function(channel, listener) {};

/**
* @param {string} channel
* @param {Object} obj
*/
Socket.prototype.emit = function(channel, obj) {};

/**
* Socket IO service
* @constructor
*/
function io() {}

/**
* @param {string} server
* @return {Socket}
*/
io.prototype.connect = function(server) {};



/**
 * @final
 * @type {boolean}
 */
IDBIndex.prototype.multiEntry;



/**
 * @final
 * @type {boolean}
 */
IDBObjectStore.prototype.autoIncrement;



/**
 * @param {*=} key Key identifying the record to be retrieved.
 * @return {!IDBRequest} The IDBRequest object.
 */
IDBIndex.prototype.count = function(key) {};


/**
 *
 * @param {*} first
 * @param {*} second
 * @return {number}
 */
IDBFactory.prototype.cmp = function(first, second) {};


/**
 * @type {!DOMError}
 * @const
 */
IDBRequest.prototype.error;



/**
 * Socket IO service
 * @constructor
 * @extends {HTMLElement}
 */
function HTMLDialogElement() {}


/**
 * @param {HTMLElement=} anchor
 */
HTMLDialogElement.prototype.show = function(anchor) {};


/**
 * @param {HTMLElement=} anchor
 */
HTMLDialogElement.prototype.showModal = function(anchor) {};


/**
 * @param result
 */
HTMLDialogElement.prototype.close = function(result) {};


/**
 * @type {*}
 */
HTMLDialogElement.prototype.returnValue;
