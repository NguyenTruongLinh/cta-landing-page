$(document).ready(function () {
    $('.open-popup').click(function (e) {
        e.preventDefault();
        $('.popup-form-register').fadeIn(50).find("input").first().focus();
        $('.popup-form-register .popup-wrapper').removeClass('animationClose').addClass('animationOpen');
        $('body').css('overflow', 'hidden');
    });

    $('.close-popup, .overlay, #close-popup').click(function (e) {
        e.preventDefault();
        $('.popup').fadeOut(350);
        $('.popup .popup-wrapper').removeClass('animationOpen').addClass('animationClose');
        $('body').css('overflow', 'auto');
        $('.send-infomation').removeAttr('disabled').html('Gửi thông tin');
        $('.form-register')[0].reset();
    });

    // Send Email

    $('.check').blur(function(){
        if(!$(this).val()){
            $(this).addClass("input-error");
        } else{
            var email = $('input[type="email"]').val();
            if (!validateEmail(email)) {
                $(this).addClass('input-error');
            } else {
                $(this).removeClass('input-error');
            }
        }
    });

    emailjs.init("user_j2Jyz9OGeGOA3eezcUCiP");

    $('#form-main').on('submit', function(event) {
        event.preventDefault(); // prevent reload

        var first_name = $('#first_name');
        var last_name = $('#last_name');
        var phone = $('#phone');
        var email = $('#email');
        var message = $('#message');

        var template_params = {
            "from_name": `${last_name.val()} ${first_name.val()}`,
            "to_name": "Linh",
            "message_html": `<p>Phone: ${phone.val()}</p><p>Email: ${email.val()}</p><p>Message: ${message.val()}</p>`
        };

        var service_id = "nhokkuteo1996_gmail_com";
        var template_id = "template_8ZRfOlaD";

        var check_input = $("#form-main .check");

        if (!first_name.val()) {
            first_name.addClass('input-error');
        }
        if (!phone.val()) {
            phone.addClass('input-error')
        }
        if (!email.val()) {
            email.addClass('input-error')
        }
        if (first_name.val() && phone.val() && email.val()) {
            if (!validateEmail(email.val())) {
                email.val().addClass('input-error');
            } else {
                check_input.removeClass('input-error');
                $('.send-infomation').html('Đang gửi...').attr('disabled', 'disabled');
                emailjs.send(service_id, template_id, template_params)
                    .then(function(response) {
                        showPopupSuccess();
                    }, function(error) {
                        alert('Gửi thông tin thất bại. Vui lòng thử lại sau.')
                    });
            }
        }
    });

    // End Send Email
});

(function fixedTopMenu(fixedMenuSelector, fixedMenuDisplayClass, anchorSelector) {
    var $b = $(document.body), $d=$(document);

    function fixTopMenuAction() {
        var $topMenu = $(fixedMenuSelector);
        if (Boolean($(anchorSelector).eq(0).offset())) {
            var currentScroll = $(this).scrollTop();
            if (currentScroll >= $(anchorSelector).eq(0).offset().top) {
                $topMenu.addClass(fixedMenuDisplayClass);
            } else {
                $topMenu.removeClass(fixedMenuDisplayClass);
            }
        }
    }
    fixTopMenuAction();

    $(window).on('scroll load', fixTopMenuAction);
})('.stickyTrigger', 'is-stick', '.home-growth-stack ');

function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( email );
}

function showPopupSuccess() {
    $('.popup-success').fadeIn(50).find("input").first().focus();
    $('.popup-success .popup-wrapper').removeClass('animationClose').addClass('animationOpen');
    $('body').css('overflow', 'hidden');
}
