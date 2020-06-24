$(document).ready(function(){
    $('#project').attr('class','active');
    $(".dev_list option:selected")
    //$('#bcPicker').bcPicker();
    $('#project_color').colorPalettePicker({
        button: '<button name="colorpalettebutton" class="{buttonClass}" data-toggle="dropdown"><span name="{buttonPreviewName}" style="display:none">■ </span>{buttonText}</button>',
        buttonClass: 'btn btn-md btn-border',
        buttonPreviewName: 'colorpaletteselected',
        buttonText: 'Choose color',
        dropdown: '<div class="dropdown-menu"><h5 class="dropdown-header text-center">{dropdownTitle}</h5>',
        dropdownTitle:'Available colors',
        menu: '<ul class="list-inline" style="padding-left:10px;padding-right:10px">',
        item: '<li class="list-inline-item"><div name="picker_{name}" class="colors" style="background-color:{color};width:32px;height:32px;border-radius:5px;border: 1px solid #666;margin: 0px;cursor:pointer" data-toggle="tooltip"  title="{name}" data-color="{color}"></div></li>',
    });
    $('.colors').on('click',function(){
        var color=$(this).attr('data-original-title');
        $('.color').val(color);    
    });


 $('body').on('click','#time_estimate_email',function(event){
    var project_name=$('#project_name').val();
    $('#pro_time_project_name').val(project_name);
        event.preventDefault();
        $('#project_time_estimate_modal').modal("show");
     });
  $('body').on('click','#time_estimate_download',function(event){
        var project_id=$('#p_id').val();
        var re = /id/gi;
        var str = time_estimate_download_url;
        var download_url = str.replace(re, project_id);
        window.location = download_url; 
  });
 


$('.datetimepicker').datetimepicker();

    var client_company=0;
    var dev_company=0;
    client_company=$('.client_company').val();
    dev_company=$('.dev_company').val();
  $(document).on('click','.add_time_estimation',add_time_form);

        function add_time_form(){
                var div = $('#dummy_time_estimate').html();
            time_count++;
            div = div.replace(/xxx/g,time_count);  
            $('.time_estimate_wrapper').append(div);
        }


  $(document).on('click','.add_attachment',add_attachment_form);

        function add_attachment_form(){
            var div = $('#dummy_project_attachment').html();
            attach_count++;
            div = div.replace(/xxx/g,time_count);  
            $('.project_attachment_wrapper').append(div);
        }


  $(document).on('click','.add_link',add_link_form);
  $(document).on('click','.add_milestone',add_milestone_form);

        function add_link_form(){
            var div = $('#dummy_project_links').html();
            link_count++;
            div = div.replace(/xxx/g,link_count);  
            $('.project_link_wrapper').append(div);
        }
        
        if(milestone_count==0)
        {
            add_milestone_form();
        }
        
        function add_milestone_form(){
            var div = $('#dummy_project_milestone').html();
            milestone_count++;
            div = div.replace(/xxx/g,milestone_count);  
            $('.project_milestone_wrapper').append(div);
             $('select').next('.select2').remove();
            $('select').not('.not_style').select2();
        }

        $(document).on('click','.add_event',add_event_form);

        function add_event_form(){
            var div = $('#dummy_project_events').html();
            event_count++;
            div = div.replace(/xxx/g,event_count);  
            $('.project_event_wrapper').append(div);
            $('.datetimepicker').datetimepicker();
        }


        $(document).on('click','.remove_time_estimation',function(){
            $(this).parents(".project_time_estimate").remove();
        });

        $(document).on('click','.remove_attachment',function(){
            $(this).parents(".project_attachment").remove();
        });
       


         $('.delete-confirm').click(function(){
            var type=$('#type').val();
            if(type=='milestone-items')
            {
                delete_add_milestone();
            }
           // if(type=='attachment')
           //  {
           //      delete_attachment_tab();
           //  } 
           //   if(type=='events')
           //  {
           //      delete_events_tab();
           //  } 
           //   if(type=='delete_mom')
           //  {
           //      window.location = delete_url;
           //  } 
 
        });

        function delete_add_milestone(){

            var id = $('#milestone_id').val();
            var class_name='remove_milestone_'+id;
            $('.'+class_name).hide();
            $.ajax({
                url:delete_milestone_url,
                method:'POST',
                //processData:true,
                data: {
                id :id
                },
                success:function(d){
                    if(d.success==true)
                    {
                    new Noty({
                    type: 'success',
                    layout: 'topRight',
                    text: 'Deleted Sucessfully.'
                    }).show();
                    $('#delete_confirmation_modal').modal("hide");
                    //alert(class_name);
                    $("."+class_name).remove();
                        // location.reload();


                //$("#myForm").load(location.href + " #myForm");


                }
                else
                {
                    new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: d.errors,
                    }).show();
                }
                }
            })
         }
        $('body').on('click', ".remove_milestone" ,function(){  
        
            var delete_id = $(this).attr('id');
            // alert(delete_id);
            var type = 'milestone-items';
            $("#milestone_id").val(delete_id);

            $("#type").val(type);
            // $('#form').prepend('<input type="hidden" name="deleted_action_ids[]" value="'+id+'"/>');
            // var delete_id = $(this).attr('id');
            if(delete_id)
            {
                // alert();
                $('#delete_confirmation_modal').modal("show");
            }
            else
            {
               $(this).parents(".project_milestone").remove();
                
            }

        });




         $(document).on('click','.remove_event',function(){
            $(this).parents(".project_event").remove();
        });
      

$('body').on('click', ".remove_file" ,function(){      
        var id = $(this).attr('id');
        var class_name='remove_'+id;
        $('.'+class_name).hide();
        $.ajax({
            url:delete_project_file_url,
            method:'POST',
            //processData:true,
            data: {
            id :id
            },
            success:function(d){
                if(d.success==true)
                {
                new Noty({
                type: 'success',
                layout: 'topRight',
                text: 'Deleted Sucessfully.'
                }).show();
            }
            else
            {
                new Noty({
                type: 'error',
                layout: 'topRight',
                text: d.errors,
                }).show();
            }
            }
        })

    });
// $('body').on('click', ".remove_milestone" ,function(){      
//         var id = $(this).attr('id');
//         var class_name='remove_milestone_'+id;
//         $('.'+class_name).hide();
//         $.ajax({
//             url:delete_milestone_url,
//             method:'POST',
//             //processData:true,
//             data: {
//             id :id
//             },
//             success:function(d){
//                 if(d.success==true)
//                 {
//                 new Noty({
//                 type: 'success',
//                 layout: 'topRight',
//                 text: 'Deleted Sucessfully.'
//                 }).show();
//             }
//             else
//             {
//                 new Noty({
//                 type: 'error',
//                 layout: 'topRight',
//                 text: d.errors,
//                 }).show();
//             }
//             }
//         })

//     });






    var check_team1;



    $('#team').click(function(){
            $(this).attr('data-target',"#team-member");
            $(this).attr('data-toggle',"tab");
            $(this).attr('aria-expanded',"true");
    });




    $('#contact').click(function(){    
            $(this).attr('data-target',"#contacts");
            $(this).attr('data-toggle',"tab");
            $(this).attr('aria-expanded',"true");   
    });

    $(document).on('change','.client_company',function(){
        client_company=$('.client_company').val();
    });
    $(document).on('change','.dev_company',function(){
        dev_company=$('.dev_company').val();
    });



	var form_id = '#form';
    var v = jQuery(form_id).validate({
        errorPlacement: function(error, element) {
            if (element.hasClass("milestone_date")){
              $('.milestone_date_error').html(''); 
              error.appendTo('.milestone_date_error');

            }
            else if (element.hasClass("status")){ 
            $('.status_error').html('');
              error.appendTo('.status_error');
            }
            else{
              error.insertAfter(element)
            }
          },
        ignore: "",
        rules: {
            milestone_date:
            {
               required:true,
            },
            description:{
                required:true,
            },
            status:{
                required:true,
            },
        },        
        submitHandler: function (form) {
            let formData = new FormData($(form_id)[0]);
            $('#submit').button('loading');
                $.ajax({
                    url: save_milestone,
                    method: "POST",
                    data:formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(res) {
                    if(!res.success) {
                        $('#submit').button('reset'); 
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
                        $('#master-new-project').modal('hide');
                        window.location = list_project_view;
                    }
                })
                .fail(function(xhr) {
                    $('#submit').button('reset'); 
                    new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: 'Something went wrong at server.'
                    }).show();

                })
            
            
        }
    }); 
        // $(document).on('click','#delete_project',function(){
        //   $('#confirm_message').text('Are you sure? Do you want to delete this Project?');
        //     $('#delete_confirmation_modal').modal('show');
        // });

        // $(document).on('click','.delete-confirm',function(){
        // // $('#confirm_message').text('Are you sure? Do you want to delete this Project?');
        //     var project_id = $('#delete_project').attr('data-id');
        //     var url = delete_project;
        //     url = url.replace('id',project_id);
        //         $.ajax({
        //         url: url,
        //         type:'GET',
        //         dataType: "json",
        //         processData: true,
        //         data:{},
        //             success:function(data){
        //                 if(data){
        //                     $('#delete_confirmation_modal').modal('hide');
        //                     window.location = list;              
        //                 }
        //             }
        //         });
        // });
});



