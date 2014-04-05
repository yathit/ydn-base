/**
 * @fileoverview About this file
 */


/**
 * @type {Object}
 * @const
 */
var SugarCrm = {};


/**
 * Represents SugarCRM field boolean value.
 * @enum {string}
 */
SugarCrm.Boolean = {
  '0': '0',
  '1': '1'
};



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
 * Represents SugarCRM email field.
 * @constructor
 */
SugarCrm.EmailField = function() {};


/**
 * @type {string}
 */
SugarCrm.EmailField.prototype.bean_id;


/**
 * @type {string}
 */
SugarCrm.EmailField.prototype.bean_module;


/**
 * @type {string}
 */
SugarCrm.EmailField.prototype.date_created;


/**
 * @type {string}
 */
SugarCrm.EmailField.prototype.date_modified;


/**
 * @type {SugarCrm.Boolean}
 */
SugarCrm.EmailField.prototype.deleted;


/**
 * @type {string}
 */
SugarCrm.EmailField.prototype.email_address;


/**
 * @type {string}
 */
SugarCrm.EmailField.prototype.email_address_caps;


/**
 * @type {string}
 */
SugarCrm.EmailField.prototype.email_address_id;


/**
 * @type {string}
 */
SugarCrm.EmailField.prototype.id;


/**
 * @type {SugarCrm.Boolean}
 */
SugarCrm.EmailField.prototype.invalid_email;


/**
 * @type {SugarCrm.Boolean}
 */
SugarCrm.EmailField.prototype.opt_out;


/**
 * @type {SugarCrm.Boolean}
 */
SugarCrm.EmailField.prototype.primary_address;


/**
 * @type {SugarCrm.Boolean}
 */
SugarCrm.EmailField.prototype.reply_to_address;



/**
 * Represents SugarCRM entry.
 * @constructor
 */
SugarCrm.Record = function() {};


/**
 * @type {string}
 */
SugarCrm.Record.prototype.id;


/**
 * @type {string}
 */
SugarCrm.Record.prototype.name;


/**
 * @type {string}
 */
SugarCrm.Record.prototype.date_modified;



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
 * @type {!Object.<SugarCrm.NameValue>}
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
 * Represents SugarCRM LinkField.
 * @constructor
 */
SugarCrm.LinkField = function() {};


/**
 * @type {string} this is always 'link' ?
 */
SugarCrm.LinkField.prototype.type;


/**
 * @type {string} Module name
 */
SugarCrm.LinkField.prototype.module;



/**
 * Represents meta data for ModuleInfo.
 * @constructor
 */
SugarCrm.ModuleMeta = function() {};


/**
 * Color hex for module.
 * @type {string}
 */
SugarCrm.ModuleMeta.prototype.color;


/**
 * List of email fields.
 * @type {Array.<string>}
 */
SugarCrm.ModuleMeta.prototype.email_fields;



/**
 * Represents SugarCRM ModuleInfo.
 * @constructor
 */
SugarCrm.ModuleInfo = function() {};


/**
 * @type {SugarCrm.ModuleMeta}
 */
SugarCrm.ModuleInfo.prototype._meta;


/**
 * @type {string}
 */
SugarCrm.ModuleInfo.prototype.module_name;


/**
 * @type {string}
 */
SugarCrm.ModuleInfo.prototype.table_name;


/**
 * @type {!Object.<SugarCrm.ModuleField>}
 */
SugarCrm.ModuleInfo.prototype.module_fields;


/**
 * @type {!Object.<SugarCrm.LinkField>}
 */
SugarCrm.ModuleInfo.prototype.link_fields;



/**
 * Represents query format in channel.
 * @constructor
 * @extends {CrmReqQuery}
 */
SugarCrm.Query = function() {};


/**
 * @type {Array.<SugarCrm.Record>} result of query.
 */
SugarCrm.Query.prototype.result;



/**
 * @interface
 */
SugarCrm.ServerInfo = function() {};


/**
 * @type {(string|undefined)}
 */
SugarCrm.ServerInfo.prototype.flavor;


/**
 * @type {(string|undefined)}
 */
SugarCrm.ServerInfo.prototype.version;


/**
 * @type {(string|undefined)}
 */
SugarCrm.ServerInfo.prototype.uptime;



/**
 * @interface
 */
SugarCrm.About = function() {};


/**
 * @type {(string|undefined)}
 */
SugarCrm.About.prototype.baseUrl;


/**
 * @type {string}
 */
SugarCrm.About.prototype.domain;


/**
 * @type {(string|undefined)}
 */
SugarCrm.About.prototype.userName;


/**
 * @type {(boolean|undefined)}
 */
SugarCrm.About.prototype.hostPermission;


/**
 * @type {(boolean|undefined)}
 */
SugarCrm.About.prototype.isLogin;
