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

$(document).ready(function () {
    $('.open-popup').click(function (e) {
        e.preventDefault();
        $('.popup-form-register').fadeIn(50).find("input").first().focus();
        $('.popup-form-register .popup').removeClass('animationClose').addClass('animationOpen');
        $('body').css('overflow', 'hidden');
    });

    $('.close-popup, .overlay').click(function (e) {
        e.preventDefault();
        $('.popup-form-register').fadeOut(350);
        $('.popup-form-register .popup').removeClass('animationOpen').addClass('animationClose');
        $('body').css('overflow', 'auto');
    });

    // Send Email
    $('.send-infomation').click(function (e) {
        e.preventDefault();

        // $("#form-main .check").map(function(){
        //     if( !$(this).val() ) {
        //         $(this).addClass('input-error');
        //     } else if ($(this).val()) {
        //         var email = $('input[type="email"]').val();
        //         if (!validateEmail(email)) {
        //             $('input[type="email"]').addClass('input-error');
        //         } else {
        //             $(this).removeClass('input-error');
        //         }
        //     }
        // });

        var email = $('input[type="email"]').val();

        $.ajax({
            url: 'https://api.mailgun.net/v3/sandbox533c7a8918274a518422e6907d4393cf.mailgun.org/messages',
            type: "POST",
            username: 'api',
            password: '57ea131ad49eac4ffc630adaec57706d-baa55c84-4fc6161d',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                'Access-Control-Allow-Methods"': 'GET,HEAD,OPTIONS,POST,PUT',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data:{
                "from": "Mailgun Sandbox <postmaster@sandbox533c7a8918274a518422e6907d4393cf.mailgun.org>",
                "to": "Nguyen Linh <nhokkuteo1996@gmail.com>",
                "subject": 'Hello Nguyen Linh',
                "text": `Congratulations Nguyen Linh, you just sent an email with Mailgun!  You are truly awesome!`,
            },
            success:function(a,b,c){
                console.log( 'mail sent: ', b );
            }.bind(this),
            error:function( xhr, status, errText ){console.log( 'mail sent failed: ', xhr.responseText, errText );}
        })
    });

    $('.check').blur(function(){
        if(!$(this).val()){
            $(this).addClass("input-error");
        } else{
            $(this).removeClass("input-error");
        }
    });

    // End Send Email
});

function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( email );
}