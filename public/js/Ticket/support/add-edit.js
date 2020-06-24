$(document).ready(function(){

	$('body').on('click', ".add_attachment" ,function(){
            var div = $('.project_attachments').html();
            div = div.replace(/xxx/g,attach_count);
            attach_count++;
            $('.description_attach_warpper').append(div);
     });

	$('body').on('click', ".add_time_estimate_link" ,function(){
            var div = $('.link').html();
            link_count++;
            div = div.replace(/xxx/g,link_count);  
            $('.time_estimate_link').append(div);
     });

	$('body').on('click', ".add_key_item" ,function(){
            var div = $('#dummy_key_item').html();
            div = div.replace(/xxx/g,key_conut);
            key_conut++;
            $('.description_warpper').append(div);
    });

    $('body').on('click', ".remove_key" ,function(){
    		
            $(this).parents(".key_item").remove();
        });

	$('body').on('click', ".delete_button_attachment_estimation" ,function(){

            $(this).parents(".show").remove();
     });

	$('body').on('click', ".remove_attachment_link" ,function(){   

            $(this).parents(".link_show").remove();
     });


    $('body').on('click','.remove_attachment_ticket',function(){

        var delete_id = $(this).attr('id');
        var type = 'remove_attachment_ticket';
        $('#attachment_ticket_id').val(delete_id);
        $('#type').val(type);
        if(delete_id)
        {
            $('#delete_confirmation_modal').modal("show");
            $('.change_title').html("Attachment file");
        }

    });

    $('body').on('click', ".remove_ticket_link" ,function(){

            var delete_id = $(this).attr('id');
            var type = 'remove_ticket_link';
            $('#ticket_link_id').val(delete_id);
            $('#type').val(type);
            if(delete_id)
            {
                $('#delete_confirmation_modal').modal("show");
                $('.change_title').html("Link");
            }
        });

    $('body').on('click','.remove_ticket_key_item',function(){

            var delete_id = $(this).attr('data-id');
            var type = 'key_ticket';
            $('#key_ticket_id').val(delete_id);
            $('#type').val(type);   
            if(delete_id)
            {             
	            $('#delete_confirmation_modal').modal("show");
	            $('.change_title').html("key item");
	        }

        });

    $('.delete-confirm').click(function(){
        var type = $('#type').val();
        if(type=='remove_attachment_ticket')
        {
            delete_attachment_ticket();
        }
        if(type=='remove_ticket_link')
        { 
           delete_ticket_links();
        }
        if(type=='key_ticket')
        { 
            delete_ticket_key_item()
        }

    });


    function delete_attachment_ticket()
    {   
        var id = $('#attachment_ticket_id').val();
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

    function delete_ticket_links()
        {
            var id = $('#ticket_link_id').val();
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


        function delete_ticket_key_item()
        {
            var id = $('#key_ticket_id').val();
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

		var form_id = '#ticket_form';
		/*var v = jQuery(form_id).validate({
			ignore: "",
			// rules: {
			// 	project_id:{
			// 	required:true,
			// 	},
			// 	module:{
			// 	required:true,
			// 	},
			// 	assign_id: {
			// 	required: true,
			// 	},
			// 	remarks:{
			// 	required: true,  
			// 	},
			// 	due_date:{
			// 	required: true, 
			// 	},
			// 	priority:{
			// 	required: true,
			// 	}
			
			// },
			submitHandler: function (form) {
				var valid = true;
				let formData = new FormData($(form_id)[0]);
				$('#submit').button('loading');
				$.ajax({
				url: save_ticket,
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
				// window.location = list_employee;
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
		}); */

    // $('body').on('click', '.ticket_create', function (event) {
    //     event.preventDefault();
    //     $('#ticket_create_modal').modal("show");

    // });
    	 $('body').on('click', ".ticket_create" ,function(){ 
             var v = jQuery(form_id).validate({
                ignore:"",
                rules:{
               project_id:{
				required:true,
				},
				module:{
				required:true,
				},
				assign_id: {
				required: true,
				},
				remarks:{
				required: true,  
				},
				due_date:{
				required: true, 
				},
				priority:{
				required: true,
				}
                },
            });
			var valid=$(form_id).valid();
			if(valid)
			{
				var id =$('#id').val();
				if(id)
				{
					$('#sub_btn_ticket').trigger('click');
				}else
				{
					$('#ticket_create_modal').modal("show");
				}
			}  
            
        });
	 $('body').on('click', ".ticket_mail_send" ,function(){ 
	 	$('#sub_btn_ticket').trigger('click');
	 });
	 
    
       $('body').on('change','.ticket_project',function()
        {
            var id=$('#project_id').val();
                var re = /id_value/gi;
                var str = get_project_mail_url;
                var mail_url = str.replace(re, id);
                $.ajax({
                    url:mail_url,
                    method:'GET',
                    //processData:true,
                    data: {
                    id :id
                    },
                    success:function(d){
                        console.log(d);
                        if(d.success==true)
                        {
                            if(d.support_user==null)
                            {
                                 support_user = "";
                            }
                            else
                            {
                               support_user = d.support_user; 
                            }
                            if(d.cc_mail_id==null)
                            {
                                 cc_mail = "";
                            }
                            else
                            {
                                 cc_mail = d.cc_mail_id.split(',');
                            }
                            if(d.to_mail_id==null)
                            {
                                to_mail="";
                            }else
                            {
                                to_mail=d.to_mail_id;
                            }
                            $('.ticket_assign_to').val(support_user);
                            $('#assign_to').val(support_user);
                             
                            $('#ticket_email_to').val(to_mail);
                            $('#ticket_email_to').trigger('change');  
                            $('#ticket_email_cc').val(cc_mail);
                            $('#ticket_email_cc').trigger('change');
                            $('select.ticket_assign_to').next('.select2').remove();
                            $('select.ticket_assign_to').not('.not_style').select2();
                        }
                    }
                })

        });
	 
	  $('body').on('change','.mail_change_project',function()
        {
           
           var mail_option=$('input[name=mail_option_project]:checked').val();
           if(mail_option=='project')
           {
                var id=$('#project_id').val();

                var re = /id_value/gi;
                var str = get_project_mail_url;
                var mail_url = str.replace(re, id);
                $.ajax({
                    url:mail_url,
                    method:'GET',
                    //processData:true,
                    data: {
                    id :id
                    },
                    success:function(d){
                        console.log(d);
                        if(d.success==true)
                        {
                            if(d.cc_mail_id==null)
                            {
                                 cc_mail = "";
                            }
                            else
                            {
                                 cc_mail = d.cc_mail_id.split(',');
                            }
                            if(d.to_mail_id==null)
                            {
                                to_mail="";
                            }else
                            {
                                to_mail=d.to_mail_id;
                            }
                            $('#ticket_email_to').val(to_mail);
                            $('#ticket_email_to').trigger('change');  
                            $('#ticket_email_cc').val(cc_mail);
                            $('#ticket_email_cc').trigger('change');
                            //$('select.ticket_assign_to').next('.select2').remove();
                            //$('select.ticket_assign_to').not('.not_style').select2();

                            $('select').next('.select2').remove();
                            $('select').not('.not_style').select2();
                        }
                    }
                })

           }
           else
           {
                $('#ticket_email_to').val('');
                $('#ticket_email_to').trigger('change');  
                $('#ticket_email_cc').val('');
                $('#ticket_email_cc').trigger('change'); 
                $('select').next('.select2').remove();
                $('select').not('.not_style').select2(); 
                 $('select.ticket_email_cc').next('.select2').remove();
                $('select.ticket_email_cc').not('.not_style').select2();
           }
        });


});