//Template:
//<div class="col-md-3">
//<img src="images/laura.jpg" class="profile_pic" alt="Laura Wendlandt">
//<p class="lead"><b>Laura Wendlandt</b></p>
//<p class="lead">PhD Student, Computer Science and Engineering</p>
//<p class="lead">wenlaura at umich.edu</p>
//<div>
function processPeople(allText,pageCategory) {
    arrData = parseCsv(allText);

    current = [];
    alumni = [];
    previousInterns = []
	previousVisiting = []

    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];

        if (data.length == 1 && data[0].length == 0) {
          continue;
        }

        var person = {image:data[0], name:data[1], description:data[2], uniqname:data[3], email_domain:data[4], link:data[5], status:data[6], category:data[7]};

        var allCats = person.category.split(',');
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
        if(found==1) {
            if(person.status=="Alumni") {
                alumni.push(person);
            } else if(person.status=="Current") {
                current.push(person);
            } else if(person.status=="PreviousInterns") {
				previousInterns.push(person);
			} else if(person.status=="PreviousVisiting") {
				previousVisiting.push(person);
			}
        }
    }

    var rowNum = -1;
    var entriesAdded = 0;
    for(var i=0; i<current.length; ++i) {
        person = current[i];
        if(person.image) {
            entry = '<div class="col-md-2"><img src="images/people/'+ person.image + '" class="profile_pic" alt="' + person.name + '"><p class="lead"><b>';
        } else {
            entry = '<div class="col-md-2"><img src="images/people/none.png" class="profile_pic" alt="No image available"><p class="lead"><b>';
        }
        if(person.link) {
            entry = entry + '<a href="' + person.link + '" target="_blank">' + person.name + '</a>';
        } else {
            entry = entry + person.name;
        }

        entry = entry + '</b></p>' + '<p class="lead">' + person.description + '</p>'

        if(person.uniqname && person.email_domain) {
            entry = entry + '<p class="lead">' + person.uniqname + ' at ' + person.email_domain + '</p>';
        }

        entry = entry + '</div>';

        entriesAdded = entriesAdded + 1;
        if(entriesAdded % 6 == 1) { //append new row
            rowNum = rowNum + 1;
            $('#current').append('<div class="row" id="row' + rowNum +'">');
        }

        $('#row' + rowNum).append(entry);
    }

    var rowNum = -1;
    var entriesAdded = 0;
    for(var i=0; i<alumni.length; ++i) {
        person = alumni[i];
        if(person.image) {
            entry = '<div class="col-md-2"><img src="images/people/'+ person.image + '" class="profile_pic" alt="' + person.name + '"><p class="lead"><b>';
        } else {
            entry = '<div class="col-md-2"><img src="images/people/none.png" class="profile_pic" alt="No image available"><p class="lead"><b>';
        }
        if(person.link) {
            entry = entry + '<a href="' + person.link + '" target="_blank">' + person.name + '</a>';
        } else {
            entry = entry + person.name;
        }

        entry = entry + '</b></p>' + '<p class="lead">' + person.description + '</p>'

        if(person.uniqname && person.email_domain) {
            entry = entry + '<p class="lead">' + person.uniqname + ' at ' + person.email_domain + '</p>';
        }

        entry = entry + '</div>';

        entriesAdded = entriesAdded + 1;
        if(entriesAdded % 6 == 1) { //append new row
            rowNum = rowNum + 1;
            $('#alumni').append('<div class="row" id="alumni_row' + rowNum +'">');
        }

        $('#alumni_row' + rowNum).append(entry);
    }

    for(var i=0; i<previousInterns.length; ++i) {
		person = previousInterns[i];
		entry = '<p class="lead centered">'
		if(person.link) {
            entry = entry + '<a href="' + person.link + '" target="_blank">' + person.name + '</a>';
        } else {
            entry = entry + person.name;
        }

		if(person.description) {
			entry = entry + ' (' + person.description + ')';
		}

		entry = entry + '</p>';

        $('#previous_interns').append(entry);
    }

	for(var i=0; i<previousVisiting.length; ++i) {
		person = previousVisiting[i];
		entry = '<p class="lead centered">'
		if(person.link) {
            entry = entry + '<a href="' + person.link + '" target="_blank">' + person.name + '</a>';
        } else {
            entry = entry + person.name;
        }

		if(person.description) {
			entry = entry + ' (' + person.description + ')';
		}

		entry = entry + '</p>';

        $('#previous_visiting').append(entry);
    }
}
