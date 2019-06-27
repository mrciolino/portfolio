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
}

// collect the features and ajax to flask
function submit_features() {
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
            display_result(data);
            display_each(data);
            return data;
        },
        contentType: "application/json",
        dataType: 'json'
    });
    // stop link reloading the page
    event.preventDefault();
}

// display the results of the
function display_result(data) {

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

function display_each(data) {
    var result = Object.values(data)[0][1];
    var mydata = [{
            "Name": 'Support Vector Classifier',
            "Accuracy": "test0",
            "Guess": result[0]
        },
        {
            "Name": 'Naive Bayes',
            "Accuracy": "test0",
            "Guess": result[1]
        },
        {
            "Name": 'Random Forest',
            "Accuracy": "test0",
            "Guess": result[2]
        },
        {
            "Name": 'K Nearest Neighbors',
            "Accuracy": "test0",
            "Guess": result[3]
        },
        {
            "Name": 'Neural Network',
            "Accuracy": "test0",
            "Guess": result[4]
        }
    ]

    $(function() {
        $('#Iris_Table').bootstrapTable({
            data: mydata
        });
    });
}
