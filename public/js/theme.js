/* ----------- WINDOW LOAD ----------- */
$(window).load(function() {
    "use strict";
    /* $("body").mCustomScrollbar({
    	theme:"minimal"
    }); */
});


/* ----------- Document Ready ----------- */

$(document).ready(function() {

    $('.navbar-toggle-icon').click(function() {
        $(this).toggleClass('open');
    });

    formFocus();
    bgImage();
    fullscreen();
    profileUpload();
    preDateDisabled();
    timePicker();
    date_Picker();
    dateTimePicker();
    dateRange();
    dateTimeRange();
    plusIcon();
    breakWord();
    textareaEditor();
    tabScroll();
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    })
});


/* -------------------------------	
		Form Focus
/* ----------------------------- */
function formFocus() {

    // Form Focus 
    $("input, .form-control").on("focus", function(event) {

        $(this).parent().addClass("focus");

    })

    $("input, .form-control").on("blur", function(event) {

        if (!this.value) {

            $(this).parent().removeClass("focus");

        }

    })

}
/* -------------------------------	
		BACKGROUND IMAGE
/* ----------------------------- */
function bgImage() {
    "use strict";
    var pageSection = $('[data-background]');
    pageSection.each(function(indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    $('[data-bgcolor]').css('background', function() {
        return $(this).data('bgcolor')
    });
}
/* ----------------------------- */

function fullscreen() {

    "use strict";

    if ($(window).width() > 1025) {

        $('.fullscreen').css({ 'height': $(window).height() });

        $(window).on('resize', function() {

            $('.fullscreen').css({ 'height': $(window).height() });

        });
    }
}

/* function wave(){
	$('#feel-the-wave').wavify({
		height: 80,
		bones: 10,
		amplitude: 90,
		color: 'rgba(252, 70, 107, 0.7)',
		speed: .15
	  });
	  
	  $('#feel-the-wave-two').wavify({
		height: 60,
		bones: 10,
		amplitude: 40,
		color: 'rgba(239, 136, 219, 0.6)',
		speed: .25
	  });
	  
	  $('#feel-the-wave-three').wavify({
		height: 80,
		bones: 10,
		amplitude: 40,
		color: 'rgba(63, 94, 251, 0.7)',
		speed: .35
	  });
} */
/* -------------------------------	
		Image Upload
/* ----------------------------- */
function profileUpload() {
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#logo").change(function() {
        readURL(this);
    });
}
/* -------------------------------    
         Custom Noty
/* ----------------------------- */

function custom_noty(noty_type, msg) {
    new Noty({
        type: noty_type,
        layout: 'topRight',
        timeout: 3000,
        text: msg
    }).show();
}


/* -------------------------------	
		Time Picker
/* ----------------------------- */
function preDateDisabled() {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    $('#pre_date_disabled').datepicker({
        todayHighlight: true,
        orientation: 'auto',
        setDate: today,
        startDate: new Date()
    });
    $('#pre_date_disabled').datepicker('setDate', today);
}

/* -------------------------------	
		Time Picker
/* ----------------------------- */
function timePicker() {
    $('.timepicker').datetimepicker({
        format: 'LT'
    });
}

/* -------------------------------	
		Date Picker
/* ----------------------------- */
function date_Picker() {
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    /* var optComponent = {
    	container: '.date',
    	orientation: 'auto',
    	todayHighlight: true,
    	setDate: today
    }; */
    $('.date').datepicker({
        todayHighlight: true,
        orientation: 'auto'
        // setDate: today
    });

    // $('.date').datepicker('setDate', today);
}

/* -------------------------------	
		Date Time Picker
/* ----------------------------- */
function dateTimePicker() {
    $('.datetimepicker').datetimepicker();
}

/* -------------------------------	
		Date Range Picker
/* ----------------------------- */
function dateRange() {
    $(function() {
        $('.daterange').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear',
                format: "DD-MM-YYYY"
            }
        });

        $('.daterange').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('DD-MM-YYYY') + ' to ' + picker.endDate.format('DD-MM-YYYY'));
        });

        $('.daterange').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });

    });
}

/* -------------------------------	
		Date Time Range Picker
/* ----------------------------- */
function dateTimeRange() {
    $(function() {
        $('.datetimerange').daterangepicker({
            autoUpdateInput: false,
            timePicker: true,
            timePicker24Hour: true,
            locale: {
                cancelLabel: 'Clear',
                format: "DD-MM-YYYY H:mm:ss"
            }
        });

        $('.datetimerange').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('DD-MM-YYYY H:mm:ss') + ' to ' + picker.endDate.format('DD-MM-YYYY H:mm:ss'));
        });

        $('.datetimerange').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });

    });
}


/* -------------------------------	
		Date Time Range Picker
/* ----------------------------- */
function plusIcon() {
    $(".plus-icon").on('click', function() {
        if ($(this).hasClass("in")) {
            $(this).removeClass("in");
        } else {
            /* $(".panel-btn").removeClass("in"); */
            $(this).addClass("in");
        }
    });
}

/* -------------------------------	
		Break Word
/* ----------------------------- */
function breakWord() {
    $(document).on('mouseover', ".break_word", function() {
        var $this = $(this);
        if (this.offsetWidth < this.scrollWidth && !$this.attr('title')) {
            $this.tooltip({
                title: $this.text(),
                placement: "top"
            });
            $this.tooltip('show');
        }
    });
    //    $('.break_word').css('width',$('.break_word').parent().width());
}

/* -------------------------------	
		Summernote Editor
/* ----------------------------- */
function textareaEditor() {
    $('.textarea-editor').summernote();
}

/* -------------------------------	
		Scrolling Tabs 
/* ----------------------------- */
function tabScroll() {
    $('.scroll-tabs').scrollingTabs({
        enableSwiping: true
    });
}


/*********** Upload File ***********/
$(function() {

    // We can attach the `fileselect` event to all file inputs on the page
    /* $(document).on('change', ':file', function() {
    	var input = $(this),
    			numFiles = input.get(0).files ? input.get(0).files.length : 1,
    			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    	input.trigger('fileselect', [numFiles, label]);
    }); */

    // We can watch for our custom `fileselect` event like this
    /* $(document).ready( function() {
    		$(':file').on('fileselect', function(event, numFiles, label) {

    				var input = $(this).parents('.input-group').find(':text'),
    						log = numFiles > 1 ? numFiles + ' files selected' : label;

    				if( input.length ) {
    						input.val(log);
    				} else {
    						if( log ) alert(log);
    				}

    		});
    }); */

});

/* CheckBox Select All */
$(".selectall").click(function() {
    $(".individual").prop("checked", $(this).prop("checked"));
});
$(".approvalselectall").click(function() {
    $(".approvalindividual").prop("checked", $(this).prop("checked"));
});


//jquery class validator
/* jQuery.validator.addClassRules("required_number", {
  required: true,
  min:1,
}); */

$(".dashboardselectall").click(function() {
    $(".dashboardindividual").prop("checked", $(this).prop("checked"));
});
$(".incentivesselectall").click(function() {
    $(".incentivesindividual").prop("checked", $(this).prop("checked"));
});
$(".reportselectall").click(function() {
    $(".reportindividual").prop("checked", $(this).prop("checked"));
});

/* Reply Button */
$("#replybtn").click(function() {
    if ($(".trgr-btn").hasClass("in")) {
        $(".trgr-btn").removeClass("in");
        $(this).html("Reply");
    } else {
        $(".trgr-btn").addClass("in");
        $(this).html("X");
    }
});
/* Track Button */
$("#trackticket").click(function() {
    setTimeout(function() { track_modal_drop() }, 1);

    function track_modal_drop() {
        if ($(".track-modal-drop").hasClass("fade")) {
            $(".track-modal-drop").addClass("in");
        }
    }
    setTimeout(function() { track_modal_content() }, 1);

    function track_modal_content() {
        if ($(".track-modal").hasClass("fade")) {
            $(".track-modal").addClass("in");
        }
    }
    setTimeout(function() { track_modal_dialog() }, 100);

    function track_modal_dialog() {
        if ($(".track-modal").hasClass("in")) {
            $(".track-modal-content").addClass("in");
        }
    }

    setTimeout(function() { track_modal() }, 1);

    function track_modal() {
        if ($(".track-modal-drop").hasClass("in")) {
            $("body").css("overflow", "hidden");
            $(".navbar.navbar-default").css("z-index", "2000");
        } else {
            $("body").css("overflow", "auto");
            $(".navbar.navbar-default").css("z-index", "1000");
        }
    }
});
$(".track-modal").click(function() {
    setTimeout(function() { track_modal_dialog() }, 1);

    function track_modal_dialog() {
        if ($(".track-modal").hasClass("in")) {
            $(".track-modal-content").removeClass("in");
        }
    }
    setTimeout(function() { track_modal_content() }, 600);

    function track_modal_content() {
        if ($(".track-modal").hasClass("in")) {
            $(".track-modal").removeClass("in");
        }
    }
    setTimeout(function() { track_modal_drop() }, 600);

    function track_modal_drop() {
        if ($(".track-modal-drop").hasClass("in")) {
            $(".track-modal-drop").removeClass("in");
        }
    }

    setTimeout(function() { track_modal() }, 650);

    function track_modal() {
        if ($(".track-modal-drop").hasClass("in")) {
            $("body").css("overflow", "hidden");
            $(".navbar.navbar-default").css("z-index", "2000");
        } else {
            $("body").css("overflow", "auto");
            $(".navbar.navbar-default").css("z-index", "1000");
        }
    }
});
/* Card Over Due */
$(document).ready(function() {
    var value = $("#overdue").text();
    if (value > 0) {
        $(".card-inner").addClass("in");
    }
});

/* Custom Wrap */
$(document).ready(function() {
    setTimeout(function() { content_wrap() }, 100);

    function content_wrap() {
        if ($(".content-wrap").hasClass("background-color")) {
            $(".main-wrap").css({ "min-height": "100vh", "background-color": "#f6f6f6" });
        }
    }
});
/* File Attachment */
function myfunction(this_parents) {
    this_parents.remove();
}

document.querySelector("html").classList.add('js');
var fileInput = document.querySelector(".input-file"),
    button = document.querySelector(".input-file-trigger"),
    the_return = document.querySelector(".file-return");

/* button.addEventListener( "keydown", function( event ) {  
	if ( event.keyCode == 13 || event.keyCode == 32 ) {  
		fileInput.focus();  
	}  
});
button.addEventListener( "click", function( event ) {
	fileInput.focus();
	return false;
});  */

$(document).ready(function() {

    $(".form-group").on('change', '.input-file', function() {
        var html = [];
        $(this.files).each(function(i, v) {
            html.push("<div class='file-return-parent' onclick='myfunction(this)'> <p class='file-return'>" + v.name + " <button class='remove-hn btn btn-sm'><i class='ion-close'></i></button></p> </div>");
        });
        $(".insert-file").append(html);
    });

    /* $(".btn-file").click(function(){
    	$(".insert-file").html("");
    }); */

});
/* Searchable Select Js */
$(function() {
    $('select.searchable-select').searchableOptionList({ maxHeight: '300px', showSelectAll: true });
    $('select.filter-select').searchableOptionList({ maxHeight: '300px', showSelectAll: false });
});

$("#toggle-btn").click(function() {
    if ($('.custom-navbar-collapse').hasClass('in')) {
        $('.custom-navbar-collapse').removeClass('in');
        $('.custom-navbar-collapse-drop').removeClass('in');
    } else {
        $('.custom-navbar-collapse').addClass('in');
        $('.custom-navbar-collapse-drop').addClass('in');
    }
});
$(".custom-navbar-collapse-drop").click(function() {
    $('.custom-navbar-collapse').removeClass('in');
    $('.custom-navbar-collapse-drop').removeClass('in');
    $('.navbar-toggle-icon').removeClass('open');
});
/* Check Box */
$(".selectall").click(function() {
    $(".individual").prop("checked", $(this).prop("checked"));
});

/* New Ticket Priority Select */
/* $(document).ready(function(){
    $(".low").click(function(){
		$(this).css("background-color", "#e52b20");
		$(".medium").css("background-color", "#c8c9c9");
		$(".high").css("background-color", "#c8c9c9");
	});
	$(".medium").click(function(){
		$(".low").css("background-color", "#c8c9c9");
		$(this).css("background-color", "#ffbf2f");
		$(".high").css("background-color", "#c8c9c9");
	});
	$(".high").click(function(){
		$(".low").css("background-color", "#c8c9c9");
		$(".medium").css("background-color", "#c8c9c9");
		$(this).css("background-color", "#63ce63");
    });
}); */

/* Data Table */
var dom_structure =
    '<"page-header"' +
    '<"container"' +
    '<"row"' +
    '<"col-md-12"' +
    '<"page-header-inner page-title"' +
    '>' + //page-header-inner Title					
    '>' + //col-12
    '>' + //row
    '>' + //container
    '>' + //page-header
    '<"page-main-content"' +
    '<"container"' +
    '<"row"' +
    '<"col-md-12"' +
    '<"table-actions-block"' +
    '<"row"' +
    '<"col-sm-6"' +
    '<"table-actions-left"' +
    '<f' +
    '>' +
    '>' +
    '>' +
    '<"col-sm-6 text-right"' +
    '<"table-actions-right"' +
    '<"table-actions-list"' +
    '<"table-actions-list-item"' +
    '<l' +
    '>' +
    '>' +
    '<"table-actions-list-item sub_actions"' +
    '>' +
    '>' +
    '>' +
    '>' +
    '>' +
    '>' +
    '<"table-responsive"t>' +
    '<"table-footer-layer"' +
    '<"data-table-footer"' +
    '<"table-footer-left"i>' +
    '<"table-footer-right"p>' +
    '>' +
    '>' +
    '>' +
    '>' +
    '>' +
    '>';

/* Data Table */
var dom_structure_1 =
    '<"row"' +
    '<"col-md-12"' +
    '<"table-actions-block"' +
    '<"row"' +
    '<"col-sm-6"' +
    '<"table-actions-left"' +
    '<f' +
    '>' +
    '>' +
    '>' +
    '<"col-sm-6 text-right"' +
    '<"table-actions-right"' +
    '<"table-actions-list"' +
    '<"table-actions-list-item"' +
    '<l' +
    '>' +
    '>' +
    '<"table-actions-list-item sub_actions"' +
    '>' +
    '>' +
    '>' +
    '>' +
    '>' +
    '>' +
    '<"table-responsive"t>' +
    '<"table-footer-layer"' +
    '<"data-table-footer"' +
    '<"table-footer-left"i>' +
    '<"table-footer-right"p>' +
    '>' +
    '>' +
    '>' +
    '>';