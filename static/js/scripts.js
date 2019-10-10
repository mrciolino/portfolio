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

function submit_mail_features() {
    // grab the values
    var features = [{
        Feature_1: document.getElementById('form_name').value, //name
        Feature_2: document.getElementById('form_lastname').value, //company
        Feature_3: document.getElementById('form_email').value, //email
        Feature_4: document.getElementById('form_need').value, //reason
        Feature_5: document.getElementById('form_message').value, //message
    }];
    // ajax the JSON to the server
    $.ajax({
        type: 'POST',
        url: '/post_mail',
        data: JSON.stringify(features),
        success: function(data) {
            display_mail_result(data);
            return data;
        },
        contentType: "application/json",
        dataType: 'json'
    });
    // stop link reloading the page
    event.preventDefault();
}

// display the results of the
function display_mail_result(data) {
    var result = Object.values(data)[0];
    if (result == 200) {
        document.getElementById("mail_submit_button").className = "btn btn-sucess";
    }
    else{
        document.getElementById("mail_submit_button").className = "btn btn-danger";
    }
    setTimeout(function() {
        document.getElementById("mail_submit_button").className = "btn btn-primary";
    }, 3000);
}

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

// ************* Poltician Vote CLASSIFER *************
// ************* Poltician Vote CLASSIFER *************
// ************* Poltician Vote CLASSIFER *************

// collect the features and ajax to flask
function submit_bill_features() {
    // grab the name
    var name = $("input[name=name]:checked").val();
    // grab body
    var body = $("input[name=body]:checked").val();
    // grab sponser parties
    var sponsers = [];
    $('#VOTE_sponsers input:checked').each(function() {
        sponsers.push($(this).attr('name'));
    });
    // grab the values
    var features = [{
        Feature_1: document.getElementById('VOTE_bill').value,
        Feature_2: name,
        Feature_3: sponsers,
        Feature_4: document.getElementById('VOTE_sponser_num').value,
        Feature_5: document.getElementById('VOTE_history_num').value,
        Feature_6: document.getElementById('VOTE_bill_type').value,
        Feature_7: document.getElementById('VOTE_status').value,
        Feature_8: body,
    }];
    // fill the progress bar
    $(".progress-bar").animate({
        width: "100%"
    }, 1000);
    // ajax the JSON to the server
    $.ajax({
        type: 'POST',
        url: '/poltician_predict',
        data: JSON.stringify(features),
        success: function(data) {
            display_vote_result(data);
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

function display_vote_result(data) {

    document.getElementById("vote_no").className = "badge badge-primary";
    document.getElementById("vote_yes").className = "badge badge-primary";

    var vote_result = Object.values(data)[0][0];

    if (vote_result == "vote_yes") {
        document.getElementById("vote_yes").className = "badge badge-success";
    }
    if (vote_result == "vote_no") {
        document.getElementById("vote_no").className = "badge badge-success";
    }

    var name = Object.values(data)[0][1];
    document.getElementById("poltician_feature_importance").innerHTML = "<strong> Feature Importance </strong>";

    function image(thisImg) {
        var img = document.createElement("IMG");
        img.src = "static/refs/poltician_feature_importance/"+thisImg+".png";
        img.height = 600;
        img.width = 400;
        document.getElementById('poltician_feature_importance').appendChild(img);
    }
    image(name)
}
