window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

$(window).on('load', () => {
    $(document).on('scroll', onScroll);
    $('.nav-link').on('click', smoothScroll);
    $('.sticky-wrapper').each((i, obj) => {
        $(obj).css({ height: $(obj).next().height() });
    });
    $('.main').css({ top: $('.nav').height() + 120 });
    $('.profile-photo').css({ top: -1 * ($('.nav').height() + 60) });
    $(".loader").fadeOut(1000, () => {
        $(".nav").css('visibility', 'visible');
        $(".main").css('visibility', 'visible');
    });
});

$(window).resize(function () {
    $('.sticky-wrapper').each((i, obj) => {
        $(obj).css({ height: $(obj).next().height() });
    });
    $('.main').css({ top: $('.nav').height() + 120 });
    $('.profile-photo').css({ top: -1 * ($('.nav').height() + 60) });
});

function onScroll(e) {
    let scrollPos = $(document).scrollTop();
    $('.nav-link').each((key, val) => {
        let refElement = $(val.hash);
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.nav-link').removeClass('active');
            $(val).addClass('active');
        }
    });
}

function smoothScroll(e) {
    e.preventDefault();
    $('html, body').stop().animate(
        { 'scrollTop': $(this.hash).offset().top - $('.nav').height() - (this.hash != '#profile' ? 70 : 140)}, //79 is navbar height, 70 is half of margin from before section
        500,
        'swing'
    );
}