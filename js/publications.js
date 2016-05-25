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
        
        var publication = {citation:data[1], link:data[2], category:data[3], demo:data[4], data: data[5], software:data[6]};
        
        var allCats = publication.category.split(',');
        //Is this category already in the array?
        for(var j=0; j<allCats.length; ++j) {
            var found = false;
            for(var k=0; k<categories.length; ++k) {
                if(categories[k] == allCats[j]) {
                    found = true;
                    break;
                }
            }
            if(!found) {
                categories.push(allCats[j]);
            }
        }
        
        //Is this year already in the array?
        var found = false;
        for(var j=0; j<years.length; ++j) {
            if(years[j].name==data[0]) {
                found = true;
                years[j].publications.push(publication);
                break;
            }
        }
        if(!found) {
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