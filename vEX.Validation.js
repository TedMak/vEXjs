/*{"Copyright":"VEXIT 2011","TermsOfUse":"This code is intellectual property of the author and the company VEX IT. You can use and adapt this code as you like as long as you leave this copyright notice at the top.","Author":"Vex Vendetta (Vex Tatarevic)","DateCreated":"2011-03-12","Company":"vEX IT","URL":"www.vexit.com","Using": ["jquery","vEX.Data","vEX.UI"],"Description":"Validation class for validation of html forms and display of validation messages"}*/
/********************************************
*                   Validation
*********************************************/
vEX.vldType = { Alpha:'Alpha', Numeric: 'Numeric', Decimal: 'Decimal', AlphaNumeric:'AlphaNumeric', AlphaWithSpaces: 'AlphaWithSpaces', AlphaNumWithSpaces: 'AlphaNumWithSpaces',  
	IsEqualTo: 'IsEqualTo', IsNotEqualTo: 'IsNotEqualTo', IsMoreThan: 'IsMoreThan', IsLessThan: 'IsLessThan', IsMoreThanOrEqualTo: 'IsMoreThanOrEqualTo', IsLessThanOrEqualTo: 'IsLessThanOrEqualTo',
	Required: 'Required', IsLongerThan: 'IsLongerThan', IsExternalConditionMet: 'IsExternalConditionMet', 
	URL: 'URL', Email: 'Email', Username: 'Username', Password: 'Password', Regex: 'Regex'
}
vEX.vldIsAlphaNumWithSpaces = function (val) { return (val.isEmpty() ? true : /^[A-Za-z\d\s]+$/.test(val)); }
vEX.vldIsAlphabetic = function (val) { return (val.isEmpty() ? true : /^[a-zA-Z]+$/.test(val)); }
vEX.vldIsAlphaNumeric = function (val) { return (val.isEmpty() ? true : /^[0-9a-zA-Z]+$/.test(val)); }
vEX.vldIsAlphaWithSpaces = function (val) { return (val.isEmpty() ? true : /^[a-zA-Z ]+$/.test(val)); }
vEX.vldIsNumeric = function (val) { return (val.isEmpty() ? true : /^[0-9]+$/.test(val)); }
vEX.vldIsDecimal = function (val) { return (val.isEmpty() ? true : /^\d+(\.\d{1,2})?$/.test(val)); }
vEX.vldIsEmail = function (val) { return (val.isEmpty() ? true : /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/.test(val)); }
vEX.vldIsUsername = function (val) { return (val.isEmpty() ? true : /^[0-9a-zA-Z]{3,32}$/i.test(val)); }
vEX.vldIsPassword = function (val) { return (val.isEmpty() ? true : /^[A-Za-z]\w{4,}[A-Za-z]$/.test(val)); }
vEX.vldIsRegex = function (val, regex) { if (val.isEmpty()) return true; else{ var result = new RegExp(regex).test(val); return result; }}
vEX.vldIsURL = function (val) { return (val.isEmpty() ? true : /http:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/.test(val)); }
vEX.vldDateCompare = function (d1, c, d2) { d1.setHours(0, 0, 0, 0); d2.setHours(0, 0, 0, 0); switch (c) { case '=': return (d1 == d2); break; case '>': return (d1 > d2); break; case '>=': return (d1 >= d2); break; case '<': return (d1 < d2); break; case '<=': return (d1 <= d2); break; default: return false; } }
vEX.vldDateCompareHr = function (d1, c, d2, hrOffset) { hrOffset = (hrOffset ? hrOffset : 0); if (vEX.dDateIsSameDay(d1, d2)) { var hr1 = d1.getHours(); var hr2 = d2.getHours() + hrOffset; switch (c) { case '=': return (hr1 == hr2); break; case '>': return (hr1 > hr2); break; case '>=': return (hr1 >= hr2); break; case '<': return (hr1 < hr2); break; case '<=': return (hr1 <= hr2); break;default: return false;};}else return vEX.vldDateCompare(d1, c, d2);}
/*{assertion:"Can be either 1. value to which target element value is compared 2. id of element to which target is compared 3. external condition 4. custom regular expression",starDisplayElementSelector:"jquery selector query to find element next to which the validation star is displayed"}*/
vEX.Validator = function (targetID, errorMessage, validationType, assertion, starDisplayElementSelector, isStarDisplayBlock) {
    var T = this; this.ID = ''; this.Element = null; this.IsValid = true; this.Message = ''; this.Conditions = []; // validators on whose validation success triggering of this validator depends. Conditionar validators should be added to validation before their dependants
    function getValidationStarID() { return targetID + 'V_' + T.ID; }
    function render() {
        T.clear();
        if (!T.IsValid) {
            var starHTML = '<span id="' + getValidationStarID() + '" class="vldStar" ' + (isStarDisplayBlock ? 'style="display:block;float:left;"' : '') + ' >*</span>';
            var referencedElement = (starDisplayElementSelector ? $(starDisplayElementSelector) : T.Element);
            referencedElement.after(starHTML);
            if (isStarDisplayBlock) referencedElement.css({ 'display': 'block', 'float': 'left' });
        }
        T.Message = (T.IsValid ? '' : '<li>' + errorMessage + '</li>');
    }
    function assertionIsElement() { return $('#' + assertion).length > 0; }
    function assertionElementVal() { return $('#' + assertion).val(); }
    function assertionVal() {
        var val = assertionElementVal();
        return (assertionIsElement() ? assertionElementVal() : eval(assertion));
    }
    this.addCondition = function (validatorObject) { T.Conditions.push(validatorObject); }
    this.addConditions = function (validatorObjectsArray) { for (var i = 0; i < validatorObjectsArray.length; i++) T.Conditions.push(validatorObjectsArray[i]); }
    this.isConditional = function () { return T.Conditions.length > 0; }
    this.validate = function () {
        if (!targetID.isEmpty()) T.Element = $('#' + targetID);
        var e = T.Element;
        var val = e.val();
        if (e.hasAttr('type') && e.attr('type') == 'checkbox')
            val = e.prop('checked');
        switch (validationType) {
            case vEX.vldType.Alpha: T.IsValid = vEX.vldIsAlphabetic(val); break;
            case vEX.vldType.Numeric: T.IsValid = vEX.vldIsNumeric(val); break;
            case vEX.vldType.Decimal: T.IsValid = vEX.vldIsDecimal(val); break;
            case vEX.vldType.AlphaNumeric: T.IsValid = vEX.vldIsAlphaNumeric(val); break;
            case vEX.vldType.AlphaWithSpaces: T.IsValid = vEX.vldIsAlphaWithSpaces(val); break;
            case vEX.vldType.AlphaNumWithSpaces: T.IsValid = vEX.vldIsAlphaNumWithSpaces(val); break;
            case vEX.vldType.IsEqualTo: T.IsValid = (val == assertionVal()); break;
            case vEX.vldType.IsNotEqualTo: T.IsValid = (val != assertionVal()); break;
            case vEX.vldType.IsMoreThan: T.IsValid = (val > assertionVal()); break;
            case vEX.vldType.IsMoreThanOrEqualTo: T.IsValid = (val >= assertionVal()); break;
            case vEX.vldType.IsLessThan: T.IsValid = (val < assertionVal()); break;
            case vEX.vldType.IsLessThanOrEqualTo: T.IsValid = (val <= assertionVal()); break;
            case vEX.vldType.Required: T.IsValid = (!val.isEmpty()); break;
            case vEX.vldType.IsLongerThan: T.IsValid = (val.isEmpty() ? true : val.length > assertion); break;
            case vEX.vldType.IsExternalConditionMet: T.IsValid = assertion; break;
            case vEX.vldType.URL: T.IsValid = vEX.vldIsURL(val); break;
            case vEX.vldType.Email: T.IsValid = vEX.vldIsEmail(val); break;
            case vEX.vldType.Username: T.IsValid = vEX.vldIsUsername(val); break;
            case vEX.vldType.Password: T.IsValid = vEX.vldIsPassword(val); break;
            case vEX.vldType.Regex: T.IsValid = vEX.vldIsRegex(val, assertion); break;
        }
        render();
        return T.IsValid;
    }
    this.clear = function () { $('#' + getValidationStarID()).remove(); } //$('#' + getRequiredStarID()).remove();
}
// Class Validation
vEX.Validation = function (uiElementSelector) {
    var target = vEX.getElementBySelector(uiElementSelector);
    var T = this; this.Validators = []; this.WarningMessages = []; this.ErrorMessages = []; this.SuccessMessages = [];
    this.addError = function (msg) { T.ErrorMessages.push(msg); }
    this.addSuccess = function (msg) { T.SuccessMessages.push(msg); }
    this.addWarning = function (msg) { T.WarningMessages.push(msg); }
    this.IsValid = true;
    function render() {
        var messages = '';
        var vld;
        for (var i = 0; i < T.Validators.length; i++) {
            vld = T.Validators[i];
            var doValidation = true;
            if (vld.isConditional())
                doValidation = allConditionsMetFor(vld);
            if (doValidation) {
                vld.validate();
                T.IsValid = T.IsValid && vld.IsValid;
                messages += vld.Message;
            }
        }
        for (var i = 0; i < T.SuccessMessages.length; i++) messages += T.SuccessMessages[i];
        for (var i = 0; i < T.ErrorMessages.length; i++) { messages += T.ErrorMessages[i]; T.IsValid = false; }
        for (var i = 0; i < T.WarningMessages.length; i++) messages += T.WarningMessages[i];
        var cls = (T.IsValid ? 'msgBoxSuccess' : 'msgBoxError');
        if (T.WarningMessages.length > 0) cls = 'msgBoxWarning';
        target.html((messages == '' ? '' : '<div class=' + cls + ' ><ul>' + messages + '</ul></div>'));
    }
    this.validate = function () { render(); return T.IsValid; }
    this.clear = function () {
        target.html('');
        for (var i = 0; i < T.Validators.length; i++) { T.Validators[i].clear(); }
        T.IsValid = true; T.Validators = []; T.ErrorMessages = []; T.SuccessMessages = []; T.WarningMessages = [];
    }
    this.addValidator = function (targetID, errorMessage, validationType, assertion, assertionIsElement, starDisplayElementSelector, isStarDisplayBlock) {
        var vld = new vEX.Validator(targetID, errorMessage, validationType, assertion, assertionIsElement, starDisplayElementSelector, isStarDisplayBlock);
        T.Validators.push(vld);
        vld.ID = T.Validators.length;
        return vld;
    } // passes target element object instead of id
    this.addValidatorObj = function (targetObj, errorMessage, validationType, assertion, assertionIsElement) {
        var vld = new vEX.Validator('', errorMessage, validationType, assertion, assertionIsElement);
        vld.Element = targetObj;
        T.Validators.push(vld);
        vld.ID = T.Validators.length;
        return vld;
    }
    function allConditionsMetFor(validatorToInspect) {
        for (var i = 0; i < T.Validators.length; i++) {
            var vdtr = T.Validators[i];
            if (validatorToInspect.Conditions.contains(vdtr))
                if (!vdtr.IsValid)
                    return false;
        }
        return true;
    }
}
vEX.Validation.fromHtml = function (htmlParentElementSelector, validationSummaryElementSelector) {
	validationSummaryElementSelector = (!validationSummaryElementSelector ? '.vex-validation-summary' : validationSummaryElementSelector);
	var vld = new vEX.Validation(validationSummaryElementSelector);
	var v = vEX.getElement(htmlParentElementSelector).find('.vex-validator input');
	for (var i = 0; i < v.length; i++) {
	    var vtr = vld.addValidator($(v[i]).attr('data-element'), $(v[i]).attr('data-message'), $(v[i]).attr('data-type'), $(v[i]).attr('data-assertion'));
	    if ($(v[i]).hasAttr('id')) {
	        vtr.ID = $(v[i]).attr('id');
	    }
	}
	for (var i = 0; i < v.length; i++) {
	    if ($(v[i]).hasAttr('data-conditions') && $(v[i]).hasAttr('id')) {
	        var vtr = vld.Validators.find('ID', '=', $(v[i]).attr('id'));
	        var conditionValidatorIDs = $(v[i]).attr('data-conditions').split(',');
	        for (var j = 0; j < conditionValidatorIDs.length; j++) {
	            var c = vld.Validators.find('ID', '=', conditionValidatorIDs[j]);
	            vtr.addCondition(c);
	        }	        
	    }        
	}
	return vld;
}
/* // --- CONCRETE EXAMPLE
<div id="divSignup" class="vex-form-panel frame clear w50 center" >
    <div class="vex-validation-summary" ></div>
    <table class="vex-form frm" >
        <tr><th>@Words.Name *</th><td><input type="text" id="txtName" data-field="Name" ></td></tr>
        <tr><th>@Words.Email *</th><td><input type="text" id="txtEmail" data-field="Email" ></td></tr>
        <tr><th>@Words.Phone *</th><td><input type="text" id="txtPhone" data-field="Phone" ></td></tr>
        <tr><th>@Words.CompanyName</th><td><input type="text" id="txtCompanyName" data-field="CompanyName" ></td></tr>
        <tr><th>@Words.CompanyABN</th><td><input type="text" id="txtCompanyABN" data-field="CompanyABN" ></td></tr>
        <tr><th>@Words.CompanyLogo</th><td><input type="text" id="txtCompanyLogoImgFileName" data-field="CompanyLogoImgFileName" ></td></tr>
        <tr><th>@Words.WebsiteURL</th><td><input type="text" id="txtCompanyWebsiteURL" data-field="CompanyWebsiteURL" ></td></tr>
        <tr><th>@Words.PostCode</th><td><input type="text" id="txtPostcode" data-field="Postcode" ></td></tr>
        <tr><th>@Words.PromotionCode</th><td><input type="text" id="txtPromotionCode" data-field="PromotionCode" ></td></tr>
        <tr><th>@Words.Password *</th><td><input type="password" id="txtPassword" data-field="Password"  ></td></tr>
        <tr><th>@Words.ConfirmPassword *</th><td><input type="password" id="txtPasswordConfirm" data-field="PasswordConfirm" ></td></tr>
        <tr><th></th><td><label for="chkAgreement">@Text.SignupAgreement</label></td></tr>
        <tr><th>@Words.Agreement</th><td><input type="checkbox" id="chkAgreement" data-field="Agreed" value="true" /></td></tr>
        <tr><td></td><td><a class="vex-form-submit btnsubmit"  >@Words.Register</a></td></tr>
    </table>
    <div class="vex-validator">
        <input type="hidden" data-element="txtName" data-type="Required" data-message="Name is required" />
        <input type="hidden" data-element="txtName" data-type="AlphaWithSpaces" data-message="Name can only contain letters and spaces" />
        <input type="hidden" data-element="txtEmail" data-type="Required" data-message="Email is required" />
        <input type="hidden" data-element="txtEmail" data-type="Email" data-message="Email is not in the correct format" />
        <input type="hidden" data-element="txtPhone" data-type="Required" data-message="Phone is required" />
        <input type="hidden" data-element="txtPhone" data-type="Numeric" data-message="Phone must contain only numbers" />
        <input type="hidden" data-element="txtPassword" data-type="Required" data-message="Password is required" />
        <input type="hidden" data-element="txtPassword" data-type="Regex" data-assertion="@Regex.PasswordSimple" data-message="@Errors.PasswordSimpleWrongFormat" />
        <input type="hidden" id="vldPasswordConfirmReq" data-element="txtPasswordConfirm" data-type="Required" data-message="Password Confirmation is required" />
        <input type="hidden" id="vldPasswordConfirmSame" data-conditions="vldPasswordConfirmReq" data-element="txtPasswordConfirm" data-type="IsEqualTo" data-assertion="txtPassword" data-message="Password Confirmation must be the same as the Password." />
        <input type="hidden" data-element="chkAgreement" data-type="IsEqualTo" data-assertion="true" data-message="Please check the Agreement checkbox to agree with the terms." />
    </div>
    <input type="hidden" class="vex-form-request" data-url="@Url.Action("signup", "account")" data-loading-text="Submitting Registration ..."
        data-on-success="onSignupSuccess" data-on-error="onSignupError"   data-on-always=""  />        
</div>
<script>
    function onSignupSuccess(data) {
        var vld = vEX.Validation.fromHtml('#divSignup .vex-validation-summary');
        if (data.error) {
            vld.addError(data.error);
        }
        else {
            $('#divSignup .vex-form').hide();
            vld.addSuccess('Succesfull Signup. We have sent you an activation email. Please go to your inbox and open the activation email to activate your account.');
        }
        vld.validate();
    }
    function onSignupError() { }
</script>
*/