$(document).ready(function(){
        var check_team1;
        var form_id = '#time_estimation_detail_form';
        var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            priority:
            {
                required:true,
            },
            module:
            {
                required:true,
            },
            task_status_id:
            {
                required:true,
            },
            client_ui_ux_design:
            {
                required:true,
            },
            priority:
            {
                required:true,
            },
            client_ui_dev:
            {
                required:true,
            },
            client_be_dev:
            {
                required:true,
            },
            client_mobile_dev:
            {
                required:true,
            },
            client_mobile_dev:
            {
                required:true,
            },
            client_qa:
            {
                required:true,
            },
            ui_ux_design:
            {
                required:true,
            },
            ui_dev:
            {
                required:true,
            },
            be_dev:
            {
                required:true,
                custom_rule : true,
            },
            mobile_dev:
            {
                required:true,
            },
            qa:
            {
                required:true,
                custom_rule_for_qa : true,
            },
            be_dev_user_id:
            {
                required:true,
               
            },
            qa_user_id:
            {
                required:true,
                
            }

        },
        invalidHandler: function(event, validator) {
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: 'You have errors, Kindly check'
            }).show();
            //alert($('.error').eq(0).parents('.tab-pane').attr('id'))
            //alert($('.error').eq(0).parents('.tab-pane'))
            //$('[data-attribute= "'+$('.error').eq(0).parents('.tab-pane').attr('id')+'"]').trigger('click');
        },        

        submitHandler: function (form) {
            let formData = new FormData($(form_id)[0]);
            $('#submit').button('loading');
            form.submit();
            /*
            $.ajax({
            url: save_url,
            method: "POST",
            data:formData,
            processData: false,
            contentType: false,
            })
            .done(function(res) {
            if(!res.success) {
            $('#submitIt').button('reset'); 
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
            window.location = res.back_url;
            }
            })
            .fail(function(xhr) {
            $('#submitIt').button('reset'); 
            new Noty({
            type: 'error',
            layout: 'topRight',
            text: 'Something went wrong at server.'
            }).show();

            })  
            */                                  
        }
        }); 
        jQuery.validator.addMethod("custom_rule", function(value, element) {

        var be_dev_value = $("#be_dev").val();
        if(be_dev_value > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
        }, "value should be greater than 0");  

        jQuery.validator.addMethod("custom_rule_for_qa", function(value, element) {

        var qa_value = $("#qa").val();
        if(qa_value > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
        }, "value should be greater than 0");  



        $('body').on('click', ".add_key_item" ,function(){
            var div = $('#dummy_key_item').html();
            div = div.replace(/xxx/g,key_conut);
            key_conut++;
            $('.description_warpper').append(div);
        });

        $('body').on('click', ".add_attachment_estimation" ,function(){
            var div = $('.project_attachments').html();
            div = div.replace(/xxx/g,key_conut);
            key_conut++;
            $('.description_attach_warpper').append(div);
        });

        $('body').on('click','.remove_attachment_estimation',function(){

            var delete_id = $(this).attr('id');
            var type = 'remove_attachment_estimation';
            $('#attachment_estimation_id').val(delete_id);
            $('#type').val(type);
            if(delete_id)
            {
                $('#delete_confirmation_modal').modal("show");
                $('.change_title').html("Attachment file");
            }

        });

        $('.delete-confirm').click(function(){
            var type=$('#type').val();
            if(type=='remove_attachment_estimation')
            {
                delete_attachment_estimation();
            }
            if(type=='key-item')
            { 
                remove_key_item_detail();
            }
            if(type=='remove_attach_link')
            { 
                delete_attachment_links();
            }

        });


        function delete_attachment_estimation()
        {   
            var id = $('#attachment_estimation_id').val();
            var class_name='remove_'+id;
            $('.'+class_name).hide();
            $.ajax({
                url:delete_attachment_file_url,
                method:'POST',
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
                        $("."+class_name).remove();
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

        function remove_key_item_detail()
        {
            var id = $('#key_item_id').val();
            var url = key_item_delete_url;
            url = url.replace('id_value',id);
            var class_name='remove_'+id;
            // alert(class_name);
            $('.'+class_name).hide();

            $.ajax({
                url: url,
                type:'GET',
                dataType: "json",
                processData: true,
                data:{},
                success:function(d){
                    if(d.success==true)
                    {
                     new Noty({
                                type: 'success',
                                layout: 'topRight',
                                text: 'Deleted Sucessfully.'
                            }).show();
                            $('#delete_confirmation_modal').modal("hide");
                            $("."+class_name).remove();
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
        function delete_attachment_links()
        {
            var id = $('#attachment_add_link_id').val();
            var class_name='remove_'+id;
            $('.'+class_name).hide();
            $.ajax({
                url:delete_attachment_link_url,
                method:'POST',
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
                        $("."+class_name).remove();
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

        $('body').on('click', ".delete_button_attachment_estimation" ,function(){

            $(this).parents(".show").remove();
        });


        $('body').on('click', ".remove_description" ,function(){

            $(this).parents(".key_item").remove();
        });


        $('body').on('click','.remove_key_item',function(){

            var delete_id = $(this).attr('data-id');
            var type = 'key-item';
            $('#key_item_id').val(delete_id);
            $('#type').val(type);                
            $('#delete_confirmation_modal').modal("show");
            $('.change_title').html("key item");

        });


        $('body').on('click', ".add_time_estimate_link" ,function(){
            var div = $('.link').html();
            link_count++;
            div = div.replace(/xxx/g,link_count);  
            $('.time_estimate_link').append(div);
        });

        $('body').on('click', ".add_module_url_link" ,function(){
            var div = $('.add_module_url').html();
            module_url_count++;
            div = div.replace(/xxx/g,module_url_count);  
            $('.module_url_warpper').append(div);
            $('select').next('.select2').remove();
            $('select').not('.not_style').select2();
        });


        $('body').on('click', ".remove_module_link" ,function(){   
            $(this).parents(".module_url_show").remove();
        });

        $('body').on('click', ".remove_link" ,function(){

            var delete_id = $(this).attr('id');
            var type = 'remove_attach_link';
            $('#attachment_add_link_id').val(delete_id);
            $('#type').val(type);
            if(delete_id)
            {
                $('#delete_confirmation_modal').modal("show");
                $('.change_title').html("Link");
            }
        });

        $('body').on('click','.delete_module_link',function(){

            var delete_id = $(this).attr('id');
            $('#module_url_'+delete_id).val(delete_id);

            /*var delete_id = $(this).attr('id');
            var type = 'module_url_delete_detail';
            $('#type').val(type);
            $('#time_estimetion_delete_detail').val(delete_id);
            if(delete_id)
            {
                $('#delete_confirmation_modal').modal("show");
                $('.change_title').html("Module URL detail");
            }*/
        });



        $('body').on('click', ".remove_attachment_link" ,function(){   

            $(this).parents(".link_show").remove();
        });
    count=0;
        $(document).on('click', '.add_replay', function(){
            var id=$(this).val();
            var entity_id=$(this).attr('data-entity');
            $('.add_replay_'+id).css('display','none');
            var div = $('#dummy_comment').val('').html();
            div = div.replace(/xxx/g,count);
            div = div.replace(/yyy/g,id);
            entity_replace_id='entity_id_'+id;
            append_div_id='add_replay_wrapper_'+id;
            $('.'+append_div_id).append(div);
            $('#'+entity_replace_id).val(entity_id);
            count++;
        });
    $(document).on('click', '.save_replay', function(){
        var parent_id=$(this).val();
        estimation_id='entity_id_'+parent_id;
        estimation_id_value=$('#'+estimation_id).val(); 
        var text=$(this).parents('.comment_replay_row').find('.comment_replay_text').val();
        if(text)
        {
            $('.add_replay_'+parent_id).css('display','');  
            $.ajax({
                url:save_comment_replay_url,
                method:'POST',
                data:{
                entity_id:estimation_id_value,
                parent_id:parent_id,
                comment:text,
                },
                success:function(d){
                    if(d.success==true)
                    {
                    console.log();
                    var remove_div='comment_replay_'+parent_id;
                    var append_replay_div='add_replay_new_'+parent_id;
                    var replay_add_div ='<li style="margin-left: 30px;"><div class="form-group"><div class="sub-comment"><label><img class="img" style="width:30px;height:30px;border-radius: 50%;" alt="TVS" src="'+d.comment_profile_image+'">'+d.comment_profile_name+'  '+d.comment_date+'</label><button type="button" class="btn-xs btn-info add_replay add_replay_'+d.comment_replay.id+'" value="'+d.comment_replay.id+'" id="add_replay_'+d.comment_replay.id+'"  data-entity="'+d.comment_replay.entity_id+'">Replay</button><p>'+d.comment_replay.comment+'</p> <input type="hidden" name="time_estimation_'+d.comment_replay.id+'"  id="time_estimation_'+d.comment_replay.id+'" value="'+d.comment_replay.entity_id+'"><div class="add_replay_wrapper_'+d.comment_replay.id+'"></div><div class="add_replay_new_'+d.comment_replay.id+'"></div></div></div></li>';
                    $('.'+append_replay_div).append(replay_add_div);

                    //window.location=list_url;
                    $('.'+remove_div).remove(); 
                    //location.reload();
                    new Noty({
                    type: 'success',
                    layout: 'topRight',
                    text: 'Updated Sucessfully.'
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
        }
        else
        {
            new Noty({
            type:'error',
            layout:'topRight',
            text:'Please enter your comments',
            }).show();
        }
    });


    var form_id = "#comment_form";
    var v = jQuery(form_id).validate({
        ignore:"",
        rules:{
            comments:
            {
                required:true,
            }
        },
        submitHandler: function(form){
            let formData = new FormData($(form_id)[0]);
            $('#add_comment').button('loading');
            $.ajax({
                url:save_comment_url,
                method:"POST",
                data:formData,
                processData:false,
                contentType:false,
            })
            .done(function(res){
                if(!res.success){
                    $('#add_comment').button('Reset');
                    var errors = '';
                    for(var i in res.errors){
                        errors = '<li>'+res.errors[i]+'</li>';
                    }
                    new Noty({
                        type:'error',
                        layout:'topRight',
                        text:errors,
                    }).show();
                }else{
                    //alert(dev_task_url);
                    window.location=view_back_comment_url;
                }
            })
            .fail(function(xhr){
                $('#add_comment').button('reset');
                new Noty({
                      type: 'error',
                      layout: 'topRight',
                      text: 'Something went wrong at server.'
                  }).show();
            })
        }
    });

});



