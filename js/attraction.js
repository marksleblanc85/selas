/* ==============================================
Flexslider
=============================================== */
$(window).load(function() {

    $('.flexslider').flexslider({
    	pauseOnHover: true,
    	directionNav: false
    });
    
});

$(document).ready(function() {

    /* ==============================================
    Checkboxes
    =============================================== */
    $('.checkbox-container').on('click', function() {
        setupLabel();
    });

    function setupLabel() {
        if ($('.checkbox-container input').length) {
            $('.checkbox-container').each(function(){ 
                $(this).removeClass('checkbox-on');
            });
            $('.checkbox-container input:checked').each(function(){ 
                $(this).parent('.checkbox-container').addClass('checkbox-on');
            });                
        };
    };

    /* ==============================================
    Smooth Scrolling
    =============================================== */
    $('ul.nav li a, .logo a, .featured a, .hero-section a, .prices a').on('click', function(e){
        el = $(this).attr('href');
        $('html, body').animate({scrollTop: $(el).offset().top - 74}, 750);
        e.preventDefault();
    });

    /* ==============================================
    Mobile Menu
    =============================================== */
    var mobileActiveClass = 'nav-active';
    if ($('.mobile-nav').length && $('.mobile-nav').attr('data-autogenerate') == 'true') {
        var mobileMenu = $('.mobile-nav');
        $('ul.nav li a').each(function(index, elem) {
            if($(this).hasClass(mobileActiveClass)) {
                mobileMenu.append($('<option selected="selected"></option>').val($(elem).attr('href')).html($(elem).html()));
            } else {
                mobileMenu.append($('<option></option>').val($(elem).attr('href')).html($(elem).html()));
            }
        });
    }

    $('.mobile-nav').on('change', function() {
        link = $(this).val();
        if (!link) {
            return;
        }

        if (link.substring(0,1) == '#') {
            $('html, body').animate({scrollTop: $(link).offset().top - 74}, 750);
        } else {
            document.location.href = link;
        }
    });

    /* ==============================================
    Fancybox
    =============================================== */
    $("a.fancybox").fancybox({
        'overlayShow'   : false,
        'transitionIn'  : 'elastic',
        'transitionOut' : 'elastic'
    });

    /* ==============================================
    Contact Form
    =============================================== */

    function initContactForm() {

        var contactForm = $('.contact-form');

        contactForm.on('submit', function() {

            var requiredFields = $(this).find('.required'),
                formData = contactForm.serialize(),
                formAction = $(this).attr('action'),
                formSubmitMessage = $('.response-message');

            requiredFields.each(function() {

                inputType = $(this).attr('type');

                if( inputType == "checkbox" ) {
                    if ( !$(this).is(':checked') ) {
                        $(this).addClass('input-error');
                    } else {
                        $(this).removeClass('input-error');
                    }
                } else {
                    if( $(this).val() == "" ) {
                        $(this).addClass('input-error');
                    } else {
                        $(this).removeClass('input-error');
                    } 
                } 

            });

            function validateEmail(email) { 
                var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return exp.test(email);
            }

            var emailField = $('.contact-form-email');

            if( !validateEmail(emailField.val()) ) {

                emailField.addClass("input-error");

            }

            if ($(".contact-form :input").hasClass("input-error")) {
                return false;
            } else {

                $.post(formAction, formData, function(data) {
                    formSubmitMessage.text(data);

                    requiredFields.val("");

                    setTimeout(function() {
                        formSubmitMessage.slideUp();
                    }, 5000);
                });

            }

            return false;

        });

    }

    initContactForm();

});