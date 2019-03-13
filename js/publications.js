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
var pageCategory; //the category of the page (ie. LIT, Girls Encoded)

$(document).ready(function() {
    pageCategory = $('meta[name=category]').attr("content");

    //Dynamically load publications
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

		var publication = {id:i, title:data[1], authors:data[2], publication:data[3], link:data[4], category:data[5], demo:data[6], data:data[7], software:data[8], bibtex:data[9], abstract:data[10], poster:data[11], posterTitle:data[12],posterAuthors:data[13], posterConference:data[14], posterYear:data[15], posterLocation:data[16], pageCategory:data[17], download:data[18], downloadName:data[19], downloadDescription:data[20], downloadLink:data[21], downloadDate:data[22], downloadLinkNames:data[23], new:data[24], notes:data[25]};

	if(!publication.title) {
	    continue;
	}

	var allCats = publication.pageCategory.split(',');
        var found = 0;
        //Is the document category in this array?
        for(var j=0; j<allCats.length; j++) {
            if(allCats[j][0]==' ') {
                allCats[j] = allCats[j].substr(1);
            }
            if(pageCategory==allCats[j]) {
                found = 1;
                break;
            }
        }
        if(found==1 && publication.title) { //don't include if it's just a download and doesn't have a publication title
            var allCats = publication.category.split(',');
            //Is this category already in the array?
            for(var j=0; j<allCats.length; j++) {
                if(allCats[j][0]==' ') {
                    allCats[j] = allCats[j].substr(1);
                }
                var found = 0;
                for(var k=0; k<categories.length; k++) {
                    if(categories[k]==allCats[j]) {
                        found = 1;
                        break;
                    }
                }
                if(found == 0) {
                    categories.push(allCats[j]);
                }
            }

            //Is this year already in the array?
            var found = false;
            for(var j=0; j<years.length; j++) {
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
    }

    if(pageCategory=="LIT") {
        showCategories();

        if(categorySet==1) {
            $('#categories').append('<p class="lead"><a onclick="allPublications()" href="">Go back to all publications</a></p>');
        }
    }

    for(var i=0; i<years.length; ++i) {
        if(categorySet==0) {
            $('#publications').append('<h2 class="featurette-heading">' + years[i].name + '</h2>');
        }
        for(var j=0; j<years[i].publications.length; ++j) {
            publication = years[i].publications[j];

            if(categorySet==0) { //show all publications
                entry = showPublication(publication,true);
                $('#publications').append(entry);
            } else { //only show publication if it's in the proper category
                var pubCategories = publication.category.split(', ');
                for(var k=0; k<pubCategories.length; ++k) {
                    if(pubCategories[k]==category) {
                        entry = showPublication(publication,true);
                        $('#publications').append(entry);
                    }
                }
            }
        }
        if(pageCategory=="LIT" && categorySet==0) {
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
    categories.sort(compareCategories);
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

function compareCategories(a, b) {
    if(a == "Other") { //Other should always be the last category
        return 1;
    }
    if(b == "Other") {
        return -1;
    }
    if(a > b) {
        return 1;
    } else if(a < b) {
        return -1;
    } else {
        return 0;
    }
}
