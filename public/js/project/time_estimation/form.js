$(document).ready(function() {

    $(document).on('click', '.add_time_estimation', add_time_form);

    function add_time_form() {

        var div = $('#dummy_time_estimate').html();
        time_count++;
        div = div.replace(/xxx/g, time_count);
        $('.time_estimate_wrapper').append(div);
        $('select').next('.select2').remove();
        $('select').not('.not_style').select2();
        dateTimeRange();
    }

    if (add_time_estimate) {
        add_time_form();
    }

    $('body').on('click', '#time_estimate_email', function(event) {
        var project_name = $('#project_name').val();
        $('#pro_time_project_name').val(project_name);
        event.preventDefault();
        $('#project_time_estimate_modal').modal("show");
    });

    $('body').on('click', '#time_estimate_download', function(event) {
        var project_id = $('#p_id').val();
        var re = /id/gi;
        var str = time_estimate_download_url;
        var download_url = str.replace(re, project_id);
        window.location = download_url;
    });


    $('body').on('click', '.remove_time_estimation', function() {
        var delete_id = $(this).attr('id');
        var class_name = 'remove_' + delete_id;
        var type = 'time_estimetion_delete_detail';
        $('#type').val(type);
        $('#time_estimetion_delete_detail').val(delete_id);
        if (delete_id) {

            $('#delete_confirmation_modal').modal("show");
            $('.change_title').html("Time Estimation detail");

        } else {
            $(this).parents(".remove_time").remove();
        }

    });

    function delete_time_estimation_detail() {


        var id = $('#time_estimetion_delete_detail').val();
        var class_name = 'remove_' + id;
        var url = delete_time_estimation_detail_url;
        url = url.replace('id_value', id);
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            processData: true,
            data: {},
            success: function(d) {
                if (d.success == true) {
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        text: 'Deleted Sucessfully.'
                    }).show();
                    $('#delete_confirmation_modal').modal("hide");
                    $("." + class_name).remove();
                } else {
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: d.errors,
                    }).show();
                }
            }
        })

    }
    $('.delete-confirm').click(function() {
        var type = $('#type').val();
        if (type == 'time_estimetion_delete_detail') {
            delete_time_estimation_detail();
        }
        if (type == 'bulk_key') {
            delete_bulk_add_key();
        }
        if (type == 'bulk_attachment_delete') {
            //alert('attachment');
            delete_bulk_add_attach();
        }
        if (type == 'bulk_url_delete') {
            //alert('link');
            delete_url_bulk();
        }


    });

    var check_team1;
    var form_id = '#form';
    var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            name: {
                required: true,
            },
            ui_ux_design_percentage: {
                required: true,
                number: true,
                range: [0, 100],
                maxlength: 5
                //decimal: true,
            },
            ui_dev_percentage: {
                required: true,
                number: true,
                range: [0, 100],
                maxlength: 5
                //decimal: true,
            },
            be_dev_percentage: {
                required: true,
                number: true,
                range: [0, 100],
                maxlength: 5
                //decimal: true,
            },
            mobile_dev_percentage: {
                required: true,
                number: true,
                range: [0, 100],
                maxlength: 5
                //decimal: true,
            },
            qa_percentage: {
                required: true,
                number: true,
                range: [0, 100],
                maxlength: 5
                //decimal: true,
            },

        },
        invalidHandler: function(event, validator) {
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: 'You have errors, Kindly check in each tab!'
            }).show();
            //alert($('.error').eq(0).parents('.tab-pane').attr('id'))
            //alert($('.error').eq(0).parents('.tab-pane'))
            //$('[data-attribute= "'+$('.error').eq(0).parents('.tab-pane').attr('id')+'"]').trigger('click');
        },

        submitHandler: function(form) {
            let formData = new FormData($(form_id)[0]);
            $('#submitIt').button('loading');
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
    $(document).on('click', '#delete_project', function() {
        $('#confirm_message').text('Are you sure? Do you want to delete this Project?');
        $('#delete_confirmation_modal').modal('show');
    });

    // $(document).on('click','.delete-confirm',function(){
    // // $('#confirm_message').text('Are you sure? Do you want to delete this Project?');
    //     var project_id = $('#delete_project').attr('data-id');
    //     var url = delete_project;
    //     url = url.replace('id',project_id);
    //     $.ajax({
    //         url: url,
    //         type:'GET',
    //         dataType: "json",
    //         processData: true,
    //         data:{},
    //         success:function(data){
    //             if(data){
    //                 $('#delete_confirmation_modal').modal('hide');
    //                 window.location = list;              
    //             }
    //         }
    //     });
    // });


    $('body').on('click', ".add_key_item", function() {
        var id_value = $(this).val();
        //alert(id_value);
        var div = $('#dummy_key_item').html();
        div = div.replace(/xxx/g, key_conut);
        div = div.replace(/yyy/g, id_value);
        key_conut++;
        class_append = 'description_warpper_' + id_value;
        $('.' + class_append).append(div);
    });

    $('body').on('click', ".add_attchment_bulk", function() {
        var id_value = $(this).val();
        //alert(id_value);
        var div = $('.bulk_attachments_add').html();
        div = div.replace(/xxx/g, attach_count);
        div = div.replace(/yyy/g, id_value);
        attach_count++;
        class_append = 'attachment_warpper_' + id_value;
        $('.' + class_append).append(div);
    });


    $('body').on('click', ".add_module_url_bulk", function() {
        var id_value = $(this).val();
        module_counts = $(this).attr('module_count');
        module_counts++;
        module_url_count = $(this).attr('module_count', module_counts);
        var div = $('.bulk_add_module_url').html();
        div = div.replace(/xxx/g, module_counts);
        div = div.replace(/yyy/g, id_value);
        class_append = 'module_url_warpper_' + id_value;
        $('.' + class_append).append(div);
        $('select').next('.select2').remove();
        $('select').not('.not_style').select2();
    });


    $('body').on('click', '.delete_module_link', function() {

        var delete_id = $(this).attr('id');
        $('#module_url_' + delete_id).val(delete_id);

        /*var type = 'bulk_key';
        $('#bulk_key_id').val(delete_id);
        $('#type').val(type);
        if(delete_id)
        {   
            $('#delete_confirmation_modal').modal("show");
            $('.change_title').html("key item");
        }*/

    });


    $('body').on('click', ".add_link_bulk", function() {
        var id_value = $(this).val();
        //alert(id_value);
        var div = $('.bulk_add_link').html();
        div = div.replace(/xxx/g, link_count);
        div = div.replace(/yyy/g, id_value);
        link_count++;
        class_append = 'link_warpper_' + id_value;
        $('.' + class_append).append(div);
    });

    $('body').on('click', '.remove_key_item', function() {

        var delete_id = $(this).attr('data-id');
        var type = 'bulk_key';
        $('#bulk_key_id').val(delete_id);
        $('#type').val(type);
        if (delete_id) {
            $('#delete_confirmation_modal').modal("show");
            $('.change_title').html("key item");
        }


    });

    function delete_bulk_add_key() {
        var id = $('#bulk_key_id').val();
        var class_name = 'remove_' + id;
        $('.' + class_name).hide();
        var url = key_item_delete_url;
        url = url.replace('id_value', id);
        $.ajax({
            url: url,
            method: 'GET',
            dataType: "json",
            processData: true,
            data: {
                id: id
            },
            success: function(d) {
                if (d.success == true) {
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        text: 'Deleted Sucessfully.'
                    }).show();
                    $('#delete_confirmation_modal').modal("hide");
                    $("." + class_name).remove();
                } else {
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: d.errors,
                    }).show();
                }
            }
        })

    }
    $('body').on('click', ".remove_key_item1", function() {

        $(this).parents(".key_item").remove();
    });

    $('body').on('click', ".delete_button_attachment_estimation", function() {

        $(this).parents(".show").remove();
    });

    $('body').on('click', ".remove_attachment_link", function() {

        $(this).parents(".link_show").remove();
    });

    $('body').on('click', '.remove_attachment_estimation', function() {

        var delete_id = $(this).attr('id');
        var type = 'bulk_attachment_delete';
        $('#bulk_attachment_id').val(delete_id);
        $('#type').val(type);
        if (delete_id) {
            $('#delete_confirmation_modal').modal("show");
            $('.change_title').html("Attachment");
        }
    });

    $('body').on('click', '.remove_link', function() {

        var delete_id = $(this).attr('id');
        var type = 'bulk_url_delete';
        $('#bulk_url_id').val(delete_id);
        $('#type').val(type);
        if (delete_id) {
            $('#delete_confirmation_modal').modal("show");
            $('.change_title').html("Link");
        }
    });


    $('body').on('click', ".remove_module_link", function() {
        $(this).parents(".module_url_show").remove();
    });

    function delete_url_bulk() {
        var id = $('#bulk_url_id').val();
        var class_name = 'remove_' + id;
        $('.' + class_name).hide();
        $.ajax({
            url: delete_bulk_link_url,
            method: 'POST',
            data: {
                id: id
            },
            success: function(d) {
                if (d.success == true) {
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        text: 'Deleted Sucessfully.'
                    }).show();
                    $('#delete_confirmation_modal').modal("hide");
                    $("." + class_name).remove();
                } else {
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: d.errors,
                    }).show();
                }
            }
        })
    }

    function delete_bulk_add_attach() {
        var id = $('#bulk_attachment_id').val();
        // alert(id);
        var class_name = 'remove_' + id;
        $('.' + class_name).hide();
        $.ajax({
            url: delete_attachment_bulk_file_url,
            method: 'POST',
            data: {
                id: id
            },
            success: function(d) {
                if (d.success == true) {
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        text: 'Deleted Sucessfully.'
                    }).show();
                    $('#delete_confirmation_modal').modal("hide");
                    $("." + class_name).remove();
                } else {
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: d.errors,
                    }).show();
                }
            }
        })
    }

    // $('body').on('click', ".remove_key_item" ,function(){
    //     var id_value = $(this).val();
    //     $(this).parents(".key_item").remove();
    //     var url = key_item_delete_url;
    //     url = url.replace('id_value',id_value);

    //     if(id_value)
    //     {
    //         $.ajax({
    //             url: url,
    //             type:'GET',
    //             dataType: "json",
    //             processData: true,
    //             data:{},
    //             success:function(data){
    //                 if(data){
    //                     new Noty({
    //                         type: 'success',
    //                         layout: 'topRight',
    //                         text: data.message
    //                     }).show();
    //                 }
    //             }
    //         });
    //     }

    // });

});