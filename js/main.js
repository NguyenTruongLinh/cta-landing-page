$(document).ready(function () {
    $('.open-popup').click(function (e) {
        e.preventDefault();
        $('.popup-form-register').fadeIn(50).find("input").first().focus();
        $('.popup-form-register .popup-wrapper').removeClass('animationClose').addClass('animationOpen');
        $('body').css('overflow', 'hidden');
    });

    $('.close-popup, .overlay, #close-popup').click(function (e) {
        e.preventDefault();
        closePopup();
        $('.send-infomation, .popup-send-mail').removeAttr('disabled').html('Gửi thông tin');
        $('.form-register')[0].reset();
        $('.popup-register')[0].reset();
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
        var btn_send = $('.send-infomation');

        sendMail(first_name, last_name, phone, email, message, btn_send);
    });

    $('#form-popup').on('submit', function(event) {
        event.preventDefault(); // prevent reload

        var first_name = $('#popup-first_name');
        var phone = $('#popup-phone');
        var email = $('#popup-email');
        var message = $('#popup-message');
        var btn_send = $('.popup-send-mail');
        var last_name = $('#popup-last_name');
        var popup = $('.popup-form-register');

        sendMail(first_name, last_name, phone, email, message, btn_send, popup);
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

function closePopup() {
    $('.popup').fadeOut(350);
    $('.popup .popup-wrapper').removeClass('animationOpen').addClass('animationClose');
    $('body').css('overflow', 'auto');
}

function sendMail(firstName, lastName, phone, email, message, btnSendMail, popup = null) {
    var template_params = {
        "from_name": `${lastName.val()} ${firstName.val()}`,
        "to_name": "Linh",
        "message_html": `<p>Phone: ${phone.val()}</p><p>Email: ${email.val()}</p><p>Message: ${message.val()}</p>`
    };

    var service_id = "nhokkuteo1996_gmail_com";
    var template_id = "template_8ZRfOlaD";

    if (!firstName.val()) {
        firstName.addClass('input-error');
    } else {
        firstName.removeClass('input-error');
    }
    if (!phone.val()) {
        phone.addClass('input-error')
    } else {
        phone.removeClass('input-error');
    }
    if (!email.val()) {
        email.addClass('input-error')
    } else {
        email.removeClass('input-error');
    }
    if (firstName.val() && phone.val() && email.val()) {
        if (!validateEmail(email.val())) {
            email.addClass('input-error');
        } else {
            email.removeClass('input-error');
            btnSendMail.html('Đang gửi...').attr('disabled', 'disabled');
            emailjs.send(service_id, template_id, template_params)
                .then(function(response) {
                    if (popup !== null) {
                        closePopup()
                    }
                    showPopupSuccess();
                }, function(error) {
                    alert('Gửi thông tin thất bại. Vui lòng thử lại sau.')
                });
        }
    }
}
