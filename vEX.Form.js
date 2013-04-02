/*{"Copyright":"VEXIT 2013","TermsOfUse":"This code is intellectual property of the author and the company VEX IT. You can use and adapt this code as you like as long as you leave this copyright notice at the top.","Author":"Vex Vendetta (Vex Tatarevic)","DateCreated":"2013-04-01","Company":"vEX IT","URL":"www.vexit.com","Using": ["jquery","vEX.UI","vEX.Entity","vEX.Validation"],"Description":"Wires up form Validation,entity data extraction and sending data to seerver via ajax"}*/
if (typeof vEX == 'undefined') { vEX = {}; }
vEX.Form = function () { }
vEX.Form.submit = function (url, entity, panelID, loadingText, onSuccess, onError, onAlways, isJson) {
    vEX.ajaxPanel(url, entity, panelID, loadingText
        , function (data) {
            if (onSuccess)
                eval(onSuccess + '(data)');
        }
        , function () {
            if (onError)
                eval(onError + '()');
        }
        , function () { if (onAlways) eval(onAlways + '()'); }
        , isJson);
}
$(function () {
    $('.vex-form-panel').each(function () {
        var id = $(this).attr('id');
        $('#' + id + ' .vex-form-submit').click(function () {
            var vld = vEX.Validation.fromHtml(id);
            if (vld.validate()) {
                var ent = vEX.Entity.fromHtml(id);
                var r = $('#' + id + ' .vex-form-request');
                r.attr('data-loading-text');
                vEX.Form.submit(r.attr('data-url'), ent, id, r.attr('data-loading-text'),
                    r.attr('data-on-success'), r.attr('data-on-error'), r.attr('data-on-always'), r.attr('data-json'));
            }
        });
    });
});
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