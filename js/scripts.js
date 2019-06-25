// Empty JS for your own code to be here

$('a[href*="#"]').on('click', function(e) {
    e.preventDefault()

    if ($($(this).attr('href')).offset() == 0) {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    }

    $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 60,
        },
        500,
        'linear'
    )

})

$("a[href='#Header']").click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, "linear");
    return false;
});
