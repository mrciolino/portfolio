// ************* GENERAL *************
// ************* GENERAL *************
// ************* GENERAL *************

// scroll to different divs
$('a[href*="#"]').on('click', function(e) {
    e.preventDefault()
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
// ************* IRIS CLASSIFER *************
// ************* IRIS CLASSIFER *************
// updates one DOM element given its id
function randomize_iris(id) {

    function getNumber() {
        var max = 5.0; // The minimum number you want
        var min = 0.0; // The maximum number you want
        return (Math.random() * (max - min + 1) + min).toFixed(2);
    }
    // Sets content of <div> to number
    document.getElementById(id).value = getNumber();
}

// updates all DOM elements listed
function randomize_iris_features() {
    var features = ["f1", "f2", "f3", "f4"];
    var arrayLength = features.length;
    for (var i = 0; i < arrayLength; i++) {
        randomize_iris(features[i])
    }
}

// collect the features and ajax to flask
function submit_iris_features() {
    // grab the values
    var features = [{
        Feature_1: document.getElementById('f1').value,
        Feature_2: document.getElementById('f2').value,
        Feature_3: document.getElementById('f3').value,
        Feature_4: document.getElementById('f4').value,
    }];
    // ajax the JSON to the server
    $.ajax({
        type: 'POST',
        url: '/predict_iris',
        data: JSON.stringify(features),
        success: function(data) {
            display_iris_result(data);
            display_iris_table(data);
            return data;
        },
        contentType: "application/json",
        dataType: 'json'
    });
    // stop link reloading the page
    event.preventDefault();
}

// display the results of the
function display_iris_result(data) {

    var result = Object.values(data)[0][0];

    document.getElementById("Setosa").className = "badge badge-primary";
    document.getElementById("Versicolour").className = "badge badge-primary";
    document.getElementById("Virginica").className = "badge badge-primary";

    if (result == "setosa") {
        document.getElementById("Setosa").className = "badge badge-success";
    }
    if (result == "versicolor") {
        document.getElementById("Versicolour").className = "badge badge-success";
    }
    if (result == "virginica") {
        document.getElementById("Virginica").className = "badge badge-success";
    }
}

function display_iris_table(data) {
    var result = Object.values(data)[0][1];
    var mydata = [{
            "Name": '<strong>Support Vector Classifier</strong>',
            "Accuracy": "96.7 %",
            "Guess": result[0]
        },
        {
            "Name": '<strong>Naive Bayes</strong>',
            "Accuracy": "95.3 %",
            "Guess": result[1]
        },
        {
            "Name": '<strong>Random Forest</strong>',
            "Accuracy": "91.3 %",
            "Guess": result[2]
        },
        {
            "Name": '<strong>K Nearest Neighbors</strong>',
            "Accuracy": "96.7 %",
            "Guess": result[3]
        },
        {
            "Name": '<strong>Neural Network</strong>',
            "Accuracy": "98.0 %",
            "Guess": result[4]
        }
    ]
    $(function() {
        $('#Iris_Table').bootstrapTable('load', mydata)
    });
}

// ************* JOB TAG CLASSIFER *************
// ************* JOB TAG CLASSIFER *************
// ************* JOB TAG CLASSIFER *************

// collect the features and ajax to flask
function submit_job_tag_features() {
    // grab the values
    var features = [{
        Feature_1: document.getElementById('job_title').value,
        Feature_2: document.getElementById('job_description').value,
    }];
    // fill the progress bar
    $(".progress-bar").animate({
        width: "100%"
    }, 5000);
    // ajax the JSON to the server
    $.ajax({
        type: 'POST',
        url: '/job_tag_classifier',
        data: JSON.stringify(features),
        success: function(data) {
            display_jobtag_result(data)
            // return progress bar to zero
            $(".progress-bar").animate({
                width: "0%"
            }, 0);
            return data;
        },
        contentType: "application/json",
        dataType: 'json'
    });
    // stop link reloading the page
    event.preventDefault();
}

function display_jobtag_result(data) {

    function toggle_class(id) {
        document.getElementById(id).className = "badge badge-success";
    }

    var result = Object.values(data)[0];
    var arrayLength = result.length;

    for (var i = 0; i < arrayLength; i++) {
        toggle_class(result[i])
    }
}
