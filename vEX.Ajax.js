/*{"Copyright":"VEXIT 2012","TermsOfUse":"This code is intellectual property of the author and the company VEX IT. You can use and adapt this code as you like as long as you leave this copyright notice at the top.","Author":"Vex Vendetta (Vex Tatarevic)","DateCreated":"2011-01-01","Company":"vEX IT","URL":"www.vexit.com","Using": ["jquery","jquery-jtemplates","vEX","vEX.UI"],"Description":"Convenience methods for ajax functions"}*/
vEX.ajaxCall = function (url, paras, onSuccess, onError, onAlways) { $.ajax({ type: "POST", url: url, data: (paras ? paras : {}), success: function (response) { onSuccess(response); }, error: function (XMLHttpRequest, textStatus, errorThrown) { if (onError) onError(XMLHttpRequest, textStatus, errorThrown); alert(XMLHttpRequest.responseText); } }).always(function () { if (onAlways) onAlways(); }); }
vEX.ajaxJsonCall = function (url, paras, onSuccess, onError, onAlways) { $.ajax({ type: "POST", contentType: "application/json; charset=utf-8", dataType: "json", url: url, data: (paras ? paras : '{}'), success: function (response) { onSuccess(response); }, error: function (XMLHttpRequest, textStatus, errorThrown) { if (onError) onError(XMLHttpRequest, textStatus, errorThrown); else alert(XMLHttpRequest.responseText); } }).always(function () { if (onAlways) onAlways(); }); }
vEX.ajax = function (url, paras, onSuccess, onError, onAlways, isJson) {
    var onAjaxSuccess = function (response) {
        if (response.d) response = response.d;
        data = (typeOf(response) == type.string ? jQuery.parseJSON(response) : response);
        if (onSuccess) onSuccess(data);
    }
    if (isJson) vEX.ajaxJsonCall(url, paras, onAjaxSuccess, onError, onAlways);
    else vEX.ajaxCall(url, paras, onAjaxSuccess, onError, onAlways);
}
vEX.ajaxJson = function (url, paras, onSuccess, onError, onAlways) { vEX.ajax(url, paras, onSuccess, onError, onAlways, true); }
vEX.ajaxPanel = function (url, paras, overlaySelector, loadingText, onSuccess, onError, onAlways, isJson) {
    if (overlaySelector) vEX.uiOverlayLoad(overlaySelector, loadingText);
    var onAjaxSuccess = function (response) {
        if (response.d) response = response.d;
        data = (typeOf(response) == type.string ? jQuery.parseJSON(response) : response);
        if (onSuccess) onSuccess(data);
    }
    var onAjaxAlways = function () { if (onAlways) onAlways(); if (overlaySelector) vEX.uiOverlayRemove(overlaySelector); }
    if (isJson) vEX.ajaxJsonCall(url, paras, onAjaxSuccess, onError, onAjaxAlways);
    else vEX.ajaxCall(url, paras, onAjaxSuccess, onError, onAjaxAlways);
}
vEX.ajaxPanelJson = function (url, paras, overlaySelector, loadingText, onSuccess, onError, onAlways) { vEX.ajaxPanel(url, paras, overlaySelector, loadingText, onSuccess, onError, onAlways, true); }
/********************************************************************
*      JTemplates Convenience - Remove if JTemplates not used  
********************************************************************/
vEX.ajaxLoadUI = function (uiLoadElementSelector, uiLoadTemplateID, url, paras, loadingText, onSuccess, onError, onAlways, overlaySelector, isJson) {
    if (!overlaySelector) overlaySelector = uiLoadElementSelector;
    vEX.uiOverlayLoad(overlaySelector, loadingText);
    var onAjaxSuccess = function (response) {
        if (uiLoadTemplateID) {
            if (response.d) response = response.d;
            data = (typeOf(response) == type.string ? jQuery.parseJSON(response) : response);
            var ui = vEX.getElement(uiLoadElementSelector);
            ui = (uiLoadElementSelector ? vEX.getElement(uiLoadElementSelector) : vEX.getElement(overlaySelector));
            ui.setTemplateElement(uiLoadTemplateID);
            ui.processTemplate(data);
            if (onSuccess) onSuccess(data);
        }
    }
    var onAjaxAlways = function () { if (onAlways) onAlways(); vEX.uiOverlayRemove(overlaySelector); }
    if (isJson) vEX.ajaxJsonCall(url, paras, onAjaxSuccess, onError, onAjaxAlways);
    else vEX.ajaxCall(url, paras, onAjaxSuccess, onError, onAjaxAlways);
}
vEX.ajaxLoadUIJson = function (uiLoadElementSelector, uiLoadTemplateID, url, paras, loadingText, onSuccess, onError, onAlways, overlaySelector) { vEX.ajaxLoadUI(uiLoadElementSelector, uiLoadTemplateID, url, paras, loadingText, onSuccess, onError, onAlways, overlaySelector, true); }





