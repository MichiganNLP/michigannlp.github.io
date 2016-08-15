$(document).ready(function() {
    pageCategory = $('meta[name=category]').attr("content");
    
    //Dynamically load people
     $.ajax({
        type: "GET",
        url: "../data/people.csv",
        dataType: "text",
        success: function(data) {processPeople(data,pageCategory);}
    });
});