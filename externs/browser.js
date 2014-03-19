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

//
///**
// * New IndexedDB interface not in closure externs.
// * This must be remove when they updated.
// * @constructor
// */
//
///**
// * @extends {IDBRequest}
// * @constructor
// */
//var IDBOpenDBRequest = function() {};
//
///**
// *
// * @param ev
// */
//IDBOpenDBRequest.prototype.onblocked = function(ev) {};
//
///**
// *
// * @param ev
// */
//IDBOpenDBRequest.prototype.onupgradeneeded = function(ev) {};


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
//
//
///**
// * Closure compiler incorrectly define as Array.<string>
//* @final
//* @type {DOMStringList}
//*/
//IDBDatabase.prototype.objectStoreNames;
//
//
///**
// * @constructor
// */
//var IDBVersionChangeEvent = function() {};
//
///**
// * @final
// * @type {string}
// */
//IDBVersionChangeEvent.prototype.version;


/**
 * @extends {IDBCursor}
 * @constructor
 */
var IDBCursorWithValue = function() {};


/**
 * @type {*}
 */
IDBCursorWithValue.prototype.value;


/**
 * @type {*}
 */
IDBCursorWithValue.prototype.primaryKey;

//
///**
//* Closure compiler incorrectly define as Array.<string>
//* @final
//* @type {DOMStringList}
//*/
//IDBObjectStore.prototype.indexNames;

///**
// * @param {*=} key Key identifying the record to be retrieved.
// * @return {!IDBRequest} The IDBRequest object.
// */
//IDBObjectStore.prototype.count = function(key) {};


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
 * The drag-and-drop processing model involves several events.
 * http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#the-dragevent-interface
 * @constructor
 * @extends {MouseEvent}
 */
function DragEvent() {}


/**
 * @type {DataTransfer}
 */
DragEvent.prototype.dataTransfer;



/**
 * The Promise interface represents a proxy for a value not necessarily known at its creation time.
 * @param {Function} onFulfilled
 * @param {Function=} onRejected
 * @constructor
 */
function Promise(onFulfilled, onRejected) {}


/**
 * Appends fullfillment and rejection handlers to the promise, and returns a new promise resolving to the return value of the called handler.
 * @param {Function} onFulfilled
 * @param {Function} onRejected
 */
Promise.prototype.then = function(onFulfilled, onRejected) {};


/**
 * Appends a rejection handler callback to the promise
 * @param {Function} onRejected
 */
Promise.prototype['catch'] = function(onRejected) {};


/**
 * Returns a promise that resolves when all of the promises in iterable have resolved.
 * @param {Array.<Promise>} iterable
 */
Promise.all = function(iterable) {};
