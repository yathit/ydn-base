/**
 * @fileoverview AWS JS SDK.
 *
 * http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/frames.html
 * @externs
 */


/**
 * @type {Object}
 * @const
 */
var AWS = {};


/**
 * Represents your AWS security credentials.
 * @constructor
 */
AWS.Credentials = function() {};


/**
 * @param {{RoleArn: string, WebIdentityToken: string}} params parameters.
 * @extends {AWS.Credentials}
 * @constructor
 */
AWS.WebIdentityCredentials = function(params) {};


/**
 * @type {string}
 */
AWS.WebIdentityCredentials.prototype.WebIdentityToken;


/**
 * @typedef {{
 *   region: string,
 *   credentials: AWS.Credentials
 * }}
 */
AWS.config;



/**
 * Constructs S3 service interface object.
 * @param {{params: {
 *   region: (string|undefined), Bucket: (string|undefined)}
 * }} params
 * @constructor
 */
AWS.S3 = function(params) {};


/**
 * @constructor
 */
AWS.S3.Object = function() {};

/**
 * @type {string}
 */
AWS.S3.Object.prototype.ETag;

/**
 * @type {string}
 */
AWS.S3.Object.prototype.Generation;

/**
 * @type {string}
 */
AWS.S3.Object.prototype.Key;

/**
 * @type {string}
 */
AWS.S3.Object.prototype.LastModified;

/**
 * @type {string}
 */
AWS.S3.Object.prototype.MetaGeneration;

/**
 * @type {string}
 */
AWS.S3.Object.prototype.Size;

/**
 * @constructor
 */
AWS.S3.ListBucketResult = function() {};

/**
 * @type {!Array.<!AWS.S3.Object>}
 */
AWS.S3.ListBucketResult.prototype.Contents;

/**
 * @type {string}
 */
AWS.S3.ListBucketResult.prototype.IsTruncated;
/**
 * @type {string}
 */
AWS.S3.ListBucketResult.prototype.Marker;
/**
 * @type {string}
 */
AWS.S3.ListBucketResult.prototype.Name;
/**
 * @type {string}
 */
AWS.S3.ListBucketResult.prototype.Prefix;


/**
 * Adds an object to a bucket.
 * @param {{
 *   ACL: (string|undefined),
 *   Body: (Object|string),
 *   CacheControl: (string|undefined),
 *   ContentDisposition:(string|undefined),
 *   Expires:(Date|undefined),
 *   Key: string,
 *   ContentType:(string|undefined),
 *   Metadata:(Object.<string>|undefined)
 * }} params
 * @param {function(boolean, Object)=} callback
 */
AWS.S3.prototype.putObject = function(params, callback) {};


/**
 * Retrieves objects from Amazon S3.
 * @param {{
 *   IfMatch: (string|undefined),
 *   IfModifiedSince: (Date|undefined),
 *   IfNoneMatch:(string|undefined),
 *   IfUnmodifiedSince:(Date|undefined),
 *   Range:(string|undefined),
 *   VersionId:(string|undefined),
 *   Key: string
 * }} params
 * @param {function(boolean, Object)=} callback
 */
AWS.S3.prototype.getObject = function(params, callback) {};


/**
 * Returns some or all (up to 1000) of the objects in a bucket.
 * @param {{
 *   Bucket: (string|undefined),
 *   Delimiter: (string|undefined),
 *   Marker:(string|undefined),
 *   MaxKeys:(number|undefined),
 *   Prefix:(string|undefined)
 * }} params
 * @param {function(boolean, AWS.S3.ListBucketResult)=} callback result callback.
 */
AWS.S3.prototype.listObjects = function(params, callback) {};
