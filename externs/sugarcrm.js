/**
 * @fileoverview About this file
 */


/**
 * @type {Object}
 * @const
 */
var SugarCrm = {};



/**
 * Represents SugarCRM name value list pair.
 * @constructor
 */
SugarCrm.NameValue = function() {};


/**
 * @type {string}
 */
SugarCrm.NameValue.prototype.name;


/**
 * @type {string}
 */
SugarCrm.NameValue.prototype.value;



/**
 * Represents SugarCRM name value list entry.
 * @constructor
 */
SugarCrm.NameValueEntry = function() {};


/**
 * @type {string}
 */
SugarCrm.NameValueEntry.prototype.id;


/**
 * @type {string}
 */
SugarCrm.NameValueEntry.prototype.module_name;


/**
 * @type {Object.<SugarCrm.NameValue>}
 */
SugarCrm.NameValueEntry.prototype.name_value_list;



/**
 * Represents SugarCRM entry.
 * @constructor
 */
SugarCrm.Entry = function() {};


/**
 * @type {string}
 */
SugarCrm.NameValue.prototype.id;



/**
 * Represents SugarCRM ModuleField.
 * @constructor
 */
SugarCrm.ModuleField = function() {};


/**
 * @type {boolean}
 */
SugarCrm.ModuleField.prototype.calculated;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.group;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.id_name;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.label;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.len;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.name;


/**
 * @type {Object.<SugarCrm.NameValue>}
 */
SugarCrm.ModuleField.prototype.options;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.related_module;


/**
 * @type {number}
 */
SugarCrm.ModuleField.prototype.required;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.type;



/**
 * Represents SugarCRM ModuleInfo.
 * @constructor
 */
SugarCrm.ModuleInfo = function() {};


/**
 * @type {string}
 */
SugarCrm.ModuleInfo.prototype.module_name;


/**
 * @type {string}
 */
SugarCrm.ModuleInfo.prototype.table_name;


/**
 * @type {Object.<SugarCrm.ModuleField>}
 */
SugarCrm.ModuleInfo.prototype.module_fields;
