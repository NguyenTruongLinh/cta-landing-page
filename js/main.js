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
    });

    // Send Email
    $('.send-infomation').click(function (e) {
        e.preventDefault();

        $("#form-main .check").map(function(){
            if( !$(this).val() ) {
                $(this).addClass('input-error');
            } else if ($(this).val()) {
                var email = $('input[type="email"]').val();
                if (!validateEmail(email)) {
                    $('input[type="email"]').addClass('input-error');
                } else {
                    $(this).removeClass('input-error');
                    sendmail();
                }
            }
        });
    });

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
