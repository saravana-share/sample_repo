  $(document).ready(function() {
      var form_id = '#form';
      var mail_option = $('input[name=mail_option]:checked').val();
      if (mail_option == 'company') {
          $('.custom').css('display', 'none');
      } else {
          $('.company').css('display', 'none');
      }
      $('body').on('click', '.project_select_all', function() {
          console.log('in');
          if (this.checked == true) {
              console.log('true');
              $('#project_table_sample').find('input[class="project_select"]').prop('checked', true).trigger("change");
          } else {
              $('#project_table_sample').find('input[class="project_select"]').prop('checked', false).trigger("change");
          }
      });

      var selected_project = [];
      $('body').on('click', '.project_select_all', function() {
          selected_project = [];
          sel_pro = "";
          $.each($("input[class='project_select']:checked"), function() {
              selected_project.push($(this).val());
          });
          sel_pro = $.unique(selected_project);
          $('.seleted_projects').val(sel_pro);
      });
      $('body').on('click', '.project_select', function() {
          selected_project = [];
          sel_pro = "";
          $.each($("input[class='project_select']:checked"), function() {
              selected_project.push($(this).val());
          });
          sel_pro = $.unique(selected_project);
          $('.seleted_projects').val(sel_pro);
      });

      $('body').on('click', '#mail_send', function(event) {
          event.preventDefault();
          if (selected_project != "") {
              $('#project_summary_modal').modal("show");
          } else {
              new Noty({
                  type: 'error',
                  layout: 'topRight',
                  text: 'Please select projects'
              }).show();
          }
      });

      $('body').on('change', '.mail_option_change', function() {
          var mail_option = $('input[name=mail_option]:checked').val();
          if (mail_option == 'company') {
              $('.custom').css('display', 'none');
              $('.company').css('display', '');
          } else {

              $('.company').css('display', 'none');
              $('.custom').css('display', '');
              $('.company_select').val('')
              $('.company_select').multiselect('rebuild');
              $('.project_summary_email_to').val('');
              $('.project_summary_email_to').multiselect('rebuild');
              $('.project_summary_email_cc').val('');
              $('.project_summary_email_cc').multiselect('rebuild');
              $('select').next('.select2').remove();
              $('select').not('.not_style').select2();
          }
      });
      $('body').on('change', '.company_select', function() {
          //alert(2);
          var id = $('.company_select').val();
          var re = /id_value/gi;
          var str = get_company_mail_url;
          var mail_url = str.replace(re, id);
          //alert(mail_url);
          if (id) {
              $.ajax({
                  url: mail_url,
                  method: 'GET',
                  //processData:true,
                  data: {
                      id: id
                  },
                  success: function(d) {
                      if (d.success == true) {
                          cc_mail = d.cc_mail_id.split(',');
                          $('.project_summary_email_to').val(d.to_mail_id);
                          $('.project_summary_email_to').multiselect('rebuild');
                          $('.project_summary_email_cc').val(cc_mail);
                          $('.project_summary_email_cc').multiselect('rebuild');
                          $('select').next('.select2').remove();
                          $('select').not('.not_style').select2();
                      }
                  }
              })
          } else {
              $('.project_summary_email_to').val('');
              $('.project_summary_email_to').multiselect('rebuild');
              $('.project_summary_email_cc').val('');
              $('.project_summary_email_cc').multiselect('rebuild');
              $('select').next('.select2').remove();
              $('select').not('.not_style').select2();
          }

      });
      $('body').on('change', '.project_company', function() {
          //alert(1);
          var company_id = $('.project_company').val();
          var set_value = 1;
          $.ajax({
              url: Summary,
              method: 'GET',
              //processData:true,
              data: {
                  company_id: company_id,
                  set_value: set_value
              },
              success: function(d) {

                  $('.summary_table').html('');
                  $('.summary_table').html(d.summary_form_table);
              }
          })

      });
      $('body').on('click', '#summary_save', function(event) {
          event.preventDefault();
          if (selected_project != "") {
              $('#form').submit();
          } else {
              $('#summary_save').button('reset');
              new Noty({
                  type: 'error',
                  layout: 'topRight',
                  text: 'Please select projects'
              }).show();
          }
      });

      $('body').on('click', '#pro_mail_send', function() {
          //alert($('.project_email_to').val());
          var form = jQuery("#project_summary_report");
          //var form = '#project_summary_report';
          form.validate({
              rules: {
                  task_subject: {
                      required: true,
                  },
                  "project_summary_email_to[]": {
                      required: true,
                  }
              },
              messages: {
                  task_subject: {
                      required: 'Please Enter Subject',
                  },
                  'project_summary_email_to[]': {
                      required: 'Please Select To Mail',
                  }

              },
              errorPlacement: function(error, element) {
                  if (element.hasClass("project_summary_email_to")) {
                      error.appendTo($('.project_to_email_error'));
                  }
                  if (element.hasClass("project_subject")) {
                      error.appendTo($('.project_subject_error'));
                  }
              },
          });
          //alert(form.valid());
          if (form.valid()) {
              //alert($('.project_summary_email_to').val());
              $('.seleted_to_mail').val($('.project_summary_email_to').val());
              $('.seleted_cc_mail').val($('.project_summary_email_cc').val());
              $('.mail_body').val($('.project_body_description').val());
              $('.mail_subject').val($('.project_subject').val());
              if ($('.project_subject').val() != "") {
                  if ($('.project_email_to').val() != "") {
                      $('#form').submit();
                  } else {
                      new Noty({
                          type: 'error',
                          layout: 'topRight',
                          text: 'Please fill all mandatory fields'
                      }).show();
                  }
              } else {
                  new Noty({
                      type: 'error',
                      layout: 'topRight',
                      text: 'Please fill all mandatory fields'
                  }).show();
              }
          }
      });


  });