// Empty JS for your own code to be here

// scroll to different divs
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
    }, 500, 'linear')
})

$("a[href='#Header']").click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, "linear");
    return false;
});

// ************* IRIS CLASSIFER *************
// updates one DOM element given its id
function randomize(id) {

    function getNumber() {
        var max = 5.0; // The minimum number you want
        var min = 0.0; // The maximum number you want
        return (Math.random() * (max - min + 1) + min).toFixed(2);
    }
    // Sets content of <div> to number
    document.getElementById(id).value = getNumber();
}

// updates all DOM elements listed
function randomize_features() {
    var features = ["f1", "f2", "f3", "f4"];
    var arrayLength = features.length;
    for (var i = 0; i < arrayLength; i++) {
        randomize(features[i])
    }
    plot_heatmap()
}

function plot_heatmap() {
    var data = [{
        z: [
            [1, 20, 30],
            [20, 1, 60],
            [30, 60, 1]
        ],
        type: 'heatmap'
    }];

    Plotly.newPlot('heatmapdiv', data);
}
