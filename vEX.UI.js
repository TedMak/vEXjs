/*{"Copyright":"VEXIT 2011","TermsOfUse":"This code is intellectual property of the author and the company VEX IT. You can use and adapt this code as you like as long as you leave this copyright notice at the top.","Author":"Vex Vendetta (Vex Tatarevic)","DateCreated":"2011-01-01","Company":"vEX IT","URL":"www.vexit.com","Using": ["jquery","jquery-jtemplates","vEX.UI"],"Description":"Convenience methods for HTML manipulation"}*/
if (typeof vEX == 'undefined') { vEX = {}; }
vEX.getElement = function (elementSelector) { var e; if (typeOf(elementSelector) == type.string) e = vEX.getElementBySelector(elementSelector); else e = elementSelector; return e; }
vEX.getElementBySelector = function (uiElementSelector) { var e; if ((typeof uiElementSelector) == 'string') { e = ($(uiElementSelector).length ? $(uiElementSelector) : (/^[a-zA-Z]+$/.test((uiElementSelector.charAt(0))) ? $('#' + uiElementSelector) : null)); } else { e = $(uiElementSelector); } return e; }
vEX.uiOverlay = function (elementSelector, text, cssClass) {
    var e = vEX.getElement(elementSelector);
    var p = e.position(); if (p) {
        var h = e.outerHeight(), w = e.outerWidth();
        e.after('<div class="uiOverlay ' + (cssClass ? ' ' + cssClass : '') + '" ></div>');
        e.next().attr('style', 'top:' + p.top + 'px !important; left:' + p.left + 'px !important;width:' + w + 'px !important; height:' + h + 'px !important;'); if (text) { e.next().append('<div class="strchx strchy txtc bold">' + text + '</div>'); e.next().children().attr('style', 'padding-top:' + ((h / 2) + 15) + 'px !important; z-index:' + (e.next().css("z-index") + 1) + ' !important;'); }
    }
}
vEX.uiOverlayRemove = function (elementSelector) { var e = vEX.getElementBySelector(elementSelector); e.next().remove(); }
vEX.uiOverlayLoad = function (elementSelector, text, cssClass) { vEX.uiOverlay(elementSelector, text, 'uiLoadingHL ' + cssClass); }
vEX.loadUI = function (uiLoadElementSelector, uiLoadTemplateID, data) { var ui = vEX.getElementBySelector(uiLoadElementSelector); ui.setTemplateElement(uiLoadTemplateID); ui.processTemplate(data); }
/*********************************************
*        JQUery Extensions   
**********************************************/
$.fn.hasAttr = function (attr) { return this.filter("[" + attr + "]").length > 0; }
$.fn.allHaveAttr = function (attr) { return this.filter("[" + attr + "]").length == this.length; }