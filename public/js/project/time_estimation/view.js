$(document).ready(function(){

    $('body').on('click','#time_estimate_email',function(event){
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

    $('body').on('click','.remove_time_estimation_detail',function(){

        var delete_id = $(this).attr('data-id');
        var type = 'time_estimetion_delete';
        $('#time_estimation_del_id').val(delete_id);
        $('#type').val(type);
        if(delete_id)
        {
            $('#delete_confirmation_modal').modal("show");
            $('.change_title').html("Time Estimation");
        }

    });

    function delete_time_estimation(){


        var id =  $('#time_estimation_del_id').val();    
        var url = delete_time_estimation_detail_url;
        url = url.replace('id_value',id);
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
                    window.location = list_url;
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
    $('.delete-confirm').click(function(){
        var type=$('#type').val();
        if(type=='time_estimetion_delete')
        {
            delete_time_estimation();
        }

    });

    var form_id = '#form';
    var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            'time_estimation_detail_ids[]':
            {
                required:true,
            },

        },
        invalidHandler: function(event, validator) {
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: 'You have errors, Kindly check in each tab!'
            }).show();
        },        
    }); 

    var form_id = '#time_estimation_email_form';
    var v = jQuery(form_id).validate({
        ignore: "",
        rules: {
            pro_time_estimate_subject:
            {
                required:true,
            },
            pro_time_estimate_email_to:
            {
                required:true,
            },

        },
        invalidHandler: function(event, validator) {
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: 'You have errors, Kindly check in each tab!'
            }).show();
        },        
    }); 

    $('.total_time_estimation_select').on('click', function() {
        if (this.checked == true)
            $('#time_estimate_table').find('input[name="time_estimation_detail_ids[]"]').prop('checked', true).trigger("change");
        else
            $('#time_estimate_table').find('input[name="time_estimation_detail_ids[]"]').prop('checked', false).trigger("change");
    });


});



