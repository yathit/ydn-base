/**
 * Created with IntelliJ IDEA.
 * User: kyawtun
 * Date: 12/21/12
 * Time: 9:49 AM
 * To change this template use File | Settings | File Templates.
 */

goog.provide('ydn.debug.exports');
goog.require('ydn.debug');

if (goog.DEBUG) {
  goog.exportSymbol('ydn.debug.log', ydn.debug.log);

}
