/*{"Copyright":"VEXIT 2013","TermsOfUse":"This code is intellectual property of the author and the company VEX IT. You can use and adapt this code as you like, as long as you leave this copyright notice at the top.","Author":"Vex Vendetta (Vex Tatarevic)","DateCreated":"2013-03-30","Company":"vEX IT","URL":"www.vexit.com","Using": ["jquery","vEX.UI"],"Description":"Class for Entity object manipulation and assembling entity objects from HTML"}*/
if (typeof vEX == 'undefined') { vEX = {}; }
vEX.Entity = function () { }
vEX.Entity.listFromHtml = function (htmlParentElementSelector, listItemElementSelector) { var p = vEX.getElement(htmlParentElementSelector); var items = p.find(listItemElementSelector); for (var i = 0; i < items.length; i++) { var entity = {}; var attrs = items[i].attributes; for (var j = 0; j < attrs.length; j++) { if (attrs[j].name.indexOf('data-') == 0) { var fieldname = attrs[j].name.replace('data', ''); var parts = fieldname.split('-'); if (parts.length > 0) { fieldname = ''; for (var k = 0; k < parts.length; k++) { fieldname += parts[k].toTitleCase(); } } var val = attrs[j].value; entity[fieldname] = (val == 'true' || val == 'false' ? val.toBool() : val); } } this.add(entity); } }
vEX.Entity.fromHtml = function (htmlParentElementSelector) {
    var e = new Object();
    var f = vEX.getElement(htmlParentElementSelector).find('[data-field]');
    for (var i = 0; i < f.length; i++) {
        var fld = $(f[i]).attr('data-field');
        if (fld) e[fld] = $(f[i]).val();
    }
    return e;
}

