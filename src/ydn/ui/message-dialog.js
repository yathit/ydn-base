/**
 * @fileoverview Model message dialog box using native.
 */


goog.provide('ydn.ui.MessageDialog');



/**
 * Model message dialog box using native.
 * @param {string} title
 * @param {string|Element} message message or message content.
 * @param {Array.<ydn.ui.MessageDialog.Button>} btn button set. Default to
 * OK button.
 * @constructor
 * @struct
 */
ydn.ui.MessageDialog = function(title, message, btn) {
  /**
   * @type {HTMLDialogElement}
   * @private
   */
  this.dialog_ = /** @type {HTMLDialogElement} */ (document.createElement('dialog'));
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

  var default_btn = document.createElement('button');
  default_btn.className = 'ok default';
  default_btn.value = 'ok';
  default_btn.textContent = 'OK';
  button_bar.appendChild(default_btn);

  this.dialog_.appendChild(header);
  this.dialog_.appendChild(content);
  this.dialog_.appendChild(button_bar);
  this.dialog_.className = ydn.ui.MessageDialog.CSS_CLASS_NAME;
  document.body.appendChild(this.dialog_);

};


/**
 * @enum {string} dialog button name.
 */
ydn.ui.MessageDialog.Button = {
  OK: 'ok',
  CANCEL: 'cancel'
};


/**
 * @define {string} default class name
 */
ydn.ui.MessageDialog.CSS_CLASS_NAME = 'ydn-crm';


/**
 * Clean up reference.
 */
ydn.ui.MessageDialog.prototype.dispose = function() {
  var buttons = this.dialog_.querySelector('.button-bar').querySelectorAll('button');
  for (var i = buttons.length - 1; i >= 0; i--) {
    buttons[i].onclick = null;
  }
  this.dialog_.onclose = null;
  document.body.removeChild(this.dialog_);
  this.dialog_ = null;
};


/**
 * Show model message dialog.
 * @param {string} title
 * @param {string|Element} message message or message content.
 * @param {Array.<ydn.ui.MessageDialog.Button>=} opt_btn button set. Default to
 * OK button.
 * @return {!goog.async.Deferred.<ydn.ui.MessageDialog.Button>} promise on
 * dialog close, resolved with button click.
 */
ydn.ui.MessageDialog.showModal = function(title, message, opt_btn) {
  var dialog = new ydn.ui.MessageDialog(title, message, [ydn.ui.MessageDialog.Button.OK]);
  var df = new goog.async.Deferred();
  var buttons = dialog.dialog_.querySelector('.button-bar');
  var default_btn = buttons.querySelector('button.default');
  default_btn.onclick = function(e) {
    dialog.dialog_.close('apply');
    dialog.dispose();
  };
  dialog.dialog_.onclose = function(event) {
    df.callback(dialog.dialog_.returnValue);
    dialog.dispose();
  };
  dialog.dialog_.showModal();
  return df;
};


