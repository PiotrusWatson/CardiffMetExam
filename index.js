"use strict";


jQuery.validator.addMethod("dateMustBeAfterNow", function(value, element){
  return this.optional(element) || (Date.parse(value) >= new Date());
}, "Proposed date must be after now");

$().ready(function() {

  

  var ids = {
    form: $( "#callback_form" ),
    first_name: $( "#first_name" ),
    last_name: $( "#last_name" ),
    phone: $( "#phone" ),
    email: $( "#email" ),
    best_time: $( "#best_time" ),
    school: $( "#school" )
  }
  
  //hacky oneliner to force the date-time input to be 
  ids.best_time.attr("min", new Date().toISOString().slice(0, 16));

    ids.form.validate({
        rules: {
          first_name:{
            required: true,
            lettersonly: true,
            minlength: 2,
            maxlength: 16
          },
          last_name:{
            required: true,
            lettersonly: true,
            minlength: 2,
            maxlength: 16
          },
          phone: {
            required: true,
            phoneUK: true
          },
          email: {
            required: true,
            email: true
          },
          best_time: {
            required: true,
            dateMustBeAfterNow: true
          }
        },
        //changes page and adds the details to the url to be picked up in the other page
        submitHandler: function(form, event) {
            event.preventDefault();
            var form_details = storeCallbackFormDetails(ids);
            location.href = "success.html?" + JSON.stringify(form_details);
          }
      });

});

function storeCallbackFormDetails(ids){
  return {
    first_name: ids.first_name.val(),
    last_name: ids.last_name.val(),
    phone: ids.phone.val(),
    email: ids.email.val(),
    best_time: ids.best_time.val(),
    school: ids.school.val()
  }
}
  