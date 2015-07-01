(function () {

  if (document.documentElement) {
    initialize();
  } else {
    window.addEventListener('DOMContentLoaded', initialize);
  }

  function initialize () {

    var SHEET_ID = 'messages-tweaks';
    var SHEET_SELECTOR = 'style#' + SHEET_ID;

    var existing = document.head.querySelector(SHEET_SELECTOR);
    if (existing) { existing.parentNode.removeChild(existing); }

    var sheet = document.createElement('style');
    sheet.setAttribute('id', SHEET_ID);
    sheet.setAttribute('type', 'text/css');

    var styleText = document.createTextNode([
      '.message-content p.message-content-body, [data-type="list"] li p:first-of-type { font-size: 1.4rem; line-height: 1.8rem }',
      '#messages-attach-button { width: 50px; height: 50px; -moz-padding-start: 0; -moz-padding-end: 0; }',
      '#messages-input { font-size: 1.4rem; line-height: 1.8rem }',
      '#messages-send-button { width: 50px; height: 50px; padding: 0 }'
    ].join('\n'))
    sheet.appendChild(styleText);

    document.head.appendChild(sheet);

    var inputFld = document.getElementById('messages-input');

    var existingHandler = document.documentElement.dataset.messageTweaksKeypressHandler;
    if (existingHandler) {
      inputFld.removeEventListener('keypress', existingHandler);
    }

    var handler = document.documentElement.dataset.messageTweaksKeypressHandler = function (ev) {
      if (ev.keyCode !== 13) { return; }
      document.getElementById('messages-send-button').click();
      ev.preventDefault();
      ev.stopPropagation();
      Compose.clear();
    };

    inputFld.addEventListener('keypress', handler);

  }

}());
