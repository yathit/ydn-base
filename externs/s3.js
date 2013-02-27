
/**
 * @fileoverview Externs file for S3 XML response.
 *
 * @see http://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketGET.html
 * @externs
 */

// Root namespace for s3 related functionality.
var s3 = {};

/**
 * @constructor
 */
s3.S3Object = function() {};

/**
 * @type {string}
 */
s3.S3Object.prototype.ETag;

/**
 * @type {string}
 */
s3.S3Object.prototype.Generation;

/**
 * @type {string}
 */
s3.S3Object.prototype.Key;

/**
 * @type {string}
 */
s3.S3Object.prototype.LastModified;

/**
 * @type {string}
 */
s3.S3Object.prototype.MetaGeneration;

/**
 * @type {string}
 */
s3.S3Object.prototype.Size;

/**
 * @constructor
 */
s3.ListBucketResult = function() {};

/**
 * @type {!Array.<!s3.S3Object>}
 */
s3.ListBucketResult.prototype.Contents;

/**
 * @type {string}
 */
s3.ListBucketResult.prototype.IsTruncated;
/**
 * @type {string}
 */
s3.ListBucketResult.prototype.Marker;
/**
 * @type {string}
 */
s3.ListBucketResult.prototype.Name;
/**
 * @type {string}
 */
s3.ListBucketResult.prototype.Prefix;