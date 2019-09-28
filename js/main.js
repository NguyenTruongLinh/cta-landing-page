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
    })
});