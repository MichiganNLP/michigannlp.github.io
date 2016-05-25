//global variables
var years = []; //each year has a name (ie. 2016) and a list of publications
var categories = [];
var categorySet = ($.cookie('categorySet') != null)
    ? $.cookie('categorySet')
    : false;
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
    alert("categorySet");
    alert(categorySet);
    //http://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
    strDelimiter = (",");
    
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
        // Delimiters.
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"
    ),
    "gi"
    );
    
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(allText)){
        var strMatchedDelimiter = arrMatches[ 1 ];
        if (strMatchedDelimiter.length &&(strMatchedDelimiter != strDelimiter)){
            arrData.push( [] );
        }
        if (arrMatches[ 2 ]){
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                    "\""
                    );
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[ 3 ];
        }
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    
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
    
    alert("categorySet");
    alert(categorySet);
    if(categorySet) {
        $('#categories').append('<p class="lead"><a onclick="allPublications()" href="">Go back to all publications</a></p>');
    }
    
    for(var i=0; i<years.length; ++i) {
        for(var j=0; j<years[i].publications.length; ++j) {
            publication = years[i].publications[j];
            if(!categorySet) {
                $('#publications').append('<h2 class="featurette-heading">' + years[i].name + '</h2>');
            }
            if(!categorySet || publication.category==category) {
                entry = showPublication(publication);
                $('#publications').append(entry);
            }
        }
    }
}

function allPublications() {
    alert('allPublications');
    $.cookie('categorySet',false);
    location.reload();
}

function loadCategory(category) {
    $.cookie('categorySet', true);
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
        entry = entry + '<a onclick="loadCategory(\'' + categories[i] + '\')" href="#">' + categories[i] + "</a>";
        if(i != categories.length-1) {
            entry = entry + ', ';
        }
    }
    $('#categories').append('<p class="lead">View publications by category: ' + entry + '</p>');
}

//Template:
//<h2 class="featurette-heading">2016</h2>
//<p class="lead">Chai, Joyce Y., Anoop Sarkar, and Rada Mihalcea. "What’s Hot in Human Language
//Technology: Highlights from NAACL HLT 2015." Thirtieth AAAI Conference on Artificial
//Intelligence. 2016. (<a href="">pdf</a>, <a href="">demo</a>, <a href="">data</a>, <a
//href="">software</a>)</p>
function showPublication(publication) {
    var entry = '<p class="lead">' + publication.citation;
    if(publication.link || publication.demo || publication.data || publication.software) {
        entry = entry + ' (';
        if(publication.link) {
            entry = entry + '<a href="' + publication.link + '">pdf</a>';
            if(publication.demo || publication.data || publication.software) {
                entry = entry + ', ';
            }
        }
        if(publication.demo) {
            entry = entry + '<a href="' + publication.demo + '">demo</a>';
            if(publication.data || publication.software) {
                entry = entry + ', ';
            }
        }
        if(publication.data) {
            entry = entry + '<a href="' + publication.data + '">data</a>';
            if(publication.software) {
                entry = entry + ', ';
            }
        }
        if(publication.software) {
            entry = entry + '<a href="' + publication.software + '">software</a>';
        }
        entry = entry + ')';
    }
    entry = entry + '</p>';

    return entry;
}