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

		var publication = {id:i, title:data[1], authors:data[2], publication:data[3], link:data[4], category:data[5], demo:data[6], data:data[7], software:data[8], bibtex:data[9], abstract:data[10], poster:data[11], pageCategory:data[12], download:data[13], downloadName:data[14], downloadDescription:data[15], downloadLink:data[16], downloadDate:data[17], downloadLinkNames:data[18]};

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
			entry = '<div class="col-md-2"><img src="posters/'+publication.poster+'.jpg" class="poster_image"></div>'
			entriesAdded = entriesAdded+1;
			if (entriesAdded % 6 == 1) { //append new row
				rowNum = rowNum+1;
				$('#posters').append('<div class="row" id="row'+rowNum+'">');
			}
			$('#row'+rowNum).append(entry);
		}
	}
}
