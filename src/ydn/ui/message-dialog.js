/**
 * @fileoverview Model message dialog box using native.
 */


goog.provide('ydn.ui.MessageDialog');



/**
 * Model message dialog box using native.
 * @param {string} title
 * @param {string|Element} message message or message content.
 * @param {Array<ydn.ui.MessageDialog.Button>} buttons button set. Default to
 * OK button.
 * @constructor
 * @struct
 */
ydn.ui.MessageDialog = function(title, message, buttons) {
  var dialog = document.createElement('dialog');
  /**
   * @type {HTMLDialogElement}
   * @private
   */
  this.dialog_ = /** @type {HTMLDialogElement} */ (dialog);
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
    button.className = btn_name.toLowerCase();
    if (btn_name == ydn.ui.MessageDialog.Button.OK) {
      button.classList.add('default');
    }
    button.value = btn_name;
    button.textContent = btn_name;
    button.onclick = function(e) {
      dialog.close(e.target.value);
    };
    button_bar.appendChild(button);
  }

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
  OK: 'OK',
  CANCEL: 'Cancel'
};


/**
 * @define {string} default class name
 */
ydn.ui.MessageDialog.CSS_CLASS_NAME = 'ydn-crm';


/**
 * Clean up reference.
 */
ydn.ui.MessageDialog.prototype.dispose = function() {
  if (!this.dialog_) {
    return;
  }
  var buttons = this.dialog_.querySelector('.button-bar').querySelectorAll('button');
  for (var i = buttons.length - 1; i >= 0; i--) {
    buttons[i].onclick = null;
  }
  this.dialog_.onclose = null;
  document.body.removeChild(this.dialog_);
  this.dialog_ = null;
};


/**
 * @return {Element}
 */
ydn.ui.MessageDialog.prototype.getContentElement = function() {
  return this.dialog_.querySelector('.content');
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
  var buttons = opt_btn || [ydn.ui.MessageDialog.Button.OK];
  var dialog = new ydn.ui.MessageDialog(title, message, buttons);
  var df = new goog.async.Deferred();
  var bar = dialog.dialog_.querySelector('.button-bar');
  var default_btn = bar.querySelector('button.default');
  default_btn.onclick = function(e) {
    dialog.dialog_.close(e.target.value);
  };
  dialog.dialog_.onclose = function(event) {
    df.callback(dialog.dialog_.returnValue);
    dialog.dispose();
  };
  dialog.dialog_.showModal();
  return df;
};


