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

	posters = []
	for (var i=1; i<arrData.length; i++) {
		var data = arrData[i];

		var publication = {id:i, title:data[1], authors:data[2], publication:data[3], link:data[4], category:data[5], demo:data[6], data:data[7], software:data[8], bibtex:data[9], abstract:data[10], poster:data[11], posterTitle:data[12],posterAuthors:data[13], posterConference:data[14], posterYear:data[15], posterLocation:data[16], pageCategory:data[17], download:data[18], downloadName:data[19], downloadDescription:data[20], downloadLink:data[21], downloadDate:data[22], downloadLinkNames:data[23], new:data[24], notes:data[25]};

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
		if(found==1 && publication.poster) {
			posters.push(publication)
		}
	}

	var rowNum = -1;
	var entriesAdded = 0;
	for (var i=0; i<posters.length; i++) {
		publication = posters[i]

		entry = '<div class="col-md-4"><a href="posters/'+publication.poster+'.pdf" target="_blank"><img src="posters/'+publication.poster+'.jpg" class="poster_image"></a><p class="lead centered"><b>'+publication.posterTitle+'</b>'
	
		if(publication.link) {
			entry = entry + ' (<a href="'+publication.link+'" target="_blank">full paper</a>)'
		}

		entry = entry + '</p>'

		if(publication.posterAuthors) {
			entry = entry + '<p class="lead centered">'+publication.posterAuthors+'</p>'
		}
		
		if(publication.posterConference || publication.posterYear || publication.posterLocation) {
			entry = entry + '<p class="lead centered"><i>Presented '
			if(publication.posterConference) {
				entry = entry + 'at ' + publication.posterConference
				if(publication.posterYear || publication.posterLocation) {
					entry = entry + ' '
				}
			}
			if(publication.posterYear) {
				entry = entry + 'in ' + publication.posterYear
				if(publication.posterLocation) {
					entry = entry + ' '
				}
			}
			if(publication.posterLocation) {
				entry = entry + 'in ' + publication.posterLocation
			}
			entry = entry + '</i></p>'
		}
		
		entry = entry+'</div>'
		entriesAdded = entriesAdded+1;
		if (entriesAdded % 3 == 1) { //append new row
			rowNum = rowNum+1;
			if((posters.length/3)-1 > rowNum) { //not last row
				$('#posters').append('<div class="row poster_row" id="row'+rowNum+'">');
			} else { //last row
				$('#posters').append('<div class="row" id="row'+rowNum+'">');
			}
		}
		$('#row'+rowNum).append(entry);
	}
}
