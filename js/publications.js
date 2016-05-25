$(document).ready(function() {
    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "../data/publications.csv",
        dataType: "text",
        success: function(data) {processPublications(data);}
    });
});

function processPublications(allText) {
    alert(allText);
}