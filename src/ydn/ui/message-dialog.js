/**
 * @fileoverview Model message dialog box using native.
 */


goog.provide('ydn.ui.MessageDialog');
goog.require('goog.events.EventHandler');



/**
 * Model message dialog box using native.
 * <pre>
 *   ydn.ui.MessageDialog.showModal('Dialog demo', 'Here is a message');
 * </pre>
 * @param {string} title
 * @param {string|Node} message message or message content DOM node.
 * @param {Array<ydn.ui.MessageDialog.Button>} buttons button set.
 * @constructor
 * @struct
 */
ydn.ui.MessageDialog = function(title, message, buttons) {
  /**
   * @protected
   * @type {goog.events.EventHandler}
   */
  this.handler = new goog.events.EventHandler(this);
  var dialog = document.createElement('dialog');
  /**
   * @type {HTMLDialogElement}
   * @protected
   */
  this.dialog = /** @type {HTMLDialogElement} */ (dialog);
  var header = document.createElement('div');
  header.className = 'header';
  var content = document.createElement('div');
  content.className = 'content';
  var button_bar = document.createElement('div');
  button_bar.className = 'button-bar';

  var title_el = document.createElement('h3');
  title_el.textContent = title;
  header.appendChild(title_el);

  if (goog.isString(message)) {
    var msg_el = document.createElement('div');
    msg_el.textContent = message;
    content.appendChild(msg_el);
  } else if (message) {
    content.appendChild(message);
  }

  for (var i = 0; i < buttons.length; i++) {
    var btn_name = buttons[i];
    var button = document.createElement('button');
    if (btn_name == ydn.ui.MessageDialog.Button.OK) {
      button.classList.add('default');
    }
    button.value = btn_name;
    button.textContent = btn_name;
    this.handler.listen(button, 'click', this.onButtonClick);
    button_bar.appendChild(button);
  }

  this.handler.listen(this.dialog, 'cancel', this.onButtonClick);

  this.dialog.appendChild(header);
  this.dialog.appendChild(content);
  this.dialog.appendChild(button_bar);
  this.dialog.className = ydn.ui.MessageDialog.CSS_CLASS_NAME;
  document.body.appendChild(this.dialog);

};


/**
 * @enum {string} dialog button name.
 */
ydn.ui.MessageDialog.Button = {
  OK: 'OK',
  CANCEL: 'Cancel'
};


/**
 * @define {string} default class name
 */
ydn.ui.MessageDialog.CSS_CLASS_NAME = 'ydn-crm';


/**
 * @protected
 * @param {goog.events.BrowserEvent} e
 */
ydn.ui.MessageDialog.prototype.onButtonClick = function(e) {
  this.dialog.close(e.target.value);
};


/**
 * Clean up reference.
 * @protected
 */
ydn.ui.MessageDialog.prototype.dispose = function() {
  if (!this.dialog) {
    return;
  }
  this.handler.dispose();
  this.handler = null;
  this.dialog.onclose = null;
  document.body.removeChild(this.dialog);
  this.dialog = null;
};


/**
 * @return {Element}
 */
ydn.ui.MessageDialog.prototype.getContentElement = function() {
  return this.dialog.querySelector('.content');
};


/**
 * Show model message dialog.
 * @param {string} title
 * @param {string|Node} message message or message content.
 * @param {Array.<ydn.ui.MessageDialog.Button>=} opt_btn button set. Default to
 * OK button.
 * @return {!goog.async.Deferred.<ydn.ui.MessageDialog.Button>} promise on
 * dialog close, resolved with button click.
 */
ydn.ui.MessageDialog.showModal = function(title, message, opt_btn) {
  var buttons = opt_btn || [ydn.ui.MessageDialog.Button.OK];
  var dialog = new ydn.ui.MessageDialog(title, message, buttons);
  var df = new goog.async.Deferred();
  dialog.dialog.onclose = function(event) {
    df.callback(dialog.dialog.returnValue);
    dialog.dispose();
  };
  dialog.dialog.showModal();
  return df;
};


