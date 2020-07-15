window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

$(window).on('load', () => {
    if (!(window.matchMedia("only screen and (max-width: 760px)").matches)) {
        location.href = 'index.html';
    }
    render();
    $(document).on('scroll', onScroll);
    $('.sticky-wrapper').each((i, obj) => {
        $(obj).css({ height: Math.max($(obj).height(), $(obj).next().height()) });
    });
    $('.main').css({ top: $('.nav').height() + 120 });
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
    let sections = ['profile', 'projects', 'achievements', 'blog'];
    for (var e of sections) {
        let refElement = $('#' + e);
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.nav-link').html(e.charAt(0).toUpperCase() + e.slice(1));
        }
    };
}

function render() {
    $.ajax({
        url: "data.json",
        dataType: 'json',
        async: false,
        success: (d) => {
            $('#photo').append(`<img src="assets/image/${d.photo}">`);
            $('#surname').html(d.surname);
            $('#job').html(d.job);
            $('.description').html(d.description);
            $('#instagram-link').attr('href', d.contact.instagram);
            $('#facebook-link').attr('href', d.contact.facebook);
            $('#github-link').attr('href', d.contact.github);
            $('#linkedin-link').attr('href', d.contact.linkedin);
            $('#hackerrank-link').attr('href', d.contact.hackerrank);
            $('#whatsapp-link').attr('href', d.contact.whatsapp);
            var projectsDOM = $('#projects .col-12').get(0);
            var achievementsDOM = $('#achievements .col-12').get(0);
            var blogDOM = $('#blog .col-12').get(0);
            for (var e of d.projects) {
                $(projectsDOM).append(`
                <div class="project-item mb-60px">
                  <div class="container">
                    <div class="col-12">
                      <div class="project-thumbnail corner-25">
                        <img src="assets/thumbnail/projects/${e.thumbnail}">
                      </div>
                      <div>
                        <div class="h-2 font-bold color-4 mb-20px">${e.name}</div>
                        <p class="mb-60px">${e.description}</p>
                        <a class="btn light-shadow corner-8" href="${e.url}" target="_blank">Visit</a>
                        <a class="btn light-shadow corner-8" href="${e.repository}" target="_blank">Github</a>
                      </div>
                    </div>
                  </div>
                </div>
                `);
            }
            
            for (var e of d.achievements) {
                $(achievementsDOM).append(`
                <div class="achievement-item corner-25 medium-shadow mb-60px">
                  <div class="h-2 font-bold mb-20px">${e.title}</div>
                  <div class="h-4 font-bold mb-20px">${e.event}</div>
                  <div class="achievement-tag bg-color-4 corner-25">#${e.tags[0]}</div>
                </div>
                `);
            }
            
            for (var e of d.blog) {
                $(blogDOM).append(`
                <div class="col-12">
                  <div class="blog-item text-center mb-40px">
                    <div class="blog-thumbnail medium-shadow mb-20px">
                      <img src="assets/thumbnail/blog/${e.thumbnail}">
                    </div>
                    <a class="blog-link" href="blog/${e.url}">${e.title}</a>
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