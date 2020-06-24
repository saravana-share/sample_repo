$(document).ready(function() {

    $('#leave').click(function() {
        $("#day_option").show();
        $("#permission_option").hide();

    });
    $('#permission').click(function() {
        $("#day_option").hide();
        $("#permission_option").show();
        // alert()
    });

    $("#hour_change").datetimepicker({
        format: 'HH:mm',

    });
    /*$('body').on('click','.apply_leave',function()
      {
          var form_id = '#leave_form';
             var v = jQuery(form_id).validate({
               iignore: "",
               rules: {
                 leave_type: {
                   required: true,
                 },
                 date: {
                   required: true,
                 },
                 reason: {
                   required: true,
                 },
                 
                 days: {
                   required: function(){
                         if($('input[name="leave_type"]:checked').val()=='0'){
                           return true;
                         };
                       },
                 },
                 hours: {
                   required: function(){
                         if($('input[name="leave_type"]:checked').val()=='1'){
                           return true;
                         };
                       },
                 },
                 

               },
               submitHandler: function (form_id) {
                alert(1);
                let formData = new FormData($('#leave-form')[0]);
                $('#apply-leave').button('loading');
                $.ajax({
                  url: leave_url,
                  method: "POST",
                  data:$("#leave-form").serialize(),
                  processData: false,
                })
                .done(function(res) {
                  $('#apply-leave').button('reset');
                  if(!res.success) {
                      var errors = '';
                      for(var i in res.errors){
                          errors += '<li>'+res.errors[i]+'</li>';
                      }

                      console.log(errors)
                      new Noty({
                      type: 'error',
                      layout: 'topRight',
                      text: errors
                      }).show();
                  }else{
                      new Noty({
                      type: 'success',
                      layout: 'topRight',
                      text: res.message
                      }).show();
                      $('#leave_modal').modal('toggle');
                      window.location = profile_url;
                  }

                })

              .fail(function(xhr) {
                  $('#apply-leave').button('reset');
                      new Noty({
                      type: 'error',
                      layout: 'topRight',
                      text: 'Something went wrong at server.'
                      }).show();
              })
            }
          });
        });*/


    var form = jQuery("#leave_form");

    form.validate({
        rules: {
            leave_type: {
                required: true,
            },
            date: {
                required: true,
            },
            reason: {
                required: true,
            },
        },
        messages: {
            leave_type: {
                required: 'Please Enter Leave Type',
            },
            date: {
                required: 'Please Select Date',
            },
            reason: {
                required: 'Please Fill Reason',
            },
        },
        submitHandler: function(form) {
            $('#apply_leave').button('loading');
            var form_id = '#leave_form';
            let formData = new FormData($(form_id)[0]);
            $.ajax({
                    url: leave_url,
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if (!res.success) {
                        $('#apply_leave').button('reset');
                        console.log(res.errors);
                        var errors = '';
                        for (var i in res.errors) {
                            errors += '<li>' + res.errors[i] + '</li>';
                        }
                        console.log(errors)
                        if (errors) {
                            new Noty({
                                type: 'error',
                                layout: 'topRight',
                                text: errors
                            }).show();
                        }

                    } else {
                        $('#apply_leave').button('reset');
                        console.log(res.message);
                        new Noty({
                            type: 'success',
                            layout: 'topRight',
                            text: res.message,
                        }).show();

                        $('#leave_modal').modal('hide');
                        window.location = list_leave_url;
                    }
                })
        }
    });




});