/*{"Copyright":"VEXIT 2011","TermsOfUse":"This code is intellectual property of the author and the company VEX IT. You can use and adapt this code as you like, as long as you leave this copyright notice at the top.","Author":"Vex Vendetta (Vex Tatarevic)","DateCreated":"2011-01-01","Company":"VEX IT","URL":"www.vexit.com","Using": ["jquery"],"Description":"Basic class for data manipulation"}*/
type = { number: 'number', string: 'string', boolean: 'boolean', undefined: 'undefined', func: 'function', object: 'object', array: 'array', nul: 'null' }
typeOf = function (o) { var type = typeof o; if (type !== 'object') { return type; } else if (Object.prototype.toString.call(o) === '[object Array]') { return 'array'; } else if (o === null) { return 'null'; } else { return 'object'; } }
/*********************************************
*        Array Extension methods   
**********************************************/
if (!Array.prototype.indexOf) { Array.prototype.indexOf = function (obj) { for (var i = 0; i < this.length; i++) { if (this[i] === obj) { return i; } } return -1; }; }
Array.prototype.contains = function (obj) { return (this.indexOf(obj) > -1) }
Array.prototype.add = function (obj) { this.push(obj); return this.length; }
Array.prototype.addField = function (fldName, fldVal) { for (var i = 0; i < this.length; i++) { var obj = this[i]; obj[fldName] = fldVal; } }
Array.prototype.remove = function (obj) { var i = this.indexOf(obj); if (i > -1) this.splice(i, 1); }
Array.prototype.removeAll = function (obj) { var i = this.indexOf(obj); while (i > -1) { this.splice(i, 1); i = this.indexOf(obj); } }
Array.prototype.removeAt = function (index) { this.splice(index, 1); }
Array.prototype.removeWhere = function (condFldName, condOp, condFldVal) { if (!condOp) condOp = '='; for (var i = 0; i < this.length; i++) { var obj = this[i]; for (prop in obj) { if (prop == condFldName && (vEX.is(obj[prop], condOp, condFldVal))) this.splice(i, 1); } } }
Array.prototype.csv = function () { return this.join(","); }
Array.prototype.find = function (condFldName, condOp, condFldVal) { if (!condOp) condOp = '='; for (var i = 0; i < this.length; i++) { var obj = this[i]; for (prop in obj) { if (prop == condFldName && vEX.is(obj[prop], condOp, condFldVal)) return obj; } } return null; }
Array.prototype.where = function (condFldName, condOp, condFldVal) { if (!condOp) condOp = '='; var sub = []; for (var i = 0; i < this.length; i++) { var obj = this[i]; for (prop in obj) { if (prop == condFldName && (vEX.is(obj[prop], condOp, condFldVal))) sub.add(obj); } } return sub; }
Array.prototype.sum = function (fldName, condFldName, condFldVal) { var sum = 0; for (var i = 0; i < this.length; i++) { var obj = this[i]; if (condFldName) { var isConditionMet = false; var fldValue; for (prop in obj) { if (prop == condFldName && (obj[prop] == condFldVal)) isConditionMet = true; if (prop == fldName) fldValue = obj[prop]; } if (isConditionMet) sum = sum + fldValue; } else { for (prop in obj) { if (prop == fldName) { sum = sum + obj[prop]; } } } } return sum; }
Array.prototype.count = function (condFldName, condOp, condVal) { var count = 0; for (var i = 0; i < this.length; i++) { var obj = this[i]; if (condFldName) { var isConditionMet = false; var fldValue; for (prop in obj) { if (prop == condFldName && (vEX.is(obj[prop], condOp, condVal))) isConditionMet = true; } if (isConditionMet) count = count + 1; } else { count = count + 1; } } return count; }
Array.prototype.last = function () { return this[this.length - 1]; }
Array.prototype.lastIndex = function () { return this.length - 1; }
Array.prototype.valuesForProperty = function (propertyName) { var propVals = []; for (var i = 0; i < this.length; i++) { var obj = this[i]; for (prop in obj) { if (prop == propertyName) { propVals.add(obj[prop]); break; } } } return propVals; }
/*********************************************
*        String Extension methods   
**********************************************/
String.prototype.trim = function () { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };
String.prototype.ltrim = function () { return this.replace(/^\s+/, ''); }
String.prototype.rtrim = function () { return this.replace(/\s+$/, ''); }
String.prototype.fulltrim = function () { return this.replace(/\s/g, ''); }  //return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' '); }
String.prototype.isEmpty = function () { return (this.trim() == ''); }
String.prototype.contains = function (str) { return (this.indexOf(str) != -1); }
String.prototype.between = function (startstr, endstr) { return eval("this.match(/(?:" + startstr + ")(.+)(?:" + endstr + ")/)[1]"); }
String.prototype.after = function (str) { return this.split(str)[1]; }
String.prototype.toTitleCase = function () { return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }); }
String.prototype.toBool = function () { return this == 'true'; }
/*********************************************
*        Number Extension methods   
**********************************************/
Number.tryParseInt = function (value, byref) { if (vEX.isNull(value)) return false; if (value.toString().match(/^(\d)/) != null) { if (byref != false) value = parseInt(value); return true; } else return false; }
Number.tryParseFloat = function (value, byref) { if (vEX.isNull(value)) return false; if (value.toString().match(/^(\d|\d\.|\.\d)/) != null) { if (byref != false) value = parseFloat(value); return true; } else return false; }
/*********************************************
*        Miscellaneous   
**********************************************/
function clone(src) { //davidwalsh.name/javascript-clone
    function mixin(dest, source, copyFunc) { var name, s, i, empty = {}; for (name in source) { s = source[name]; if (!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))) { dest[name] = copyFunc ? copyFunc(s) : s; } } return dest; }
    if (!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]") { return src; }
    if (src.nodeType && "cloneNode" in src) { return src.cloneNode(true); }
    if (src instanceof Date) { return new Date(src.getTime()); }
    if (src instanceof RegExp) { return new RegExp(src); } var r, i, l;
    if (src instanceof Array) { r = []; for (i = 0, l = src.length; i < l; ++i) { if (i in src) { r.push(clone(src[i])); } } }
    else { r = src.constructor ? new src.constructor() : {}; }
    return mixin(r, src, clone);
}
function formatCurrency(num) { num = isNaN(num) || num === '' || num === null ? 0.00 : num; return parseFloat(num).toFixed(2); }
function imgFileNameFromThumb(thumbFileName) { return thumbFileName.replace('_t', ''); }
function imgThumbFromFileName(fileName) { var start = fileName.substring(0, fileName.lastIndexOf('.')); var end = fileName.substring(fileName.lastIndexOf('.')); var thumbname = start + '_t' + end; return thumbname;}
function imgFileNameNoExt(fileName) { return fileName.substring(0, fileName.lastIndexOf('.')); }
function imgFileNameFromThumbURL(url) { return imgFileNameFromThumb(url.substring(url.lastIndexOf('/') + 1)); }
//----------------------------------------------------
// vEX Library Root
//----------------------------------------------------
if (typeof vEX == 'undefined') { vEX = {}; }
vEX.loadJQuery = function () { if (!window.jQuery) { var script = document.createElement('script'); script.type = "text/javascript"; script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"; document.getElementsByTagName('head')[0].appendChild(script); } }
vEX.loadScript = function (url) { var script = document.createElement('script'); script.type = "text/javascript"; script.src = url; document.getElementsByTagName('head')[0].appendChild(script); }
vEX.op = { eq: 1, neq: 2, mt: 3, lt: 4, mteq: 5, lteq: 6 }
vEX.is = function (fld, op, val) { var valid = false; switch (op) { case vEX.op.eq: case '=': valid = (fld == val); break; case vEX.op.neq: case '!=': valid = (fld != val); break; case vEX.op.mt: case '>': valid = (fld > val); break; case vEX.op.mteq: case '>=': valid = (fld >= val); break; case vEX.op.lt: case '<': valid = (fld < val); break; case vEX.op.lteq: case '<=': valid = (fld <= val); break; } return valid; }
vEX.isNull = function (obj) { return (obj == null || obj == undefined || obj == ''); }
vEX.nullNum = function (d) { return (d == '' ? -1 : d); }


