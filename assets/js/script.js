window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

$(window).on('load', () => {
    $(document).on('scroll', onScroll);
    $('.nav-link').on('click', smoothScroll);
    $('.sticky-wrapper').each((i, obj) => {
        $(obj).css({ height: $(obj).next().height() });
    });
});

$(window).resize(function () {
    $('.sticky-wrapper').each((i, obj) => {
        $(obj).css({ height: $(obj).next().height() });
    });
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
        { 'scrollTop': $(this.hash).offset().top - 79 - 70}, //79 is navbar height, 70 is half of margin from before section
        500,
        'swing'
    );
}