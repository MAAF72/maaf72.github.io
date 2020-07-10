window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

$(window).on('load', () => {
    render();
    $(document).on('scroll', onScroll);
    $('.nav-link').on('click', smoothScroll);
    $('.sticky-wrapper').each((i, obj) => {
        $(obj).css({ height: Math.max($(obj).height(), $(obj).next().height()) });
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
        $(obj).css({ height: Math.max($(obj).height(), $(obj).next().height()) });
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

function render() {
    $.ajax({
        url: "data.json",
        dataType: 'json',
        async: false,
        success: (d) => {
            $('#profile .illust').append(`<img class="profile-photo" src="assets/image/${d.photo}">`);
            $('#surname').html(d.surname);
            $('#job').html(d.job);
            $('.description').html(d.description);
            $('#instagram-link').attr('href', d.contact.instagram);
            $('#facebook-link').attr('href', d.contact.facebook);
            $('#github-link').attr('href', d.contact.github);
            $('#linkedin-link').attr('href', d.contact.linkedin);
            $('#hackerrank-link').attr('href', d.contact.hackerrank);
            $('#whatsapp-link').attr('href', d.contact.whatsapp);
            var projectsDOM = $('#projects .col-6').get(1);
            var achievementsDOM = $('#achievements .col-6').get(1);
            var blogDOM = $('#blog .col-6 .row');
            for (var e of d.projects) {
                $(projectsDOM).append(`
                <div class="project-item mb-60px">
                  <div class="row">
                    <div class="col-5">
                      <div class="project-thumbnail corner-25">
                        <img src="assets/thumbnail/projects/${e.thumbnail}">
                      </div>
                    </div>
                    <div class="col-7">
                      <div class="h-5 font-bold color-4 mb-20px">${e.name}</div>
                      <p class="mb-60px">${e.description}</p>
                      <a class="btn light-shadow corner-8" href="${e.url}" target="_blank">Visit</a>
                      <a class="btn light-shadow corner-8" href="${e.repository}" target="_blank">Github</a>
                    </div>
                  </div>
                </div>
                `);
            }
            
            for (var e of d.achievements) {
                $(achievementsDOM).append(`
                <div class="achievement-item corner-25 medium-shadow mb-60px">
                  <div class="h-4 font-bold mb-20px">${e.title}</div>
                  <div class="h-6 font-bold mb-20px">${e.event}</div>
                  <div class="achievement-tag bg-color-4 corner-25">#${e.tags[0]}</div>
                </div>
                `);
            }
            
            for (var e of d.blog) {
                $(blogDOM).append(`
                <div class="col-6">
                  <div class="blog-item text-center mb-40px">
                    <div class="blog-thumbnail medium-shadow mb-20px">
                      <img src="assets/thumbnail/blog/${e.thumbnail}">
                    </div>
                    <div class="h-6 font-bold"><a class="blog-link" href="blog/${e.thumbnail}">${e.title}</a></div>
                  </div>
                </div>
                `);
            }
        },
        error: (d) => {
            alert('error while retrieving data');
        }
    });
}