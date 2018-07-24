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
	var entriesAdded = 0;
	for (var i=1; i<arrData.length; i++) {
		var data = arrData[i];

		var publication = {id:i, title:data[1], authors:data[2], publication:data[3], link:data[4], category:data[5], demo:data[6], data:data[7], software:data[8], bibtex:data[9], abstract:data[10], poster:data[11], posterTitle:data[12], pageCategory:data[13], download:data[14], downloadName:data[15], downloadDescription:data[16], downloadLink:data[17], downloadDate:data[18], downloadLinkNames:data[19]};

		if(!publication.poster) {
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

		if(found==1 && publication.poster) {
			entry = '<div class="col-md-4"><a href="posters/'+publication.poster+'.pdf" target="_blank"><img src="posters/'+publication.poster+'.jpg" class="poster_image"></a><p class="lead centered">'+publication.posterTitle+'</p>'
			if(publication.link) {
				entry = entry + '<p class="lead centered">Read full paper <a href="'+publication.link+'" target="_blank">here</a>.</p>'
			}
			entry = entry+'</div>'
			entriesAdded = entriesAdded+1;
			if (entriesAdded % 3 == 1) { //append new row
				rowNum = rowNum+1;
				$('#posters').append('<div class="row poster_row" id="row'+rowNum+'">');
			}
			$('#row'+rowNum).append(entry);
		}
	}
}
