//global variables
var years = []; //each year has a name (ie. 2016) and a list of publications
var categories = [];
//$.cookie('categorySet',0);
var categorySet = ($.cookie('categorySet') != null)
    ? $.cookie('categorySet')
    : 0;
var category = ($.cookie('category') != null)
    ? $.cookie('category')
    : 'nothing';

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
    arrData = parseCsv(allText);
    
    var rowNum = -1;
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var publication = {title:data[1], authors:data[2], publication:data[3], link:data[4], category:data[5], demo:data[6], data:data[7], software:data[8]};
        
        var allCats = publication.category.split(',');
        //Is this category already in the array?
        for(var j=0; j<allCats.length; ++j) {
            if(!$.inArray(allCats[j], categories)) {
                categories.push(allCats[j]);
            }
        }
        
        //Is this year already in the array?
        index = $.inArray(data[0], years)
        if(index > -1) {
            years[index].publications.push(publication);
        } else {
            var year = {name:data[0], publications:[publication]};
            years.push(year);
        }
    }
    
    showCategories();
    
    if(categorySet==1) {
        $('#categories').append('<p class="lead"><a onclick="allPublications()" href="">Go back to all publications</a></p>');
    }
    
    for(var i=0; i<years.length; ++i) {
        if(categorySet==0) {
            $('#publications').append('<h2 class="featurette-heading">' + years[i].name + '</h2>');
        }
        for(var j=0; j<years[i].publications.length; ++j) {
            publication = years[i].publications[j];
            if(categorySet==0 || publication.category==category) {
                entry = showPublication(publication);
                $('#publications').append(entry);
            }
        }
        if(categorySet==0) {
            $('#publications').append('<p class="lead"><a href="#">Back to top</a></p>');
        }
    }
}

function allPublications() {
    $.cookie('categorySet',0);
    location.reload();
}

function loadCategory(category) {
    $.cookie('categorySet', 1);
    $.cookie('category',category);
    location.reload();
}

//Template:
//<p class="lead">View publications by category: <a href="">Word Sense Disambiguation</a>, <a
//href="">Semantic Similarity</a>, <a href="">Romanian Texts</a></p>
function showCategories() {
    categories.sort();
    entry = "";
    for(var i=0; i<categories.length; ++i) {
        if(categorySet==1 && category==categories[i]) {
            entry = entry + '<a onclick="loadCategory(\'' + categories[i] + '\')" href="#"><b>' + categories[i] + "</b></a>";
        } else {
            entry = entry + '<a onclick="loadCategory(\'' + categories[i] + '\')" href="#">' + categories[i] + "</a>";
        }
        if(i != categories.length-1) {
            entry = entry + ', ';
        }
    }
    $('#categories').append('<p class="lead">View publications by category: ' + entry + '</p>');
}