/**
 * @fileoverview GData entry.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

goog.provide('ydn.atom.Entry');
goog.require('ydn.atom.Atom');
goog.require('goog.debug.Logger');
goog.require('ydn.error');


/**
 *
 * @param {!AtomEntry} gdata
 * @constructor
 * @extends {ydn.atom.Atom}
 */
ydn.atom.Entry = function(gdata) {
  goog.base(this, gdata);
};
goog.inherits(ydn.atom.Entry, ydn.atom.Atom);


/**
 * @const
 * @type {string}
 */
ydn.atom.Entry.TYPE = 'ydn.atom.Entry';


